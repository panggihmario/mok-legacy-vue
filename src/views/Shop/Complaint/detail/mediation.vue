<template>
  <div>
    <div class="d-flex">
      <div class="d-flex flex-column">
        <span class="detail__title silver--text"
          >Bukti Kirim Barang Pembeli</span
        >

        <div class="form__upload d-flex justify-center align-center mt-2">
          <v-img
            :src="photoBuyer"
            v-show="photoBuyer"
            @click="reUploadBuyer"
            max-height="100%"
            max-width="100%"
          />
          <custom-upload
            id="image-buyer"
            color="tertiary"
            text
            @response="getPhotoBuyer"
            :class="photoBuyer && 'form__button-upload'"
          />
        </div>
      </div>

      <div class="d-flex flex-column ml-8">
        <span class="detail__title silver--text"
          >Bukti Kirim Barang Penjual</span
        >

        <div class="form__upload d-flex justify-center align-center mt-2">
          <v-img
            :src="photoSeller"
            v-show="photoSeller"
            @click="reUploadSeller"
            max-height="100%"
            max-width="100%"
          />
          <custom-upload
            id="image-seller"
            color="tertiary"
            text
            @response="getPhotoSeller"
            :class="photoSeller && 'form__button-upload'"
          />
        </div>
      </div>
    </div>

    <div class="d-flex flex-column mt-8">
      <span class="detail__title silver--text">Admin Terkait</span>
      <span class="detail__content">
        {{ item.admin }}
      </span>
    </div>

    <div class="mt-8">
      <custom-select
        dense
        outlined
        background="white"
        placeholder="Keputusan akhir mediasi"
        v-model="decision"
        :items="listDecition"
        rules="required"
        :value="decision"
        name="Decision"
      />
    </div>

    <div class="d-flex flex-column mt-6">
      <span class="detail__content">
        Laporan Tertulis Proses Mediasi
      </span>
      <span class="detail__title grey--text"
        >Tuliskan proses mediasi yang terjadi antara user dan penjual dalam
        bentuk rangkuman diskusi yang terjadi.</span
      >

      <text-editor
        v-model="reportText"
        :value="reportText"
        rules="required"
        name="Content"
        class="mt-3"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: ["item"],
  data() {
    return {
      photoBuyer: "",
      photoSeller: "",
      urlPhotoBuyer: "",
      urlPhotoSeller: "",
      reportText: "",
      decision: "",
      listDecition: ["Kembalikan dana ke pembeli", "Teruskan dana ke penjual"],
    };
  },
  methods: {
    reUploadBuyer() {
      document.getElementById("image-buyer").click();
    },
    reUploadSeller() {
      document.getElementById("image-seller").click();
    },
    getPhotoBuyer(payload) {
      if (payload.status === "success") {
        console.log(payload);
        this.photoBuyer = payload.response.url;
        this.urlPhotoBuyer = payload.response;
      }
    },
    getPhotoSeller(payload) {
      if (payload.status === "success") {
        console.log(payload);
        this.photoSeller = payload.response.url;
        this.urlPhotoSeller = payload.response;
      }
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
    border-radius: 8px
  &__report
    font-size: 12px
    &__box
      width: 193px
.form
  &__upload
    width: 180px
    height: 126px
    border: 1px dashed #1890FF
    border-radius: 5px
  &__button-upload
    position: absolute
    visibility: hidden
</style>
