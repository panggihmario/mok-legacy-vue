<template>
  <v-dialog
    :value="dialogPosition"
    max-width="730"
    @click:outside="closeDialog"
  >
    <v-card class="pa-4">
      <custom-input
        placeholder="posisi iklan"
        v-model="position"
      />
      <div class="d-flex justify-end">
        <custom-button 
          color="primary"
          @click="onClick"
          :loading="loading"
        >
          Buat
        </custom-button>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  props : ['dialogPosition'],
  data (){
    return {
      position : '',
      loading : false
    }
  },
  methods : {
    ...mapActions({
      addBannerPosition : 'ads/addBannerPosition'
    }),
    closeDialog() {
      this.$emit('closeDialogPosition', false)
    },
    async onClick() {
      const payload = {
        name : this.position
      }
      const response = await this.addBannerPosition(payload)
      this.loading = true
      if(response.status === 201) {
        setTimeout(() => {
          this.closeDialog()
          this.position = ''
          this.loading = false
        },1500)
      }else { 
        this.loading = false
      }
    }
  }
}
</script>