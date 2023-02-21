<template>
  <div>
    <HeaderContent label="Douyin Mirroring" :list="crumbs" />
    <section class="whitesmoke pa-3">
      <div v-if="loadingListDouyin" class="d-flex justify-center">
        <v-progress-circular
          indeterminate
          color="primary"
        ></v-progress-circular>
      </div>
      <div v-else class="d-flex flex-wrap" style="gap: 4px">
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
    };
  },
  watch: {
    dataTokenDouyin() {
      this.handleGetFeedExploreDouyin();
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
  },
};
</script>
