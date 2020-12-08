<template>
  <v-dialog 
    :value="dialogForm" 
    max-width="730"
    @click:outside="closeDialog"
  >
    <v-card>
      <div class="ads__container">
        <div>
          <div class="charcoal--text ads__title">Top</div>
          <custom-upload
            class="mb-1 ml-4"
            id="upload-banner"
            @response="getImage"
            style="display: none"
          />
        
          <div
            class="ads__image-container"
            @click="uploadImage('upload-banner')"
          >
            <v-img
              contain
              v-if="image"
              :src="image"
              max-height="100%"
              max-width="100%"
              :aspect-ratio="1"
            />
            <div v-else class="d-flex justify-center align-center ads__icon">
              <div style="width : 150px">
                <div class="d-flex justify-center">
                  <v-icon size="20px" class="mr-1" color="secondary">$upload</v-icon>
                  <div class="d-flex align-center ads__icon-text secondary--text">Gambar</div>
                </div>
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
          <custom-input
            placeholder="Name"
            v-model="payloadBanner.name"
          />
          <div class="d-flex justify-end">
            <custom-button @click="closeDialog" class="mr-4">Batal</custom-button>
            <custom-button 
              color="primary"
              @click="onClick"
              :loading="loading"
            >
              Tambah Iklan
            </custom-button>
          </div>
          
        </div>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  props : ['dialogForm'],
  data () {
    return {
      payloadBanner : {
        name : '',
        media : []
      },
      visible : false,
      image : '',
      loading : false
    }
  },
  methods : {
    ...mapActions({
      addBannerAds : 'ads/addBannerAds'
    }),
    closeDialog() {
      this.$emit('closeDialogForm', false)
      this.payloadBanner = {
        name : '',
        media : []
      }
      this.image = ''
    },
    async onClick() {
      const response = await this.addBannerAds(this.payloadBanner)
      this.loading = true
      if(response.status === 201) {
        setTimeout(() => {
          this.closeDialog()
          this.$emit("reloadListAds")
          this.loading = false
          }, 1500)
      }else {
        this.loading = false
      }
    },
    uploadImage(id) {
      document.getElementById(id).click();
    },
    getImage(params) {
      if(params.status === 'success') {
        this.visible = false
        this.image = params.response.url
        this.payloadBanner.media.splice(0, 1, params.response);
      }else{
        this.visible = true
      }
    }
  }
}
</script>

<style lang="sass" scoped>
.ads
  &__container
    padding: 10px 10px 20px 10px
    display: flex
    justify-content: center
  &__image-container
    width: 684px
    height: 90px
    border: 1px dashed #1890FF
    margin-bottom: 20px
  &__title
    font-size: 20px
    font-weight: 500
    margin-bottom: 20px
  &__icon
    height: 100%
    cursor: pointer
  &__icon-text
    font-size: 12px
    font-weight: 500
</style>