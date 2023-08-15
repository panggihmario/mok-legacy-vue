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

      <section v-if="previewData.node.__typename == 'GraphSidecar'">
        <div class="d-flex align-center black" style="height: 400px">
          <video
            v-if="
              previewData.node.edge_sidecar_to_children.edges[sidecarId].node
                .is_video
            "
            :src="
              previewData.node.edge_sidecar_to_children.edges[sidecarId].node
                .video_url
            "
            crossorigin="anonymous"
            class="black"
            style="height: 100% !important; width: 100% !important"
            controls
          ></video>

          <img
            v-else
            :src="
              previewData.node.edge_sidecar_to_children.edges[sidecarId].node
                .display_url
            "
            crossorigin="anonymous"
            class="image"
            style="width: 100%"
          />
        </div>
      </section>

      <section v-else style="height: 400px" class="d-flex align-center black">
        <video
          v-if="previewData.node.is_video"
          :src="previewData.node.video_url"
          crossorigin="anonymous"
          width="100%"
          class="black"
          style="height: 100% !important; width: 100% !important"
          controls
        ></video>

        <img
          v-else
          :src="previewData.node.display_url"
          crossorigin="anonymous"
          class="image"
          style="width: 100%"
        />
      </section>

      <section class="row no-gutters" style="height: 40px">
        <div
          class="col d-flex align-center font-12 px-2"
          :class="{
            'justify-center': previewData.node.__typename == 'GraphSidecar',
          }"
          style="gap: 4px; border: 1px solid white"
        >
          <span>
            height:
            {{
              previewData.node.__typename == "GraphSidecar"
                ? previewData.node.edge_sidecar_to_children &&
                  previewData.node.edge_sidecar_to_children.edges[sidecarId]
                    .node.dimensions.height
                : previewData.node.dimensions.height
            }}
          </span>
          <span>
            width:
            {{
              previewData.node.__typename == "GraphSidecar"
                ? previewData.node.edge_sidecar_to_children &&
                  previewData.node.edge_sidecar_to_children.edges[sidecarId]
                    .node.dimensions.width
                : previewData.node.dimensions.width
            }}
          </span>
        </div>

        <div
          v-if="previewData.node.__typename == 'GraphSidecar'"
          class="col d-flex justify-center align-center"
          style="gap: 4px; border: 1px solid white"
        >
          <v-btn
            icon
            tile
            small
            color="primary"
            @click="changeSidecarId(-1)"
            :disabled="sidecarId == 0"
          >
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>

          <div class="font-12">
            <span>{{ sidecarId + 1 }}</span>
            <span>
              /
              {{
                previewData.node.edge_sidecar_to_children &&
                previewData.node.edge_sidecar_to_children.edges.length
              }}</span
            >
          </div>

          <v-btn
            icon
            tile
            small
            color="primary"
            @click="changeSidecarId(1)"
            :disabled="
              sidecarId ==
              (previewData.node.edge_sidecar_to_children &&
                previewData.node.edge_sidecar_to_children.edges.length) -
                1
            "
          >
            <v-icon>mdi-chevron-right</v-icon>
          </v-btn>
        </div>
      </section>

      <section
        class="d-flex justify-center align-center font-12 pointer"
        style="height: 30px; border: 1px solid white"
        @click="
          openInNew(`https://www.instagram.com/p/${previewData.node.shortcode}`)
        "
      >
        <div style="gap: 4px">
          <span>Open in new tab</span>
          <v-icon color="primary" small>mdi-open-in-new</v-icon>
        </div>
      </section>

      <div
        v-if="
          previewData.node.__typename == 'GraphSidecar' ||
          previewData.node.__typename == 'GraphImage'
        "
        class="alert-resolution mt-3"
      >
        <div class="d-flex align-center">
          <div style="margin-top: 2px; margin-right: 6px">
            <icon-triangle-exclamation></icon-triangle-exclamation>
          </div>
          <div>
            <span>Hanya mendukung format video.</span>
          </div>
        </div>
      </div>

      <div
        v-if="
          previewData.node.__typename == 'GraphSidecar' ||
          previewData.node.__typename == 'GraphImage'
            ? false
            : previewData.node.dimensions.height < 1024 ||
              previewData.node.dimensions.width < 1024
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

      <!-- <div class="alert-resolution mt-3">
        <div class="d-flex">
          <div style="margin-top: 2px; margin-right: 6px">
            <icon-triangle-exclamation></icon-triangle-exclamation>
          </div>
          <div>
            <span
              >Postingan ini memiliki lebih dari 5 media, ada kemungkinan gagal
              dalam proses upload.
            </span>
          </div>
        </div>
      </div>
     -->

      <!-- <div class="d-flex flex-column pt-4" style="gap: 12px; font-size: 14px">
        <span>{{
          previewData.node.edge_media_to_caption.edges[0].node.text
        }}</span>
      </div> -->

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

        <span class="grey--text font-12">Link dari postingan ini</span>
        <div>
          <k-input
            v-model="payload.floatingLinkLabel"
            placeholder="Title"
            class="mt-3"
          ></k-input>
          <span
            v-if="alertFloatingLinkLabel.status"
            class="primary--text font-12"
          >
            {{ alertFloatingLinkLabel.message }}
          </span>
        </div>
        <div class="mb-3">
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
        <!-- <custom-button
          v-if="this.previewData.node.__typename == 'GraphSidecar'"
          color="primary"
          class="white--text"
          :loading="loadingSubmitMultiple"
          @click="actionCheckBeforePostToFeed"
        >
          Submit Post
        </custom-button> -->
        <!-- v-else -->
        <custom-button
          color="primary"
          class="white--text"
          :loading="loadingSubmit"
          @click="actionCheckBeforePostToFeed"
          :disabled="
            previewData.node.__typename == 'GraphSidecar' ||
            previewData.node.__typename == 'GraphImage' ||
            previewData.node.__typename == 'GraphSidecar' ||
            previewData.node.__typename == 'GraphImage'
              ? true
              : previewData.node.dimensions.height < 1024 ||
                previewData.node.dimensions.width < 1024
          "
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
      sidecarId: 0,
      sidecarProcess: 0,
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
      loadingSubmit: false,
      loadingSubmitMultiple: false,
      alertSuccess: false,
      alertErrorChannel: false,
      alertFailed: false,
      errorMessage: "",
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
    previewData() {
      this.payload.description =
        this.previewData.node.edge_media_to_caption.edges[0].node.text;

      this.sidecarId = 0;

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
    sidecarProcess() {
      let total = this.previewData.node.edge_sidecar_to_children.edges.length;

      if (this.sidecarProcess == total) {
        if (this.alertFailed) {
          this.loadingSubmitMultiple = false;
          this.changeStatusPreviewTiktokFailed(true);
        } else {
          this.actionPostFeed();
        }
      }
    },
  },
  computed: {
    ...mapState({
      previewData: (state) => state.instagram.previewData,
    }),
  },
  mounted() {
    this.handleGetChannel();

    this.payload.description =
      this.previewData.node.edge_media_to_caption.edges[0].node.text;
  },
  methods: {
    ...mapActions({
      changeStatusPreviewTiktok: "changeStatusPreviewTiktok",
      changeStatusPreviewTiktokSuccess: "changeStatusPreviewTiktokSuccess",
      changeStatusPreviewTiktokFailed: "changeStatusPreviewTiktokFailed",
      getAllChannel: "channel/getAllChannel",
      getDataFileToServer: "instagram/getDataFileToServer",
      postFeed: "post/postFeed",
    }),
    actionChangeStatusPreviewTiktok(v) {
      return this.changeStatusPreviewTiktok(v);
    },
    actionChangeStatusPreviewTiktokSuccess(v) {
      return this.changeStatusPreviewTiktokSuccess(v);
    },
    actionChangeStatusPreviewTiktokFailed(v) {
      return this.changeStatusPreviewTiktokFailed(v);
    },
    openInNew(v) {
      window.open(v, "_blank");
    },
    changeSidecarId(v) {
      this.sidecarId += v;
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
    actionCheckBeforePostToFeed() {
      if (this.previewData.node.__typename == "GraphSidecar") {
        this.loadingSubmitMultiple = true;
        this.sidecarProcess = 0;
        this.payload.medias = [];
        for (
          let i = 0;
          i < this.previewData.node.edge_sidecar_to_children.edges.length;
          i++
        ) {
          this.payload.medias.push({});
        }
        this.previewData.node.edge_sidecar_to_children.edges.forEach(
          (item, idx) => {
            this.submitToPostFeedMultiple(item, idx);
          }
        );
      } else {
        this.submitToPostFeed();
      }
    },
    submitToPostFeedMultiple(item, idx) {
      this.submitToPostFeed(item, idx);
    },
    submitToPostFeed(item, idx = 0) {
      if (this.payload.channel == null) {
        this.alertErrorChannel = true;
        this.errorMessage = "Harap Pilih Channel";
      } else {
        this.loadingSubmit = true;
        const type = item
          ? item.node.is_video
            ? "video"
            : "image"
          : this.previewData.node.is_video
          ? "video"
          : "image";
        return this.getDataFileToServer({
          url: item
            ? item.node.is_video
              ? item.node.video_url
              : item.node.display_url
            : this.previewData.node.is_video
            ? this.previewData.node.video_url
            : this.previewData.node.display_url,
          type,
        })
          .then((response) => {
            let res = response.data;
            if (res.Location) {
              if (type == "video") {
                this.actionPostToDraftVideo(
                  `https://${res.Location}`,
                  item,
                  idx
                );
                if (this.previewData.node.__typename == "GraphSidecar") {
                  this.sidecarProcess++;
                }
              } else {
                this.actionPostToDraftImage(
                  `https://${res.Location}`,
                  item,
                  idx
                );
                if (this.previewData.node.__typename == "GraphSidecar") {
                  this.sidecarProcess++;
                }
              }
              if (process.env.VUE_APP_SERVER_STATUS === "production") {
                this.payload.medias[
                  idx ? idx : 0
                ].url = `https://${res.Location}`;
              } else {
                this.payload.medias[
                  idx ? idx : 0
                ].url = `https://${res.Location}`;
              }
            } else {
              if (this.previewData.node.__typename == "GraphSidecar") {
                this.sidecarProcess++;
              }
              this.loadingSubmit = false;
              this.alertFailed = true;
              this.errorMessage = "Upload Failed";
              console.log("error tapi 200");
            }
          })
          .catch((err) => {
            if (this.previewData.node.__typename == "GraphSidecar") {
              this.sidecarProcess++;
            }
            this.loadingSubmit = false;
            this.alertFailed = true;
            this.errorMessage = "Upload Failed 500";
          });
      }
    },
    actionPostToDraftImage(url, item, idx = 0) {
      this.payload.medias[idx].type = "image";
      this.payload.medias[idx].url = url;
      this.payload.medias[idx].metadata = {
        width: item
          ? item.node.dimensions.width
          : this.previewData.node.dimensions.width,
        height: item
          ? item.node.dimensions.height
          : this.previewData.node.dimensions.height,
        size: 100,
      };
      this.payload.medias[idx].thumbnail = {
        small: url,
        medium: url,
        large: url,
      };

      if (!item) {
        this.actionPostFeed();
      }
      // else {
      //   this.sidecarProcess++;
      // }
    },
    actionPostToDraftVideo(url, item, idx = 0) {
      const currentDateEpoch = moment(new Date()).valueOf();
      const filePath = `/img/media/${currentDateEpoch}.jpg`;
      let response;
      return this.drawImageOnCanvas(url, 0.0, idx)
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
            this.payload.medias[idx ? idx : 0].type = "video";
            this.payload.medias[idx ? idx : 0].thumbnail = {
              small: url,
              medium: url,
              large: url,
            };
            if (!item) {
              this.actionPostFeed();
            }
            // else {
            //   this.sidecarProcess++;
            // }
          } else {
            this.payload.medias[idx ? idx : 0].type = "video";
            this.payload.medias[idx ? idx : 0].thumbnail = {
              small: response.url,
              medium: response.url,
              large: response.url,
            };

            if (!item) {
              this.actionPostFeed();
            }
            // else {
            //   this.sidecarProcess++;
            // }
          }
        })
        .catch((err) => {
          console.log({ err });
        });
    },
    drawImageOnCanvas(url, seekTo, idx = 0) {
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

            this.payload.medias[idx ? idx : 0].metadata = {
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
          this.loadingSubmitMultiple = false;
          this.actionChangeStatusPreviewTiktokSuccess(true);
          this.actionChangeStatusPreviewTiktok(false);
        })
        .catch((err) => {
          this.loadingSubmit = false;
          this.loadingSubmitMultiple = false;
          this.alertFailed = true;
          this.payloadFailed = err.response;
          this.changeStatusPreviewTiktokFailed(true);
        });
    },
    openInNew(v) {
      window.open(v, "_blank");
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

.channel-error {
  font-size: 12px;
  font-weight: 500;
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
