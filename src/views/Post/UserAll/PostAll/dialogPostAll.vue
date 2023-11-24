<template>
  <v-dialog v-model="dialogPost" @click:outside="closeDialog" width="711">
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
    <v-card>
      <div
        v-if="!loadingDetail && tableItemsDialog.createBy"
        class="d-flex align-center"
        style="overflow: hidden"
      >
        <div>
          <div class="d-flex" style="padding: 12px">
            <div style="margin-right: 12px">
              <div class="black" style="width: 300px; height: 600px">
                <video-player
                  v-if="
                    dialogPost &&
                    tableItemsDialog.medias[dialogPostMediasIdx].type == 'video'
                  "
                  :id="`videodialog-${dialogPostMediasIdx}-${tableItemsDialog.medias[dialogPostMediasIdx].id}`"
                  :style="{ objectFit: isContain }"
                  class="vjs-custom-skin video-player"
                  ref="videoPlayer"
                  :options="optionsVideo"
                  style="height: 100%; width: 100%"
                >
                </video-player>
                <v-img
                  v-else
                  :src="tableItemsDialog.medias[dialogPostMediasIdx].url"
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
                <p>@{{ tableItemsDialog.createBy }}</p>
              </div>

              <div
                class="whitesnow mt-4 pa-2"
                style="height: 250px; overflow: auto; border-radius: 4px"
              >
                {{ tableItemsDialog.description }}
              </div>

              <div class="d-flex flex-column mt-4" style="gap: 16px">
                <div class="d-flex flex-column">
                  <span class="font-10">Channel</span>
                  <span class="font-14 black--text">Channel</span>
                </div>
                <div class="row no-gutters">
                  <div
                    class="d-flex flex-column"
                    :class="isUpdateLeveling ? 'col-3' : 'col'"
                  >
                    <span class="font-10"
                      >Konten Level<span class="red--text">*</span></span
                    >
                    <v-select
                      :items="levels"
                      dense
                      outlined
                      v-model="selectedLevel"
                      hide-details
                    ></v-select>
                  </div>
                  <div class="col-6 d-flex flex-column ml-2">
                    <span class="font-10">Expired Konten Tayang</span>
                    <DatePicker
                      :displayDateProps="tableItemsDialog.expiredAt"
                      @getEpoch="getEpoch"
                    />
                  </div>
                  <div v-if="isUpdateLeveling" class="col d-flex justify-end">
                    <v-btn
                      color="secondary"
                      class="font-12 text-capitalize mt-4"
                      style="letter-spacing: 0px; padding: 12px"
                      @click="actionUpdatePriority"
                      >Terapkan</v-btn
                    >
                  </div>
                </div>
                <div class="d-flex flex-column">
                  <span class="font-10">Floating Link</span>
                  <span class="font-14 black--text">Cek Youtube Disini</span>
                  <a
                    v-if="tableItemsDialog.floatingLink"
                    :href="tableItemsDialog.floatingLink"
                    target="blank"
                    class="font-10 secondary--text"
                    >{{ tableItemsDialog.floatingLink }}</a
                  >
                  <span v-else>-</span>
                </div>
              </div>
            </div>

            <div>
              <v-icon size="16px" class="cursor-pointer" @click="closeDialog"
                >mdi-close</v-icon
              >
            </div>
          </div>

          <div
            class="d-flex align-center"
            style="
              padding: 12px;
              border-top: 1px solid #eeeeee;
              background-color: #f9f9f9;
            "
          >
            <div class="d-flex">
              <div
                v-if="
                  tableItemsDialog.medias && tableItemsDialog.medias.length > 1
                "
                class="d-flex"
                style="gap: 8px; margin-right: 12px"
              >
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
                    dialogPostMediasIdx == tableItemsDialog.medias.length - 1
                  "
                >
                  <v-icon>mdi-chevron-right</v-icon>
                </v-btn>
              </div>

              <div>
                <custom-button
                  size="x-small"
                  color="secondary"
                  @click="openDialogPushNotif(tableItemsDialog.id)"
                >
                  Push Notif
                </custom-button>
              </div>
              <!-- <div
                v-if="tableItemsDialog.isVodAvailable"
                class="d-flex align-center"
                style="gap: 5px"
              >
                <input id="isPrior" type="checkbox" v-model="priority" />
                <label for="isPrior" class="post-actions__label"
                  >Priority</label
                >
              </div> -->
            </div>
            <!-- <div class="post-actions" v-if="tableItemsDialog.isVodAvailable">
              <div class="post-actions__label">Trending sampai</div>
              <DatePicker @getEpoch="getEpoch" />
              <custom-button
                color="secondary"
                size="small"
                @click="actionPostFeedAsTrendingById(tableItemsDialog.id)"
              >
                Jadikan Trending
              </custom-button>
            </div> -->
            <!-- <div
              v-else
              class="d-flex align-center alert-hls warning--text"
              style="width: 100%"
            >
              <span
                >Menunggu proses HLS dari media dalam postingan ini, hanya bisa
                ditrendingkan setelah proses selesai.</span
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

    <!-- <DialogPushNotifVue
      :dialogPushNotif="dialogPushNotif"
      @closeDialogPushNotif="closeDialogPushNotif"
      @actionPushNotif="actionPushNotif"
    /> -->
  </v-dialog>
