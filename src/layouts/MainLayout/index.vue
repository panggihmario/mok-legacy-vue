<template>
  <div>
    <CoreDrawer
      @closeDrawer="closeDrawer"
      :mini="mini"
      @setDrawer="setDrawer"
    />
    <div class="my-6" >
      <div @click="closeDrawer" :class="styling">
        <CoreView />
      </div>
    </div>
    <DrawerNews v-if="viewNews && page === 'news'" />
    <DrawerDetail v-if="detail && page === 'product'" />
    <Preview-Tiktok-Data
      v-if="previewTiktok && page === 'postTiktok'"
    ></Preview-Tiktok-Data>
    <Preview-Douyin-Data
      v-if="previewTiktok && page === 'postDouyin'"
    ></Preview-Douyin-Data>
    <Preview-Instagram-Data
      v-if="previewTiktok && page === 'postInstagram'"
    ></Preview-Instagram-Data>
    <Preview-List-Badge
      v-if="page === 'badge create'"
    ></Preview-List-Badge>
  </div>
</template>

<script>
import { mapState } from "vuex";
import DrawerNews from "../../components/core/Drawer/news";
import DrawerDetail from "../Product/drawer";
import PreviewTiktokData from "../../views/Post/Tiktok/previewTiktokData.vue";
import PreviewDouyinData from "../../views/Post/Tiktok/douyin/preview.vue";
import PreviewInstagramData from "../../views/Post/Instagram/preview/index.vue";
import PreviewListBadge from "../../views/Master/Badge/create/listBadge.vue";

export default {
  components: {
    DrawerNews,
    DrawerDetail,
    PreviewTiktokData,
    PreviewDouyinData,
    PreviewInstagramData,
    PreviewListBadge,
  },
  mounted() {
    this.page = this.$route.meta.page;
  },
  data() {
    return {
      view: false,
      page: "",
      mini : true,
    };
  },
  computed: {
    ...mapState({
      viewNews: "viewNews",
      previewTiktok: "previewTiktok",
      detail: (state) => state.product.detail,
    }),
    styling() {
      if (this.viewNews && this.page === "news") {
        return "auto-space-right";
      } else if (this.detail && this.page === "product") {
        return "auto-space-right";
      } else if (this.previewTiktok && this.page === "postTiktok") {
        return "auto-space-right-tiktok";
      } else if (this.previewTiktok && this.page === "postDouyin") {
        return "auto-space-right-tiktok";
      } else if (this.previewTiktok && this.page === "postInstagram") {
        return "auto-space-right-tiktok";
      } else {
        return "auto-space";
      }
    },
  },
  watch: {
    $route: function () {
      const positionMeta = this.$route.meta.page;
      this.page = positionMeta;
    },
  },
  methods : {
    closeDrawer () {
      this.mini = true
    },
    setDrawer (value) {
      this.mini = value
    }
  }
};
</script>

<style scoped>
.auto-space {
  padding-left: 180px;
}

.auto-space-right {
  padding-right: 420px;
  padding-left: 250px;
}

.auto-space-right-tiktok {
  padding-right: 350px;
  padding-left: 250px;
}

@media only screen and (min-width: 1024px) {
  .auto-space {
    padding-left: 70px;
    padding-right: 16px;
  }
}
@media only screen and (min-width: 1440px) {
  .auto-space {
    padding-left: 70px;
    padding-right: 16px;
  }
}
@media only screen and (min-width: 1600px) {
  .auto-space {
    padding-left: 280px;
    padding-right: 60px;
  }
}
</style>
