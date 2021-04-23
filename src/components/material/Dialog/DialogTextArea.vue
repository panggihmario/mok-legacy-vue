<template>
  <v-dialog v-model="dialog" persistent width="484">
    <v-card class="text-center pa-8">
      <v-card-title class="d-flex justify-center mb-4">
        <span v-text="title"></span>
      </v-card-title>
      <custom-textarea
        :value="value"
        placeholder="Komplain ini tidak valid karena.."
        name="Admin Report"
        rules="required"
        color="white"
        flat
        outlined
        v-on="inputListeners"
      />
      <v-card-actions class="d-flex justify-center">
        <custom-button @click="closeDialog">Batalkan</custom-button>
        <custom-button
          color="primary"
          class="white--text ml-6"
          @click="handleClick"
          :loading="loading"
          :disabled="value ? false : true"
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
    value: {
      type: String,
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
  computed: {
    inputListeners() {
      const vm = this;
      return Object.assign({}, this.$listeners, {
        input: function(event) {
          vm.$emit("input", event);
        },
      });
    },
  },
  methods: {
    handleClick() {
      this.$emit("handleClick");
    },
    closeDialog() {
      this.$emit("closeDialog");
    },
  },
};
</script>
