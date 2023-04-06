<template>
  <div>
    <upload-oss
      :id="id" style="display: none" 
      @response="getImage"
      :minVideoHeight="720"
      :typeAllowed="['jpeg','png', 'jpg', 'mp4']"
    />
    <div class="image-box" :class="{'isLowResolution' : isLowResolution}" >
      <div v-if="isLowResolution" class="actions-resolution">
        <custom-button 
          size="x-small"
          color="warning"
          @click="useVideo">Gunakan video
        </custom-button>
        <custom-button 
          size="x-small"
          color="success"
          @click="uploadImage(id)">Ubah video
        </custom-button>
      </div>
      <div v-else @click="uploadImage(id)">
        <img v-if="image"  :src="image" class="show-image"/>
        <div v-else>
          <div class="d-flex justify-center">
            <v-icon class="text-center" size="18px" color="secondary">$upload</v-icon>
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
    <div class="err-msg">{{errorMessage}}</div>
  </div>
</template>

<script>
import mixins from "@/mixins/upload.js";
export default {
  mixins: [mixins],
  props : {
    id : String,
  },
  data () {
    return {
      thumbnail : '',
      visible : false,
      image : '',
      errorMessage : '',
      isLowResolution : false,
      bundle : null
    }
  },
  methods : {
    useVideo() {
      this.isLowResolution = false
      this.$emit('displayWarning', false)
      this.uploadWithTencent(this.bundle)
        .then(payload => {
          const idUpload = this.id.split('-')
          const position = idUpload[1]
          this.image =  payload.response.thumbnail.large
          const params = {
            position,
            response : payload.response
          }
          this.$emit('saveImageOnPayload',params)
          this.visible = false
        })
    },
    uploadImage(id) {
      document.getElementById(id).click();
    },
    getImage(payload) {
      this.image = ''
      const idUpload = this.id.split('-')
      const position = idUpload[1]
      if(payload.status === 'success' ){
        const typeMedia = payload.response.type
        this.image = typeMedia === 'image' ? payload.response.url : payload.response.thumbnail.large
        const params = {
          position,
          response : payload.response
        }
        this.$emit('saveImageOnPayload',params)
        this.visible = false
      }
      else if(payload.status === 'failed') {
        this.visible = false
        this.errorMessage = payload.message
        setTimeout(() => {
          this.errorMessage = ''
        },3000)
      }else if(payload.isLowResolution) {
        this.isLowResolution = true
        this.bundle = payload.bundle
        this.$emit('displayWarning', true)
      }
      else {
        this.visible = true;
        this.$emit('displayWarning', false)
        this.isLowResolution = false
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
  position: relative;
}

.isLowResolution {
  border: 1px dashed $warning;
}
.err-msg {
  width: 100px;
  font-size: 10px;
  color: red;
  margin-top: 5px;
}
.actions-resolution {
  display: flex;
  flex-direction: column;
  gap: 10px;
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), #FFFFFF;
  height: 100%;
  width: 100%;
  justify-content: center;
  padding: 5px;
}

.show-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  aspect-ratio: 1;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
</style>