<template>
  <div>
    <HeaderContent :list="list" label="List News" />
    <div class="d-flex justify-space-between">
    <div class="d-flex">
      <div v-for="(tab, idx) in tabList" :key="idx" class="mr-4">
        <div
          :class="
            tab.active ? `ctab__box  ctab__active` : `ctab__box ctab__nonactive`
          "
          @click="changeActive(tab)"
        >
          <div>{{ tab.label }}</div>
        </div>
      </div>
    </div>
      <custom-input
        placeholder="Search"
        colorbg="white"
        outlined
        dense
        append-icon="search"
        v-if="tabPosition === 1"
        v-model="keyword"
        @keyup.enter="handleSearch"
      />
    </div>
    <div v-if="tabPosition === 1">
      <ListArticle
        class="mt-4"
        :listNews="listNews"
        @getNewsBaseOnPage="getNewsBaseOnPage"
      />
    </div>
    <div v-if="tabPosition === 2">
      <Draft 
        :drafts="listNews" 
        class="mt-4" 
        
      />
    </div>
    <div v-if="tabPosition === 3">
      <Scheduled 
        :listNews="listNews" 
        class="mt-4" 
        @getNewsBaseOnPage="getNewsBaseOnPage"
      />
    </div>
    <div v-if="tabPosition === 4">
      <Agregrator class="mt-4" />
    </div>
  </div>
</template>

<script>
import HeaderContent from "@/containers/HeaderContent";
import { mapState, mapActions } from "vuex";
import ListArticle from "./list/article";
import Draft from "./list/draft";
import Scheduled from "./list/scheduled";
import Agregrator from "./list/agregrator";

export default {
  components: {
    HeaderContent,
    ListArticle,
    Draft,
    Scheduled,
    Agregrator,
  },
  data() {
    return {
      tab: null,
      tabPosition: 1,
      tabList: [
        {
          label: "List News",
          active: true,
          position: 1,
          payload: "list",
        },
        {
          label: "Draft",
          active: false,
          position: 2,
          payload: "draft",
        },
        {
          label: "Terjadwal",
          active: false,
          position: 3,
          payload: "scheduled",
        },
        {
          label: "News Agregrator",
          active: false,
          position: 4,
          payload: "scheduled",
        },
      ],
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
      isSearch: false,
      listNews: [],
    };
  },
  created() {
    this.changeTabs("list");
  },
  methods: {
    ...mapActions({
      getNews: "news/getListNews",
      searchNews: "news/searchNews",
    }),
    changeActive(tab) {
      this.tabPosition = tab.position;
      const newTabList = this.tabList.map((t) => {
        if (t.position === tab.position) {
          return {
            ...t,
            active: true,
          };
        } else {
          return {
            ...t,
            active: false,
          };
        }
      });
      this.tabList = newTabList;
      return this.changeTabs(tab.payload);
    },
    async handleSearch() {
      this.isSearch = true;
      const payload = {
        title: this.keyword,
      };
      const response = await this.searchNews(payload);
      if (response.status === 200) {
        console.log(response)
        const responseData = response.data.data
        this.listNews = responseData
      } else {
        return response;
      }
    },
    async changeTabs(e) {
      const payload = {
        tab: e,
        page: 0,
      };
      this.listNews = []
      const response = await this.getNews(payload);
      if (response.status === 200) {
        const responseData = response.data.data;
        this.listNews = responseData;
        this.totalPages = response.data.data.totalPages;
      } else {
        this.listNews = [];
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
        console.log(response)
        const responseData = response.data.data;
        this.listNews = responseData;
         this.totalPages = response.data.data.totalPages;
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
.tab
  &__box
    width: 500px
  &__active
    border-radius: 32px
    background-color: #FFF3E7
.ctab
  &__box
    border-radius: 32px
    font-size: 12px
    padding: 9px 24px 9px 24px
    display: inline-block
    cursor: pointer
  &__nonactive
    background-color: #FAFAFA
    color: #777777
  &__active
    background-color: #FFF3E7
    color: #FF8717
</style>

<style scoped>
.v-tab:hover {
  background-color: transparent;
}
.v-tab:focus {
  background-color: transparent;
}
</style>
