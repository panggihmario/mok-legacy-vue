<template>
  <div>
    <CoreDrawer />
    <div class="my-12">
      <v-container :class="viewNews ? 'auto-space-right'  : 'auto-space'">
        <CoreView />
      </v-container>
    </div>
    <!-- <CoreDrawer v-if="viewNews" /> -->
    <DrawerNews  v-if="viewNews" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import DrawerNews from "../components/core/Drawer/news"
export default {
  components : {
    DrawerNews
  },
  data () {
    return {
      view : false
    }
  },
  computed : {
    ...mapState({
      viewNews : 'viewNews'
    })
  }
}
</script>

<style scoped>
.auto-space {
  padding-left: 180px;
}

.auto-space-right {
  padding-right: 300px;
  padding-left: 180px;
}

@media only screen and (min-width: 1024px) {
  .auto-space {
    padding-left: 180px;
  }
}
@media only screen and (min-width: 1440px) {
  .auto-space {
    padding-left: 160px;
  }
}
@media only screen and (min-width: 1600px) {
  .auto-space {
    padding-left: 220px;
  }
}
</style>
