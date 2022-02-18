<template>
  <div>
    <AdminView 
      v-if="isAdmin"
      @refreshDataFeed="refreshDataFeed"
    />
    <SelebView 
      v-if="isSeleb"
    />
  </div>
</template>


<script>
import AdminView from "./adminView/index.vue"
import { mapState, mapActions } from "vuex"
import SelebView from "./selebView/index.vue"
export default {
  components : {
    AdminView,
    SelebView
  },
  computed : {
    ...mapState({
      role : (state) => state.authentication.role,
      feeds : (state) => state.post.feeds,
      keywordSearch : (state) => state.post.keywordSearch,
      channelCode : (state) => state.post.channelCode
    }),
    isAdmin () {
      if(this.role === 'ROLE_ADMIN' || this.role === 'ROLE_ADMIN_SOCIAL') {
        return true
      }
    },
    isSeleb() {
      if(this.role ===  'ROLE_SELEB'){
        return true
      }
    }
  },
  methods : {
    ...mapActions ({
      fetchFeeds : 'post/fetchFeeds',
      searchFeed : 'post/searchFeed'
    }),
    refreshDataFeed() {
      this.$emit('refreshDataFeed')
    },
    fetchApi (page, code) {
      const payload = this.getPayload(page, code)
      return this.fetchFeeds(payload)
    },
    handleFetchingData () {
      const page = this.$route.params.page
      return this.fetchApi(page)
    },
    getPayload (page, code) {
      const payload = {
        tab : 'list',
        size : 10,
        page : page - 1,
      }
      let tempPayload = {}
      if(code) {
        tempPayload = {
          ...payload,
          channelCode : code
        }
      }else{
        tempPayload = {
          ...payload
        }
      }
      return tempPayload
    },
  }
}
</script>