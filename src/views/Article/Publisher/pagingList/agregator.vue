<template>
  <div>
    <Header />
    <Tabs position="agregrator" class="mb-4" />

    <div class="d-flex justify-space-between">
      <div class="d-flex">
        <div class="mt-2 mr-2 agg__filter">Filter</div>
        <custom-select
          :items="sites"
          placeholder="Agregrator Sites"
          dense
          item-text="name"
          v-model="selectedSite"
          @change="filterBySite"
          @click:clear="handleNewsAgregator"
          class="mr-4"
        />
      </div>
      <custom-input
        placeholder="Search"
        v-model="searchNewsAg"
        size="small"
        dense
        @keyup.enter="getSearchNews"
      />
    </div>
    <v-data-table
      :headers="headers"
      :items="newsAgregrator"
      item-key="idNewsExternal"
      class="my-table"
      show-select
      v-model="selected"
      :loading="statusLoading"
      hide-default-footer
      @toggle-select-all="selectAllNews"
      no-data-text="no data"
    >
      <template v-slot:[`item.action`]>
        <!-- <custom-button
          color="primary"
          v-if="!viewNews"
          size="medium"
          class="my-3"
          width="101"
        >
          Publish
        </custom-button> -->
      </template>
      <template v-slot:[`header.action`]>
        <custom-button
          color="primary"
          v-if="!viewNews"
          size="medium"
          class="my-3"
          width="101"
          @click="handlePublishAll"
          :loading="loadingPublishAll"
        >
          Publish All
        </custom-button>
      </template>
      <template v-slot:body="{ items }">
        <tbody>
          <tr
            v-for="(item, key) in items"
            :key="key"
            :class="
              key === selectedRow && viewNews
                ? 'row__highlight'
                : 'row__nonhighlight'
            "
          >
            <td>
              <!-- <v-checkbox  :value="item" color="secondary" v-model="selected" /> -->
              <input
                style="width: 20px"
                type="checkbox"
                v-model="selected"
                :value="item"
              />
            </td>
            <td>{{ formatingDate(item.postNewsDto.createAt) }}</td>
            <td>{{ item.postNewsDto.siteReference }}</td>
            <td style="cursor: pointer" @click="openSideViewNews(item, key)">
              {{ item.postNewsDto.title }}
            </td>
            <td>
              <ButtonPublish
                :viewNews="viewNews"
                @successPublish="successPublish"
                @errorPublish="errorPublish"
                :item="item"
              />
            </td>
          </tr>
        </tbody>
      </template>
    </v-data-table>
    <v-pagination
      v-model="page"
      :length="totalPages"
      :total-visible="7"
      @input="getNewsByPage"
    ></v-pagination>

    <v-alert class="agg__alert" :value="alertError" type="error">
      {{ errorMessage }}
    </v-alert>
  </div>
</template>

