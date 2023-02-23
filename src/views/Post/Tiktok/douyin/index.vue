<template>
  <div>
    <HeaderContent label="Douyin Mirroring" :list="crumbs" />

    <section v-if="loadingListDouyin" class="d-flex justify-center">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </section>
    <section v-else class="whitesmoke pa-3">
      <div class="d-flex flex-wrap" style="gap: 4px">
        <div
          v-for="(item, idx) in listDouyin"
          :key="idx"
          :style="
            focusIndex != null ? (focusIndex == idx ? '' : 'opacity: .6') : ''
          "
        >
          <List-Card
            :index="idx"
            :data="item"
            @openDrawerPreview="openDrawerPreview"
          ></List-Card>
        </div>
      </div>
    </section>

    <v-snackbar v-model="previewTiktokSuccess" top right timeout="3000" color="success">
      <div class="d-flex justify-space-between align-center">
        <span>Success Post</span>
        <v-btn outlined text @click="movePageDraft">See Draft</v-btn>
      </div>
    </v-snackbar>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
import HeaderContent from "@/containers/HeaderContent";
import ListCard from "./card.vue";

export default {
  components: {
    ListCard,
    HeaderContent,
  },
  data() {
    return {
      crumbs: [
        {
          text: "Douyin Mirroring",
        },
      ],
      dataTokenDouyin: {},
      listDouyin: [],
      focusIndex: null,
      loadingListDouyin: false,
      alertSuccess: true,
      alertFailed: false,
      errorMessage: "",
    };
  },
  watch: {
    dataTokenDouyin() {
      this.handleGetFeedExploreDouyin();
    },
    previewTiktok() {
      if (this.previewTiktok == false) {
        this.focusIndex = null;
        this.setPreviewTiktokData({});
      }
    },
    previewTiktokSuccess() {
      if (this.previewTiktokSuccess == true) {
        this.alertSuccess = true;
      }
    },
  },
  computed: {
    ...mapState({
      previewTiktok: "previewTiktok",
      previewTiktokSuccess: "previewTiktokSuccess",
    }),
  },
  mounted() {
    this.handleGetUserDetailDouyin();
    this.changeStatusPreviewTiktok(false);
  },
  methods: {
    ...mapActions({
      changeStatusPreviewTiktok: "changeStatusPreviewTiktok",
      getUserDetailDouyin: "tiktok/getUserDetailDouyin",
      getFeedExploreDouyin: "tiktok/getFeedExploreDouyin",
    }),
    ...mapMutations({
      setPreviewTiktokData: "tiktok/setPreviewTiktokData",
    }),
    handleGetUserDetailDouyin() {
      this.loadingListDouyin = true;
      return this.getUserDetailDouyin()
        .then((res) => {
          this.dataTokenDouyin = res.data;
        })
        .catch((err) => {
          console.log({ err });
        });
    },
    handleGetFeedExploreDouyin() {
      this.loadingListDouyin = true;
      return this.getFeedExploreDouyin(this.dataTokenDouyin)
        .then((res) => {
          this.loadingListDouyin = false;
          this.listDouyin = res.data.list;
        })
        .catch((err) => {
          this.loadingListDouyin = false;
          console.log({ err });
        });
    },
    openDrawerPreview(d) {
      if (this.focusIndex == d.index) {
        this.focusIndex = null;
        this.changeStatusPreviewTiktok(false);
        this.setPreviewTiktokData({});
      } else {
        this.focusIndex = d.index;
        this.changeStatusPreviewTiktok(true);
        this.setPreviewTiktokData(d.item);
      }
    },
    movePageDraft() {
      this.$router.push({
        name: "draft",
        params: {
          page: 1,
        },
      });
    },
  },
};
</script>
