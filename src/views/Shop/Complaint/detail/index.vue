<template>
  <div>
    <HeaderContent label="Detail Komplain" :list="crumbs">
      <custom-button v-if="!mediation">Komplain Tidak Valid</custom-button>
      <custom-button
        color="orangeprimary"
        class="white--text ml-2"
        @click="mediation ? handleCancelMediation() : handleClickMediation()"
        >{{ mediation ? "Mediasi Selesai" : "Proses Mediasi" }}</custom-button
      >
    </HeaderContent>

    <v-row no-gutters>
      <v-col lg="6">
        <Detail-Product :data="data"></Detail-Product>
      </v-col>
      <v-col lg="6" v-if="!mediation">
        <Detail-Mediation :data="data"></Detail-Mediation>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import HeaderContent from "@/containers/HeaderContent";
import DetailProduct from "./product.vue";
import DetailMediation from "./mediation.vue";

export default {
  components: {
    HeaderContent,
    DetailProduct,
    DetailMediation,
  },
  data() {
    return {
      mediation: false,
      crumbs: [
        {
          text: "Komplain",
        },
        {
          text: "List Komplain",
        },
        {
          text: this.$route.query.inv,
          disabled: true,
        },
      ],
      data: {
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
  methods: {
    handleClickMediation() {
      this.mediation = true;
    },
    handleCancelMediation() {
      this.mediation = false;
    },
  },
};
</script>
