<template>
  <div>
    <AdminView
      @onPagination="onPagination"
    />
  </div>
</template>

<script>
import AdminView from "./adminView/index.vue"
import { mapState, mapActions } from "vuex"
export default {
  components : {
    AdminView
  },
  created() {
    // this.handleFetchingData()
  },
  computed : {
    ...mapState({
      role : (state) => state.authentication.role,
      feeds : (state) => state.post.feeds,
      totalPages : (state) => state.post.totalPages,
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
      fetchFeeds : 'post/fetchFeeds'
    }),
    onPagination(payload) {
      const params = this.getPayload(payload.page, payload.code)
      return this.fetchFeeds(params)
    },
    handleFetchingData () {
      const page = this.$route.params.page
      return this.fetchApi(page)
    },
    fetchApi (page) {
      const payload = this.getPayload(page)
      return this.fetchFeeds(payload)
    },
    getPayload (page, code) {
      const payload = {
        tab : 'reject',
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