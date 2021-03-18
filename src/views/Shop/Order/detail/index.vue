<template>
  <v-dialog v-model="dialog" width="726" @click:outside="closeDialog">
    <v-card
      v-if="!detailItems"
      class="d-flex justify-center align-center py-8 px-11"
    >
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </v-card>

    <v-card v-else class="charcoal--text py-8 px-11">
      <v-row no-gutters>
        <v-col cols="2"></v-col>
        <v-col cols="8" align-self="center" class="text-center">
          <h4>Detail Order</h4>
        </v-col>
        <v-col cols="2" align-self="center" class="text-right">
          <v-btn icon @click="closeDialog">
            <v-icon size="16">mdi-close</v-icon>
          </v-btn>
        </v-col>
      </v-row>

      <v-row v-if="detailItems.orderDetail" no-gutters class="font-14 mt-10">
        <v-col cols="4" class="d-flex flex-column">
          <span class="font-12 silver--text">No. Order</span>
          <span class="font-weight-medium">{{ detailItems.noInvoice }}</span>
        </v-col>
        <v-col cols="4" class="d-flex flex-column">
          <span class="font-12 silver--text">Tgl Pembelian</span>
          <span class="font-weight-medium">{{
            formatingDateWithHours(detailItems.orderDetail.createAt)
          }}</span>
        </v-col>
        <v-col cols="4" class="d-flex flex-column">
          <span class="font-12 silver--text">Status</span>
          <span class="font-weight-medium">{{ detailItems.status }}</span>
        </v-col>
      </v-row>

      <v-divider class="mt-6"></v-divider>

      <v-row v-if="detailItems.orderDetail" no-gutters class="font-14 mt-5">
        <v-col cols="12">
          <span class="font-12 silver--text">Produk</span>
        </v-col>
        <v-col cols="2" class="d-flex flex-column mt-2">
          <v-img
            :src="detailItems.orderDetail.urlProductPhoto"
            width="72"
          ></v-img>
        </v-col>
        <v-col cols="8" class="d-flex flex-column mt-2">
          <span class="font-weight-medium">{{
            detailItems.orderDetail.productName
          }}</span>
          <span class="font-weight-bold black--text"
            >{{ detailItems.orderDetail.quantity }} x
            {{ formatPrice(detailItems.orderDetail.productPrice) }}</span
          >
        </v-col>
        <v-col
          v-if="detailItems.orderShipment"
          cols="12"
          class="d-flex flex-column mt-5"
        >
          <span class="font-12 font-weight-bold black--text">Notes</span>
          <span>{{ detailItems.orderShipment.note || "-" }}</span>
        </v-col>
      </v-row>

      <v-divider class="mt-6"></v-divider>

      <v-row v-if="detailItems.orderShipment" no-gutters class="font-14 mt-5">
        <v-col cols="6">
          <div class="d-flex flex-column">
            <span class="font-12 font-weight-bold black--text">Pengiriman</span>
            <span>{{
              `${detailItems.orderShipment.service} - ${detailItems.orderShipment.courier}`
            }}</span>
          </div>
          <div class="d-flex flex-column mt-8">
            <span class="font-12 font-weight-bold black--text">Pengirim</span>
            <span>{{ detailItems.orderShipment.originSenderName }}</span>
            <span>{{ detailItems.orderShipment.originPhoneNumber }}</span>
          </div>
          <div class="d-flex flex-column mt-4">
            <span class="font-12 font-weight-bold black--text">Alamat</span>
            <span>{{ sellerAddress }}</span>
          </div>
        </v-col>
        <v-col cols="6">
          <div class="d-flex flex-column">
            <span class="font-12 font-weight-bold black--text">Nomor Resi</span>
            <span>{{ detailItems.orderShipment.bookingNumber }}</span>
          </div>
          <div class="d-flex flex-column mt-8">
            <span class="font-12 font-weight-bold black--text">Penerima</span>
            <span>{{ detailItems.orderShipment.destinationReceiverName }}</span>
            <span>{{ detailItems.orderShipment.destinationPhoneNumber }}</span>
          </div>
          <div class="d-flex flex-column mt-4">
            <span class="font-12 font-weight-bold black--text">Alamat</span>
            <span>{{ receiverAddress }}</span>
          </div>
        </v-col>
      </v-row>

      <v-divider class="mt-6"></v-divider>

      <v-row v-if="detailItems.payment" no-gutters class="font-14 mt-5">
        <v-col cols="12">
          <span class="font-12 font-weight-bold black--text">Pembayaran</span>
        </v-col>
        <v-col cols="6" class="d-flex flex-column mt-2">
          <span>Total Harga Barang</span>
          <span>Total Ongkos Kirim</span>
          <span>Total Pembayaran</span>
          <span>Metode Pembayaran</span>
        </v-col>
        <v-col cols="6" class="d-flex flex-column align-end mt-2">
          <span class="font-weight-medium">{{
            formatPrice(
              detailItems.orderDetail.quantity *
                detailItems.orderDetail.productPrice
            )
          }}</span>
          <span class="font-weight-medium">{{
            formatPrice(detailItems.orderShipment.cost)
          }}</span>
          <span class="font-weight-medium primary--text">{{
            formatPrice(detailItems.payment.amount)
          }}</span>
          <span class="font-weight-medium">{{
            `${detailItems.payment.bank} ${detailItems.payment.type}`
          }}</span>
        </v-col>
      </v-row>

      <v-divider class="mt-6"></v-divider>

      <div class="font-12 mt-5">
        <span class="font-weight-bold black--text">Tracking</span>
        <v-row
          v-for="(hist, idx) in shipmentHistory"
          :key="idx"
          no-gutters
          class="mt-3"
        >
          <v-col
            cols="2"
            class="d-flex justify-space-between align-center"
          >
            <span class="font-weight-medium">{{ formatingDateTracking(hist.shipmentDate) }}</span>
            <v-avatar
              class="ml-6"
              :class="{ 'primary': idx == 0, 'gainsboro': idx != 0 }"
              size="8"
            ></v-avatar>
          </v-col>
          <v-col cols="8" class="d-flex align-center">
            <div class="ml-3">
              <span>{{ hist.notes }}</span>
            </div>
          </v-col>
        </v-row>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
import global from "@/mixins/global";

export default {
  props: [
    "dialog",
    "detailItems",
    "sellerAddress",
    "receiverAddress",
    "shipmentHistory",
  ],
  mixins: [global],
  methods: {
    closeDialog() {
      this.$emit("closeDialog");
    },
  },
};
</script>
