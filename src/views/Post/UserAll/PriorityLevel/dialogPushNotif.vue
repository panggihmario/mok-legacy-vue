<template>
  <v-dialog v-model="dialogPushNotif" width="356" @click:outside="closeDialogPushNotif">
    <v-card class="notif">
      <v-icon @click="closeDialogPushNotif" class="notif__close" size="small">fas fa-times</v-icon>
      <v-icon color="secondary">fas fa-exclamation-circle</v-icon>
      <div>
        <div class="notif__label">
          Apakah kamu yakin ingin melakukan push notif untuk konten ini?
        </div>
        <div class="notif__content">
          Postingan ini akan disebarkan ke seluruh user kipaskipas dalam
          bentuk notifikasi, hati-hati untuk tidak terlalu sering melakukan
          ini karena akan sangat mengganggu user nantinya.
        </div>
        <div class="d-flex" style="gap: 8px;">
          <custom-button @click="closeDialogPushNotif" size="small">Batalkan</custom-button>
          <custom-button size="small" color="secondary" @click="actionPushNotif">
            Push Notif Sekarang
          </custom-button>
        </div>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props : {
    dialogPushNotif : {
      type : Boolean
    }
  },
  methods : {
    closeDialogPushNotif () {
      this.$emit('closeDialogPushNotif', false)
    },
    actionPushNotif () {
      this.$emit('actionPushNotif')
    }
  }
}

</script>

<style lang="scss" scoped src="../style.scss">

</style>