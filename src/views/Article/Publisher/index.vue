<template>
  <div>
    <HeaderContent :list="list" label="List News" />
    <div class="d-flex justify-end">
      <custom-input
        placeholder="Search"
        style="width: 200px"
        v-model="keyword"
        @keyup.enter="handleSearch"
      />
    </div>
    <v-tabs @change="changeTabs" v-model="tab" color="primary">
      <v-tab>
        <span class="text-capitalize">List News</span>
      </v-tab>
      <v-tab>
        <span class="text-capitalize">Draft</span>
      </v-tab>
      <!-- <v-tab>
        <span class="text-capitalize">History</span>
      </v-tab> -->
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item>
        <ListArticle
          :articles="articles"
          class="mt-4"
          @reloadDataNews="reloadDataNews"
        />
        <!-- class="d-flex justify-end" -->
        <v-pagination
          :length="totalPages"
          prev-icon="mdi-menu-left"
          next-icon="mdi-menu-right"
          v-model="pageNews"
          @input="getNewsBaseOnPage"
          :total-visible="6"
        ></v-pagination>
      </v-tab-item>
      <v-tab-item>
        <Draft :drafts="drafts" class="mt-4"></Draft>
      </v-tab-item>
      <v-tab-item>
        <history :history="drafts" class="mt-4"></history>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
import HeaderContent from "@/containers/HeaderContent";
import { mapState, mapActions } from "vuex";
import ListArticle from "./list/article";
import Draft from "./list/draft";
import History from "./list/history";

export default {
  components: {
    HeaderContent,
    ListArticle,
    Draft,
    History,
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
      isSearch : false
    };
  },
  mounted() {
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
        this.formatingResponse(response);
      } else {
        return response;
      }
    },
    reloadDataNews() {
      this.getResponseNews();
    },
    formatingDate(rawDate) {
      const newDt = new Date(rawDate);
      const day = newDt.getDate();
      const month = newDt.getMonth() + 1;
      const year = newDt.getFullYear();
      const newFormat = `${day}/${month}/${year}`;
      return newFormat;
    },
    changeTabs(e) {
      const positionTabs = e;
      if (e === 1) {
        this.getResponseDraft();
      } else {
        this.getResponseNews();
      }
    },
    async getResponseDraft() {
      const payload = {
        tab: "draft",
        page: 0,
      };
      const response = await this.getNews(payload);
      if (response.status === 200) {
        const listNews = response.data.data.content;
        this.totalPages = response.data.data.totalPages;
        const formatingList = listNews.map((news) => {
          const newFormatDate = this.formatingDate(news.createAt);
          return {
            date: newFormatDate,
            headline: news.headline,
            id: news.id,
          };
        });
        this.drafts = formatingList;
      } else {
        return response;
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
        this.formatingResponse(response);
      } else {
        return response;
      }
    },
    async getNewsBaseOnPage() {
      if(this.isSearch) {
        const data = {
          page : this.pageNews - 1,
          title : this.keyword
        }
        const response = await this.searchNews(data)
        if(response.status === 200) {
          this.formatingResponse(response)
        }else{
          return response
        }
      }else{
        const payload = {
          tab: "list",
          page: this.pageNews - 1,
        };
        const response = await this.getNews(payload);
        if (response.status === 200) {
          this.formatingResponse(response);
        } else {
          return response;
        }
      }
      
    },
    formatingResponse(response) {
      const listNews = response.data.data.content;
      this.totalPages = response.data.data.totalPages;
      const formatingList = listNews.map((news) => {
        const newFormatDate = this.formatingDate(news.createAt);
        return {
          date: newFormatDate,
          status: news.status,
          headline: news.headline,
          id: news.id,
        };
      });
      this.articles = formatingList;
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
