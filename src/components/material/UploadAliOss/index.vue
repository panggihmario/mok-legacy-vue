<template>
  <div>
    <div>
      <label-field :class="label && 'mb-5'">{{ label }}</label-field>
    </div>
    <v-btn height="29px" :outlined="!text" :text="text" elevation="0" :color="color" class="upload__button"
      @click="handleUpload" :loading="loadingUpload">
      <v-icon :color="color" left>$upload</v-icon>
      <span class="text-capitalize upload__label" :class="`${color}--text`"> {{ title }} </span>
    </v-btn>
    <input @change="onLoad" class="upload__core" :id="id" type="file" />
  </div>
</template>

<script>
import moment from "moment";
import mixins from "@/mixins/upload.js";
export default {
  mixins: [mixins],
  data() {
    return {
      loadingUpload: false,
      errorMessage: '',
      asetKipas: "https://asset.kipaskipas.com",
      media: {
        size: "",
        width: "",
        height: "",
      },
      height: "",
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
        metadata: {},
      },
      file: "",
    };
  },
  props: {
    id: {
      type: [String, Number],
    },
    limitResolution: {
      type: Number
    },
    minVideoHeight: {
      type: Number,
      default: 200,
    },
    maxVideoHeight: {
      type: Number,
      default: 2048
    },
    maxVideoWidth: {
      type: Number,
      default: 2048
    },
    label: {
      type: String,
    },
    typeAllowed: {
      type: [String, Array],
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
    maxSize: {
      type: Number,
    },
    isSquareRatio: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: 'Upload Foto'
    }
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
            width: this.videoWidth,
          };
          resolve(params);
        });
      });
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
            };
            resolve(params);
            this.media.width = img.width;
            this.media.height = img.height;
          };
          img.src = evt.target.result;
        };
      });
    },
    getDimension(typeMedia, file) {
      if (typeMedia === "video") {
        return this.dimensionVideo(file);
      } else {
        return this.dimensionImage(file);
      }
    },
    async onLoad(e) {
      let result = {
        status: "loading",
        response: {},
      };
      const file = e.target.files[0];
      this.file = file;
      const type = file.type.split("/");
      const typeMedia = type[0];
      const dimensions = await this.getDimension(typeMedia, file);
      this.loadingUpload = true;
      this.$emit("response", result);
      const isValid = this.validationMedia(typeMedia, dimensions, file);
      if (isValid) {
        if(typeMedia === 'video') {
          const payload = {
            file,
            dimensions
          }
          this.checkResolution(file,typeMedia, dimensions)
        }else{
          return this.saveFileToAliOss(file, typeMedia, dimensions);
        }
      } else {
        const tempResult = this.printError(file);
        this.$emit("response", tempResult);
        this.loadingUpload = false;
      }
    },
    checkResolution(file, typeMedia, dimensions) {
      const width = dimensions.width
      const height = dimensions.height
      if (width >= this.limitResolution || height >= this.limitResolution) {
        const currentDateEpoch = moment(new Date).valueOf()
        const payload = {
          file,
          dimensions
        }
        return this.uploadVideo(payload)
          .then(response => {
            const result = {
              ...response,
              status : 'success'
            }
            this.$emit("response", result);
            return payload
          })
      } else {
        const result = {
          status: 'low resolution',
          response: null,
          isLowResolution: true,
          bundle: {
            file,
            typeMedia,
            dimensions
          }
        }
        this.$emit("response", result);
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
      const filePath = `/img/tmp/media/${currentDateEpoch}.${fileType}`
      return this.$storeOss.put(filePath, file)
        .then(response => {
          this.loadingUpload = false
          let url
          const urlObject = new URL(response.url)
          const nameUrl = response.name.split('/')
          nameUrl.splice(1, 1)
          const pathTemp = nameUrl.join('/')
          const pathThumbnail = `${urlObject.origin}/${pathTemp}`
          if (process.env.VUE_APP_SERVER_STATUS === 'production') {
            url = `${this.asetKipas}/${response.name}`
            const thumbProd = `${this.asetKipas}/${pathTemp}`
            this.dataResponse.url = url
              return {
                large: thumbProd,
                medium: thumbProd,
                small: thumbProd
              }
          } else {
            this.dataResponse.url = response.url;
              return {
                large: pathThumbnail,
                medium: pathThumbnail,
                small: pathThumbnail
              }
          }
        })
        .then((thumbnail) => {
          const temp = {
            ...this.dataResponse,
            thumbnail,
          };
          this.dataResponse = temp;
          let result = {
            // response: temp,
            // status: "success",
            ...temp,
            status : 'success'
          };
          this.$emit("response", result);
          return this.$storeOss.putACL(filePath, "public-read");
        })
        .catch((err) => {
          throw err
        });
    },
    printError(file) {
      const result = {
        status: "failed",
        message: this.errorMessage,
      };
      return result;
    },
    validationMedia(typeMedia, dimensions, file) {
      const type = file.type.split('/')
      const typeFile = type[1]
      if (this.typeAllowed) {
        const isInclude = this.typeAllowed.includes(typeFile)
        if (this.typeAllowed && !isInclude) {
          this.errorMessage = `Hanya boleh ${this.typeAllowed.join(' ')}`
          return false;
        }
        if (this.maxSize && file.size > this.maxSize) {
          return false;
        }
        if (
          this.isSquareRatio == true &&
          dimensions.height != dimensions.width
        ) {
          return false;
        }
        if (typeMedia === 'video') {
          const heightVideo = dimensions.height;
          const widthVideo = dimensions.width
          if (heightVideo < this.minVideoHeight) {
            this.errorMessage = `Min height is ${this.minVideoHeight}`
            return false
          }
          if (heightVideo > this.maxVideoHeight) {
            this.errorMessage = `Max height is ${this.maxVideoHeight}`
            return false
          }
          if (widthVideo > this.maxVideoWidth) {
            this.errorMessage = `Max width is ${this.maxVideoHeight}`
            return false
          }
        }
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