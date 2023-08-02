<template>
  <div>
    <HeaderContent label="Tambah Penggalangan Dana" :list="crumbs" />
    <form @submit.prevent="onSubmit">
      <div :class="d.columns">
        <div :class="d.first">
          <k-input 
            :counter="100" 
            label="Judul Donasi" 
            v-model="payloadDonation.title" 
          />
          <div :class="d.subcolumns">
            <div v-if="showImageDonation" :class="d.hasMedia">
              <img :src="showImageDonation" :class="d.image" />
              <div @click="onClearImage" :class="d['btn-del']">
                Hapus Gambar
              </div>
            </div>
            <div v-else>
              <div>
                <div :class="d['upload-label']"> Gambar Donasi di MOK</div>
                <upload-oss 
                  id="donation-image" 
                  text 
                  color="primary" 
                  title="Upload Foto Donasi"
                  @response="getResponseImage" 
                  :typeAllowed="['jpeg','png']"
                />
                <div v-if="errorMessageImage"  :class="d['upload-error']">{{ errorMessageImage }}</div>
              </div>
            </div>
            <div :class="d.videobox">
              <div v-if="showVideoDonation" :class="d.hasVideo">
                <div :class="d.boxvideo">
                  <video id="video-donation" :src="showVideoDonation" :class="d.video" />
                  <div :class="d.actionsVideo">
                    <v-icon 
                      @click="onVideo" 
                      size="40px" 
                      color="black"
                    >
                    {{ isPlay ? 'fas fa-pause-circle' : 'fas fa-play-circle' }}
                    </v-icon>
                  </div>
                  <!-- <custom-button :class="d['btn-del-video']" @click="onClearVideo"> Hapus Video</custom-button> -->
                  <div @click="onClearVideo" :class="d['btn-del-video']">
                    Hapus Video
                  </div>
                </div>
              </div>
              <div v-else>
                <div v-if="!errorMessageVideo" :class="d['upload-label']"> Video Donasi </div>
                <upload-oss 
                  @response="getResponseVideo" 
                  id="donation-video" 
                  text 
                  :limitResolution="576"
                  color="primary"
                  :typeAllowed="['mp4', '3gp']"
                  title="Upload Video" 
                />
                <div v-if="errorMessageVideo"  :class="d['upload-error']">{{ errorMessageVideo }}</div>
              </div>
            </div>
          </div>
          <k-textarea 
            title="Deskripsi" 
            v-model="payloadDonation.description" 
            :counter="1000"
          />
        </div>
        <div :class="d.second">
          <div :class="d.box">
            <CurrencyInput 
              label="Target Donasi" 
              v-model="payloadDonation.targetAmount"
              :options="{ 
                currency: 'IDR', 
                locale: 'id', 
                currencyDisplay: 'hidden' ,
                hideGroupingSeparatorOnFocus: false,
                valueRange : {
                  min : 10000,
                  max : 999999999
                }
              }" 
              :isDisable="isDisableCurrency"
            />
            <k-checkbox  v-model="isAmount" label="Tidak ada limit" />
          </div>

          <div :class="d.box">
            <k-date 
              @epochDate="getEpoch" 
              title="Berakhir Pada" 
              :placeholder="placeholderDate"
              :isDisable="isDisableDate"
              :minDate="minDate"
              :value="payloadDonation.expiredAt"
            />
            <k-checkbox v-model="payloadDonation.isEnded" label="Tidak ada batas waktu"  />
          </div>
          <k-select 
            title="Kategori" 
            :items="categories" 
            v-model="category" 
            itemLabel="name"
            rules="required"
            errorMessage="Pilih satu kategori donasi"
          />
          <k-select 
            title="Provinsi" 
            itemLabel="name"
            :items="provinces" 
            v-model="province" 
            height="300"
            rules="required"
            errorMessage="Pilih profinsi lokasi yayasan/pusat penggalangan dana"
          />
          <k-map 
            title="Lokasi" 
            @getLocation="getLocation"  
            rules="required"
            errorMessage="Tentukan titik lokasi yayasan/pusat penggalangan dana"
          />
          <k-autocomplete 
            :items="initiators" 
            v-model="initiator" 
            itemText="username"
            label="Initiator"
            errorMessage="Pilih satu verified user yang bertindak sebagai initiator/penanggung jawab"
            rules="required"
            @resetData="resetDataInitiator"
           />
          <k-input 
            v-model="payloadDonation.recipientName" 
            label="Nama Wali / Penerima Donasi"
            rules="required" 
            errorMessage="Nama penerima donasi tidak boleh kosong"
          />
          <div class="d-flex" style="gap : 8px">
            <custom-button @click="onCancel">Batalkan</custom-button>
            <custom-button 
              type="submit" 
              color="primary"
              :disabled="isDisabled"
              :loading="isLoading"
            >
              Publikasikan Donasi
              </custom-button>
          </div>
        </div>
      </div>
    </form>
    <v-alert
      dense
      type="error"
      :class="d.alert"
      :value="errorStatus"
    > {{ errorMessage }}  </v-alert>
    <v-alert
      dense
      type="success"
      :value="successStatus"
      :class="d.alert"
    >
    {{ sucessMessage }} 
  </v-alert> 
  </div>
