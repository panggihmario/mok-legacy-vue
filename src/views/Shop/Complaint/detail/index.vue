<template>
  <div>
    <HeaderContent
      label="Detail Komplain"
      v-if="item.order"
      :list="[
        {
          text: 'Komplain',
        },
        {
          text: 'List Komplain',
          disabled: true,
        },
        {
          text: item.order.noInvoice,
          disabled: true,
        },
      ]"
    >
      <div v-if="item.status == 'NEW'">
        <custom-button @click="openDialog">Komplain Tidak Valid</custom-button>
        <custom-button
          :loading="loading"
          color="primary"
          class="ml-4"
          @click="handleProcessComplaint"
          >Proses Komplain</custom-button
        >
      </div>
      <div v-if="item.status == 'PROCESS'">
        <custom-button
          color="primary"
          class="white--text"
          @click="handleFinishComplaint"
          >Mediasi Selesai</custom-button
        >
      </div>
    </HeaderContent>

    <v-row no-gutters>
      <v-col lg="6">
        <Detail-Product v-if="item.order" :item="item"></Detail-Product>
      </v-col>
      <v-col lg="6" v-if="item.status != 'NEW'">
        <Detail-Mediation :item="item" :payload="payload"></Detail-Mediation>
      </v-col>
    </v-row>
    <Dialog-Text-Area
      :value="adminReport"
      :dialog="dialog"
      :loading="loadingReject"
      rules="required"
      title="Komplain tidak valid"
      name="Admin Report"
      @input="input"
      @handleClick="handleRejectComplaint"
      @closeDialog="closeDialog"
    ></Dialog-Text-Area>
    <v-snackbar top right v-model="alertSuccess" color="success">
      Proses Mediasi Berhasil
    </v-snackbar>
    <v-snackbar top right v-model="alertFailed" color="error">
      Proses Mediasi Gagal
    </v-snackbar>
  </div>
</template>

<script>
import HeaderContent from "@/containers/HeaderContent";
import DialogTextArea from "@/components/material/Dialog/DialogTextArea.vue";
import DetailProduct from "./product.vue";
import DetailMediation from "./mediation.vue";
import { mapActions } from "vuex";

export default {
  components: {
    HeaderContent,
    DialogTextArea,
    DetailProduct,
    DetailMediation,
  },
  data() {
    return {
      loading: false,
      loadingReject: false,
      dialog: false,
      alertSuccess: false,
      alertFailed: false,
      item: {},
      adminReport: "",
      payload: {
        evidenceBuyerReceipt: "",
        evidenceSellerReceipt: "",
        adminReport: "",
        finalDecision: true,
      },
    };
  },
  mounted() {
    this.handleGetListComplaint();
  },
  methods: {
    ...mapActions({
      getComplaintById: "complaint/getComplaintById",
      postComplaintProcess: "complaint/postComplaintProcess",
      putComplaintFinish: "complaint/putComplaintFinish",
    }),
    async handleGetListComplaint() {
      const payload = {
        id: this.$route.params.id,
      };
      const response = await this.getComplaintById(payload);
      if (response.status === 200 || 204) {
        this.item = response.data.data;
      } else {
        console.error(response);
      }
    },
    async handleProcessComplaint() {
      const params = {
        id: this.$route.params.id,
        status: "process",
      };
      this.loading = true;
      const response = await this.postComplaintProcess(params);
      if (response.status === 200 || 204) {
        this.$router.push("/complaint");
        this.loading = false;
      } else {
        console.error(response);
        this.loading = false;
      }
    },
    async handleRejectComplaint() {
      const params = {
        id: this.$route.params.id,
        status: "reject",
        adminReport: this.adminReport,
      };
      this.loadingReject = true;
      const response = await this.postComplaintProcess(params);
      if (response.status === 200 || 204) {
        this.$router.push("/complaint");
        this.loadingReject = false;
      } else {
        console.error(response);
        this.loadingReject = false;
      }
    },
    async handleFinishComplaint() {
      const params = {
        ...this.payload,
        id: this.$route.params.id,
      };
      this.loading = true;
      const response = await this.putComplaintFinish(params);
      if (response.status === 200 || 204) {
        this.$router.push("/complaint");
        this.loading = false;
        this.alertSuccess = true;
        setTimeout(() => {
          this.alertSuccess = false;
        }, 2000);
      } else {
        console.error(response);
        this.loading = false;
        this.alertFailed = true;
        setTimeout(() => {
          this.alertFailed = false;
        }, 2000);
      }
    },
    input(text) {
      this.adminReport = text;
    },
    openDialog() {
      this.dialog = true;
      this.loadingReject = false;
    },
    closeDialog() {
      this.dialog = false;
      this.loadingReject = false;
    },
  },
};
</script>
