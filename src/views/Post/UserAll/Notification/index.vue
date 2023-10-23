<template>
  <div>
    <div>
      <v-data-table
        :headers="tableHeaders"
        :items="tableItems"
        :loading="loadingList"
        disable-filtering
        disable-sort
        disable-pagination
        hide-default-footer
      >
        <template v-slot:body="{ items }">
          <tbody>
            <tr v-for="(item, idx) in items" :key="idx">
              <td class="font-12">
                <span
                  class="show-post"
                  @click="openDialogPost(item.feedId, idx)"
                  >Lihat Post</span
                >
              </td>
              <td class="font-12">
                <div class="text-truncate" style="width: 200px">
                  {{ item.description }}
                </div>
              </td>
              <td class="font-12">{{ item.channelName }}</td>
              <td class="font-12">{{ item.postBy }}</td>
              <td class="font-12">{{ item.createBy }}</td>
              <td class="font-12">{{ formatingDate(item.createAt) }}</td>
            </tr>
          </tbody>
        </template>
      </v-data-table>
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

    <v-dialog v-model="dialogPost" width="711">
      <v-btn
        rounded
        icon
        x-large
        elevation="2"
        color="white"
        class="nav__btn-left mx-2"
        @click="changeDialogPostData(-1)"
      >
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      <v-card style="padding: 12px">
        <div
          v-if="!loadingDetail && tableItemsDialog.createAt"
          class="d-flex align-center"
        >
          <div style="width: 100%">
            <div class="d-flex">
              <div style="margin-right: 12px">
                <div
                  class="black"
                  style="
                    width: 307px;
                    height: 665px;
                    border-radius: 8px;
                    overflow: hidden;
                  "
                >
                  <video-player
                    v-if="
                      dialogPost &&
                      tableItemsDialog.post.medias[dialogPostMediasIdx].type ==
                        'video'
                    "
                    :id="`videodialog-${dialogPostMediasIdx}-${tableItemsDialog.post.medias[dialogPostMediasIdx].id}`"
                    :style="{ objectFit: isContain }"
                    class="vjs-custom-skin video-player"
                    ref="videoPlayer"
                    :options="optionsVideo"
                    style="height: 100%; width: 100%"
                  >
                  </video-player>
                  <v-img
                    v-else
                    :src="tableItemsDialog.post.medias[dialogPostMediasIdx].url"
                    alt=""
                    contain
                    width="100%"
                    height="100%"
                  />
                </div>
              </div>

              <div class="font-12" style="width: 360px; margin-top: 12px">
                <div>
                  <span class="font-10">User</span>
                  <p>@{{ tableItemsDialog.account.username }}</p>
                </div>
                <div
                  class="whitesnow mt-4 pa-2"
                  style="height: 300px; overflow: auto"
                >
                  {{ tableItemsDialog.post.description }}
                </div>
              </div>
            </div>

            <div
              v-if="tableItemsDialog.post.medias.length > 1"
              class="d-flex align-center"
              style="margin-top: 12px"
            >
              <div class="d-flex" style="gap: 8px">
                <v-btn
                  icon
                  tile
                  class="nav__btn-img"
                  @click="changeDialogPostImg(-1)"
                  :disabled="dialogPostMediasIdx == 0"
                >
                  <v-icon>mdi-chevron-left</v-icon>
                </v-btn>
                <v-btn
                  icon
                  tile
                  class="nav__btn-img"
                  @click="changeDialogPostImg(1)"
                  :disabled="
                    dialogPostMediasIdx ==
                    tableItemsDialog.post.medias.length - 1
                  "
                >
                  <v-icon>mdi-chevron-right</v-icon>
                </v-btn>
              </div>
              <!-- <div
                class="primarylowtint ml-2 px-2"
                style="height: 24px; border-radius: 4px"
              >
                <span class="font-12"
                  >Postingan tampil menjadi trending dalam waktu
                  {{ tableItemsDialog.trendingExpired }} jam setelah status
                  postingan berubah menjadi trending!</span
                >
              </div> -->
            </div>
          </div>
        </div>
        <div
          v-else
          class="d-flex justify-center align-center"
          style="height: 556px"
        >
          <v-progress-circular
            indeterminate
            color="primary"
          ></v-progress-circular>
        </div>
      </v-card>
      <v-btn
        rounded
        icon
        x-large
        elevation="2"
        color="white"
        class="nav__btn-right mx-2"
        @click="changeDialogPostData(1)"
      >
        <v-icon>mdi-chevron-right</v-icon>
      </v-btn>
    </v-dialog>

    <v-dialog v-model="dialogPushNotif" width="410">
      <v-card>
        <div class="d-flex no-gutters">
          <div class="text-end pt-6" style="width: 40px">
            <v-icon color="secondary" size="20">mdi-alert-circle</v-icon>
          </div>
          <div class="font-12 pt-6 px-4" style="width: 340px">
            <span class="font-14 black--text"
              >Apakah kamu yakin ingin melakukan push notif untuk konten
              ini?</span
            >
            <p class="mt-2 pr-4 grey--text">
              Postingan ini akan disebarkan ke seluruh user kipaskipas dalam
              bentuk notifikasi, hati-hati untuk tidak terlalu sering melakukan
              ini karena akan sangat mengganggu user nantinya.
            </p>
            <div class="d-flex justify-space-between mb-6">
              <v-btn
                x-small
                height="29"
                width="146"
                depressed
                class="text-capitalize"
                style="border-radius: 8px"
                @click="closeDialogPushNotif"
                >Batalkan Push Notif</v-btn
              >
              <v-btn
                x-small
                height="29"
                width="150"
                depressed
                class="text-capitalize"
                color="secondary"
                style="border-radius: 8px"
                @click="actionPushNotif"
                >Push Notif Sekarang</v-btn
              >
            </div>
          </div>
          <div class="d-flex justify-end" style="width: 30px">
            <v-btn rounded icon>
              <v-icon size="18" @click="closeDialogPushNotif">mdi-close</v-icon>
            </v-btn>
          </div>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import moment from "moment";
