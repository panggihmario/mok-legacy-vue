<template>
  <div>
    <div class="d-flex">
      <div class="d-flex flex-column">
        <span class="detail__title silver--text"
          >Bukti Kirim Barang Pembeli</span
        >

        <div
          class="form__upload d-flex justify-center align-center mt-2"
          :class="{ form__uploaded: photoBuyer }"
        >
          <v-img
            :src="photoBuyer"
            v-show="photoBuyer"
            class="form__upload__box"
            max-height="100%"
            max-width="100%"
            @click="reUploadBuyer"
          />
          <custom-upload
            id="image-buyer"
            color="secondary"
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

        <div
          class="form__upload d-flex justify-center align-center mt-2"
          :class="{ form__uploaded: photoSeller }"
        >
          <v-img
            :src="photoSeller"
            v-show="photoSeller"
            class="form__upload__box"
            max-height="100%"
            max-width="100%"
            @click="reUploadSeller"
          />
          <custom-upload
            id="image-seller"
            color="secondary"
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
        {{ item.accountAdmin ? item.accountAdmin.username : "-" }}
      </span>
    </div>

    <div class="mt-8">
      <custom-select
        dense
        outlined
        background="white"
        placeholder="Keputusan akhir mediasi"
        v-model="payload.finalDecision"
        :items="listDecition"
        rules="required"
        :value="payload.finalDecision"
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
        v-model="payload.adminReport"
        :value="payload.adminReport"
        rules="required"
        name="Content"
        class="mt-3"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: ["item", "payload"],
  data() {
    return {
      photoBuyer: "",
      photoSeller: "",
      listDecition: [
        { text: "Kembalikan dana ke pembeli", value: true },
        { text: "Teruskan dana ke penjual", value: false },
      ],
    };
  },
  methods: {
    reUploadBuyer() {
      document.getElementById("image-buyer").click();
    },
    reUploadSeller() {
      document.getElementById("image-seller").click();
    },
    getPhotoBuyer(response) {
      if (response.status === "success") {
        console.log(response);
        this.photoBuyer = response.response.url;
        this.payload.evidenceBuyerReceipt = response.response.url;
      }
    },
    getPhotoSeller(response) {
      if (response.status === "success") {
        console.log(response);
        this.photoSeller = response.response.url;
        this.payload.evidenceSellerReceipt = response.response.url;
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
    &__box
      border: none !important
      border-radius: 5px
  &__uploaded
    border: none !important
  &__button-upload
    position: absolute
    visibility: hidden
</style>
