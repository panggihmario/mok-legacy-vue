<template>
  <div>
    <AdminView
      v-if="isAdmin"
      @refreshDataFeed="refreshDataFeed"
      @onPagination="onPagination"
    />
    <SelebView 
      
      v-if="isSeleb"
      @onPagination="onPagination"
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
  created() {
    this.handleFetchingData()
  },
  methods : {
    ...mapActions ({
      fetchFeeds : 'post/fetchFeeds'
    }),
    ...mapMutations({
      setFeeds : 'post/setFeeds'
    }),
    handleFetchingData () {
      const page = this.$route.params.page
      return this.fetchApi(page)
    },
    refreshDataFeed() {
      const page = this.$route.params.page
      this.fetchApi(page)
    },
    onPagination(payload) {
      const params = this.getPayload(payload.page, payload.code)
      return this.fetchFeeds(params)
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
    fetchApi (page) {
      const payload = this.getPayload(page)
      return this.fetchFeeds(payload)
    }
  },
  computed : {
    ...mapState({
      role : (state) => state.authentication.role,
      feeds : (state) => state.post.feeds,
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