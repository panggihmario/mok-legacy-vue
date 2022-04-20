<template>
  <div>
    <Header/>
    <Tabs
      position="review"
    />
    <List :dataReview="dataReview" class="mt-4"  />
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
      dataReview : []
    }
  },
  mounted () {
    this.fetchDataReview()
  },
  methods : {
    ...mapActions({
      getNews : 'news/getListNews'
    }),
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
          console.log(responseData)
        })
    }
  }
}
</script>