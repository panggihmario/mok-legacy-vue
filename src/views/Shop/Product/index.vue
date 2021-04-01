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
      <v-col cols="2">
        <div class="d-flex align-center">
          <div class="mb-8 mr-2">Sort</div>
          <custom-select :items="sortList" v-model="selection" />
        </div>
      </v-col>
      <v-col cols="3">
        <div class="d-flex align-center">
          <div class="mb-8 mr-2">Filter</div>
          <custom-select :items="filterList" v-model="filter" />
        </div>
      </v-col>
      <v-col cols="3" offset="4">
        <custom-input placeholder="search" />
      </v-col>
    </v-row>
    <v-data-table
      disable-pagination
      :headers="headers"
      :items="items"
      hide-default-footer
      disable-filtering
      disable-sort
      no-data-text="Tidak Ada Order"
    >
      <template v-slot:item="col">
        <tr>
          <td class="item__data">{{ col.item.name }}</td>
          <td class="item__data">{{ col.item.price }}</td>
          <td class="item__data">{{ col.item.category }}</td>
          <td class="item__data">{{ col.item.stock }}</td>
          <td class="item__data">{{ col.item.sold }}</td>
          <td class="item__data">
            <custom-button class="grey--text" @click="moveDetail(col.item.id)"
              >View Product</custom-button
            >
          </td>
        </tr>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import HeaderContent from "@/containers/HeaderContent";
import { mapActions } from "vuex";

export default {
  components: {
    HeaderContent,
  },
  data() {
    return {
      items: [],
      headers: [
        {
          text: "Nama",
          value: "name",
          class: "whitesnow",
          width: 240,
        },
        {
          text: "Harga",
          value: "price",
          class: "whitesnow",
        },
        {
          text: "Kategory",
          value: "category",
          class: "whitesnow",
        },
        {
          text: "Stok",
          value: "stock",
          class: "whitesnow",
        },
        {
          text: "Terjual",
          value: "sold",
          class: "whitesnow",
        },
        {
          text: "",
          value: "action",
          class: "whitesnow",
          width: "200",
        },
      ],
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
  methods: {
    ...mapActions({
      getListProduct: "product/getListProduct",
    }),
    async handleGetListProduct() {
      const response = await this.getListProduct();
      if (response.status == 200) {
        console.log(response);
        this.items = response.data.data;
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

<style lang="sass" scoped>
.item
  &__data
    height: 72px
    font-size: 12px
</style>
