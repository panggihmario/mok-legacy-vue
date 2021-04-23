<template>
  <div>
    <HeaderContent label="Seller List" :list="crumbs" />
    <v-row>
      <v-col cols="2">
        <div class="d-flex align-center">
          <div class="mr-2 mb-8">Sort</div>
          <custom-select :items="sortList" v-model="selection" />
        </div>
      </v-col>
      <v-col cols="3" offset="7">
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
          <td class="item__data">{{ col.item.sellerName }}</td>
          <td class="item__data">{{ col.item.username }}</td>
          <td class="item__data">{{ col.item.product }}</td>
          <td class="item__data">{{ col.item.sold }}</td>
          <td class="item__data">
            <span :class="col.item.status === 'Active' && 'kellygreen--text'">
              {{ col.item.status }}
            </span>
          </td>
          <td class="item__data">
            <custom-button class="grey--text">View Seller</custom-button>
          </td>
        </tr>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import HeaderContent from "../../../containers/HeaderContent";
export default {
  components: {
    HeaderContent,
  },
  data() {
    return {
      crumbs: [
        {
          text: "Seller",
          disabled: true,
        },
      ],
      sortList: ["Newest", "Oldest"],
      selection: "Newest",
      items: [
        {
          sellerName: "me.Store",
          username: "Udin Saputra",
          product: "10",
          sold: "7",
          status: "Active",
        },
        {
          sellerName: "me.Store",
          username: "Udin Saputra",
          product: "10",
          sold: "7",
          status: "Passive",
        },
      ],
      headers: [
        {
          text: "Nama Seller",
          value: "sellerName",
          class: "whitesnow",
        },
        {
          text: "Nama User",
          value: "username",
          class: "whitesnow",
        },
        {
          text: "Produk",
          value: "product",
          class: "whitesnow",
        },
        {
          text: "Terjual",
          value: "sold",
          class: "whitesnow",
        },
        {
          text: "Status",
          value: "status",
          class: "whitesnow",
        },
        {
          text: "",
          value: "action",
          class: "whitesnow",
          width: "200",
        },
      ],
    };
  },
};
</script>

<style lang="sass" scoped>
.item
  &__data
    height: 72px
    font-size: 12px
</style>
