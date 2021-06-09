<template>
  <div>
    <div class="d-flex justify-space-between">
      <div class="d-flex">
        <div class="mt-2 mr-2 agg__filter">Filter</div>
          <custom-select
            :items="mappingCategory"
            dense
            item-text="newsCategory.name"
            v-model="selectedMapping"
            @change="filterAgregator"
            clearable
            @click:clear="handleNewsAgregator"
            class="mr-4"
            placeholder="Kategori"
          />
          <custom-select
            :items="agregratorSites"
            placeholder="Agregrator Sites"
            dense
            item-text="name"
            v-model="selectedSite"
            @change="filterBySite"
            clearable
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
      @toggle-select-all="selectAllNews"
      no-data-text="no data"
    >
      <template v-slot:[`item.action`]="{ item }">
        <custom-button
          color="primary"
          v-if="!viewNews"
          size="medium"
          class="my-3"
          width="101"
        >
          Publish
        </custom-button>
      </template>
      <template v-slot:header.action>
        <custom-button
          color="primary"
          v-if="!viewNews"
          size="medium"
          class="my-3"
          width="101"
          @click="handlePublishAll"
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
              <custom-button
                color="primary"
                v-if="!viewNews"
                size="medium"
                class="my-3"
                width="101"
                @click="handlePublish(item)"
              >
                Publish
              </custom-button>
            </td>
          </tr>
        </tbody>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      singleSelect: false,
      selectedRow: null,
      statusLoading: false,
      loadingPublish: false,
      isLoading: false,
      searchNewsAg: "",
      agregratorSites : [],
      mappingCategory: [],
      selectedMapping: '',
      selectedSite : '',
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
    }),
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
    this.handleGetSiteAgregrator()
  },
  methods: {
    handlePublish(payload) {
      const params = { ...payload };
      this.statusLoading = true;
      return this.publishNewsAgregator(params)
        .then((response) => {
          return this.handleNewsAgregator();
        })
        .then(() => {
          this.statusLoading = false;
          return this.setSelectedToPublish([]);
        })
        .catch((err) => {
          console.log(err);
          this.statusLoading = false;
        });
    },
    handlePublishAll() {
      const selectedNews = this.selected;
      return this.publishAllNewsAgregator(selectedNews)
        .then((response) => {
          return this.handleNewsAgregator();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getSearchNews() {
      const payload = {
          search: this.searchNewsAg,
      };
      if(this.selectedMapping) {
        return this.filterAgregator()
      }else{
        return this.getAllNewsAgregrator(payload)
      }
    },
    filterAgregator() {
      const payload = {
        category: this.selectedMapping,
        keyword: {
          search: this.searchNewsAg,
        },
      };
      this.selectedMappingCategory(this.selectedMapping);
      this.statusLoading = true;
      return this.getNewsAgregatorByCategory(payload).then(() => {
        this.selected = [];
        this.statusLoading = false;
      });
    },
    filterBySite() {
      const payload = {
        category: this.selectedMapping,
        keyword: {
          search: this.searchNewsAg,
          site : this.selectedSite
        },
      }
      return this.getNewsAgregatorByCategory(payload).then(() => {
        this.selected = [];
        this.statusLoading = false;
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
      return this.getNewSiteAgregator()
        .then(response => {
          this.agregratorSites = response
          console.log(response)
        })
    },
    ...mapActions({
      changeStatusViewNews: "changeStatusViewNews",
      getAllNewsAgregrator: "news/getAllNewsAgregrator",
      publishNewsAgregator: "news/publishNewsAgregator",
      getMappingCategory: "news/getMappingCategory",
      getNewsAgregatorByCategory: "news/getNewsAgregatorByCategory",
      publishAllNewsAgregator: "news/publishAllNewsAgregator",
      getNewSiteAgregator : "news/getNewSiteAgregator"
    }),
    ...mapMutations({
      setPreviewNewsAgregrator: "news/setPreviewNewsAgregrator",
      setStatusLoading: "news/setStatusLoading",
      setNewsAgregator: "news/setNewsAgregator",
      selectedMappingCategory: "news/selectedMappingCategory",
      setSelectedToPublish: "news/setSelectedToPublish",
    }),
    handleGetMapping() {
      return this.getMappingCategory().then((response) => {
        this.mappingCategory = response;
      });
    },
    handleNewsAgregator() {
      this.statusLoading = true;
      return this.getAllNewsAgregrator()
        .then((response) => {
          this.selected = [];
          this.statusLoading = false;
        })
        .catch((err) => {
          console.log(err);
          // this.statusLoading = false
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
</style>