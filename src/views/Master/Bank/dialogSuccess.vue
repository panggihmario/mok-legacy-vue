<template>
  <v-dialog width="200" v-model="dialogMessage">

    <v-card class="dialog__card">
      <div class="text-center">
        <v-icon color="success">
        mdi-checkbox-marked-circle
      </v-icon>
      </div>
    
      <div class="dialog__label"> {{ label }} </div>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    dialogMessage: {
      type: Boolean
    },
    label: {
      type: String
    }
  }
}
</script>

<style lang="scss" scoped>
.dialog {
  &__card {
    padding: 24px;
  }
  &__label {
    font-size: 12px;
    font-weight: 500;
    color: $black;
    margin-top: 16px;
  }
}
</style>