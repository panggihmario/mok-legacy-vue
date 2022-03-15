<template>
  <div>
    <Modal
      @close="closeModal"
    />
    <!-- <div class="text-center">
      <v-btn color="error" @click="overlay = !overlay"> Show Overlay </v-btn>

      <v-overlay :value="overlay">
        <div class="cek">
        <v-icon large color="green darken-2"> mdi-domain </v-icon>
        <v-card color="white" width="852px">
          <v-card-title> card </v-card-title>
        </v-card>
        <v-icon large color="green darken-2"> mdi-domain </v-icon>
        </div>
      </v-overlay>
    </div> -->
  </div>
</template>

<script>
import Modal from "./modal.vue";

export default {
  name: "App",
  components: {
    Modal,
  },
  data() {
    return {
      isModalVisible: false,
      overlay: false,
    };
  },
  methods: {
    showModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.check {
  display: flex;
  gap: 10px;
}
</style>
