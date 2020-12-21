<template>
  <div>
    <HeaderContent label="Detail Komplain" :list="crumbs">
      <div v-if="item.status == 'NEW'">
        <custom-button v-text="'Komplain Tidak Valid'"></custom-button>
        <custom-button
          :loading="loading"
          color="primary"
          @click="handleProcessComplaint"
          v-text="'Proses Komplain'"
        ></custom-button>
      </div>
      <div v-if="item.status == 'PROCESS'">
        <custom-button
          color="primary"
          class="white--text ml-2"
          @click="handleFinishComplaint"
          v-text="'Mediasi Selesai'"
        ></custom-button>
      </div>
    </HeaderContent>

    <v-row no-gutters>
      <v-col lg="6">
        <Detail-Product
          v-if="item.order"
          :item="item"
          :inv="inv"
        ></Detail-Product>
      </v-col>
      <v-col lg="6" v-if="item.status != 'NEW'">
        <Detail-Mediation :item="item" :payload="payload"></Detail-Mediation>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import HeaderContent from "@/containers/HeaderContent";
import DetailProduct from "./product.vue";
import DetailMediation from "./mediation.vue";
import { mapActions } from "vuex";

export default {
  components: {
    HeaderContent,
    DetailProduct,
    DetailMediation,
  },
  data() {
    return {
      loading: false,
      inv: this.$route.params.inv,
      crumbs: [
        {
          text: "Komplain",
        },
        {
          text: "List Komplain",
          disabled: true,
        },
      ],
      item: {},
      payload: {
        evidenceBuyerReceipt: {},
        evidenceSellerReceipt: {},
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
      putComplaintProcess: "complaint/putComplaintProcess",
      putComplaintFinish: "complaint/putComplaintFinish",
    }),
    async handleGetListComplaint() {
      const payload = {
        id: this.$route.params.id,
      };
      const response = await this.getComplaintById(payload);
      if (response.status === 200) {
        console.log("success id", response);
        this.item = response.data.data;
      } else if (response.status === 204) {
        console.log("success id", response);
      } else {
        console.error(response);
      }
    },
    handleOpenForm() {},
    async handleProcessComplaint() {
      const params = {
        id: this.$route.params.id,
      };
      console.log(params);
      this.loading = true;
      const response = await this.putComplaintProcess(params);
      if (response.status === 200) {
        console.log("200", response);
        this.$router.push("/complaint");
        this.loading = false;
      } else if (response.status === 204) {
        console.log("process", response);
        this.$router.push("/complaint");
        this.loading = false;
      } else {
        console.error(response);
      }
    },
    async handleFinishComplaint() {
      const params = {
        ...this.payload,
        id: this.$route.params.id,
      };
      console.log(params);
      this.loading = true;
      const response = await this.putComplaintFinish(params);
      if (response.status === 200) {
        console.log("200", response);
        this.$router.push("/complaint");
        this.loading = false;
      } else if (response.status === 204) {
        console.log("process", response);
        this.$router.push("/complaint");
        this.loading = false;
      } else {
        console.error(response);
      }
    },
  },
};
</script>
