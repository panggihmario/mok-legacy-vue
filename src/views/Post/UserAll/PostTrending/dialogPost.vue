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
                <!-- <video
                  v-if="
                    tableItemsDialog.medias[dialogPostMediasIdx].url.includes(
                      'mp4'
                    )
                  "
                  :id="`videodialog-${dialogPostMediasIdx}-${tableItemsDialog.medias[dialogPostMediasIdx].id}`"
                  controls
                  :src="vodUrl"
                  alt=""
                  class="vid"
                /> -->
                <Video-Player
                  v-if="
                    tableItemsDialog.medias[dialogPostMediasIdx].type == 'video'
                  "
                  :options="{
                    ...videoOptions,
                    sources: [
                      {
                        src: tableItemsDialog.medias[dialogPostMediasIdx]
                          .vodUrl,
                      },
                    ],
                  }"
                  class="vid"
                  :is-show="dialogPost"
                ></Video-Player>
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
              <div class="whitesnow mt-5 pa-2" style="min-height: 400px">
                {{ tableItemsDialog.description }}
              </div>
            </div>
          </div>

          <div class="trending__bottom">
            <div
              v-if="tableItemsDialog.medias.length > 1"
              class="trending__action-arrow"
            >
              <div
                v-if="dialogPostMediasIdx == 0"
                class="trending__box-arrow disable"
              >
                <v-icon size="12px">fas fa-chevron-left</v-icon>
              </div>
              <div
                v-else
                @click="changeDialogPostImg(-1)"
                class="trending__box-arrow"
              >
                <v-icon size="12px">fas fa-chevron-left</v-icon>
              </div>
              <div
                v-if="dialogPostMediasIdx == tableItemsDialog.medias.length - 1"
                class="trending__box-arrow disable"
              >
                <v-icon size="12px">fas fa-chevron-right</v-icon>
              </div>
              <div
                v-else
                @click="changeDialogPostImg(1)"
                class="trending__box-arrow"
              >
                <v-icon size="12px">fas fa-chevron-right</v-icon>
              </div>
            </div>
            <div class="trending__notes">
              Postingan tampil menjadi trending dalam waktu
              {{ tableItemsDialog.trendingExpired }} jam setelah status
              postingan berubah menjadi trending!
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
import VideoPlayer from "./video.vue";

export default {
  components: {
    VideoPlayer,
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
      videoOptions: {
        autoplay: true,
        controls: true,
        controlBar: {
          timeDivider: false,
          durationDisplay: false,
        },
        sources: [
          {
            src: "",
          },
        ],
      },
    };
  },
  watch: {
    priority() {
      this.$emit("priority", this.priority);
    },
  },
  computed: {
    vodUrl() {
      // tableItemsDialog.medias[dialogPostMediasIdx].url
      const item = this.tableItemsDialog.medias[this.dialogPostMediasIdx];
      console.log(item);
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
  },
  methods: {
    closeDialog() {
      this.$emit("closeDialog", false);
    },
    changeDialogPostData(v) {
      this.$emit("changeDialogPostData", v);
    },
    changeDialogPostImg(v) {
      this.$emit("changeDialogPostImg", v);
    },
    actionPostFeedAsTrendingById(v) {
      this.$emit("actionPostFeedAsTrendingById", v);
    },
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