</template>

<script>
import DatePicker from "./datePicker.vue";
import VideoPlayer from "../video.vue";
import moment from "moment";

export default {
  components: {
    DatePicker,
    // VideoPlayer,
  },
  props: [
    "dialogPost",
    "loadingDetail",
    "tableItemsDialog",
    "dialogPostMediasIdx",
  ],
  data() {
    return {
      priority: false,
      status: true,
      levels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      selectedLevel: null,
      expiredAt: null,
      isUpdateLeveling: false,
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
    priority() {
      this.$emit("priority", this.priority);
    },
    dialogPost() {
      this.selectedLevel = this.tableItemsDialog.levelPriority;
      setTimeout(() => {
        this.isUpdateLeveling = false;
      }, 100);

      this.expiredAt = this.tableItemsDialog.expiredAt;
      setTimeout(() => {
        this.isUpdateLeveling = false;
      }, 100);
    },
    "tableItemsDialog.id"() {
      this.selectedLevel = this.tableItemsDialog.levelPriority;
      setTimeout(() => {
        this.isUpdateLeveling = false;
      }, 100);
      this.expiredAt = this.tableItemsDialog.expiredAt;
      setTimeout(() => {
        this.isUpdateLeveling = false;
      }, 100);
    },
    "tableItemsDialog.levelPriority"() {
      this.selectedLevel = this.tableItemsDialog.levelPriority;
      setTimeout(() => {
        this.isUpdateLeveling = false;
      }, 100);
    },
    "tableItemsDialog.expiredAt"() {
      this.expiredAt = this.tableItemsDialog.expiredAt;
      setTimeout(() => {
        this.isUpdateLeveling = false;
      }, 100);
    },
    selectedLevel() {
      this.isUpdateLeveling = true;
    },
    expiredAt() {
      this.isUpdateLeveling = true;
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
      const item = this.tableItemsDialog.medias[this.dialogPostMediasIdx];
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
      const item = this.tableItemsDialog.medias[this.dialogPostMediasIdx];
      const temp = { ...this.playerOptions };
      if (item.vodUrl) {
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
                src: this.tableItemsDialog.medias[this.dialogPostMediasIdx]
                  .vodUrl,
              },
            ],
          };
          return hls;
        }
      } else {
        const mp4 = {
          ...temp,
          sources: [
            {
              withCredentials: false,
              type: "video/mp4",
              src: this.tableItemsDialog.medias[this.dialogPostMediasIdx].url,
            },
          ],
        };
        return mp4;
      }
    },
    isContain() {
      const metadata =
        this.tableItemsDialog.medias[this.dialogPostMediasIdx].metadata;
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
  methods: {
    closeDialog() {
      this.$emit("closeDialog", false);
      this.priority = false;
      this.isUpdateLeveling = false;
      this.selectedLevel = null;
      this.expiredAt = null;
    },
    changeDialogPostData(v) {
      this.$emit("changeDialogPostData", v);
      this.priority = false;
    },
    changeDialogPostImg(v) {
      this.$emit("changeDialogPostImg", v);
      this.priority = false;
    },
    actionPostFeedAsTrendingById(v) {
      this.$emit("actionPostFeedAsTrendingById", v);
      this.priority = false;
    },
    getEpoch(value) {
      // console.log(moment(value).format("YYYY-MM-DD"));
      this.expiredAt = moment(value).add(7, "hours").unix();
      // this.tableItemsDialog.expiredAt = value;
      // this.$emit("getEpoch", value);
      // this.epochExpiredTrending = value;
    },
    openDialogPushNotif(id) {
      this.$emit("openDialogPushNotif", id);
    },
    actionUpdatePriority() {
      const payload = {
        id: this.tableItemsDialog.id,
        params: {
          levelPriority: this.selectedLevel,
          expiredAt:
            this.expiredAt && this.expiredAt.toString().length < 13
              ? Number(`${this.expiredAt}000`)
              : this.expiredAt,
        },
      };
      this.$emit("updatePriority", payload);
    },
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

.content-card {
  padding: 13px 12px;
  border-radius: 6px;
  background-color: $whitesnow;
}

.alert-hls {
  padding: 0px 10px;
  border-radius: 4px;
  background-color: $primarylowtint;
  font-size: 12px;
  height: 24px;
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

.cursor-pointer {
  cursor: pointer;
}
</style>
