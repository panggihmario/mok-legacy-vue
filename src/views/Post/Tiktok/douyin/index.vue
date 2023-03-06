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
      <div class="d-flex" style="gap: 10px">
        <v-select
          v-if="isShowFilter"
          :items="listStatus"
          v-model="filter.status"
          placeholder="Status"
          solo
          dense
          hide-details
          flat
          clearable
          single-line
          class="font-12"
          style="width: 200px"
        ></v-select>
        <v-btn
          v-if="!isShowFilter"
          class="text-capitalize font-12"
          text
          color="secondary"
          @click="isShowFilter = true"
          >Filter Data</v-btn
        >
        <v-btn
          v-if="isShowFilter"
          class="text-capitalize font-12"
          text
          @click="isShowFilter = false"
          >Batalkan</v-btn
        >
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

      <div class="d-flex justify-space-between align-center mt-10">
        <div>
          <span class="font-12">Total Elements : {{ totalElements }}</span>
        </div>
        <v-pagination
          class="d-flex justify-end"
          v-model="page"
          :length="totalPages"
          prev-icon="mdi-menu-left"
          next-icon="mdi-menu-right"
        ></v-pagination>
      </div>
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
      filter: {
        status: "",
      },
      dataTokenDouyin: {},
      listDouyin: [],
      listHistoryDouyin: [],
      listStatus: [
        { value: "NEW", text: "New" },
        { value: "READY_PUBLISH", text: "Ready to Publish" },
        { value: "REJECT", text: "Reject" },
        { value: "FAILED", text: "Failed" },
      ],
      focusIndex: null,
      loadingListDouyin: false,
      isShowFilter: false,
      alertSuccess: true,
      alertFailed: false,
      errorMessage: "",
      isLoadingListDouyin: false,
      page: 1,
      totalPages: 1,
      totalElements: 1,
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
    "filter.status"() {
      this.page = 1;
      this.handleGetDouyinListHistory();
    },
    isShowFilter() {
      if (!this.isShowFilter) {
        this.filter.status = "";
        this.handleGetDouyinListHistory();
      }
    },
    page() {
      this.handleGetDouyinListHistory();
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
      const payload = {
        ...this.filter,
        status: this.filter.status || "",
        page: this.page - 1,
      };
      return this.getListDouyinVideo(payload)
        .then((res) => {
          this.listHistoryDouyin = res.data.data.content;
          this.totalPages = res.data.data.totalPages;
          this.totalElements = res.data.data.totalElements;
          this.isLoadingListDouyin = false;
        })
        .catch((err) => {
          this.alertFailed = true;
          this.errorMessage = err.response.data.message;
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
