<template>
  <v-navigation-drawer
    floating
    color="whitesmoke"
    app
    width="328"
    permanent
    right
    style="padding-right: 20px; padding-left: 20px; padding-top: 8px"
  >
    <div class="d-flex justify-end">
      <v-btn
        icon
        size="x-small"
        @click="actionChangeStatusPreviewTiktok(false)"
      >
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </div>
    <div class="d-flex flex-column mt-3 mb-12">
      <h5>Konten Terpilih</h5>
      <p class="font-12 mt-2">
        Konten yang terpilih hanya akan terupload setelah kamu menekan tombol
        “Submit Post”
      </p>
      <div
        class="container-img"
        @click="openInNew(previewTiktokData.share_url)"
      >
        <img
          :src="previewTiktokData.item_cover"
          class="image"
          style="width: 100%"
        />
        <div class="middle">
          <div class="d-flex flex-column">
            <v-icon color="white">mdi-open-in-new</v-icon>
            <span class="text">Open in new tab</span>
          </div>
        </div>
      </div>

      <div class="d-flex flex-column pt-4" style="gap: 12px; font-size: 14px">
        <span>{{ previewTiktokData.title }}</span>
        <span>{{ previewTiktokData.hot_words }}</span>
      </div>

      <div class="mt-3">
        <k-textarea
          v-model="payload.description"
          clearable
          placeholder="Caption"
          outlined
          background-color="white"
          hide-details
          rows="2"
          class="font-12"
        ></k-textarea>
        <custom-autocomplete
          :value="payload.channel"
          v-model="payload.channel"
          :items="channels"
          item-text="name"
          placeholder="Select Channel"
          return-object
          hide-details
          class="mt-3"
        />
        <span v-if="alertErrorChannel" class="channel-error primary--text"
          >Channel harap diisi</span
        >
        <v-divider class="my-3"></v-divider>
        <!-- <span class="grey--text">Link dari postingan ini</span>
        <div class="mt-3">
          <k-input
            v-model="payload.floatingLinkLabel"
            placeholder="Placeholder"
            class="mt-3"
          ></k-input>
        </div>
        <div class="my-3">
          <k-input
            v-model="payload.floatingLink"
            placeholder="https:/...."
            class="mt-3"
          ></k-input>
        </div> -->
      </div>

      <div>
        <custom-button
          color="white"
          class="primary--text mr-4"
          @click="actionChangeStatusPreviewTiktok(false)"
        >
          Cancel
        </custom-button>
        <custom-button
          color="primary"
          class="white--text"
          :loading="loadingSubmit"
          @click="submitToPostFeed"
        >
          Submit Post
        </custom-button>
      </div>
    </div>
  </v-navigation-drawer>
</template>

<script>
import moment from "moment";
import { mapActions, mapState } from "vuex";

