<template>
  <div>
    <AdminView 
      v-if="isAdmin"
      @onPagination="onPagination"
      @refreshDataFeed="refreshDataFeed"
    />
    <SelebView 
      v-if="isSeleb"
      @onPagination="onPagination"
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
      role : (state) => state.authentication.role
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
  created() {
    this.handleFetchingData()
  },
  methods : {
    ...mapActions ({
      fetchFeeds : 'post/fetchFeeds'
    }),
    refreshDataFeed() {
      const page = this.$route.params.page
      this.fetchApi(page)
    },
    fetchApi (page) {
      const payload = this.getPayload(page)
      return this.fetchFeeds(payload)
    },
    handleFetchingData () {
      const page = this.$route.params.page
      return this.fetchApi(page)
    },
    onPagination(payload) {
      const params = this.getPayload(payload.page, payload.code)
      return this.fetchFeeds(params)
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