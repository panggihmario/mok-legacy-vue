<template>
  <div>
    <div class="d-flex">
      <div class="mt-2 mr-2 agg__filter">Filter</div>
      <custom-select
        :items="mappingCategory"
        dense
        item-text="newsCategory.name"
        v-model="selectedMapping"
      />
    </div>
    <v-data-table
      :headers="headers"
      :items="newsAgregrator"
      item-key="idNewsExternal"
      class="my-table"
      show-select
      disable-pagination
      v-model="selected"
      hide-default-footer
      :loading="statusLoading"
      @toggle-select-all="selectAllNews"
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
        >
          Publish All
        </custom-button>
      </template>
      <template v-slot:body="{ items }">
        <tbody>
          <tr
            v-for="(item, key) in items"
            :key="key"
            :class="key === selectedRow ? 'row__highlight' : 'row__nonhighlight'"
          >
            <td>
              <v-checkbox :value="item" color="secondary" v-model="selected" />
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
              <!-- <v-btn  :loading="statusLoading" >test</v-btn> -->
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
      statusLoading : false,
      loadingPublish : false,
      isLoading : false,
      selected: [],
      newsAgregrator : [],
      mappingCategory : [],
      selectedMapping : 'EKONOMI',
      headers: [
        {
          text: "Tanggal",
          value: "createAt",
          width: "100",
        },
        {
          text: "Sumber",
          value: "siteReference",
          width: "150",
        },
        {
          text: "Headline",
          value: "title",
          // width: "200",
        },
        {
          text: "",
          value: "action",
          width: "250",
          align: "start",
        },
      ],
    };
  },
  computed: {
    ...mapState({
      viewNews: "viewNews",
      // statusLoading : state => state.news.statusLoading,
      // newsAgregator :state => state.news.newsAgregator
    }),
  },
  mounted() {
    this.handleNewsAgregator()
    this.handleGetMapping()
  },
  methods: {
    handlePublish(payload) {
      const params = { ...payload}
      this.statusLoading = true
      // this.setStatusLoading(true)
      return this.publishNewsAgregator(params)
        .then(resp => {
          this.newsAgregrator = []
          // return this.getAllNewsAgregrator()
        })
        .then(response=> {
          this.statusLoading = false
          // this.setStatusLoading(false)
          // this.setNewsAgregator(response)
          this.selected = []
          this.newsAgregrator = response
        })
        .catch(err => {
          console.log(err)
          this.statusLoading = false
        })
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
    ...mapActions({
      changeStatusViewNews: "changeStatusViewNews",
      getAllNewsAgregrator : 'news/getAllNewsAgregrator',
      publishNewsAgregator: 'news/publishNewsAgregator',
      getMappingCategory : 'news/getMappingCategory',
      getNewsAgregatorByCategory : 'news/getNewsAgregatorByCategory'
    }),
    ...mapMutations({
      setPreviewNewsAgregrator : 'news/setPreviewNewsAgregrator',
      setStatusLoading : 'news/setStatusLoading',
      setNewsAgregator : 'news/setNewsAgregator'
    }),
    handleGetMapping() {
      return this.getMappingCategory()
        .then(response => {
          console.log(response)
          this.mappingCategory = response
        })
    },
    handleNewsAgregator () {
      this.isLoading = true
      return this.getNewsAgregatorByCategory(this.selectedMapping)
        .then(response => {
          this.newsAgregrator = response
          // this.setNewsAgregator(response)
          this.statusLoading = false
        })
        .catch(err => {
          // this.statusLoading = false
        })
    },
    openSideViewNews(data, idx) {
      this.selectedRow = idx;
      this.setPreviewNewsAgregrator(data)
      return this.changeStatusViewNews(true);
    },
    selectAllNews(items, value) {
      console.log({items})
    }
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