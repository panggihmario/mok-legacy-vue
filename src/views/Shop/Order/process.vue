<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="items"
      hide-default-footer
      disable-filtering
      disable-sort
      :loading="loading"
      loading-text="Mohon Tunggu Beberapa Saat"
      no-data-text="Tidak Ada Order"
    >
      <template v-slot:item="{ item }">
        <tr>
          <td class="item__data">{{ item.noInvoice }}</td>
          <td class="item__data">{{ item.productName }}</td>
          <td class="item__data">{{ item.sellerName }}</td>
          <td class="item__data">{{ item.receiverName }}</td>
          <td class="item__data">
            <custom-button
              outlined
              color="secondary"
              @click="openDialog(item.id)"
            >
              <icon-eye class="mr-1"></icon-eye>Lihat Detail
            </custom-button>
          </td>
        </tr>
      </template>
    </v-data-table>

    <!-- <v-pagination
      v-model="page"
      :length="totalPages"
      class="d-flex justify-end"
      total-visible="10"
    ></v-pagination> -->
        <div class="d-flex justify-end pt-6">
      <v-pagination
        v-model="page"
        :length="totalPages"
        total-visible="10"
      ></v-pagination>
    </div>


    <Dialog-Detail
      :dialog="dialog"
      :detailItems="detailItems"
      :sellerAddress="sellerAddress"
      :receiverAddress="receiverAddress"
      :shipmentHistory="shipmentHistory"
      @closeDialog="closeDialog"
    ></Dialog-Detail>
  </div>
</template>

<script>
import DialogDetail from "./detail/index.vue";
import { mapActions } from "vuex";

export default {
  components: {
    DialogDetail,
  },
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
      detailItems: null,
      sellerAddress: "",
      receiverAddress: "",
      shipmentHistory: "",
      loading: false,
      dialog: false,
      page: 1,
      totalPages: 0,
    };
  },
  watch: {
    page: function() {
      this.handleGetListOrderByType();
    },
  },
  mounted() {
    this.handleGetListOrderByType();
  },
  methods: {
    ...mapActions({
      getListOrderByType: "order/getListOrderByType",
      getOrderById: "order/getOrderById",
      getOrderShipmentById: "order/getOrderShipmentById",
    }),
    handleGetListOrderByType() {
      const payload = {
        type: "process",
        size: 10,
        page: this.page - 1,
      };
      this.loading = true;
      return this.getListOrderByType(payload)
        .then((response) => {
          this.loading = false;
          this.items = response.data.data.content;
          this.totalPages = response.data.data.totalPages;
        })
        .catch((err) => {
          this.loading = false;
        });
    },
    handleGetOrderById(id) {
      return this.getOrderById(id)
        .then((response) => {
          let data = response.data.data;
          this.detailItems = data;
          this.sellerAddress = `${data.orderShipment.originDetail}, ${data.orderShipment.originSubDistrict}, ${data.orderShipment.originCity}, ${data.orderShipment.originProvince} ${data.orderShipment.originPostalCode}`;
          this.receiverAddress = `${data.orderShipment.destinationDetail}, ${data.orderShipment.destinationSubDistrict}, ${data.orderShipment.destinationCity}, ${data.orderShipment.destinationProvince} ${data.orderShipment.destinationPostalCode}`;
        })
        .catch();
    },
    handleGetOrderShipmentById(id) {
      return this.getOrderShipmentById(id)
        .then((response) => {
          this.shipmentHistory = response.data.data[0].history;
        })
        .catch();
    },
    openDialog(id) {
      this.dialog = true;
      this.handleGetOrderById(id);
      this.handleGetOrderShipmentById(id);
    },
    closeDialog() {
      this.dialog = false;
      this.detailItems = null;
    },
  },
};
</script>

<style lang="sass" scoped>
.item
  &__data
    height: 72px
    font-size: 12px
.font-12
  font-size: 12px
.font-14
  font-size: 14px
</style>
