<template>
  <div class="upload__box-container">
    <div class="d-flex justify-center">{{ label }}</div>
    <div class="upload__box">
      <div>
        <div
          class="charcoal--text d-flex justify-center upload__box__content-text"
        >
          Gambar Produk
        </div>
        <custom-upload 
					:id="`image-${index}`"
					@response="response"
				/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
	props : {
		label : {
			type : String
		},
		index : {
			type : [String, Number]
		}
	},
	methods : {
		response (payload){
			const newPayload = {
				...payload,
				index : this.index
			}
			this.$emit('responseImage', newPayload)
		}
	}
}
</script>

<style lang="sass" scoped>
.upload
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
