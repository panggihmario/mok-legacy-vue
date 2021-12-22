<template>
  <div>
    <AdminView
      v-if="isAdmin"
    />
    <SelebView  v-if="isSeleb" />
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex"
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
    handleFetchingData () {
      const page = this.$route.params.page
      return this.fetchApi(page)
    },
    fetchApi (page) {
      const payload = {
        tab : 'draft',
        size : 15,
        page : page - 1,
        sort : 'createAt,DESC',
      }
      return this.fetchFeeds(payload)
    }
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
  }
}
</script>