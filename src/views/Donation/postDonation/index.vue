<template>
  <div>
    <HeaderContent
      label="Tambah Penggalangan Dana"
      :list="crumbs"
    />
    <div :class="d.columns">
      <div :class="d.first">
        <k-input label="judul donasi" />
        <div :class="d.subcolumns">
          <div>
            <div>
              <div :class="d['upload-label']"> Gambar Donasi di MOK</div>
              <custom-upload 
                text 
                color="primary"
                title="Upload Foto Donasi"
              />
            </div>
          </div>
          <div>
            <div>
              <div :class="d['upload-label']"> Video Donasi </div>
              <custom-upload
                text 
                color="primary"
                title="Upload Video"
              />
            </div>
          </div>
        </div>
        <k-textarea
        title="Deskripsi"
        />
      </div>
      <div :class="d.second">
        <CurrencyInput
    v-model="amount"
    :options="{ currency: 'IDR', locale: 'id', currencyDisplay : 'hidden' }"
    prefix="Rp"
  />
  <k-checkbox/>
      </div>
      </div>
  </div>
</template>

<script>
import HeaderContent from "@/containers/HeaderContent";
import CurrencyInput from './currencyInput.vue'
export default {

  components : {
    HeaderContent,
    CurrencyInput
  },
  data () {
    return {
      amount : 0,

      crumbs: [
        {
          text: "List Penggalangan Dana",
          href: "/donations",
          disabled: false,
        },
        {
          text: "Penggalangan Dana",
          disabled: true,
        },
      ],
    }
  },
}
</script>

<style lang="scss" module="d">
.columns {
  display: flex;
  gap: 40px;
}
.subcolumns  {
  display: flex;
  height: 9.375rem;
  gap: 10px;
}
.subcolumns div:nth-child(1) {
  flex: 1 1 78%;
}
.subcolumns div:nth-child(2){
  flex: 1 1 22%;
}
.subcolumns > div  {
  border-radius: 5px;
  border: 1px dashed #BBBBBB;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.columns .first {
  flex: 1 1 60%;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.columns .second {
  flex: 1 1 40%;
}
.upload-label {
  font-size: 12px;
  font-weight: 400;
  color: $charcoal;
  margin-bottom: 8px;
}
</style>