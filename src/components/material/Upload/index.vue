<template>
  <div>
    <div>
      <label-field :class="label && 'mb-5'">{{ label }}</label-field>
    </div>
    <v-btn
      height="29px"
      outlined
      elevation="0"
      color="primary"
      class="upload__button"
      @click="handleUpload"
			:loading="loadingUpload"
    >
      <v-icon color="primary" left>$upload</v-icon>
      <span class="text-capitalize primary--text upload__label"
        >Upload Foto</span
      >
    </v-btn>
    <input @change="onLoad" class="upload__core" :id="id" type="file" />
  </div>
</template>

<script>
import axios from "axios";
export default {
	data () {
		return {
			loadingUpload : false
		}
	},
  props: {
    id: {
      type: [String, Number]
    },
    label: {
      type: String
		},
		typeUpload : {
			type : String,
			default : 'medias'
		}
  },
  methods: {
    onLoad(e) {
      const file = e.target.files[0];
      let form = new FormData();
      form.append("file", file);
      let result = {
				status: "loading",
				response : {}
			};
			const payload = {
				url : 'upload?type=media',
				method : 'post',
				data : form
			}
			this.loadingUpload = true
			this.$emit("response", result);
			const uploadApi = process.env.VUE_APP_UPLOAD
			axios.post(`${uploadApi}/${this.typeUpload}`, form)
        .then(response => {
          result = {
            response: response.data,
            status: "success"
					};
					this.loadingUpload = false
					this.$emit("response", result);
        })
        .catch(error => {
          console.log(error.response)
          result = {
            status: "failed"
					};
					this.loadingUpload = false
					this.$emit("response", result);
        });
    },
    handleUpload() {
      document.getElementById(this.id).click();
    },
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
