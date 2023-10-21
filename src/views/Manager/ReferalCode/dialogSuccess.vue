<template>
   <v-dialog v-model="dialogSucces" width="200">
      <v-card class="box ">
        <div class="d-flex justify-center">
          <v-icon class="text-center" size="20px" color="success">far fa-check-circle</v-icon>
        </div>
        <div class="box__label">Referral Code berhasil ditambahkan</div>
      </v-card>
    </v-dialog>
</template>

<script>

export default {
  props : {
    dialogSucces : {
      type : Boolean
    }
  },
  computed : {
    isDialog : {
      get() {
        return this.dialogSucces
      },
      set () {
        this.$emit('closeDialogSuccess'. false)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.box {
  padding: 16px;
  &__label {
    color: $charcoal;
    font-size: 12px;
    font-weight: 500;
    text-align: center;
  }
}
</style>