import VideoPlayer from "../video.vue";

export default {
  // components: {
  //   VideoPlayer,
  // },
  props: ["tableItems", "loadingList", "totalPages", "totalElements"],
  data() {
    return {
      tableHeaders: [
        { text: "Media", class: "whitesnow" },
        { text: "Caption", class: "whitesnow" },
        { text: "Channel", class: "whitesnow" },
        { text: "User", class: "whitesnow" },
        { text: "Push Notif Oleh", class: "whitesnow" },
        { text: "Waktu Push", class: "whitesnow" },
      ],
      // tableItems: [],
      tableItemsDialog: {
        medias: [],
      },
      // loadingList: false,
      loadingDetail: false,
      loadingMakeTrending: false,
      dialogPost: false,
      dialogPostDataIdx: 0,
      dialogPostMediasIdx: 0,
      dialogPushNotif: false,
      dialogPushNotifId: "",
      page: 1,
      // totalPages: 0,
      status: true,
      playerOptions: {
        overNative: true,
        controls: true,
        techOrder: ["html5"],
        sourceOrder: true,
        flash: {
          hls: { withCredentials: false },
          swf: "/static/media/video-js.swf",
        },
        html5: { hls: { withCredentials: false } },
        sources: [],
      },
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
        let id = this.tableItems[this.dialogPostDataIdx].feedId;
        this.handleGetUserPostDetail(id);
      }
    },
  },
  computed: {
    player() {
      console.log(this.$refs.videoPlayer.player);
      return this.$refs.videoPlayer.player;
    },
    isPlay() {
      return this.status;
    },
    vodUrl() {
      const item = this.tableItemsDialog.post.medias[this.dialogPostMediasIdx];
      if (item.vodUrl) {
        return item.vodUrl;
      } else {
        const url = item.url;
        const hrefURL = new URL(url);
        const pathName = hrefURL.pathname;
        const origin = hrefURL.origin;
        const splitPathName = pathName.split("/");
        const lastIndex = splitPathName.pop();
        const splitLastIndex = lastIndex.split(".");
        const [first, second] = splitLastIndex;
        const newFormatFileUrl = `${first}_h265.${second}`;
        const joinPathName = `${splitPathName.join("/")}/${newFormatFileUrl}`;
        const fullPath = `${origin}${joinPathName}`;
        return fullPath;
      }
    },
    optionsVideo() {
      const item = this.tableItemsDialog.post.medias[this.dialogPostMediasIdx];
      const temp = { ...this.playerOptions };
      if (item.vodUrl && item.type === "video") {
        const url = new URL(item.vodUrl);
        const split = url.pathname.split(".");
        const extension = split[split.length - 1];
        if (extension === "m3u8") {
          const hls = {
            ...temp,
            sources: [
              {
                withCredentials: false,
                type: "application/x-mpegURL",
                src: this.tableItemsDialog.post.medias[this.dialogPostMediasIdx]
                  .vodUrl,
              },
            ],
          };
          return hls;
        } else {
          const mp4 = {
            ...temp,
            sources: [
              {
                withCredentials: false,
                type: "video/mp4",
                src: this.tableItemsDialog.post.medias[this.dialogPostMediasIdx]
                  .vodUrl,
              },
            ],
          };
          return mp4;
        }
      }
    },
    isContain() {
      const metadata =
        this.tableItemsDialog.post.medias[this.dialogPostMediasIdx].metadata;
      const width = Number(metadata.width);
      const height = Number(metadata.height);
      const ratio = height / width;
      if (width >= height) {
        return "contain";
      } else {
        if (ratio < 1.5) {
          return "contain";
        } else {
          // console.log("masuk else");
          return "cover";
        }
      }
    },
  },
  mounted() {
    this.getRoute();
  },
  methods: {
    ...mapActions({
      fetchPostAllUserNotificationDetailById:
        "post/fetchPostAllUserNotificationDetailById",
    }),
    getRoute() {
      this.page = parseInt(this.$route.params.page);
    },
    handleGetUserPostDetail(id) {
      this.loadingDetail = true;
      return this.fetchPostAllUserNotificationDetailById(id)
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
      this.closeDialogPushNotif();
    },
    openDialogPushNotif(id) {
      this.dialogPushNotif = true;
      this.dialogPushNotifId = id;
    },
    closeDialogPushNotif() {
      this.dialogPushNotif = false;
      this.dialogPushNotifId = "";
    },
    formatingDate(rawDate) {
      const cek = moment(rawDate).format("DD/MM/YYYY HH:mm");
      return cek;
    },
    openDialogPost(id, idx) {
      this.dialogPost = true;
      this.dialogPostDataIdx = idx;
      this.handleGetUserPostDetail(id);
      console.log();
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
    //   const medias = this.tableItemsDialog.post.medias;
    //   let idVideo;
    //   this.isPlay;
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
.show-post {
  color: $secondary;
  text-decoration: underline;
  cursor: pointer;
}
.nav {
  &__btn {
    &-img {
      color: #4a4a4a !important;
      background-color: $whitesmoke;
      width: 24px;
      height: 24px;
      border-radius: 4px;
    }
    &-left {
      position: absolute;
      z-index: 1;
      top: 50%;
      left: 10em;
      background: rgba($color: #000000, $alpha: 0.5);
    }
    &-right {
      position: absolute;
      z-index: 1;
      top: 50%;
      right: 10em;
      background: rgba($color: #000000, $alpha: 0.5);
    }
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
