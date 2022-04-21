<template>
  <div>
    <div>
      <label-field :class="label && 'mb-5'">{{ label }}</label-field>
    </div>
    <v-btn
      height="29px"
      :outlined="!text"
      :text="text"
      elevation="0"
      :color="color"
      class="upload__button"
      @click="handleUpload"
      :loading="loadingUpload"
    >
      <v-icon :color="color" left>$upload</v-icon>
      <span class="text-capitalize upload__label" :class="`${color}--text`"
        >Upload Foto</span
      >
    </v-btn>
    <input @change="onLoad" class="upload__core" :id="id" type="file" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      loadingUpload: false,
      media: {
        size: "",
        width: "",
        height: "",
      },
      height : '',
      result: {
        status: "before upload",
        response: null,
        message: "ready to upload",
      },
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
      return new Promise((resolve , reject) => {
         const url = URL.createObjectURL(file);
         const $video = document.createElement("video");
          $video.src = url;
          $video.addEventListener("loadedmetadata", function () {
            const params = {
              height : this.videoHeight,
              width : this.videoWidth
            }
            resolve(params)
          })
      }
      
      
      )},
    dimensionImage(file) {
      return new Promise((resolve , reject) => {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (evt) => {
          let img = new Image();
          img.onload = () => {
            const params = {
              height : img.height,
              width : img.width,
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
      const file = e.target.files[0];
      let form = new FormData();
      form.append("file", file);
      let result = {
        status: "loading",
        response: {},
      };
      const type = file.type.split("/");
      const typeMedia = type[0];
      const dimensions = await this.getDimension(typeMedia, file);
      this.loadingUpload = true;
      this.$emit("response", result);
      const isValid = this.validationMedia(typeMedia, dimensions);
      if(isValid) {
        return this.postApi(form, result)
      }else{
        const tempResult = this.printError(file)
        this.$emit('response', tempResult)
      }
    },
    printError (file) {
      const result = {
        status : 'failed',
        message : `Minimum height ${file.type} is ${this.minVideoHeight}`
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
    postApi(form, result) {
      return this.$httpUpload()
        .post(`${this.typeUpload}`, form)
        .then((response) => {
          result = {
            response: response.data,
            status: "success",
          };
          this.loadingUpload = false;
          this.$emit("response", result);
        })
        .catch((error) => {
          result = {
            status: "failed",
          };
          this.loadingUpload = false;
          this.$emit("response", result);
        });
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
