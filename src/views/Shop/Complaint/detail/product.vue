<template>
  <div>
    <div class="d-flex flex-column">
      <span class="detail__title silver--text">Invoice</span>
      <span class="detail__content tertiary--text">{{
        inv || item.order.noInvoice
      }}</span>
      <span class="detail__title silver--text mt-6">Total Pembayaran</span>
      <span class="detail__content tertiary--text">{{
        item.order.payment.amount
      }}</span>
    </div>

    <div class="d-flex flex-column mt-6">
      <span class="detail__title silver--text">Komplain</span>
      <span class="detail__content">{{ item.reason }}</span>

      <div class="d-flex mt-6">
        <video
          id="evidenceVideoUrl"
          :src="item.evidenceVideoUrl"
          class="detail__image"
          controls
          height="120"
          width="210"
        ></video>
        <div class="d-flex flex-column ml-4">
          <span class="detail__title silver--text mt-6"
            >Tanggal Video Diambil</span
          >
          <span class="detail__content">{{
            formatingDate(item.createAt)
          }}</span>
          <span class="detail__title silver--text mt-6">Durasi</span>
          <span class="detail__content">{{}}</span>
        </div>
      </div>

      <div class="d-flex mt-6">
        <div class="d-flex justify-center detail__image whitesnow">
          <img
            :src="item.order.orderDetail.urlProductPhoto"
            height="100%"
            alt=""
          />
        </div>
        <div class="d-flex flex-column ml-4">
          <span class="detail__content">{{
            item.order.orderDetail.productName
          }}</span>
          <span class="detail__content">
            <span class="grey--text">Harga Produk : </span>
            {{ item.order.orderDetail.productPrice }}</span
          >

          <span class="detail__title silver--text mt-6">Kuantitas</span>
          <span class="detail__content">{{
            item.order.orderDetail.quantity
          }}</span>
        </div>
      </div>
    </div>

    <div class="d-flex flex-column mt-6">
      <span class="detail__title silver--text">Catatan</span>
      <span class="detail__content">{{ item.order.orderShipment.notes }}</span>
    </div>

    <div class="d-flex flex-column mt-6">
      <span class="detail__title silver--text">Biaya Pengiriman</span>
      <span class="detail__content">{{ item.order.orderShipment.cost }}</span>
    </div>

    <div class="d-flex flex-column mt-6">
      <span class="detail__title silver--text">Kurir</span>
      <span class="detail__content">{{
        item.order.orderShipment.courier
      }}</span>
    </div>

    <div class="d-flex flex-column mt-6">
      <span class="detail__title silver--text">Bank Digunakan</span>
      <span class="detail__content">{{ item.order.payment.bank }}</span>
    </div>

    <div class="detail__report mt-6">
      <div class="d-flex">
        <div class="d-flex flex-column detail__report__box whitesnow">
          <span class=" py-3 px-4">Pelapor</span>
          <div class="d-flex flex-column primarylowtint primary--text">
            <span class="py-3 px-4">{{ item.accountBuyer.username }}</span>
            <span class="py-3 px-4">{{ item.accountBuyer.mobile }}</span>
          </div>
        </div>

        <div class="d-flex flex-column detail__report__box whitesnow">
          <span class=" py-3 px-4">Penjual</span>
          <div class="d-flex flex-column secondarylowtint secondary--text">
            <span class="py-3 px-4">{{
              item.order.orderDetail.sellerName
            }}</span>
            <span class="py-3 px-4">{{
              item.order.orderDetail.mobile || "-"
            }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["item", "inv"],
  methods: {
    formatingDate(rawDate) {
      const newDt = new Date(rawDate);
      const day = newDt.getDate();
      const month = newDt.getMonth() + 1;
      const year = newDt.getFullYear();
      const newFormat = `${day}/${month}/${year}`;
      return newFormat;
    },
  },
};
</script>

<style lang="sass" scoped>
.detail
  &__title
    font-size: 10px
    font-weight: 500
  &__content
    font-size: 12px
    font-weight: 500
  &__image
    height: 120px
    width: 210px
    border-radius: 8px
    overflow: hidden
  &__report
    font-size: 12px
    &__box
      width: 193px
</style>
