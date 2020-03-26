<template>
  <div>
    <div>
      <label-field :class="label && 'mb-5'">{{ label }}</label-field>
    </div>
    <v-btn
      height="24px"
      outlined
      elevation="0"
      color="carmine"
      class="upload__button"
      @click="handleUpload"
    >
      <v-icon color="carmine" left>$upload</v-icon>
      <span class="text-capitalize carmine--text upload__label"
        >Upload Foto</span
      >
    </v-btn>
    <input @change="onLoad" class="upload__core" :id="id" type="file" />
  </div>
</template>

<script>
import axios from "axios";
export default {
  props: {
    id: {
      type: [String, Number]
    },
    label: {
      type: String
    }
  },
  methods: {
    onLoad(e) {
      const file = e.target.files[0];
      let form = new FormData();
      form.append("file", file);
      const url = "https://persada-upload-test.herokuapp.com";
      let result = {
				status: "loading",
				response : {
					url : ''
				}
			};
			this.$emit("response", result);
      axios
        .post(url, form)
        .then(data => {
          result = {
            response: data.data,
            status: "success"
					};
					this.$emit("response", result);
        })
        .catch(error => {
          result = {
            status: "failed"
					};
					this.$emit("response", result);
        });
    },
    handleUpload() {
      document.getElementById(this.id).click();
    },
    upload() {
      return axios
        .post(url, form)
        .then(data => {
          result = {
            response: data.data,
            status: "success"
					};
					return result
        })
        .catch(error => {
          result = {
            status: "failed"
					};
					return result
        });
    }
  }
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
