<template>
  <v-dialog v-model="dialogDelete" width="485" @click:outside="closeDialog">
    <v-card class="card__container">
      <v-icon color="warning" size="20">mdi-alert-circle</v-icon>
      <div>
        <div class="card__title">Apakah kamu yakin ingin menghapus postingan ini?</div>
        <div class="card__content">Postingan yang kamu hapus akan dihilangkan dari list feed ini,
          dan kamu tidak akan bisa mengembalikan potingan yang sudah dihapus.
        </div>
        <div class="card__actions">
          <custom-button size="small" @click="closeDialog" color="secondary"> Batalkan Hapus Postingan </custom-button>
          <custom-button size="small" @click="onDelete" color="warning"> Hapus Postingan </custom-button>
        </div>
      </div>
      <div class="card__close">
        <v-icon size="18" @click="closeDialog">mdi-close</v-icon>
      </div>
     
    </v-card>

  </v-dialog>

</template>

<script>
import { mapActions } from 'vuex';
export default {
  props: {
    dialogDelete: {
      require: true,
      type: Boolean
    }
  },
  methods: {
    ...mapActions({
      deleteFeed : 'post/deleteFeed'
    }),
    closeDialog() {
      this.$emit('closeDialogDelete', false)
    },
    onDelete() {
      this.$emit('handleDelete')
    }

  }
}
</script>

<style lang="scss">
.card {
  &__container {
    padding: 32px 32px 36px 32px;
    display: flex;
    gap: 13px;
    align-items: flex-start;
    position: relative;
  }

  &__title {
    font-size: 14px;
    font-weight: 800;
    line-height: 19px;
    margin-bottom: 8px;
  }

  &__content {
    color: #4A4A4A;
    font-size: 12px;
    font-weight: 600;
  }
  &__actions {
    display: flex;
    gap: 13px;
    margin-top: 24px;
  }
  &__close {
    position: absolute;
    top: 10px;
    right: 20px;
  }
}
</style>