export default {
  data() {
    return {
      asetKipas: "https://asset.kipaskipas.com",
      channels: [],
      payload: {
        description: "",
        channel: null,
        // floatingLinkLabel: null,
        // floatingLink: null,
        medias: [
          {
            id: null,
            type: "video",
            url: "",
            thumbnail: {},
            metadata: {},
          },
        ],
      },
      loadingSubmit: false,
      alertSuccess: false,
      alertErrorChannel: false,
      alertFailed: false,
      errorMessage: "",
    };
  },
  watch: {
    "payload.channel"() {
      if (this.payload.channel != null) {
        this.alertErrorChannel = false;
      }
    },
  },
  computed: {
    ...mapState({
      previewTiktokData: (state) => state.tiktok.previewTiktokData,
      previewTiktokPayload: (state) => state.tiktok.previewTiktokPayload,
    }),
  },
  mounted() {
    this.handleGetChannel();
  },
  methods: {
    ...mapActions({
      changeStatusPreviewTiktok: "changeStatusPreviewTiktok",
      changeStatusPreviewTiktokSuccess: "changeStatusPreviewTiktokSuccess",
      getAllChannel: "channel/getAllChannel",
      getDouyinVideoNoWatermark: "tiktok/getDouyinVideoNoWatermark",
      postFeed: "post/postFeed",
    }),

    actionChangeStatusPreviewTiktok(v) {
      return this.changeStatusPreviewTiktok(v);
    },
    actionChangeStatusPreviewTiktokSuccess(v) {
      return this.changeStatusPreviewTiktokSuccess(v);
    },
    openInNew(v) {
      window.open(v, "_blank");
    },
    async handleGetChannel() {
      const response = await this.getAllChannel();
      if (response.status === 200) {
        const responseData = response.data.data;
        const formatResponse = responseData.map((d) => {
          return {
            name: d.name,
            id: d.id,
          };
        });
        this.channels = formatResponse;
      } else {
        return response;
      }
    },
    submitToPostFeed() {
      const splitted = this.previewTiktokData.share_url.split("/");
      if (this.payload.channel == null) {
        this.alertErrorChannel = true;
        this.errorMessage = "Harap Pilih Channel";
      } else {
        this.loadingSubmit = true;
        return this.getDouyinVideoNoWatermark(splitted[5])
          .then((response) => {
            let res = response.data.data;
            if (res.name) {
              this.actionPostToDraft(res);
              if (process.env.VUE_APP_SERVER_STATUS === "production") {
                this.payload.medias[0].url = `${this.asetKipas}/${res.name}`;
              } else {
                this.payload.medias[0].url = res.url;
              }
            } else {
              this.loadingSubmit = false;
              this.errorMessage = "Upload Failed";
              this.alertFailed = true;
            }
          })
          .catch((err) => {
            console.log({ err });
            this.loadingSubmit = false;
          });
      }
    },
    actionPostToDraft(res) {
      const currentDateEpoch = moment(new Date()).valueOf();
      const filePath = `/img/media/${currentDateEpoch}.jpg`;
      let response;
      return this.drawImageOnCanvas(res.url, 0.0)
        .then((base64data) => {
          const thumbnail = this.dataURLtoFile(
            base64data,
            `${+new Date()}.jpg`
          );
          return this.$storeOss.put(filePath, thumbnail);
        })
        .then((resp) => {
          response = resp;
          return this.$storeOss.putACL(filePath, "public-read");
        })
        .then(() => {
          let url = `${this.asetKipas}/${response.name}`;
          if (process.env.VUE_APP_SERVER_STATUS === "production") {
            this.payload.medias[0].thumbnail = {
              small: url,
              medium: url,
              large: url,
            };
            this.actionPostFeed();
          } else {
            this.payload.medias[0].thumbnail = {
              small: response.url,
              medium: response.url,
              large: response.url,
            };
            this.actionPostFeed();
          }
        })
        .catch((err) => {
          console.log({ err });
        });
    },
    drawImageOnCanvas(url, seekTo) {
      return new Promise((resolve, reject) => {
        const videoPlayer = document.createElement("video");
        videoPlayer.setAttribute("src", url);
        videoPlayer.crossOrigin = "anonymous";
        videoPlayer.load();
        videoPlayer.addEventListener("error", (ex) => {
          reject("error when loading video file", ex);
        });

        videoPlayer.addEventListener("loadedmetadata", () => {
          if (videoPlayer.duration < seekTo) {
            reject("video is too short.");
            return;
          }
          setTimeout(() => {
            videoPlayer.currentTime = seekTo;
          }, 200);
          videoPlayer.addEventListener("seeked", () => {
            const canvas = document.createElement("canvas");
            canvas.width = videoPlayer.videoWidth;
            canvas.height = videoPlayer.videoHeight;

            this.payload.medias[0].metadata = {
              width: videoPlayer.videoWidth,
              height: videoPlayer.videoHeight,
              size: 100,
            };

            const ctx = canvas.getContext("2d");
            ctx.drawImage(videoPlayer, 0, 0, canvas.width, canvas.height);
            ctx.canvas.toBlob(
              (blob) => {
                var reader = new FileReader();
                reader.readAsDataURL(blob);
                reader.onloadend = function () {
                  var base64data = reader.result;
                  resolve(base64data);
                };
              },
              "image/jpeg",
              0.75 /* quality */
            );
          });
        });
      });
    },
    dataURLtoFile(dataurl, filename) {
      let arr = dataurl.split(",");
      let mime = arr[0].match(/:(.*?);/)[1];
      let bstr = atob(arr[1]);
      let n = bstr.length;
      let u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], filename, { type: mime });
    },
    actionPostFeed() {
      if (this.payload.description == null) {
        this.payload.description = "";
      }
      return this.postFeed(this.payload)
        .then((response) => {
          this.loadingSubmit = false;
          this.actionChangeStatusPreviewTiktokSuccess(true);
          setTimeout(() => {
            this.actionChangeStatusPreviewTiktokSuccess(false);
          }, 3000);
          this.actionChangeStatusPreviewTiktok(false);
        })
        .catch((err) => {
          this.loadingSubmit = false;
          this.payloadFailed = err.response;
          this.alertFailed = true;
        });
    },
  },
};
</script>

<style>
.container-img {
  position: relative;
  cursor: pointer;
}

.image {
  opacity: 1;
  display: block;
  height: auto;
  transition: 0.5s ease;
  backface-visibility: hidden;
}

.middle {
  transition: 0.5s ease;
  opacity: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  text-align: center;
}

.container-img:hover .image {
  filter: brightness(50%);
}

.container-img:hover .middle {
  opacity: 1;
  filter: brightness(100%);
}

.text {
  font-size: 12px;
  font-weight: 500;
  color: white;
}

.channel-error {
  font-size: 12px;
  font-weight: 500;
}
</style>
