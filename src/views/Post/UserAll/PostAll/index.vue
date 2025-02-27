<template>
  <div>
    <div>
      <Table-List
        :tableHeaders="tableHeaders"
        :tableItems="tableItems"
        :loadingList="loadingList"
        @openDialogPost="openDialogPost"
        @openDialogPushNotif="openDialogPushNotif"
        @openDialogDelete="openDialogDelete"
        @actionPostFeedAsTrendingById="openDialogTrending"
      ></Table-List>
    </div>

    <div class="d-flex justify-end align-center mt-4 font-12">
      <div class="col d-flex align-center pl-4">
        <span class="silver--text"
          >Total Post :
          <span class="black--text">{{ totalElements }}</span>
        </span>
      </div>
      <v-pagination
        v-model="page"
        :length="totalPages"
        total-visible="7"
        prev-icon="mdi-menu-left"
        next-icon="mdi-menu-right"
        @input="changePage"
      ></v-pagination>
    </div>

    <div>
      <DialogPost
        :dialogPost="dialogPost"
        :loadingDetail="loadingDetail"
        :tableItemsDialog="{
          ...tableItemsDialog,
          channel: tableItems[dialogPostDataIdx]
            ? tableItems[dialogPostDataIdx].channel
            : null,
        }"
        :dialogPostMediasIdx="dialogPostMediasIdx"
        @closeDialog="(v) => (dialogPost = v)"
        @priority="(v) => (priority = v)"
        @getEpoch="getEpoch"
        @changeDialogPostData="changeDialogPostData"
        @changeDialogPostImg="changeDialogPostImg"
        @actionPostFeedAsTrendingById="actionPostFeedAsTrendingById"
        @openDialogTrending="openDialogTrending"
        @openDialogPushNotif="openDialogPushNotif"
        @updatePriority="updatePriority"
      ></DialogPost>
    </div>

    <DialogDelete
      :dialogDelete="dialogDelete"
      @closeDialogDelete="closeDialogDelete"
      @handleDelete="handleDelete"
    />

    <DialogPushNotif
      :dialogPushNotif="dialogPushNotif"
      @closeDialogPushNotif="closeDialogPushNotif"
      @actionPushNotif="actionPushNotif"
    />

    <DialogTrending
      :dialog="dialogTrending"
      :loading="loadingMakeTrending"
      @getEpoch="(v) => (dialogTrendingExpired = v)"
      @closeDialog="dialogTrending = false"
      @actionSubmit="actionPostFeedAsTrendingById"
    />

    <v-snackbar
      :timeout="3000"
      top
      right
      v-model="alertSuccess"
      color="success"
    >
      Jadikan Trending Success
    </v-snackbar>

    <v-snackbar
      :timeout="3000"
      top
      right
      v-model="alertSuccessUpdateLeveling"
      color="success"
    >
      Success Update
    </v-snackbar>

    <v-snackbar
      :timeout="3000"
      top
      outlined
      v-model="alertFailedUpdateLeveling"
      color="warning"
    >
      {{ alertFailedUpdateLevelingMessage }}
    </v-snackbar>

    <v-snackbar
      v-model="alertError"
      :timeout="3000"
      outlined
      top
      color="warning"
    >
      <div v-if="errorObject">
        <div v-if="errorObject.response">
          <div>{{ errorObject.response.data.message }}</div>
          <div>{{ errorObject.response.data.data }}</div>
        </div>
        <div v-else>{{ errorObject }}</div>
      </div>
    </v-snackbar>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import moment from "moment";
import TableList from "./table.vue";
import DialogPost from "./dialogPostAll.vue";
import DialogDelete from "./dialogDelete.vue";
import DatePicker from "./datePicker.vue";
import dialogPushNotifVue from "./dialogPushNotif.vue";
import DialogTrending from "./dialogTrending.vue";

