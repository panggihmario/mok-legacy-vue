<template>
  <v-dialog v-model="dialogPost" @click:outside="closeDialog" width="880">
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
      >
        <div class="pt-7" style="width: 100%">
          <div class="row no-gutters mx-6">
            <div class="col">
              <div
                class="black"
                style="
                  width: 362px;
                  height: 456px;
                  border-radius: 8px;
                  overflow: hidden;
                "
              >
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
            <div class="col font-12">
              <div>
                <span class="font-10">User</span>
                <p>@{{ tableItemsDialog.createBy }}</p>
              </div>
              <div
                class="whitesnow mt-5 pa-2"
                style="height: 400px; overflow: auto"
              >
                {{ tableItemsDialog.description }}
              </div>
            </div>
          </div>
          <div class="d-flex justify-space-between align-center px-6 py-2">
            <div class="d-flex">
              <div
                v-if="
                  tableItemsDialog.medias && tableItemsDialog.medias.length > 1
                "
              >
                <v-btn
                  icon
                  tile
                  @click="changeDialogPostImg(-1)"
                  :disabled="dialogPostMediasIdx == 0"
                >
                  <v-icon>mdi-chevron-left</v-icon>
                </v-btn>
                <v-btn
                  icon
                  tile
                  @click="changeDialogPostImg(1)"
                  :disabled="
                    dialogPostMediasIdx == tableItemsDialog.medias.length - 1
                  "
                >
                  <v-icon>mdi-chevron-right</v-icon>
                </v-btn>
              </div>
              <div class="d-flex align-center" style="gap: 5px">
                <input id="isPrior" type="checkbox" v-model="priority" />
                <label for="isPrior" class="post-actions__label"
                  >Priority</label
                >
              </div>
            </div>
            <div class="post-actions">
              <div class="post-actions__label">Trending sampai</div>
              <DatePicker @getEpoch="getEpoch" />
              <custom-button
                color="secondary"
                size="small"
                @click="actionPostFeedAsTrendingById(tableItemsDialog.id)"
                :disabled="!tableItemsDialog.isVodAvailable"
              >
                Jadikan Trending
              </custom-button>
            </div>
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
</template>

<script>
import DatePicker from "./datePicker.vue";
import VideoPlayer from "../video.vue";

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
      if (item.vodUrl && item.type === "video") {
        const url = new URL(item.vodUrl);
        const split = url.pathname.split(".");
        const extension = split[split.length - 1];
        const temp = { ...this.playerOptions };
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
        } else {
          const mp4 = {
            ...temp,
            sources: [
              {
                withCredentials: false,
                type: "video/mp4",
                src: this.tableItemsDialog.medias[this.dialogPostMediasIdx]
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
  watch: {
    priority() {
      this.$emit("priority", this.priority);
    },
  },
  methods: {
    closeDialog() {
      this.$emit("closeDialog", false);
      this.priority = false;
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
      this.$emit("getEpoch", value);
      // this.epochExpiredTrending = value;
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