<script>
import Header from "../containers/header.vue";
import Tabs from "../containers/tabs.vue";
import ButtonPublish from "./buttonPublish.vue";
import { mapActions, mapState, mapMutations } from "vuex";
export default {
  components: {
    Header,
    Tabs,
    ButtonPublish,
  },
  created() {
    const sites = this.$route.params.sites;
    const page = this.$route.params.page;
    this.setSite(sites);
    this.page = Number(page);
  },
  data() {
    return {
      errorMessage: "",
      searchNewsAg: "",
      page: 1,
      loadingPublishAll: false,
      totalPages: 0,
      alertError: false,
      singleSelect: false,
      selectedRow: null,
      statusLoading: false,
      loadingPublish: false,
      isLoading: false,
      searchNewsAg: "",
      mappingCategory: [],
      selectedMapping: "",
      headers: [
        {
          text: "Tanggal",
          value: "createAt",
          width: "10",
        },
        {
          text: "Sumber",
          value: "siteReference",
          width: "5",
        },
        {
          text: "Headline",
          value: "title",
          width: "300",
        },
        {
          text: "",
          value: "action",
          width: "100",
          align: "start",
        },
      ],
    };
  },
  computed: {
    ...mapState({
      viewNews: "viewNews",
      newsAgregrator: (state) => state.news.newsAgregrator,
      selectedToPublish: (state) => state.news.selectedToPublish,
      sites: (state) => state.news.sites,
      site: (state) => state.news.site,
    }),
    selectedSite: {
      get() {
        return this.site;
      },
      set(value) {
        return this.setSite(value);
      },
    },
    selected: {
      get() {
        return this.selectedToPublish;
      },
      set(value) {
        return this.setSelectedToPublish(value);
      },
    },
  },
  mounted() {
    this.handleNewsAgregator();
    this.handleGetMapping();
    this.fetchListAgregratorSites();
  },
  watch: {
    $route: function () {
      const params = this.$route.params;
      const page = params.page;
      this.page = page;
      const payload = {
        size: 10,
        page: page - 1,
      };
      return this.getAllNewsAgregrator(payload)
        .then((response) => {
          const totalPages = response.totalPages;
          this.totalPages = totalPages;
          this.selected = [];
          this.statusLoading = false;
        })
        .catch((err) => {
          console.log(err);
          // this.statusLoading = false
        });
    },
  },
  methods: {
    errorPublish(err) {
      const message = err.response.data.message;
      if (message) {
        this.alertError = true;
        this.errorMessage = message;
      }
      setTimeout(() => {
        (this.alertError = false), (this.errorMessage = "");
      }, 2000);
    },
    successPublish() {
      return this.handleNewsAgregator().then(() => {
        return this.setSelectedToPublish([]);
      });
    },
    postPublishAll(selectedNews) {
      return this.publishAllNewsAgregator(selectedNews)
        .then((response) => {
          this.loadingPublishAll = false
          return this.handleNewsAgregator();
        })
        .catch((err) => {
          this.loadingPublishAll = false
          const message = err.response.data.message;
          if (message) {
            this.alertError = true;
            this.errorMessage = message;
          }
          setTimeout(() => {
            (this.alertError = false), (this.errorMessage = "");
          }, 2000);
        });
    },
    handlePublishAll() {
      const selectedNews = this.selected;
      this.loadingPublishAll = true
      setTimeout(() => {
        this.postPublishAll(selectedNews)
      },2000)
      
    },
    getSearchNews() {
      const payload = {
        data: {
          search: this.searchNewsAg,
        },
        params: this.site,
      };
      return this.searchNewsAgregrator(payload);
    },

    filterBySite() {
      // return this.handleNewsAgregator();
      this.$router.push({
        name: "agregratorPage",
        params: {
          type: "agregrator",
          page: 1,
          sites: this.site,
        },
      });
    },
    isEnabled(slot) {
      return this.enabled === slot;
    },
    formatingDate(rawDate) {
      const newDt = new Date(rawDate);
      const day = newDt.getDate();
      const month = newDt.getMonth() + 1;
      const year = newDt.getFullYear();
      const newFormat = `${day}/${month}/${year}`;
      return newFormat;
    },
    handleGetSiteAgregrator() {
      return this.getNewSiteAgregator().then((response) => {
        this.agregratorSites = response;
      });
    },
    ...mapActions({
      changeStatusViewNews: "changeStatusViewNews",
      getAllNewsAgregrator: "news/getAllNewsAgregrator",
      publishNewsAgregator: "news/publishNewsAgregator",
      getMappingCategory: "news/getMappingCategory",
      publishAllNewsAgregator: "news/publishAllNewsAgregator",
      getNewSiteAgregator: "news/getNewSiteAgregator",
      getListAgregratorSite: "news/getListAgregratorSite",
      searchNewsAgregrator: "news/searchNewsAgregrator",
    }),
    ...mapMutations({
      setPreviewNewsAgregrator: "news/setPreviewNewsAgregrator",
      setStatusLoading: "news/setStatusLoading",
      setNewsAgregator: "news/setNewsAgregator",
      selectedMappingCategory: "news/selectedMappingCategory",
      setSelectedToPublish: "news/setSelectedToPublish",
      setSite: "news/setSite",
    }),
    fetchListAgregratorSites() {
      return this.getListAgregratorSite();
    },
    handleGetMapping() {
      return this.getMappingCategory().then((response) => {
        this.mappingCategory = response;
      });
    },
    handleNewsAgregator() {
      this.statusLoading = true;
      const page = this.$route.params.page;
      const payload = {
        size: 10,
        page: page - 1,
      };
      return this.getAllNewsAgregrator(payload)
        .then((response) => {
          const totalPages = response.totalPages;
          this.totalPages = totalPages;
          this.selected = [];
          this.statusLoading = false;
        })
        .catch((err) => {
          console.log(err);
          // this.statusLoading = false
        });
    },
    getNewsByPage(value) {
      this.$router.push({
        name: "agregratorPage",
        params: {
          page: value,
          sites: this.selectedSite,
          type: "agregrator",
        },
      });
    },
    openSideViewNews(data, idx) {
      this.selectedRow = idx;
      this.setPreviewNewsAgregrator(data);
      return this.changeStatusViewNews(true);
    },
    selectAllNews(items, value) {
      console.log({ items });
    },
  },
};
</script>



<style lang="scss" >
.my-table thead th {
  background-color: #fafafa;
  // &:first-child { border-radius: 10px 0 0 0; }
  // &:last-child { border-radius: 0 10px 0 0; }
}
.header-table {
  color: black;
  font-size: 14px;
}
</style>

<style lang="sass" scoped>
.row
  &__highlight
    color: rgba(24, 144, 255, 1)
    font-size: 12px
    letter-spacing: 0.01em
  &__nonhighlight
    color: #4A4A4A
    font-size: 12px
    letter-spacing: 0.01em
.agg
  &__filter
    color: #9B9B9B
    font-size: 14px
  &__alert
    position: absolute
    top: 20px
    right: 20px
</style>