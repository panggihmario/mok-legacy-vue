<template>
  <div>
    <HeaderContent label="Tambah Penggalangan Dana" :list="crumbs" />
    <div :class="d.columns">
      <div :class="d.first">
        <k-input label="judul donasi" />
        <div :class="d.subcolumns">
          <div>
            <div>
              <div :class="d['upload-label']"> Gambar Donasi di MOK</div>
              <custom-upload text color="primary" title="Upload Foto Donasi" />
            </div>
          </div>
          <div>
            <div>
              <div :class="d['upload-label']"> Video Donasi </div>
              <custom-upload text color="primary" title="Upload Video" />
            </div>
          </div>
        </div>
        <k-textarea title="Deskripsi" />
      </div>
      <div :class="d.second">
        <div :class="d.box">
          <CurrencyInput 
          label="Target Donasi" 
          v-model="amount"
          :options="{ currency: 'IDR', locale: 'id', currencyDisplay: 'hidden' }" 
        />
        <k-checkbox v-model="isAmount" label="Tidak ada limit" @click="onClick" />
        </div>
        
        <div :class="d.box">
          <k-date title="Berakir pada" />
          <k-checkbox v-model="isAmount" label="Tidak ada batas waktu" @click="onClick" />
        </div>
        <k-select title="Kategori" :items="items" v-model="item"/>
        <k-select title="Provinsi" :items="items" v-model="item"/>
        <k-map title="Lokasi" />
      </div>
    </div>
  </div>
</template>

<script>
import HeaderContent from "@/containers/HeaderContent";
import CurrencyInput from './currencyInput.vue'
export default {

  components: {
    HeaderContent,
    CurrencyInput
  },
  methods: {
    onClick(e) {
      console.log("e")
    }
  },
  data() {
    return {
      amount: 0,
      isAmount: false,
      item: {
        value: 'day',
        label: 'days'
      },
      items: [
        {
          value: 'day',
          label: 'days'
        },
        {
          value: 'hour',
          label: 'hours'
        },
        {
          value: 'minute',
          label: 'minutes'
        }
      ],
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

.subcolumns {
  display: flex;
  height: 9.375rem;
  gap: 10px;
}

.subcolumns div:nth-child(1) {
  flex: 1 1 78%;
}

.subcolumns div:nth-child(2) {
  flex: 1 1 22%;
}

.subcolumns>div {
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
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.upload-label {
  font-size: 12px;
  font-weight: 400;
  color: $charcoal;
  margin-bottom: 8px;
}
.box {
  display: flex;
  gap: 6px;
  flex-direction: column;
}
</style>