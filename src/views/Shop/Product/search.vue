<template>
  <div>
    <HeaderContent label="List Product" :list="crumbs"> </HeaderContent>
    <v-row>
      <v-col cols="8" class="d-flex">
        <div class="d-flex align-center">
          <span class="mb-8 mr-2">Sort</span>
          <custom-select dense :items="sortList" v-model="selection" />
        </div>
      </v-col>
      <v-col cols="4" class="d-flex justify-end">
        <custom-input
          @keyup.enter="onSearch"
          v-model="query"
          dense
          placeholder="search"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="auto" v-for="(item, index) in products" :key="index">
        <CardImage :item="item" />
      </v-col>
    </v-row>
  </div>
</template>


<script>
import { mapActions } from "vuex";
import HeaderContent from "@/containers/HeaderContent";
import CardImage from "./cardImage";
export default {
  components: {
    HeaderContent,
    CardImage,
  },
  props: ["value", "isBanned"],
  computed: {
    query: {
      get() {
        return this.value;
      },
      set(value) {
        this.valueSearch = value;
      },
    },
  },
  data() {
    return {
      products: [],
      valueSearch: "",
      selection: "Newest",
      crumbs: [
        {
          text: "Product",
          disabled: false,
          href : '/product'
        },
      ],
      sortList: ["Newest", "Oldest"],
    };
  },
  mounted() {
    this.fetchSearchData();
  },
  methods: {
    ...mapActions({
      searchProduct: "product/searchProduct",
    }),
    fetchSearchData: function () {
      const payload = {
        value: this.value,
        isBanned: this.isBanned,
      };
      return this.searchProduct(payload).then((response) => {
        console.log(response);
        this.products = response.content
      });
    },
    onSearch: function () {
      const value = this.valueSearch;
      const isBanned = this.isBanned ?  true :  false 
      if (value) {
        const payload = {
          value,
          isBanned,
        };
        this.$router.replace({
          name: "searchProduct",
          query: {
            value,
            isBanned,
          },
        });
        return this.searchProduct(payload).then((response) => {
          console.log("jalan nich");
          console.log(response);
          const content = response.content;
          this.products = content;
        });
      } else {
        this.$router.push({
          name: this.isBanned ? "bannedProduct" : "products",
        });
      }
    },
  },
};
</script>