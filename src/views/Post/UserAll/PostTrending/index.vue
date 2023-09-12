<template>
  <div>
    <div>
      <Table-List
        :tableHeaders="tableHeaders"
        :tableItems="tableItems"
        :loadingList="loadingList"
        @openDialogPost="openDialogPost"
        @openDialogPushNotif="openDialogPushNotif"
        @openDialogPriority="openDialogPriority"
      ></Table-List>
    </div>

    <div class="row no-gutters mt-4 font-12">
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
        class="col d-flex justify-end"
        prev-icon="mdi-menu-left"
        next-icon="mdi-menu-right"
        @input="changePage"
      ></v-pagination>
    </div>

    <DialogPriority
      @closeDialogPriority="closeDialogPriority"
      @handlePriority="handlePriority"
      :dialogPriority="dialogPriority"
    />
    <DialogPushNotif
      :dialogPushNotif="dialogPushNotif"
      @closeDialogPushNotif="closeDialogPushNotif"
      @actionPushNotif="actionPushNotif"
    />

    <DialogPost
      :dialogPost="dialogPost"
      :loadingDetail="loadingDetail"
      :tableItemsDialog="tableItemsDialog"
      :dialogPostMediasIdx="dialogPostMediasIdx"
      @closeDialog="(v) => (dialogPost = v)"
      @priority="(v) => (priority = v)"
      @changeDialogPostData="changeDialogPostData"
      @changeDialogPostImg="changeDialogPostImg"
    ></DialogPost>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import moment from "moment";
import TableList from "./table.vue";
import DialogPost from "./dialogPost.vue";
import dialogPriority from "./dialogPriority.vue";
import dialogPushNotif from "./dialogPushNotif.vue";

export default {
  components: {
    TableList,
    DialogPost,
    DialogPriority: dialogPriority,
    DialogPushNotif: dialogPushNotif,
  },
  props: ["tableItems", "loadingList", "totalPages", "totalElements"],
  data() {
    return {
      tableHeaders: [
        { text: "Media", class: "whitesnow" },
        { text: "Caption", class: "whitesnow" },
        { text: "Channel", class: "whitesnow" },
        { text: "User", class: "whitesnow" },
        { text: "Di Trendingkan Oleh", class: "whitesnow" },
        { text: "Trending Berakhir", class: "whitesnow" },
        { text: "", class: "whitesnow" },
        { text: "Action", class: "whitesnow", align: "center" },
      ],
      // tableItems: [],
      tableItemsDialog: {
        medias: [],
      },
      // loadingList: false,
      loadingDetail: false,
      loadingPriority: false,
      dialogPriority: false,
      loadingMakeTrending: false,
      dialogPost: false,
      dialogPostDataIdx: 0,
      dialogPostMediasIdx: 0,
      dialogPushNotif: false,
      dialogPushNotifId: "",
      page: 1,
      idPost: "",
      // totalPages: 0,
    };
  },
  watch: {
    "$route.params.page"() {
      this.getRoute();
    },
    dialogPost() {
      // this.stopVideo();
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
      fetchPostAllUserTrendingDetailById:
        "post/fetchPostAllUserTrendingDetailById",
      postPriority: "post/postPriority",
    }),
    openDialogPriority(id) {
      this.dialogPriority = true;
      this.idPost = id;
    },
    closeDialogPriority(value) {
      this.dialogPriority = value;
      this.idPost = "";
    },
    handlePriority() {
      return this.postPriority(this.idPost)
        .then(() => {
          this.loadingPriority = false;
          this.closeDialogPriority(false);
          this.$emit("refreshPriority");
        })
        .catch((err) => {
          this.loadingPriority = false;
        });
    },
    getRoute() {
      this.page = parseInt(this.$route.params.page);
    },
    handleGetUserPostDetail(id) {
      const payload = {
        id: id,
      };
      this.loadingDetail = true;
      return this.fetchPostAllUserTrendingDetailById(payload)
        .then((response) => {
          this.loadingDetail = false;
          this.tableItemsDialog = response.data.data;
        })
        .catch((err) => {
          this.loadingDetail = false;
        });
    },
    actionPushNotif() {
      this.$emit("actionPushNotif", this.dialogPushNotifId);
      this.closeDialogPushNotif(false);
    },
    openDialogPushNotif(id) {
      this.dialogPushNotif = true;
      this.dialogPushNotifId = id;
    },
    closeDialogPushNotif(value) {
      this.dialogPushNotif = value;
      this.dialogPushNotifId = "";
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
.flex-actions {
  display: flex;
  gap: 5px;
  align-items: center;
  cursor: pointer;
  & .isPriority {
    cursor: default;
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
  font-size: 10px;
}
.font-12 {
  font-size: 12px;
}
</style>

<style lang="scss" src="./style.scss" scoped></style>