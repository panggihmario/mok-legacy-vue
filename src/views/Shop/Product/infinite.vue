<template>
  <div>
    <v-layout row wrap>
      <v-card flat>
        <v-row>
          <v-col cols="auto" v-for="(item, index) in products" :key="index">
            <CardImage :item="item" />
          </v-col>
        </v-row>
        <v-card v-intersect="infiniteScrolling"></v-card>
      </v-card>
    </v-layout>
  </div>
</template>

<script>
import axios from "axios";
import CardImage from "./cardImage";
import { mapActions, mapMutations, mapState } from "vuex";
export default {
  components: {
    CardImage,
  },
  name: "Posts",
  data() {
    return {
      titles: [],
      page: 1,
      // products: []
    };
  },
  computed: {
    url() {
      return "https://jsonplaceholder.typicode.com/posts?_page=" + this.page;
    },
    ...mapState({
      products: (state) => state.product.products,
    }),
  },
  created() {
    this.fetchData();
    this.handleGetlistProduct();
  },
  methods: {
    ...mapActions({
      getListProduct: "product/getListProduct",
      searchProduct: "product/searchProduct",
    }),
    ...mapMutations({
      setProducts: "product/setProducts",
    }),
    handleGetlistProduct() {
      const payload = {
        size: 24,
        page: 0,
      };
      return this.getListProduct(payload).then((response) => {
        const data = response.data.data.content;
        return this.setProducts(data);
      });
    },
    async fetchData() {
      const response = await axios.get(this.url);
      this.titles = response.data;
    },
    infiniteScrolling(entries, observer, isIntersecting) {
      setTimeout(() => {
        const payload = {
          size: 24,
          page: this.page,
        };
        this.page++;
        return this.getListProduct(payload).then((response) => {
          const dataProducts = response.data.data.content;
          dataProducts.forEach((item) => this.products.push(item));
        });
      }, 1500);
    },
  },
};
</script>


