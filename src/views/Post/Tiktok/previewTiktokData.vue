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
        @click="
          openInNew(
            `https://www.tiktok.com/@${previewTiktokData.author.uniqueId}/video/${previewTiktokData.id}`
          )
        "
      >
        <img
          :src="previewTiktokData.video.cover"
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

      <div
        v-if="
          previewTiktokData.video.height >= 1024
            ? false
            : previewTiktokData.video.width >= 1024
            ? false
            : true
        "
        class="alert-resolution mt-3"
      >
        <div class="d-flex">
          <div style="margin-top: 2px; margin-right: 6px">
            <icon-triangle-exclamation></icon-triangle-exclamation>
          </div>
          <div>
            <span
              >Video ini memiliki resolusi rendah, untuk menjaga kualitas
              konten, gunakan video lain yang memiliki minimum resolusi 1024
              pixel.
            </span>
          </div>
        </div>
      </div>
      <div
        v-if="isDataExist"
        class="d-flex align-center alert-data-exist mt-3"
        style="gap: 6px"
      >
        <icon-triangle-exclamation></icon-triangle-exclamation>
        <span>Konten sudah pernah disubmit, coba konten lain</span>
      </div>

      <div>
        <k-textarea
          v-model="payload.description"
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
        <span v-if="alertErrorChannel" class="primary--text font-12"
          >Channel harap diisi</span
        >
        <v-divider class="my-3"></v-divider>
        <span class="grey--text">Link dari postingan ini</span>
        <div class="mt-3">
          <k-input
            v-model="payload.floatingLinkLabel"
            placeholder="Placeholder"
            class="mt-3"
          ></k-input>
          <span
            v-if="alertFloatingLinkLabel.status"
            class="primary--text font-12"
          >
            {{ alertFloatingLinkLabel.message }}
          </span>
        </div>
        <div class="my-3">
          <k-input
            v-model="payload.floatingLink"
            placeholder="https:/...."
            class="mt-3"
          ></k-input>
          <span v-if="alertFloatingLink.status" class="primary--text font-12">
            {{ alertFloatingLink.message }}
          </span>
        </div>
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
          disab
          @click="
            actionGetUrlValidation(
              `https://www.tiktok.com/@${previewTiktokData.author.uniqueId}/video/${previewTiktokData.id}`
            )
          "
          :disabled="
            previewTiktokData.video.height >= 1024
              ? false
              : previewTiktokData.video.width >= 1024
              ? false
              : true
          "
        >
          Submit Post
        </custom-button>
      </div>

      <v-snackbar v-model="alertSuccess" top right color="success">
        <span>Success Post</span>
        <v-btn outlined text @click="movePageDraft">See Draft</v-btn>
      </v-snackbar>
      <v-snackbar v-model="alertFailed" top right color="error">
        <span>Error: {{ payloadFailed.message }}</span>
      </v-snackbar>
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
      tiktokUrl: "",
      payload: {
        description: "",
        channel: null,
        floatingLinkLabel: null,
        floatingLink: null,
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
      dataResponse: {
        id: null,
        type: "video",
        url: "",
        thumbnail: {},
        metadata: {},
      },
      loadingSubmit: false,
      alertSuccess: false,
      alertErrorChannel: false,
      alertFailed: false,
      errorMessage: "",
      isDataExist: false,
      payloadFailed: {
        message: "",
      },
      alertFloatingLinkLabel: {
        status: false,
        message: "",
      },
      alertFloatingLink: {
        status: false,
        message: "",
      },
    };
  },
  watch: {
    previewTiktokData() {
      this.isDataExist = false;
      this.alertErrorChannel = false;
      this.payload.description = this.previewTiktokData.desc;
      this.payload.channel = null;
      this.payload.floatingLink = null;
      this.payload.floatingLinkLabel = null;
      this.alertFloatingLinkLabel = {
        status: false,
        message: "",
      };
      this.alertFloatingLink = {
        status: false,
        message: "",
      };
    },
    "payload.channel"() {
      if (this.payload.channel != null) {
        this.alertErrorChannel = false;
      }
    },
    "payload.floatingLinkLabel"(v) {
      if (v == "") {
        this.payload.floatingLinkLabel = null;
      }
      if (v.length > 0 && v.length < 4) {
        this.alertFloatingLinkLabel.status = true;
        this.alertFloatingLinkLabel.message = "Gunakan minimal 4 karakter";
      } else if (v.length > 0 && v.length > 30) {
        this.alertFloatingLinkLabel.status = true;
        this.alertFloatingLinkLabel.message = "Gunakan maksimal 30 karakter";
      } else {
        this.alertFloatingLinkLabel.status = false;
        this.alertFloatingLinkLabel.message = "";
      }
    },
    "payload.floatingLink"(v) {
      if (v == "") {
        this.payload.floatingLink = null;
        this.alertFloatingLink.status = false;
        this.alertFloatingLink.message = "";
      }
      const regexUrl =
        /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;
      console.log(regexUrl.test(v));
      if (v.length > 0) {
        if (regexUrl.test(v) == false) {
          this.alertFloatingLink.status = true;
          this.alertFloatingLink.message =
            "Gunakan format link yang sesuai contohnya\nhttps://youtube.com";
        } else {
          this.alertFloatingLink.status = false;
          this.alertFloatingLink.message = "";
        }
      }
      if (v.length > 0 && this.payload.floatingLinkLabel == null) {
        this.alertFloatingLinkLabel.status = true;
        this.alertFloatingLinkLabel.message = "Gunakan minimal 4 karakter";
        if (regexUrl.test(v) == false) {
          this.alertFloatingLink.status = true;
          this.alertFloatingLink.message =
            "Gunakan format link yang sesuai contohnya\nhttps://youtube.com";
        } else {
          this.alertFloatingLink.status = false;
          this.alertFloatingLink.message = "";
        }
      }
      if (v.length < 1 && this.payload.floatingLinkLabel == null) {
        this.alertFloatingLinkLabel.status = false;
        this.alertFloatingLinkLabel.message = "";
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
    this.payload.description = this.previewTiktokData.desc;
  },
  methods: {
    ...mapActions({
      changeStatusPreviewTiktok: "changeStatusPreviewTiktok",
      changeStatusPreviewTiktokSuccess: "changeStatusPreviewTiktokSuccess",
      getAllChannel: "channel/getAllChannel",
      postTiktokUrlValidation: "tiktok/postTiktokUrlValidation",
      getTiktokUrlValidation: "tiktok/getTiktokUrlValidation",
      getTiktokVideoNoWatermark: "tiktok/getTiktokVideoNoWatermark",
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
    actionGetUrlValidation(url) {
      this.tiktokUrl = url;
      return this.getTiktokUrlValidation(url)
        .then((res) => {
          this.actionGetTiktokVideoNoWatermark();
        })
        .catch((err) => {
          if (err.response.data.code == "4200") {
            this.isDataExist = true;
          }
        });
    },
    actionGetTiktokVideoNoWatermark() {
      const url = this.tiktokUrl;
      if (this.payload.channel == null) {
        this.alertErrorChannel = true;
      } else {
        if (
          this.alertFloatingLinkLabel.status == true ||
          this.alertFloatingLink.status == true
        ) {
          this.payload.floatingLinkLabel = null;
          this.payload.floatingLink = null;
        }
        this.loadingSubmit = true;
        return this.getTiktokVideoNoWatermark(url)
          .then((response) => {
            let res = response.data.data;
            if (res.Location) {
              this.loadingSubmit = false;
              this.actionPostToDraft(`https://${res.Location}`);
              if (process.env.VUE_APP_SERVER_STATUS === "production") {
                this.dataResponse.url = `https://${res.Location}`;
                this.dataResponse.vodFileId = res.vodFileId;
              } else {
                this.dataResponse.url = `https://${res.Location}`;
                this.dataResponse.vodFileId = res.vodFileId;
              }
            } else {
              this.loadingSubmit = false;
              this.payloadFailed.message = "Upload Failed";
              this.alertFailed = true;
            }
          })
          .catch((err) => {
            this.loadingSubmit = false;
          });
      }
    },
    actionPostToDraft(url) {
      const currentDateEpoch = moment(new Date()).valueOf();
      const filePath = `/img/media/${currentDateEpoch}.jpg`;
      let response;
      return this.drawImageOnCanvas(url, 0.0)
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
            this.dataResponse.thumbnail = {
              small: url,
              medium: url,
              large: url,
            };
            this.actionPostFeed();
          } else {
            this.dataResponse.thumbnail = {
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

            this.dataResponse.metadata = {
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
      this.payload.medias[0] = this.dataResponse;
      if (this.payload.description == null) {
        this.payload.description = "";
      }
      const p = {
        ...this.payload,
        type: "social",
        product: null,
      };
      return this.postFeed(p)
        .then((response) => {
          this.actionPostUrlValidation({
            originalUrl: this.tiktokUrl,
            postSocialId: response.data.data.postSocialId,
            status: "CREATED",
          });

          this.loadingSubmit = false;
          this.actionChangeStatusPreviewTiktok(false);
          this.actionChangeStatusPreviewTiktokSuccess(true);
          setTimeout(() => {
            this.actionChangeStatusPreviewTiktokSuccess(false);
          }, 3000);
        })
        .catch((err) => {
          this.loadingSubmit = false;
          this.payloadFailed = err.response;
          this.alertFailed = true;
          setTimeout(() => {
            this.alertFailed = false;
          }, 3000);
        });
    },
    actionPostUrlValidation(dataPayload) {
      return this.postTiktokUrlValidation(dataPayload)
        .then((res) => {
          // console.log({ res });
        })
        .catch((err) => {
          // console.log({ err });
        });
    },
    movePageDraft() {
      this.$router.push({
        name: "draft",
        params: {
          page: 1,
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
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

.alert-resolution {
  border: 1px solid $warning;
  border-radius: 4px;
  background-color: $primarylowtint;
  padding: 6px;
  font-weight: 600;
  font-size: 11px;
}

.alert-data-exist {
  background-color: $primarylowtint;
  border: 1px solid $warning;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
  padding: 6px;
}
</style>
