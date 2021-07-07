<template>
  <div>
    <HeaderContent
      label="List Product"
      :list="crumbs"
    >
    </HeaderContent>
    <v-row>
      <v-col cols="8" class="d-flex">
        <div class="d-flex align-center">
          <span class="mb-8 mr-2">Sort</span>
          <custom-select dense :items="sortList" v-model="selection" />
        </div>
      </v-col>
      <v-col cols="4" class="d-flex justify-end">
        <custom-input @keyup.enter="onSearch" v-model="value" dense placeholder="search" />
      </v-col>
    </v-row>
    <Infinite/>
  </div>
</template>

<script>
import HeaderContent from "@/containers/HeaderContent";
import { mapActions, mapMutations, mapState } from "vuex";
import image from '../../../assets/no-image.jpeg'
import CardImage from './cardImage'
import Infinite from './infinite.vue'
export default {
  components: {
    HeaderContent,
    CardImage,
    Infinite
  },
  data() {
    return {
      items: [],
      defaultImage : image,
      value : '',
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
      searchProduct : "product/searchProduct"
    }),
    ...mapMutations({
      setProducts : 'product/setProducts'
    }),
    infiniteScrolling : function () {
      console.log("infinte scroll")
    },
    onSearch : function () {
      const value = this.value
      const payload = {
        value,
        isBanned : false
      }
      this.$router.push({
        name : 'searchProduct',
        query : {
          value,
          isBanned : false
        }
      })
    },
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
