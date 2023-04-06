<template>
  <v-navigation-drawer
    floating
    color="whitesmoke"
    app
    width="328"
    permanent
    right
  >
    <div style="padding: 24px">
      <h5>Konten Terpilih</h5>
      <p class="font-12 mt-2">
        Konten yang terpilih hanya akan terupload setelah kamu menekan tombol
        “Submit Post”
      </p>
      <div>
        <!-- <video
          :src="previewTiktokData.video.playAddr"
          controls
          style="max-width: 100% !important; height: 100% !important"
        ></video> -->

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

        <section class="row no-gutters font-12 whitesnow text-center">
          <div class="col py-2">
            <span>Quality : </span>
            <span class="font-weight-medium">{{
              previewTiktokData.video.definition
            }}</span>
          </div>
          <v-divider vertical></v-divider>
          <div class="col py-2">
            <span>Width : </span>
            <span class="font-weight-medium"
              >{{ previewTiktokData.video.width }}px</span
            >
          </div>
          <v-divider vertical></v-divider>
          <div class="col py-2">
            <span>Height : </span>
            <span class="font-weight-medium"
              >{{ previewTiktokData.video.height }}px</span
            >
          </div>
        </section>

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

        <div class="mt-2 font-12 text-break">
          <k-textarea
            v-model="previewTiktokPayload.description"
            placeholder="Caption"
            outlined
            background-color="white"
            rows="2"
            class="font-12"
            hide-details
          ></k-textarea>
          <custom-autocomplete
            :value="previewTiktokPayload.channel"
            v-model="previewTiktokPayload.channel"
            :items="channels"
            item-text="name"
            placeholder="Select Channel"
            return-object
            class="mt-3"
            hide-details
          />
          <v-divider class="my-3"></v-divider>
          <span class="grey--text">Link dari postingan ini</span>
          <div class="mt-3">
            <k-input
              v-model="previewTiktokPayload.floatingLinkLabel"
              placeholder="Placeholder"
              class="mt-3"
              rules="min:4|max:30"
              errorMessage="Min 4 and Max 30"
            ></k-input>
          </div>
          <div class="my-3">
            <k-input
              v-model="previewTiktokPayload.floatingLink"
              placeholder="https:/...."
              class="mt-3"
              icon="fas fa-link"
            ></k-input>
            <div
              v-if="previewTiktokPayload.floatingLink && !isValid.url"
              class="mt-2 warning--text"
            >
              Gunakan format link yang sesuai contohnya <br />
              https://youtube.com
            </div>
          </div>
        </div>

        <div class="d-flex mt-3">
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
            @click="actionGetTiktokVideoNoWatermark"
            :disabled="
              previewTiktokData.video.height >= 1024
                ? false
                : previewTiktokData.video.width >= 1024
                ? false
                : true
            "
          >
            <!-- :disabled="
              (previewTiktokPayload.floatingLinkLabel.length > 0 &&
                previewTiktokPayload.floatingLinkLabel.length < 4) ||
              previewTiktokPayload.floatingLinkLabel.length > 30
            " -->
            Submit Post
          </custom-button>
        </div>
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
      loadingSubmit: false,
      alertSuccess: false,
      alertFailed: false,
      asetKipas: "https://asset.kipaskipas.com",
      channels: [],
      payload: {},
      dataResponse: {
        id: null,
        type: "video",
        url: "",
        thumbnail: {},
        metadata: {},
      },
      payloadFailed: {
        message: "",
      },
      rules: {
        urlValidation: (value) => {
          if (value) {
            const pattern =
              /^(?:(?:(?:https?|http?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/;
            return pattern.test(value);
          } else {
            return;
          }
        },
      },
      isValid: {
        url: true,
      },
    };
  },
  watch: {
    "previewTiktokPayload.floatingLink"(val) {
      this.isValid.url = this.rules.urlValidation(val);
    },
  },
  mounted() {
    this.handleGetChannel();
  },
  computed: {
    ...mapState({
      previewTiktokData: (state) => state.tiktok.previewTiktokData,
      previewTiktokPayload: (state) => state.tiktok.previewTiktokPayload,
    }),
  },
  methods: {
    ...mapActions({
      changeStatusPreviewTiktok: "changeStatusPreviewTiktok",
      changeStatusPreviewTiktokSuccess: "changeStatusPreviewTiktokSuccess",
      getAllChannel: "channel/getAllChannel",
      getTiktokVideoNoWatermark: "tiktok/getTiktokVideoNoWatermark",
      postFeed: "post/postFeed",
    }),
    actionChangeStatusPreviewTiktok(status) {
      this.changeStatusPreviewTiktok(status);
    },
    actionChangeStatusPreviewTiktokSuccess(status) {
      this.changeStatusPreviewTiktokSuccess(status);
    },
    movePageDraft() {
      this.$router.push({
        name: "draft",
        params: {
          page: 1,
        },
      });
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
    actionGetTiktokVideoNoWatermark() {
      const url = `https://www.tiktok.com/@${this.previewTiktokData.author.uniqueId}/video/${this.previewTiktokData.video.id}`;
      if (this.previewTiktokPayload.channel == null) {
        this.alertFailed = true;
        setTimeout(() => {
          this.alertFailed = false;
        }, 3000);
        this.payloadFailed.message = "Harap Pilih Channel";
      } else {
        this.loadingSubmit = true;
        return this.getTiktokVideoNoWatermark(url)
          .then((response) => {
            let res = response.data.data;
            if (res.Location) {
              this.loadingSubmit = false;
              this.actionPostToDraft(`https://${res.Location}`);
              if (process.env.VUE_APP_SERVER_STATUS === "production") {
                this.dataResponse.url = `https://${res.Location}`;
              } else {
                this.dataResponse.url = `https://${res.Location}`;
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
      this.previewTiktokPayload.medias[0] = this.dataResponse;
      if (this.previewTiktokPayload.description == null) {
        this.previewTiktokPayload.description = "";
      }
      return this.postFeed(this.previewTiktokPayload)
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
          setTimeout(() => {
            this.alertFailed = false;
          }, 3000);
        });
    },
    openInNew(v) {
      window.open(v, "_blank");
    },
  },
};
</script>

<style lang="scss">
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

.font-12 {
  font-size: 12px;
}

.alert-resolution {
  border: 1px solid $warning;
  border-radius: 4px;
  background-color: $primarylowtint;
  padding: 6px;
  font-weight: 600;
  font-size: 11px;
}
</style>