export default {
  props: ["tableItems", "loadingList", "totalPages", "totalElements"],
  components: {
    TableList,
    DialogPost,
    DialogDelete,
    DatePicker,
    DialogPushNotif: dialogPushNotifVue,
    DialogTrending,
  },
  data() {
    return {
      tableHeaders: [
        { text: "Media", class: "whitesnow" },
        { text: "Caption", class: "whitesnow" },
        { text: "Channel", class: "whitesnow" },
        { text: "User", class: "whitesnow" },
        { text: "", class: "whitesnow" },
        { text: "Dipublish Pada", class: "whitesnow" },
        { text: "Level Konten", class: "whitesnow" },
        { text: "Expired Tayang", class: "whitesnow" },
        { text: "Action", class: "whitesnow", align: "center" },
      ],
      tableItemsDialog: {
        medias: [],
      },
      errorObject: null,
      loadingDetail: false,
      dialogPost: false,
      dialogPostDataIdx: 0,
      dialogPostMediasIdx: 0,
      page: 1,
      dialogPushNotif: false,
      dialogPushNotifId: "",
      dialogTrending: false,
      dialogTrendingId: "",
      dialogTrendingIdx: null,
      dialogTrendingExpired: null,
      alertSuccess: false,
      alertError: false,
      dialogDelete: false,
      idPost: "",
      epochExpiredTrending: "",
      priority: false,
      alertSuccessUpdateLeveling: false,
      alertFailedUpdateLeveling: false,
      alertFailedUpdateLevelingMessage: "",
    };
  },
  watch: {
    "$route.params.page"() {
      this.getRoute();
    },
    dialogPost() {
      // this.stopVideo();
    },
    dialogTrending() {
      if (!this.dialogTrending) {
        this.dialogTrendingId = "";
        this.dialogTrendingIdx = null;
        this.dialogTrendingExpired = null;
      }
    },
    dialogPostDataIdx() {
      // this.stopVideo();
      this.dialogPostMediasIdx = 0;
      if (this.dialogPostDataIdx < 0) {
        this.dialogPostDataIdx = this.tableItems.length - 1;
      } else if (this.dialogPostDataIdx > this.tableItems.length - 1) {
        this.dialogPostDataIdx = 0;
      } else {
        let id = this.tableItems[this.dialogPostDataIdx].id;
        this.handleGetUserPostDetail(id);
      }
    },
  },
  mounted() {
    this.getRoute();
  },
  methods: {
    ...mapActions({
      fetchPostAllUserDetailById: "post/fetchPostAllUserDetailById",
      postFeedAsTrendingById: "post/postFeedAsTrendingById",
      updatePriorityCandidates: "post/updatePriorityCandidates",
      deleteFeed: "account/deleteFeed",
    }),
    getEpoch(value) {
      this.epochExpiredTrending = value;
    },
    handleDelete() {
      const idPost = this.idPost;
      return this.deleteFeed(idPost)
        .then(() => {
          this.idPost = "";
          this.dialogDelete = false;
          this.$emit("resetData");
        })
        .catch(() => {
          this.idPost = "";
        });
    },
    openDialogDelete(id) {
      this.idPost = id;
      this.dialogDelete = true;
    },
    closeDialogDelete(value) {
      this.dialogDelete = value;
      this.epochExpiredTrending = "";
    },
    openDialogTrending(v) {
      this.dialogTrendingId = v.id;
      this.dialogTrendingIdx = v.idx;
      this.dialogTrending = true;
    },
    getRoute() {
      this.page = parseInt(this.$route.params.page);
    },
    handleGetUserPostDetail(id) {
      const payload = {
        id: id,
      };
      this.loadingDetail = true;
      return this.fetchPostAllUserDetailById(payload)
        .then((response) => {
          this.loadingDetail = false;
          this.tableItemsDialog = {
            id,
            ...response.data.data,
          };
        })
        .catch((err) => {
          this.loadingDetail = false;
        });
    },
    actionPostFeedAsTrendingById() {
      const dateExpUnix = moment().add(72, "hours").unix();
      const formattedUTC = moment(this.dialogTrendingExpired).unix();
      const payload = {
        id: this.dialogTrendingId,
        isPriority: this.priority,
        typePost: "social",
        trendingExpiredAt: !this.dialogTrendingExpired
          ? Number(`${dateExpUnix}000`)
          : formattedUTC && formattedUTC.toString().length < 13
          ? Number(`${formattedUTC}000`)
          : formattedUTC,
      };
      this.loadingMakeTrending = true;
      return this.postFeedAsTrendingById(payload)
        .then((response) => {
          this.$emit("successPostTrending");
          this.loadingMakeTrending = false;
          this.dialogPost = false;
          this.dialogTrending = false;
          this.alertSuccess = true;
        })
        .catch((err) => {
          this.$emit("errorPostTrending", err);
          this.loadingMakeTrending = false;
          this.alertError = true;
          this.errorObject = err;
        });
    },
    actionPushNotif() {
      this.$emit("actionPushNotif", this.dialogPushNotifId);
      this.closeDialogPushNotif();
    },
    formatingDate(rawDate) {
      const cek = moment(rawDate).format("DD/MM/YYYY HH:mm");
      return cek;
    },
    openDialogPost(v) {
      this.dialogPost = true;
      this.dialogPostDataIdx = v.idx;
      this.handleGetUserPostDetail(v.id);
    },
    changeDialogPostImg(v) {
      this.dialogPostMediasIdx += v;
    },
    changeDialogPostData(v) {
      this.dialogPostDataIdx += v;
    },
    changePage() {
      this.$emit("onChangePage", this.page);
    },
    openDialogPushNotif(id) {
      this.dialogPushNotif = true;
      this.dialogPushNotifId = id;
    },
    closeDialogPushNotif() {
      this.dialogPushNotif = false;
      this.dialogPushNotifId = "";
    },
    updatePriority(payload) {
      return this.updatePriorityCandidates(payload)
        .then((res) => {
          this.alertSuccessUpdateLeveling = true;
          this.dialogPost = false;
          this.$emit("updatePriority");
        })
        .catch((err) => {
          const d = moment().format("DD-MM-YYYY HH:mm:ss");
          this.alertFailedUpdateLeveling = true;
          this.alertFailedUpdateLevelingMessage =
            err.response.data.code == "4000"
              ? // ? `Hanya bisa memilih tanggal dan waktu setelah ${d}`
                `Harap isi level konten antara 1 hingga 10`
              : err.response.data.message;
        });
    },
    // stopVideo() {
    //   const slide = this.dialogPostMediasIdx;
    //   const medias = this.tableItemsDialog.medias;
    //   let idVideo;
    //   medias.forEach((m, idx) => {
    //     if (m.type === "video") {
    //       if (idx === slide) {
    //         idVideo = document.getElementById(`videodialog-${slide}-${m.id}`);
    //       }
    //     }
    //   });
    //   if (idVideo) {
    //     idVideo.load();
    //   }
    // },
  },
};
</script>

<style lang="scss" scoped>
.post-actions {
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: flex-end;

  &__label {
    font-size: 12px;
    font-weight: 500;
    color: $black;
  }
}

.show-post {
  color: $secondary;
  text-decoration: underline;
  cursor: pointer;
}

.nav {
  &__btn-left {
    position: absolute;
    z-index: 1;
    top: 50%;
    left: 10em;
    background: rgba($color: #000000, $alpha: 0.5);
  }

  &__btn-right {
    position: absolute;
    z-index: 1;
    top: 50%;
    right: 10em;
    background: rgba($color: #000000, $alpha: 0.5);
  }
}

.img {
  max-width: 100%;
  max-height: 100%;
}

.vid {
  width: 100% !important;
  height: 100% !important;
  object-fit: contain;
}

.font-10 {
  font-size: 10px !important;
}

.font-12 {
  font-size: 12px !important;
}

.font-14 {
  font-size: 14px !important;
}
</style>
