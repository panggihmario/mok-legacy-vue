<template>
  <div>
    <HeaderContent
      label="List Product"
      labelAction="Create Category"
      :list="crumbs"
    >
      <custom-button color="primary" @click="moveCreate">
        Add Product
      </custom-button>
    </HeaderContent>
    <v-row>
      <v-col cols="8" class="d-flex">
        <div class="d-flex align-center">
          <span class="mb-8 mr-2">Sort</span>
          <custom-select dense :items="sortList" v-model="selection" />
        </div>
      </v-col>
      <v-col cols="4" class="d-flex justify-end">
        <custom-input dense placeholder="search" />
      </v-col>
    </v-row>
    <v-row
      dense
    >
      <v-col 
        cols="auto"
        v-for="(item, idx) in products"
        :key="idx"
      >
        <CardImage :item="item" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import HeaderContent from "@/containers/HeaderContent";
import { mapActions, mapState } from "vuex";
import image from '../../../assets/no-image.jpeg'
import CardImage from './cardImage'
export default {
  components: {
    HeaderContent,
    CardImage
  },
  data() {
    return {
      items: [],
      defaultImage : image,
      selection: "Newest",
      filter: "All Category",
      crumbs: [
        {
          text: "Product",
          disabled: true,
        },
      ],
      sortList: ["Newest", "Oldest"],
      filterList: ["All Category"],
    };
  },
  mounted() {
    this.handleGetListProduct();
  },
  computed : {
    ...mapState({
      products : (state) => state.product.products
    })
  },
  methods: {
    ...mapActions({
      getListProduct: "product/getListProduct",
    }),
    async handleGetListProduct() {
      const payload = {
        size : 21,
        page : 0
      }
      const response = await this.getListProduct(payload);
      if (response.status == 200) {
        this.items = response.data.data.content;
      }
    },
    moveCreate() {
      this.$router.push("product/add");
    },
    moveDetail(id) {
      this.$router.push(`product/${id}`);
    },
  },
};
</script>

