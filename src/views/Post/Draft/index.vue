<template>
  <div>
    <AdminView
      v-if="isAdmin"
    />
    <SelebView  v-if="isSeleb" />
  </div>
</template>

<script>
import { mapState } from "vuex"
import AdminView from "./adminView/index.vue"
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
  }
}
</script>