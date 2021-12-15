<template>
  <div>
    <custom-upload 
      :id="id" style="display: none" 
      @response="getImage"
    />
    <div @click="uploadImage(id)" class="image-box">
      <v-img
        contain
        v-if="image"
        :src="image"
        max-height="100%"
        max-width="100%"
        :aspect-ratio="1"
      ></v-img>
      <div v-else>
        <div class="d-flex justify-center">
          <v-icon class="text-center" size="18px" color="secondary"
            >$upload</v-icon
          >
        </div>
        <div class="ml-2 text-secondary">Foto/Video</div>
        <v-progress-linear
          color="secondary"
          indeterminate
          rounded
          height="6"
          v-if="visible"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props : {
    id : String,
  },
  data () {
    return {
      thumbnail : '',
      visible : false,
      image : ''
    }
  },
  methods : {
    uploadImage(id) {
      document.getElementById(id).click();
    },
    getImage(payload) {
      const idUpload = this.id.split('-')
      const position = idUpload[1]
      if(payload.status === 'success' ){
        this.image = payload.response.thumbnail.medium
        const params = {
          position,
          response : payload.response
        }
        this.$emit('saveImageOnPayload',params)
        this.visible = false
      }
      else if(payload.status === 'failed') {
        this.visible = false
      }
      else {
        this.visible = true;
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.image-box {
  width: 104px;
  height: 104px;
  background: #FFFFFF;
  border: 1px dashed #1890FF;
  box-sizing: border-box;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #1890FF;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
}
</style>