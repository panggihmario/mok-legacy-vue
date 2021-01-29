<template>
  <v-dialog v-model="dialog" persistent width="484">
    <v-card class="text-center pa-8">
      <v-card-title class="d-flex justify-center mb-4">
        <span v-text="title"></span>
      </v-card-title>
      <custom-select
        :items="items"
        item-text="name"
        item-value="id"
        return-object
        v-model="payload"
      ></custom-select>
      <v-card-actions class="d-flex justify-center">
        <custom-button @click="closeDialog">Batalkan</custom-button>
        <custom-button
          color="primary"
          class="white--text ml-6"
          @click="handleClick"
          :loading="loading"
          :disabled="payload.id == '' ? true : false"
          >Simpan Alasan Penolakan</custom-button
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
    },
    title: {
      type: String,
      default: "Title",
    },
    items: {
      type: Array,
    },
    rules: {
      type: String,
    },
    dialog: {
      type: Boolean,
    },
    loading: {
      type: Boolean,
    },
  },
  data() {
    return {
      payload: {
        id: "",
        name: "",
      },
    };
  },
  methods: {
    handleClick() {
      this.$emit("handleClick", this.payload);
    },
    closeDialog() {
      this.$emit("closeDialog");
    },
  },
};
</script>
