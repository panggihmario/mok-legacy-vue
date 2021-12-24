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
import axios from "axios";
export default {
  data() {
    return {
      loadingUpload: false,
    };
  },
  props: {
    id: {
      type: [String, Number],
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
    onLoad(e) {
      const file = e.target.files[0];
      console.log(file)
      let form = new FormData();
      form.append("file", file);
      let result = {
        status: "loading",
        response: {},
      };
      const payload = {
        url: "upload?type=media",
        method: "post",
        data: form,
      };
      // let widthMedia
      // let reader = new FileReader();
      // reader.readAsDataURL(file);
      // reader.onload = evt => {
      //   let img = new Image();
      //   img.onload = () => {
      //     widthMedia = img.width
      //     console.log("woiii")
      //   }
      //   console.log("===>",widthMedia)
      // }
      this.loadingUpload = true;
      this.$emit("response", result);
      this.$httpUpload()
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
