<template>
  <div>
		<div>
		<label-field :class="label && 'mb-5'">{{label}}</label-field>
		</div>
    <v-btn
      height="50px"
      solo
      elevation="0"
      color="whitesnow"
      class="upload__button"
			@click="handleUpload"
    >
      <v-icon left>$upload</v-icon>
      <span class="text-capitalize grey--text upload__label">Upload Foto</span>
    </v-btn>
    <input @change="onLoad" class="upload__core" :id="id"  type="file" />
  </div>
</template>

<script>
export default {
	props : {
		id : {
			type : [String, Number]
		},
		label : {
			type : String
		}
	},
	methods : {
		onLoad(e) {
			const file = e.target.files[0]
			console.log(file)
		},
		handleUpload() {
			document.getElementById(this.id).click()
		}
	}
}
</script>

<style lang="sass" scoped>
.upload
	&__label
		letter-spacing: 0 !important
	&__button
		border-radius: $border-radius-root
	&__core
		display: none
</style>
