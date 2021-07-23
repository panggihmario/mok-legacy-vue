<template>
  <div>
    <CoreDrawer />
      <div class="my-12">
        <v-container :class="detail ? 'auto-space-right'  : 'auto-space'">
        <CoreView />
        </v-container>
      </div>
    <DrawerDetail v-if="detail"/>
  </div>
</template>

<script>
import DrawerDetail from "./drawer"
import { mapState } from "vuex"
export default {
  components : {
    DrawerDetail
  },
  computed : {
    ...mapState({
      detail: (state) => state.product.detail,
    }),
  }
}
</script>

<style lang="sass" scoped>
.auto-space
  padding-left: 180px
.auto-space-right
  padding-left: 180px
  padding-right: 400px
</style>