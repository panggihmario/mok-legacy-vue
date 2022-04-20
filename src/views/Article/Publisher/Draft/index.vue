<template>
  <div>
    <Header/>
    <Tabs
      position="draft"
    />
    <Draft
      :drafts="drafts" 
      class="mt-4"
    />
  </div>
</template>

<script>
import Header from "../containers/header.vue"
import Tabs from "../containers/tabs.vue"
import Draft from "./listData.vue"
import { mapActions } from "vuex"
export default {
  components : {
    Header,
    Tabs,
    Draft
  },
  data () {
    return {
      drafts : []
    }
  },
  mounted () {
    this.fetchDraftNews()
  },
  methods : {
    ...mapActions({
      getNews: "news/getListNews",
    }),
    fetchDraftNews(){
      const page = this.$route.params.page
      const payload = {
        page : page - 1,
        tab : 'draft'
      }
      return this.getNews(payload)
        .then(response => {
          const responseData = response.data.data
          this.drafts = responseData
        })
    }
  }
}
</script>