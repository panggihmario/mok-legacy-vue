<template>
  <v-dialog v-model="dialogPushNotif" width="410" @click:outside="closeDialogPushNotif">
    <v-card class="notif">
      <v-icon @click="closeDialogPushNotif" class="notif__close" size="small">fas fa-times</v-icon>
      <v-icon color="secondary">fas fa-exclamation-circle</v-icon>
      <div>
        <div class="notif__label">
          Apakah kamu yakin ingin melakukan push notif untuk kontenini?
        </div>
        <div class="notif__content">
          Postingan ini akan disebarkan ke seluruh user kipaskipas dalam
            bentuk notifikasi, hati-hati untuk tidak terlalu sering melakukan
            ini karena akan sangat mengganggu user nantinya.
          </div>
          <div class="d-flex" style="gap: 8px;">
          <custom-button @click="closeDialogPushNotif" size="small">Batalkan</custom-button>
          <custom-button size="small" color="secondary" @click="actionPushNotif">
            Jadikan Postingan ini Priority
          </custom-button>
          </div>
        </div>
      <!-- <div class="d-flex no-gutters">
        <div class="text-end pt-6" style="width: 40px">
          <v-icon color="secondary" size="20">mdi-alert-circle</v-icon>
        </div>
        <div class="font-12 pt-6 px-4" style="width: 340px">
          <span class="font-14 black--text">Apakah kamu yakin ingin melakukan push notif untuk konten
            ini?</span>
          <p class="mt-2 pr-4 grey--text">
            Postingan ini akan disebarkan ke seluruh user kipaskipas dalam
            bentuk notifikasi, hati-hati untuk tidak terlalu sering melakukan
            ini karena akan sangat mengganggu user nantinya.
          </p>
          <div class="d-flex justify-space-between mb-6">
            <v-btn x-small height="29" width="146" depressed class="text-capitalize" style="border-radius: 8px"
              @click="closeDialogPushNotif">Batalkan Push Notif</v-btn>
            <v-btn x-small height="29" width="150" depressed class="text-capitalize" color="secondary"
              style="border-radius: 8px" @click="actionPushNotif">Push Notif Sekarang</v-btn>
          </div>
        </div>
        <div class="d-flex justify-end" style="width: 30px">
          <v-btn rounded icon>
            <v-icon size="18" @click="closeDialogPushNotif">mdi-close</v-icon>
          </v-btn>
        </div>
      </div> -->
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