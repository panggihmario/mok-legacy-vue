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
      <template v-slot:item="{ item }">
        <tr>
          <td class="item__data">{{ item.noOrder }}</td>
          <td class="item__data">{{ item.item }}</td>
          <td class="item__data">{{ item.seller }}</td>
          <td class="item__data">{{ item.receiver }}</td>
          <td class="item__data">
            <custom-button outlined color="secondary" @click="openDialog">
              <v-icon left size="16">mdi-eye</v-icon>Lihat Detail
            </custom-button>
          </td>
        </tr>
      </template>
    </v-data-table>

    <v-dialog v-model="dialog" width="726">
      <v-card class="charcoal--text py-8 px-11">
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

        <v-row no-gutters class="font-14 mt-10">
          <v-col cols="4" class="d-flex flex-column">
            <span class="font-12 silver--text">No. Order</span>
            <span class="font-weight-medium">12932412</span>
          </v-col>
          <v-col cols="4" class="d-flex flex-column">
            <span class="font-12 silver--text">Tgl Pembelian</span>
            <span class="font-weight-medium">13/05/2020 15:43</span>
          </v-col>
          <v-col cols="4" class="d-flex flex-column">
            <span class="font-12 silver--text">Status</span>
            <span class="font-weight-medium">On Process</span>
          </v-col>
        </v-row>

        <v-divider class="mt-6"></v-divider>

        <v-row no-gutters class="font-14 mt-5">
          <v-col cols="12">
            <span class="font-12 silver--text">Produk</span>
          </v-col>
          <v-col cols="2" class="d-flex flex-column mt-2">
            <v-img
              src="https://dummyimage.com/400x400/000/fff"
              width="72"
            ></v-img>
          </v-col>
          <v-col cols="8" class="d-flex flex-column mt-2">
            <span class="font-weight-medium">Kopi</span>
            <span class="font-weight-bold black--text">1 x Rp 90.000</span>
          </v-col>
          <v-col cols="12" class="d-flex flex-column mt-5">
            <span class="font-12 font-weight-bold black--text">Notes</span>
            <span
              >Warna PUTIH, jika rumah ga ada orang, taruh saya dibawah meja
              depan pintu</span
            >
          </v-col>
        </v-row>

        <v-divider class="mt-6"></v-divider>

        <v-row no-gutters class="font-14 mt-5">
          <v-col cols="6">
            <div class="d-flex flex-column">
              <span class="font-12 font-weight-bold black--text"
                >Pengiriman</span
              >
              <span>SiCepat</span>
            </div>
            <div class="d-flex flex-column mt-8">
              <span class="font-12 font-weight-bold black--text">Pengirim</span>
              <span>KipasKipas</span>
              <span>098989898989</span>
            </div>
            <div class="d-flex flex-column mt-4">
              <span class="font-12 font-weight-bold black--text">Alamat</span>
              <span>Jl. Jajan Selalu No.45, RT.4/RW.3, Bekasi Barat</span>
            </div>
          </v-col>
          <v-col cols="6">
            <div class="d-flex flex-column">
              <span class="font-12 font-weight-bold black--text"
                >Nomor Resi</span
              >
              <span>SCP492348532342</span>
            </div>
            <div class="d-flex flex-column mt-8">
              <span class="font-12 font-weight-bold black--text">Penerima</span>
              <span>erqy</span>
              <span>098989898989</span>
            </div>
            <div class="d-flex flex-column mt-4">
              <span class="font-12 font-weight-bold black--text">Alamat</span>
              <span
                >Jl. Sultan Iskandar Muda No.29, RT.4/RW.3, Pd. Pinang, Kec.
                Kby. Lama, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta
                12310</span
              >
            </div>
          </v-col>
        </v-row>

        <v-divider class="mt-6"></v-divider>

        <v-row no-gutters class="font-14 mt-5">
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
            <span class="font-weight-medium">Rp 90.000</span>
            <span class="font-weight-medium">Rp 9.000</span>
            <span class="font-weight-medium primary--text">Rp 99.000</span>
            <span class="font-weight-medium">BCA Virtual Account</span>
          </v-col>
        </v-row>

        <v-divider class="mt-6"></v-divider>

        <div class="font-14 mt-5">
          <span class="font-12 font-weight-bold black--text">Tracking</span>
          <v-row no-gutters class="mt-3">
            <v-col cols="1" class="font-12 font-weight-bold">
              <span>12 Jan 16.14 PM</span>
            </v-col>
            <v-col cols="8" class="d-flex pl-4">
              <v-avatar color="primary" class="mt-5" size="8"></v-avatar>
              <div class="d-flex flex-column ml-3">
                <span class="font-weight-medium">Order Received</span>
                <span class="mt-2"
                  >Produk Kopi Anda telah menerima pesanan baru. Segera proses
                  pesanan Anda.</span
                >
              </div>
            </v-col>
          </v-row>
        </div>
      </v-card>
    </v-dialog>
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
      items: [
        {
          noOrder: "1203939209",
          item: "Kopi",
          seller: "Kipas",
          receiver: "erqy",
        },
      ],
      dialog: false,
    };
  },
  methods: {
    openDialog() {
      this.dialog = true;
    },
    closeDialog() {
      this.dialog = false;
    },
  },
};
</script>

<style lang="sass" scoped>
.item
  &__data
    padding-top: 16px
    padding-bottom: 16px
.font-12
  font-size: 12px
.font-14
  font-size: 14px
</style>
