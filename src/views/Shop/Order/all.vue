<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="items"
      hide-default-footer
      disable-filtering
      disable-sort
      no-data-text="Tidak Ada Order"
    >
      <template v-slot:item>
        <tr>
          <td class="item__data"></td>
          <td class="item__data"></td>
          <td class="item__data"></td>
          <td class="item__data"></td>
          <td class="item__data">
            <custom-button class="grey--text">Lihat Detail</custom-button>
          </td>
        </tr>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      headers: [
        {
          text: "No Order",
          value: "noOrder",
          class: "whitesnow",
          width: "80",
        },
        {
          text: "Barang",
          value: "item",
          class: "whitesnow",
          width: "120",
        },
        {
          text: "Seller",
          value: "seller",
          class: "whitesnow",
          width: "120",
        },
        {
          text: "Penerima",
          value: "receiver",
          class: "whitesnow",
          width: "140",
        },
        {
          value: "action",
          class: "whitesnow",
          width: "100",
        },
      ],
      items: [],
    };
  },
};
</script>

<style lang="sass" scoped>
.item
  &__data
    padding-top: 16px
    padding-bottom: 16px
</style>
