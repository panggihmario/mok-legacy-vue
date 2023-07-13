<template>
  <v-dialog v-model="dialogPriority" width="356" @click:outside="closeDialogPriority">
    <v-card class="notif">
      <v-icon @click="closeDialogPriority" class="notif__close" size="small">fas fa-times</v-icon>
      <v-icon color="secondary">fas fa-exclamation-circle</v-icon>
      <div>
        <div class="notif__label">
          Apakah kamu yakin ingin menjadikan postingan ini sebagai Postingan Priority?
        </div>
        <div class="notif__content">
          Setelah diubah menjadi postingan priority (Diprioritaskan), maka kamu tidak akan bisa mengubah status priority
          ini sampai postingan ini berhenti menjadi trending.
        </div>
        <div class="d-flex" style="gap: 8px;">
          <custom-button @click="closeDialogPriority" size="small">Batalkan</custom-button>
          <custom-button size="small" color="secondary" @click="handlePriority">
            Jadikan Postingan ini Priority
          </custom-button>
        </div>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props : {
    dialogPriority : {
      type : Boolean
    }
  },
  methods : {
    handlePriority () {
      this.$emit('handlePriority')
    },
    closeDialogPriority () {
      this.$emit('closeDialogPriority', false)
    }
  }
}
</script>

<style lang="scss" scoped src="../style.scss">

</style>