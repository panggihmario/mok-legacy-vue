<template>
  <v-dialog v-model="dialog" persistent width="484">
    <v-card class="text-center pa-8">
      <v-card-title class="d-flex justify-center">
        <span v-text="title"></span>
      </v-card-title>
      <v-card-text>
        <span v-text="description"></span>
      </v-card-text>
      <v-card-actions class="d-flex justify-center">
        <custom-button @click="closeDialog">Batal</custom-button>
        <custom-button
          color="carmine"
          class="white--text ml-6"
          @click="handleClick"
          :loading="loading"
        >Hapus</custom-button>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    title: {
      type: String
    },
    description: {
      type: String
    },
    dialog: {
      type: Boolean
    },
    loading: {
      type: Boolean
    },
    closeDialog: {
      type: Function
    },
    handleClick: {
      type: Function
    }
  }
};
</script>
