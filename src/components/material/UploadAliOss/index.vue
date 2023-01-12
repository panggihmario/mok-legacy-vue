<template>
  <div>
    <div>
      <label-field :class="label && 'mb-5'">{{ label }}</label-field>
    </div>
    <v-btn height="29px" :outlined="!text" :text="text" elevation="0" :color="color" class="upload__button"
      @click="handleUpload" :loading="loadingUpload">
      <v-icon :color="color" left>$upload</v-icon>
      <span class="text-capitalize upload__label" :class="`${color}--text`">Upload Foto</span>
    </v-btn>
    <div id="output"
      style="display: inline-block; top: 4px; position: relative ;border: dotted 1px #ccc; padding: 2px;"></div>

    <input @change="onLoad" class="upload__core" :id="id" type="file" />
  </div>
</template>

<script>
import moment from "moment"
export default {
  data() {
    return {
      loadingUpload: false,
      asetKipas: 'https://asset.kipaskipas.com',
      media: {
        size: "",
        width: "",
        height: "",
      },
      height: '',
      result: {
        status: "before upload",
        response: null,
        message: "ready to upload",
      },
      dataResponse: {
        id: null,
        type: "",
        url: "",
        thumbnail: {},
        metadata: {}
      },
      file: ""
    };
  },
  props: {
    id: {
      type: [String, Number],
    },
    minVideoHeight: {
      type: Number,
      default: 200,
    },
    label: {
      type: String,
    },
    typeUpload: {
      type: String,
      default: "medias",
    },
    color: {
      type: String,
      default: "carmine",
    },
    text: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    dimensionVideo(file) {
      return new Promise((resolve, reject) => {
        const url = URL.createObjectURL(file);
        const $video = document.createElement("video");
        $video.src = url;
        $video.addEventListener("loadedmetadata", function () {
          const params = {
            height: this.videoHeight,
            width: this.videoWidth
          }
          resolve(params)
        })
      }
      )
    },
    dimensionImage(file) {
      return new Promise((resolve, reject) => {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (evt) => {
          let img = new Image();
          img.onload = () => {
            const params = {
              height: img.height,
              width: img.width,
              // size : file.size
            }
            resolve(params)
            this.media.width = img.width;
            this.media.height = img.height;
          };
          img.src = evt.target.result;
        }
      })
    },
    getDimension(typeMedia, file) {
      if (typeMedia === "video") {
        return this.dimensionVideo(file);
      } else {
        return this.dimensionImage(file)
      }
    },
    async onLoad(e) {
      let result = {
        status: "loading",
        response: {},
      };
      const file = e.target.files[0]
      this.file = file
      const type = file.type.split("/")
      const typeMedia = type[0];
      // console.time('validationMedia')
      // console.time('getDimension')
      const dimensions = await this.getDimension(typeMedia, file);
      this.loadingUpload = true;
      this.$emit("response", result);
      const isValid = this.validationMedia(typeMedia, dimensions);
      // console.timeEnd('validationMedia')
      // console.timeEnd('getDimension')
      if (isValid) {
        // console.time('saveFileToAliOss')
        return this.saveFileToAliOss(file, typeMedia, dimensions)
        // console.timeEnd('saveFileToAliOss')
      } else {
        const tempResult = this.printError(file)
        this.$emit('response', tempResult)
      }
    },
    saveFileToAliOss(file, type, dimensions) {
      let data = {
        ...this.dataResponse,
        type,
        metadata: {
          width: dimensions.width,
          height: dimensions.height,
          size: file.size
        }
      }
      const fileType = file.type.split("/")[1]
      this.dataResponse = data
      const currentDateEpoch = moment(new Date).valueOf()
      const filePath = `/img/media/${currentDateEpoch}.${fileType}`
      return this.$storeOss.put(filePath, file)
        .then(response => {
          let url
          const urlObject = new URL(response.url)
          // const tempUrl = `${urlObject.origin}/temp/${response.name}`
          // console.log('temp url', tempUrl)
          if (process.env.VUE_APP_SERVER_STATUS === 'production') {
            url = `${this.asetKipas}/${response.name}`
            this.dataResponse.url = url
            if (type === 'video') {
              return this.createThumbnail(file, 0.0)
            } else {
              return {
                large: url,
                medium: url,
                small: url
              }
            }
          } else {
            this.dataResponse.url = response.url
            if (type === 'video') {
              return this.createThumbnail(file, 0.0)
            } else {
              return {
                large: response.url,
                medium: response.url,
                small: response.url
              }
            }
          }

        })
        .then(thumbnail => {
          const temp = {
            ...this.dataResponse,
            thumbnail
          }
          this.dataResponse = temp
          let result = {
            response: temp,
            status: 'success'
          }
          this.$emit('response', result)
          return this.$storeOss.putACL(filePath, 'public-read')
        })
    },
    createThumbnail(file, seekTo) {
      const currentDateEpoch = moment(new Date).valueOf()
      const filePath = `/img/media/${currentDateEpoch}.jpg`
      let response
      return this.drawImageOnCanvas(file, seekTo)
        .then((base64data => {
          const d = this.dataURLtoFile(base64data, `${+new Date()}.jpg`)
          return this.$storeOss.put(filePath, d)
        }))
        .then((resp) => {
          response = resp
          return this.$storeOss.putACL(filePath, 'public-read')
        })
        .then(() => {
          let url
          if (process.env.VUE_APP_SERVER_STATUS === "production") {
            url = `${this.asetKipas}/${response.name}`
            return {
              large: url,
              medium: url,
              small: url
            }
          } else {
            return {
              large: response.url,
              medium: response.url,
              small: response.url
            }
          }
        })
    },
    drawImageOnCanvas(file, seekTo) {
      return new Promise((resolve, reject) => {
        const videoPlayer = document.createElement('video');
        videoPlayer.setAttribute('src', URL.createObjectURL(file));
        videoPlayer.crossOrigin = "anonymous";
        videoPlayer.load();
        videoPlayer.addEventListener('error', (ex) => {
          reject("error when loading video file", ex);
        });

        videoPlayer.addEventListener('loadedmetadata', () => {

          if (videoPlayer.duration < seekTo) {
            reject("video is too short.");
            return;
          }
          setTimeout(() => {
            videoPlayer.currentTime = seekTo;
          }, 200);
          videoPlayer.addEventListener('seeked', () => {
            const canvas = document.createElement("canvas");
            canvas.width = videoPlayer.videoWidth;
            canvas.height = videoPlayer.videoHeight;
            const ctx = canvas.getContext("2d");
            ctx.drawImage(videoPlayer, 0, 0, canvas.width, canvas.height);
            ctx.canvas.toBlob(
              blob => {
                var reader = new FileReader();
                reader.readAsDataURL(blob);
                reader.onloadend = function () {
                  var base64data = reader.result;
                  resolve(base64data)
                }
              },
              "image/jpeg",
              0.75 /* quality */
            );
          });
        });
      });
    },
    dataURLtoFile(dataurl, filename) {
      let arr = dataurl.split(',')
      let mime = arr[0].match(/:(.*?);/)[1]
      let bstr = atob(arr[1])
      let n = bstr.length
      let u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], filename, { type: mime });
    },
    printError(file) {
      const result = {
        status: 'failed',
        message: `Minimum height ${file.type} is ${this.minVideoHeight}`
      }
      return result
    },
    validationMedia(typeMedia, dimensions) {
      const minVideoHeight = this.minVideoHeight;
      if (typeMedia === "video") {
        const heightVideo = dimensions.height;
        if (heightVideo < minVideoHeight) {
          return false;
        } else {
          return true;
        }
      } else {
        return true;
      }
    },
    handleUpload() {
      document.getElementById(this.id).click();
    },
  },
};
</script>

<style lang="sass" scoped>
.upload
  &__label
    letter-spacing: 0 !important
    font-size: 10px
  &__button
    border-radius: $border-radius-root
  &__core
    display: none
</style>
