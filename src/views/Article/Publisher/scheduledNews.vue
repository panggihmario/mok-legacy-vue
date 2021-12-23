<template>
  <div>
    <Header/>
    <Tabs
      position="scheduled"
    />
    <ScheduledNews
      :listNews="listNews"
      class="mt-4"
      @getNewsBaseOnPage="getNewsBaseOnPage"
    />
  </div>
</template>

<script>
import Header from "./containers/header.vue"
import Tabs from "./containers/tabs.vue"
import ScheduledNews from "./list/scheduled.vue"
import { mapActions } from "vuex"
export default {
  components : {
    Header,
    Tabs,
    ScheduledNews
  },
  data () {
    return {
      listNews : [],
    }
  },
  mounted() {
    this.fetchScheduledNews()
  },
  created () {
    const page = this.$route.params.page;
    this.page = Number(page);
  },
  methods : {
    ...mapActions({
      getNews: "news/getListNews",
    }),
    async getNewsBaseOnPage(params) {
      const payload = {
        tab: params.tab,
        page: params.page - 1,
      };
      const response = await this.getNews(payload);
      if (response.status === 200) {
        const responseData = response.data.data;
        this.listNews = responseData;
         this.totalPages = response.data.data.totalPages;
      } else {
        return response;
      }
    },
    fetchScheduledNews() {
      const page = this.$route.params.page
      const payload = {
        page : page - 1,
        tab : 'scheduled'
      }
      return this.getNews(payload)
        .then(response => {
          const responseData = response.data.data
          this.listNews = responseData
        })
    }
  }
}
</script>