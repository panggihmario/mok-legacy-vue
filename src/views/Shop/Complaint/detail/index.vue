<template>
  <div>
    <HeaderContent label="Detail Komplain" :list="crumbs">
      <custom-button v-if="!isForm">Komplain Tidak Valid</custom-button>
      <custom-button
        color="primary"
        class="white--text ml-2"
        @click="isForm ? handleNextProcess() : handleOpenForm()"
        >{{ isForm ? "Mediasi Selesai" : "Proses Mediasi" }}</custom-button
      >
    </HeaderContent>

    <v-row no-gutters>
      <v-col lg="6">
        <Detail-Product :item="item"></Detail-Product>
      </v-col>
      <v-col lg="6" v-if="isForm">
        <Detail-Mediation :item="item"></Detail-Mediation>
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
      isForm: false,
      crumbs: [
        {
          text: "Komplain",
        },
        {
          text: "List Komplain",
        },
        {
          text: this.$route.params.inv,
          disabled: true,
        },
      ],
      item: {
        admin: "Agus Santoso",
        name: "Fashion Pria",
        date: "02/02/2020",
        inv: "INV/KK/YYYYMMDDXXX",
        reason: "Barang cacat",
        note: "Harus sesuai ya kk",
        deliveryFee: 20000,
        courir: "JNE",
        payment: "Bank Central Asia (BCA)",
        product: {
          photo:
            "https://images.solecollector.com/complex/images/c_crop,h_1067,w_1896,x_50,y_554/pq2w4nx5abzikg5icj7q/nike-react-presto-trouble-at-home-av2605-006-pair",
          name: "Nike Running Shoes Black Lightning",
          price: "2000000",
          quantity: 3,
        },
        reporter: {
          name: "Agus",
          phone: "081122223333",
        },
        seller: {
          name: "Agus Sport Center",
          phone: "083322221111",
        },
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
      if (response.status === 204) {
        // console.log("success id", response);
      } else {
        console.error(error);
      }
    },
    handleOpenForm() {
      this.isForm = true;
    },
    async handleNextProcess() {
      const payload = {
        id: this.$route.params.id,
      };
      const response = await this.putComplaintProcess(payload);
      if (response.status === 204) {
        // console.log("process", response);
        this.isForm = false;
      } else {
        console.error(error);
      }
    },
  },
};
</script>
