<template>
  <div>
    <HeaderContent label="Douyin Mirroring" :list="crumbs">
      <v-btn @click="movePage('createListDouyin')">Tambah Konten</v-btn>
    </HeaderContent>

    <section
      class="d-flex justify-space-between align-center whitesnow px-4 py-3 mb-2"
    >
      <div class="d-flex" style="gap: 4px">
        <v-chip
          class="font-10 font-weight-medium cursor-pointer px-4"
          :color="tab == 'list' ? 'primary' : ''"
          @click="tab = 'list'"
          >List Konten</v-chip
        >
        <v-chip
          class="font-10 font-weight-medium cursor-pointer px-4"
          :color="tab == 'fyp' ? 'primary' : ''"
          @click="tab = 'fyp'"
          >FYP</v-chip
        >
      </div>
      <div>
        <v-btn class="text-capitalize font-12" text>Filter Data</v-btn>
      </div>
    </section>

    <section v-if="tab == 'list'">
      <div v-if="isLoadingListDouyin" class="d-flex justify-center py-12">
        <v-progress-circular
          indeterminate
          color="primary"
        ></v-progress-circular>
      </div>
      <ListHistoryDouyin
        v-else
        :listHistoryDouyin="listHistoryDouyin"
      ></ListHistoryDouyin>
    </section>
    <section v-else-if="tab == 'fyp'">
      <section v-if="loadingListDouyin" class="d-flex justify-center">
        <v-progress-circular
          indeterminate
          color="primary"
        ></v-progress-circular>
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
    </section>

    <v-snackbar
      v-model="previewTiktokSuccess"
      top
      right
      timeout="3000"
      color="success"
    >
      <div class="d-flex justify-space-between align-center">
        <span>Success Post</span>
        <v-btn outlined text @click="movePageDraft">See Draft</v-btn>
      </div>
    </v-snackbar>
    <v-snackbar v-model="alertFailed" top right timeout="3000" color="error">
      <div class="d-flex flex-column">
        <span>{{ errorMessage }}</span>
      </div>
    </v-snackbar>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
import HeaderContent from "@/containers/HeaderContent";
import ListCard from "./card.vue";
import ListHistoryDouyin from "./historyDouyin.vue";

export default {
  components: {
    ListCard,
    HeaderContent,
    ListHistoryDouyin,
  },
  data() {
    return {
      crumbs: [
        {
          text: "Douyin Mirroring",
        },
      ],
      tab: "list",
      dataTokenDouyin: {},
      listDouyin: [],
      listHistoryDouyin: [],
      focusIndex: null,
      loadingListDouyin: false,
      alertSuccess: true,
      alertFailed: false,
      errorMessage: "",
      isLoadingListDouyin: false,
    };
  },
  watch: {
    tab() {
      if (this.tab == "fyp") {
        this.handleGetUserDetailDouyin();
      } else {
        this.handleGetDouyinListHistory();
      }
    },
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
    // this.handleGetUserDetailDouyin();
    this.changeStatusPreviewTiktok(false);
    this.checkMountedData();
  },
  methods: {
    ...mapActions({
      changeStatusPreviewTiktok: "changeStatusPreviewTiktok",
      getUserDetailDouyin: "tiktok/getUserDetailDouyin",
      getFeedExploreDouyin: "tiktok/getFeedExploreDouyin",
      getListDouyinVideo: "tiktok/getListDouyinVideo",
    }),
    ...mapMutations({
      setPreviewTiktokData: "tiktok/setPreviewTiktokData",
    }),
    checkMountedData() {
      if (this.tab == "fyp") {
        this.handleGetUserDetailDouyin();
      } else {
        this.handleGetDouyinListHistory();
      }
    },
    handleGetUserDetailDouyin() {
      this.loadingListDouyin = true;
      return this.getUserDetailDouyin()
        .then((res) => {
          this.dataTokenDouyin = res.data;
        })
        .catch((err) => {
          this.alertFailed = true;
          this.errorMessage = err.response.data.message;
        });
    },
    handleGetFeedExploreDouyin() {
      this.loadingListDouyin = true;
      return this.getFeedExploreDouyin(this.dataTokenDouyin)
        .then((res) => {
          this.loadingListDouyin = false;
          this.listDouyin = res.data.list;

          if (res.data.error_code) {
            this.alertFailed = true;
            this.errorMessage = res.data.description;
          }
        })
        .catch((err) => {
          this.loadingListDouyin = false;
          this.alertFailed = true;
          this.errorMessage = err.response.data.message;
        });
    },
    handleGetDouyinListHistory() {
      this.isLoadingListDouyin = true;
      return this.getListDouyinVideo()
        .then((res) => {
          console.log({ res });
          this.isLoadingListDouyin = false;
          this.listHistoryDouyin = res.data.data.content;
        })
        .catch((err) => {
          console.log({ err });
          this.isLoadingListDouyin = false;
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
    movePage(val) {
      this.$router.push({ name: val });
    },
  },
};
</script>