</template>

<script>
import HeaderContent from "@/containers/HeaderContent";
import CurrencyInput from './currencyInput.vue'
import { mapActions  } from "vuex";
import * as yup from 'yup';
import moment from "moment"
export default {
  components: {
    HeaderContent,
    CurrencyInput
  },
  computed : {
    minDate () {
      const currentDate = moment().format('YYYY-MM-DD')
      return currentDate
    },
    isForm () {
      const dataForm = {
        ...this.payloadDonation,
        medias : [...this.medias],
        initiator : {
          id : this.initiator.accountId
        },
        donationCategory : {
          id : this.category.id
        },
        province : {
          id : this.province.id
        },
      }
      return dataForm
    },
    isEnded () {
      return this.payloadDonation.isEnded
    }
  },
  watch : {
    isAmount(value) {
      if(value) {
        this.payloadDonation.targetAmount = 0
        this.isDisableCurrency = true
      }else{
        this.isDisableCurrency = false
        this.payloadDonation.targetAmount = 10000
      }
    },
    isEnded(value) {
      if(value) {
        this.payloadDonation.expiredAt = null
        this.placeholderDate = 'Tidak dibatasi'
        this.isDisableDate = true
      }else { 
        this.placeholderDate = 'dd/mm/yy'
        this.isDisableDate = false
      }
    },
    isForm(value) {
      let schema = yup.object().shape({
           
        targetAmount : yup.number().max(999999999),
        description : yup.string().required(),
        recipientName : yup.string().required(),
        latitude : yup.string().required(),
        longitude : yup.string().required(),
        medias : yup.array().min(2).required(),
        initiator : yup.object().shape({
          id : yup.string().required()
        }),
        donationCategory : yup.object().shape({
          id : yup.string().required()
        }),
        province : yup.object().shape({
          id : yup.string().required()
        }),
      })
      schema.isValid(value)
        .then(valid => {
          if(valid) {
            this.isDisabled = false
          }else{
            this.isDisabled = true
          }
        })
    }
  },
  mounted() {
    this.handleProvince()
    this.handleUserByRole()
    this.handleDonationCategory()
  },
  methods: {
    ...mapActions({
      getProvince : 'area/getProvince',
      getUsersbyRole : 'account/getUsersbyRole',
      fetchListDonationCategory : 'donation/fetchListDonationCategory',
      postDonation : 'donation/postDonation'
    }),
    resetDataInitiator () {
      this.initiator = {}
    },
    onCancel() {
      this.$router.push({
        name : 'donations'
      })
    },
    handleDonationCategory () {
      return this.fetchListDonationCategory()
        .then(response => {
          const content = response.content
          this.categories = content
        })
    },
    handleUserByRole() {
      const payload = {
        role : 'INITIATOR'
      }
      return this.getUsersbyRole(payload)
        .then(response => {
          this.initiators = response
        })
    },
    getMoreProvinces(page) {
      const payload = {
          page
        }
      return this.getProvince(payload)
        .then(response => {
          response.content.forEach(cont => {
            this.provinces.push(cont)
          })
          this.loadingProvince = false
        })
    },
    handleProvince() {
      const payload = {
        page : 0
      }
      return this.getProvince(payload)
        .then(response => {
          this.provinces = response.content
          this.totalPages = response.totalPages
          return response.totalPages
        })
        .then(total => {
          for (let i = 1; i < total; i++) {
            this.getMoreProvinces(i)
          } 
        })
    },
    onSubmit() {
      const payload = {
        ...this.payloadDonation,
        medias : [...this.medias],
        initiator : {
          id : this.initiator.accountId
        },
        donationCategory : {
          id : this.category.id
        },
        province : {
          id : this.province.id
        },
      }
      this.isLoading = true
      return this.postDonation(payload)
        .then((response) => {
          this.successStatus = true
          this.sucessMessage = response.data.message
          setTimeout(() => {
            this.isLoading = false
            this.$router.push({
              name : 'donations'
            })
            this.successStatus = false
            this.sucessMessage = ""
          },2000)
        })
        .catch(err => {
          this.errorStatus = true
          this.isLoading = false
          this.errorMessage = err.response ? err.response.data.message : 'Create Failed'
          setTimeout(() => {
            this.errorStatus = false
            this.errorMessage = ''
          }, 2000)
        })
    },
    getLocation (params) {
      if(params.address) {
        this.payloadDonation.latitude = params.coordinate.latitude
        this.payloadDonation.longitude = params.coordinate.longitude
      }else{
        this.payloadDonation.latitude = ""
      this.payloadDonation.longitude = ""
      }
      
    },
    onVideo() {
      const video = document.getElementById('video-donation')
      if(video.paused) {
        this.isPlay = true
        video.play()
      }else{
        this.isPlay = false
        video.pause()
      }
    },
    getResponseImage(media) {
      if(media.status === 'success') {
        this.showImageDonation = media.response.url
        this.medias.unshift(media.response)
      }
      if(media.status === 'failed') {
        this.errorMessageImage = media.message
      }else{
        this.errorMessageImage = ''
      }
    },
    getResponseVideo(media) {
      if(media.status === 'success') {
        this.showVideoDonation = media.response.url
        this.medias.push(media.response)
      }
      if(media.status === 'failed') {
        this.errorMessageVideo = media.message
      }else{
        this.errorMessageVideo = ''
      }
    },
    onClearImage() {
      this.showImageDonation = ''
      this.medias.splice(0, 1)
    },
    onClearVideo () {
      this.showVideoDonation = ''
      this.medias.splice(1, 1)
    },
    getEpoch(value) {
      this.payloadDonation.expiredAt = value
    }
  },
  data() {
    return {
      amount: 0,
      loadingProvince : false,
      errorMessageVideo : '',
      errorMessageImage : '',
      isDisableCurrency : false,
      isDisableDate : false,
      placeholderDate : 'dd/mm/yy',
      errorMessage : '',
      sucessMessage : '',
      errorStatus : false,
      successStatus : false,
      isLoading : false,
      totalPages : 0,
      isDisabled : true,
      page : 1,
      provinces : [],
      province : {},
      initiators : [],
      initiator : {},
      categories : [],
      category : {},
      isAmount: false,
      showImageDonation: '',
      showVideoDonation: "",
      isPlay : false,
      medias : [],
      payloadDonation: {
        title: '',
        description: '',
        targetAmount: 10000,
        recipientName: '',
        expiredAt: null,
        latitude: "",
        longitude : "",
        isEnded : false
      },
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

<style lang="scss" module="d" src="../donation.scss"></style>