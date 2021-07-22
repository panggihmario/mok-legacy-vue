<template>
  <div>
    <CoreDrawer />
      <v-main>
        <v-container class="mt-8 pr-12">
        <CoreView />
        </v-container>
      </v-main>
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