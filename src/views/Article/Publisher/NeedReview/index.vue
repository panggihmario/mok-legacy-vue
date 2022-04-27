<template>
  <div>
    <Header/>
    <Tabs
      position="review"
    />
    <List 
      :dataReview="dataReview" 
      class="mt-4"  
      :totalPages="totalPages"
      @getNewsBaseOnPage="getNewsBaseOnPage"
    />
  </div>
</template>

<script>
import Header from "../containers/header.vue"
import Tabs from "../containers/tabs.vue"
import List from "./listData.vue"
import { mapActions } from "vuex"
export default {
  components : {
    Header,
    Tabs,
    List
  },
  data () {
    return {
      dataReview : [],
      totalPages : 0
    }
  },
  mounted () {
    this.fetchDataReview()
  },
  methods : {
    ...mapActions({
      getNews : 'news/getListNews'
    }),
    getNewsBaseOnPage(params) {
      return this.getNews(params)
       .then(response=>{
          const responseData = response.data.data
          this.dataReview = responseData.content
          this.totalPages = responseData.totalPages

        })
    },
    fetchDataReview () {
      const page = this.$route.params.page
      const payload = {
        page : page - 1,
        tab : 'review'
      }
      return this.getNews(payload)
        .then(response=>{
          const responseData = response.data.data
          this.dataReview = responseData.content
          this.totalPages = responseData.totalPages

        })
    }
  }
}
</script>