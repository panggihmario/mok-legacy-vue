<template>
  <div>
    <div class="d-flex flex-column">
      <span class="detail__title silver--text">Invoice</span>
      <span class="detail__content tertiary--text">{{ item.inv }}</span>
    </div>

    <div class="d-flex flex-column mt-8">
      <span class="detail__title silver--text">Komplain</span>
      <span class="detail__content">{{ item.reason }}</span>

      <div class="d-flex mt-6">
        <video
          src="http://techslides.com/demos/sample-videos/small.webm"
          class="detail__image"
          controls
          height="120"
          width="210"
        ></video>
        <div class="d-flex flex-column ml-4">
          <span class="detail__title silver--text mt-6"
            >Tanggal Video Diambil</span
          >
          <span class="detail__content">{{ item.product.price }}</span>
          <span class="detail__title silver--text mt-6">Kuantitas</span>
          <span class="detail__content">{{ item.product.quantity }}</span>
        </div>
      </div>

      <div class="d-flex mt-6">
        <img
          :src="item.product.photo"
          class="detail__image"
          height="120"
          width="210"
          alt=""
        />
        <div class="d-flex flex-column ml-4">
          <span class="detail__content">{{ item.product.name }}</span>
          <span class="detail__content">{{ item.product.price }}</span>

          <span class="detail__title silver--text mt-6">Kuantitas</span>
          <span class="detail__content">{{ item.product.quantity }}</span>
        </div>
      </div>
    </div>

    <div class="d-flex flex-column mt-6">
      <span class="detail__title silver--text">Catatan</span>
      <span class="detail__content">{{ item.note }}</span>
    </div>

    <div class="d-flex flex-column mt-6">
      <span class="detail__title silver--text">Biaya Pengiriman</span>
      <span class="detail__content">{{ item.deliveryFee }}</span>
    </div>

    <div class="d-flex flex-column mt-6">
      <span class="detail__title silver--text">Kurir</span>
      <span class="detail__content">{{ item.courir }}</span>
    </div>

    <div class="d-flex flex-column mt-6">
      <span class="detail__title silver--text">Bank Digunakan</span>
      <span class="detail__content">{{ item.payment }}</span>
    </div>

    <div class="detail__report mt-6">
      <div class="d-flex">
        <div class="d-flex flex-column detail__report__box whitesnow">
          <span class=" py-3 px-4">Pelapor</span>
          <div class="d-flex flex-column primarylowtint primary--text">
            <span class="py-3 px-4">{{ item.reporter.name }}</span>
            <span class="py-3 px-4">{{ item.reporter.phone }}</span>
          </div>
        </div>

        <div class="d-flex flex-column detail__report__box whitesnow">
          <span class=" py-3 px-4">Penjual</span>
          <div class="d-flex flex-column secondarylowtint secondary--text">
            <span class="py-3 px-4">{{ item.seller.name }}</span>
            <span class="py-3 px-4">{{ item.seller.phone }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["item"],
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
    border-radius: 8px
  &__report
    font-size: 12px
    &__box
      width: 193px
</style>
