<template>
  <div>
    <HeaderContent :list="list" label="List News">
      <custom-button
        color="primary"
        class="white--text"
        @click="goToCreateArticle"
        >Buat News</custom-button
      >
    </HeaderContent>
    <v-tabs
      @change="changeTabs"
      v-model="tab"
      fixed-tabs
      class="tab__box"
      color="primary"
    >
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
          :total-visible="6"
        ></v-pagination>
      </v-tab-item>
      <v-tab-item>
        <Draft
          :drafts="drafts"
          @updateListDraft="updateListDraft"
          class="mt-4"
        />
        <v-pagination
          class="d-flex justify-end"
          prev-icon="mdi-menu-left"
          next-icon="mdi-menu-right"
          v-model="pageDraft"
          :length="draftPages"
          @input="getDraftBaseOnPage"
        ></v-pagination>
      </v-tab-item>
      <v-tab-item>
        <History class="mt-4" :history="drafts"></History>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import HeaderContent from "@/containers/HeaderContent";
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
  computed: {
    ...mapState(["user"]),
  },
  data() {
    return {
      tab: null,
      list: [
        {
          text: "News",
          disabled: false,
          href: "editor",
        },
      ],
      articles: [],
      drafts: [],
      totalPages: 0,
      pageNews: 1,
      pageDraft: 1,
      draftPages: 0,
    };
  },
  mounted() {
    this.getResponseNews();
  },
  methods: {
    ...mapActions({
      getNews: "news/getListNews",
    }),
    updateListDraft() {
      this.getResponseDraft();
    },
    goToCreateArticle() {
      this.$router.push("/article/create");
    },
    changeTabs(e) {
      const positionTabs = e;
      if (e === 1) {
        this.getResponseDraft();
      } else {
        this.getResponseNews();
      }
    },
    formatingDate(rawDate) {
      const newDt = new Date(rawDate);
      const day = newDt.getDate();
      const month = newDt.getMonth() + 1;
      const year = newDt.getFullYear();
      const newFormat = `${day}/${month}/${year}`;
      return newFormat;
    },
    async getResponseDraft() {
      const payload = {
        tab: "draft",
        page: 0,
      };
      const response = await this.getNews(payload);
      if (response.status === 200) {
        this.formatingResponseDraft(response);
      } else {
        return response;
      }
    },
    async getDraftBaseOnPage() {
      const payload = {
        tab: "draft",
        page: this.pageDraft - 1,
      };
      const response = await this.getNews(payload);
      if (response.status === 200) {
        this.formatingResponseDraft(response);
      } else {
        return response;
      }
    },
    formatingResponseDraft(response) {
      this.draftPages = response.data.data.totalPages;
      const listNews = response.data.data.content;
      const formatingList = listNews.map((news) => {
        const newFormatDate = this.formatingDate(news.createAt);
        return {
          date: newFormatDate,
          headline: news.headline,
          id: news.id,
        };
      });
      this.drafts = formatingList;
    },
    async getResponseNews() {
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
    },
    formatingResponse(response) {
      this.totalPages = response.data.data.totalPages;
      const listNews = response.data.data.content;
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
.tab
  &__box
    width: 500px
</style>
