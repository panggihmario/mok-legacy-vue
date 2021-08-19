<template>
  <div>
    <CoreDrawer />
    <div class="my-12">
      <v-container :class="styling">
        <CoreView />
      </v-container>
    </div>
    <DrawerNews  v-if="viewNews && page === 'news' " />
    <DrawerDetail v-if="detail && page === 'product' "/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import DrawerNews from "../../components/core/Drawer/news"
import DrawerDetail from "../Product/drawer"
export default {
  components : {
    DrawerNews,
    DrawerDetail
  },
  mounted() {
    this.page = this.$route.meta.page
  },
  data () {
    return {
      view : false,
      page : ''
    }
  },
  computed : {
    ...mapState({
      viewNews : 'viewNews',
      detail: (state) => state.product.detail,
    }),
    styling () {
      if(this.viewNews && this.page === 'news') {
        return 'auto-space-right'
      }else if( this.detail && this.page === 'product' ) {
        return 'auto-space-right'
      }
      else{
        return 'auto-space'
      }
    }
  },
  watch : {
    '$route' : function () {
      const positionMeta = this.$route.meta.page
      this.page = positionMeta
    }
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
