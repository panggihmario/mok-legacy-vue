<template>
  <div>
    <Header/>
    <Tabs
      position="scheduled"
    />
    <ScheduledNews
      :listNews="listNews"
      class="mt-4"
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
      listNews : []
    }
  },
  mounted() {
    this.fetchScheduledNews()
  },
  methods : {
    ...mapActions({
      getNews: "news/getListNews",
    }),
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