<template>
  <v-navigation-drawer floating color="whitesmoke" app width="328" permanent right style="padding:24px">
    <div>
      <h5>Konten Terpilih</h5>
      <p class="font-12 mt-2">
        Konten yang terpilih hanya akan terupload setelah kamu menekan tombol
        “Submit Post”
      </p>
      <div>
        <video :src="previewTiktokData.video.playAddr" controls
          style="max-width: 100% !important; height: 100% !important"></video>

        <div class="mt-8 font-12 text-break">
          <v-textarea v-model="previewTiktokPayload.description" label="Description" outlined background-color="white"
            class="font-12"></v-textarea>
          <custom-autocomplete :value="previewTiktokPayload.channel" v-model="previewTiktokPayload.channel"
            :items="channels" item-text="name" placeholder="Select Channel" return-object />
        </div>
        <div class="d-flex">
          <custom-button color="white" class="primary--text mr-4" @click="actionChangeStatusPreviewTiktok(false)">
            Cancel
          </custom-button>
          <custom-button color="primary" class="white--text" :loading="loadingSubmit"
            @click="actionGetTiktokVideoNoWatermark">
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
      asetKipas: 'https://asset.kipaskipas.com',
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
    };
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
      const url = `https://www.tiktok.com/@${this.previewTiktokData.author.uniqueId}/videosss/${this.previewTiktokData.video.id}`;
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
            if (res.name){
              this.actionPostToDraft(res);
              if (process.env.VUE_APP_SERVER_STATUS === 'production') {
                this.dataResponse.url = `${this.asetKipas}/${res.name}`
              } else {
                this.dataResponse.url = res.url;
              }
            }else{
              console.log("failed upload")
              this.loadingSubmit = false;
              this.payloadFailed.message = 'Upload Failed';
              this.alertFailed = true;
            }
          })
          .catch((err) => {
            this.loadingSubmit = false;
          });
      }
    },
    actionPostToDraft(res) {
      return this.drawImageOnCanvas(res.url, 0.0)
        .then((base64data) => {
          const currentDateEpoch = moment(new Date()).valueOf();
          const filePath = `/img/media/${currentDateEpoch}.jpg`;
          const thumbnail = this.dataURLtoFile(
            base64data,
            `${+new Date()}.jpg`
          );
          return this.$storeOss.put(filePath, thumbnail);
        })
        .then((response) => {
          let url = `${this.asetKipas}/${response.name}`
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
        .catch((err) => { });
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
      console.log(this.dataResponse)
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
  },
};
</script>

<style lang="scss">
.font-12 {
  font-size: 12px;
}
</style>
