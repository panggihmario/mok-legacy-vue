<template>
  <div class="upload__container">
    <div class="upload__title black--text">Upload Produk</div>
    <div class="grey--text upload__subtitle">
      Format gambar .jpg .png dan ukuran minimum 300 x 300px (Untuk gambar
      optimal gunakan ukuran minimum 700x 700px)
    </div>
    <v-row no-gutters>
      <v-col class="d-flex justify-center"  v-for="(upload, i) in uploadImages" :key="i">
				<UploadBox
					:label="upload.label"
					:index="i"
					@responseImage="responseImage"
				/>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import UploadBox from '@/containers/UploadBox'
export default {
	components : {
		UploadBox
	},
	methods : {
		responseImage (payload) {
			console.log("xxx",payload)
		}
	},
  data() {
    return {
      uploadImages: [
        {
          label: "Gambar Utama",
          image: {}
        },
        {
          label: "Tampak Depan",
          image: {}
        },
        {
          label: "Tampak Samping",
          image: {}
        },
        {
          label: "Tampak Belakang",
          image: {}
        }
      ]
    };
  }
};
</script>

<style lang="sass" scoped>
.upload
	&__container
		padding: 33px
		border-radius: 10px
		box-shadow:  2px 2px 12px rgba(0, 0, 0, 0.1)
	&__title
		font-size: 23px
		font-weight: 500
	&__subtitle
		font-size: 13px
	&__box-container
		width: 170px
	&__box
		border: 1px dashed #BBBBBB
		border-radius: 5px
		box-sizing: border-box
		height: 170px
		width: 100%
		display: flex
		justify-content: center
		align-items: center
		&__content-text
			font-size: 12px
</style>
