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
import { mapState, mapActions, mapMutations } from "vuex"
import AdminView from "./adminView/index.vue"
import SelebView from "./selebView/index.vue"
export default {
  components : {
    AdminView,
    SelebView
  },
  created () {
    this.setSortBy(null)
  },
  methods : {
    ...mapActions ({
      fetchFeeds : 'post/fetchFeeds',
      searchFeed : 'post/searchFeed'
    }),
    ...mapMutations({
      setFeeds : 'post/setFeeds',
      setSortBy : 'post/setSortBy'
    }),
    handleFetchingData () {
      const page = this.$route.params.page
      return this.fetchApi(page)
    },
    refreshDataFeed() {
      this.$emit('refreshDataFeed')
    },
    getPayload (page, code) {
      const payload = {
        tab : 'draft',
        size : 10,
        page : page - 1,
        sort : 'createAt,DESC',
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
    fetchApi (page, code) {
      const payload = this.getPayload(page, code)
      return this.fetchFeeds(payload)
    }
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
  }
}
</script>