<template>
  <div>
    <HeaderContent label="List Article" />
    <v-tabs @change="changeTabs" v-model="tab">
      <v-tab>
        <span class="text-capitalize">List Article </span>
      </v-tab>
      <v-tab>
        <span class="text-capitalize">Draft</span>
      </v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item>
        <ListArticle :articles="articles" />
      </v-tab-item>
      <v-tab-item>
        <Draft :drafts="drafts" />
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
import ListArticle from "./list/article";
import { mapState, mapActions } from "vuex";
import HeaderContent from "../../../containers/HeaderContent";
import Draft from "./list/draft";
export default {
  components: {
    ListArticle,
    Draft,
    HeaderContent
  },
  data() {
    return {
      tab: null,
			articles: [],
			drafts : []
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
				const listNews = response.data.data.content;
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
      } else {
				console.log(response)
				return response;
      }
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
