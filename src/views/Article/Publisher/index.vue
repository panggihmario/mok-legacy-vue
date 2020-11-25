<template>
  <div>
    <HeaderContent :list="list" label="List News" />
    <!-- <div class="d-flex justify-end">
      <custom-input
        placeholder="Search"
        style="width: 200px"
        v-model="keyword"
        @keyup.enter="handleSearch"
      />
    </div> -->
    <v-tabs  v-model="tab" color="primary">
      <v-tab @change="changeTabs('list')">
        <span class="text-capitalize">List News</span>
      </v-tab>
      <v-tab @change="changeTabs('draft')">
        <span class="text-capitalize">Draft</span>
      </v-tab>
      <v-tab @change="changeTabs('scheduled')">
        <span class="text-capitalize">Terjadwal</span>
      </v-tab>
    </v-tabs>
    <v-tabs-items  v-model="tab">
      <v-tab-item>
        <ListArticle
          class="mt-4"
          :listNews="listNews"
          @getNewsBaseOnPage="getNewsBaseOnPage"
        />
      </v-tab-item>
      <v-tab-item>
        <Draft :drafts="listNews" class="mt-4" />
      </v-tab-item>
      <v-tab-item>
        <Scheduled :listNews="listNews" class="mt-4"/>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
import HeaderContent from "@/containers/HeaderContent";
import { mapState, mapActions } from "vuex";
import ListArticle from "./list/article";
import Draft from "./list/draft";
import Scheduled from "./list/scheduled";

export default {
  components: {
    HeaderContent,
    ListArticle,
    Draft,
    Scheduled,
  },
  data() {
    return {
      tab: null,
      list: [
        {
          text: "News",
          disabled: false,
          href: "publisher",
        },
      ],
      articles: [],
      drafts: [],
      totalPages: 0,
      pageNews: 1,
      keyword: "",
      isSearch : false,
      listNews : []
    };
  },
  created() {
    this.getResponseNews();
  },
  methods: {
    ...mapActions({
      getNews: "news/getListNews",
      searchNews: "news/searchNews",
    }),
    async handleSearch() {
      this.isSearch = true
      const payload = {
        title: this.keyword,
      };
      const response = await this.searchNews(payload);
      if (response.status === 200) {
      } else {
        return response;
      }
    },
    async changeTabs(e) {
      const payload = {
        tab: e,
        page: 0,
      };
      const response = await this.getNews(payload);
      console.log(response)
      if(response.status === 200) {
        const responseData = response.data.data;
        this.listNews = responseData
        this.totalPages = response.data.data.totalPages;
      }else {
        this.listNews = []
        return response
      }
    },
    async getResponseNews() {
      this.pageNews = 1;
      const payload = {
        tab: "list",
        page: 0,
      };
      const response = await this.getNews(payload);
      if (response.status === 200) {
        const responseData = response.data.data
        this.listNews = responseData
        this.totalPages = response.data.data.totalPages;
      } else {
        return response;
      }
    },
    async getNewsBaseOnPage(params) {
      const payload = {
        tab: params.tab,
        page: params.page - 1,
      };
      const response = await this.getNews(payload);
      if (response.status === 200) {
        const responseData = response.data.data
        this.listNews = responseData
      } else {
        return response;
      }
    },
  },
};
</script>

<style lang="sass" scoped>
.article
  &__label
    font-size: 24px
    font-weight: 500
</style>
