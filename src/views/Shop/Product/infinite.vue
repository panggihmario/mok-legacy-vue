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
import CardImage from "./cardImage";
import { mapActions, mapMutations, mapState } from "vuex";
export default {
  components: {
    CardImage,
  },
  name: "Posts",
  props : ['sort'],
  data() {
    return {
      titles: [],
      page: 1,
    };
  },
  computed: {
    ...mapState({
      products: (state) => state.product.products,
    }),
  },
  methods: {
    ...mapActions({
      getListProduct: "product/getListProduct",
      searchProduct: "product/searchProduct",
    }),
    ...mapMutations({
      setProducts: "product/setProducts",
    }),
    infiniteScrolling(entries, observer, isIntersecting) {
      this.$emit('onScroll')
    },
  },
};
</script>


