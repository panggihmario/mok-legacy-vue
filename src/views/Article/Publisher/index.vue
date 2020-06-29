<template>
  <div>
    <HeaderContent :list="list" label="List News" />
    <v-tabs @change="changeTabs" v-model="tab" color="carmine">
      <v-tab>
        <span class="text-capitalize">List News</span>
      </v-tab>
      <v-tab>
        <span class="text-capitalize">Draft</span>
      </v-tab>
      <v-tab>
        <span class="text-capitalize">History</span>
      </v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item>
        <ListArticle :articles="articles" class="mt-4" />
        <v-pagination
          class="d-flex justify-end"
          :length="totalPages"
          prev-icon="mdi-menu-left"
          next-icon="mdi-menu-right"
          v-model="pageNews"
          @input="getNewsBaseOnPage"
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
    History
  },
  data() {
    return {
      tab: null,
      list: [
        {
          text: "News",
          disabled: false,
          href: "publisher"
        }
      ],
      articles: [],
      drafts: [],
      totalPages: 0,
      pageNews: 1
    };
  },
  mounted() {
    this.getResponseNews();
  },
  methods: {
    ...mapActions({
      getNews: "news/getListNews"
    }),
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
        page: 0
      };
      const response = await this.getNews(payload);
      if (response.status === 200) {
        const listNews = response.data.data.content;
        this.totalPages = response.data.data.totalPages;
        const formatingList = listNews.map(news => {
          const newFormatDate = this.formatingDate(news.createAt);
          return {
            date: newFormatDate,
            headline: news.headline,
            id: news.id
          };
        });
        this.drafts = formatingList;
      } else {
        return response;
      }
    },
    async getResponseNews() {
      const payload = {
        tab: "list",
        page: 0
      };
      const response = await this.getNews(payload);
      if (response.status === 200) {
        this.formatingResponse(response);
      } else {
        console.log(response);
        return response;
      }
    },
    async getNewsBaseOnPage() {
      const payload = {
        tab: "list",
        page: this.pageNews - 1
      };
      const response = await this.getNews(payload);
      if (response.status === 200) {
        this.formatingResponse(response);
      } else {
        console.log(response);
        return response;
      }
    },
    formatingResponse(response) {
      const listNews = response.data.data.content;
      this.totalPages = response.data.data.totalPages;
      const formatingList = listNews.map(news => {
        const newFormatDate = this.formatingDate(news.createAt);
        return {
          date: newFormatDate,
          status: news.status,
          headline: news.headline,
          id: news.id
        };
      });
      this.articles = formatingList;
    }
  }
};
</script>

<style lang="sass" scoped>
.article
  &__label
    font-size: 24px
    font-weight: 500
</style>
