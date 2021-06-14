<template>
  <v-navigation-drawer  floating color="whitesnow"  app width="500" permanent right>
    <v-btn @click="closeDrawer" > Close</v-btn>
  </v-navigation-drawer>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  methods : {
    ...mapMutations({
      setDetailView : "product/setDetailView"
    }),
    closeDrawer () {
      return this.setDetailView(false)
    }
  }
}
</script>