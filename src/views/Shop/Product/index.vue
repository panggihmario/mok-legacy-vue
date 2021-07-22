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
          <custom-select 
            dense :items="sortList" 
            v-model="selection" 
            item-text="name"
            @input="onSelect"
          />
        </div>
      </v-col>
      <v-col cols="4" class="d-flex justify-end">
        <custom-input @keyup.enter="onSearch" v-model="value" dense placeholder="search" />
      </v-col>
    </v-row>
    <Infinite
      :sort="selection"
      @onScroll="onScroll"
    />
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
      selection:  "desc",
      filter: "All Category",
      crumbs: [
        {
          text: "Product",
          disabled: true,
        },
      ],
      sortList: [
        {
          name : 'Newest',
          value : 'desc'
        },
        {
          name : 'Oldest',
          value : 'asc'
        }
      ],
      filterList: ["All Category"],
      page : 1
    };
  },
  computed : {
    ...mapState({
      products : (state) => state.product.products
    })
  },
  mounted () {
    this.handleGetlistProduct('desc')
  },
  methods: {
    ...mapActions({
      getListProduct: "product/getListProduct",
      searchProduct : "product/searchProduct"
    }),
    ...mapMutations({
      setProducts : 'product/setProducts'
    }),
    onSelect (value) {
      this.page = 1
      const payload = {
          size: 24,
          page: 0,
          sort : `createAt,${value}`
        };
       return this.getListProduct(payload)
        .then((response) => {
          const data = response.data.data.content;
          return this.setProducts(data);
        });
    },
    onScroll() {
      setTimeout(() => {
        const payload = {
          size: 24,
          page: this.page,
          sort : `createAt,${this.selection}`
        };
        console.log(payload)
        this.page++;
        return this.getListProduct(payload).then((response) => {
          const dataProducts = response.data.data.content;
          dataProducts.forEach((item) => this.products.push(item));
        });
      }, 1500);
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
    handleGetlistProduct(selection) {
      const payload = {
        size: 24,
        page: 0,
        sort : `createAt,${selection}`
      };
      return this.getListProduct(payload).then((response) => {
        const data = response.data.data.content;
        return this.setProducts(data);
      });
    },
  },
};
</script>
