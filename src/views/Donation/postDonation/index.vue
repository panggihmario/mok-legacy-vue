<template>
  <div>
    <HeaderContent label="Tambah Penggalangan Dana" :list="crumbs" />
    <form @submit.prevent="onSubmit">
      <div :class="d.columns">
        <div :class="d.first">
          <k-input label="judul donasi" v-model="payloadDonation.title" />
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
                <upload-oss id="donation-image" text color="primary" title="Upload Foto Donasi"
                  @response="getResponseImage" />
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
                <div :class="d['upload-label']"> Video Donasi </div>
                <upload-oss @response="getResponseVideo" id="donation-video" text color="primary"
                  title="Upload Video" />
              </div>
            </div>
          </div>
          <k-textarea title="Deskripsi" v-model="payloadDonation.description" />
        </div>
        <div :class="d.second">
          <div :class="d.box">
            <CurrencyInput label="Target Donasi" v-model="payloadDonation.targetAmount"
              :options="{ currency: 'IDR', locale: 'id', currencyDisplay: 'hidden' }" />
            <k-checkbox  v-model="isAmount" label="Tidak ada limit" />
          </div>

          <div :class="d.box">
            <k-date @epochDate="getEpoch" title="Berakir pada" />
            <k-checkbox v-model="isEnded" label="Tidak ada batas waktu"  />
          </div>
          <k-select 
            title="Kategori" 
            :items="categories" 
            v-model="category" 
            itemLabel="name"
          />
          <k-select 
            title="Provinsi" 
            itemLabel="name"
            :items="provinces" 
            v-model="province" 
            height="300"
            @scroll-end="getMoreProvinces"
          />
          <k-map title="Lokasi" @getLocation="getLocation"  />
          <k-select 
            title="Initiator" 
            :items="initiators" 
            v-model="initiator" 
            itemLabel="username"
          />
          <k-input v-model="payloadDonation.recipientName" label="Nama Wali / Penerima Donasi" />
          <div class="d-flex" style="gap : 8px">
            <custom-button>Batalkan</custom-button>
            <custom-button 
              type="submit" 
              color="primary"
              :disabled="isDisabled"
            >
              Publikasikan Donasi
              </custom-button>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import HeaderContent from "@/containers/HeaderContent";
import CurrencyInput from './currencyInput.vue'
import { mapActions  } from "vuex";
import * as yup from 'yup';
export default {
  components: {
    HeaderContent,
    CurrencyInput
  },
  computed : {
    isForm () {
      const dataForm = {
        ...this.payloadDonation,
        medias : [...this.medias],
        organizer : {
          id : this.initiator.accountId
        },
        donationCategory : {
          id : this.category.id
        },
        province : {
          id : this.province.id
        }
      }
      return dataForm
    }
  },
  watch : {
    isAmount(value) {
      if(value) {
        this.payloadDonation.targetAmount = 0
      }
    },
    isEnded(value) {
      if(value) {
        this.payloadDonation.expiredAt = null
      }
    },
    isForm(value) {
      let schema = yup.object().shape({
        title: yup.string().required(),
        description : yup.string().required(),
        recipientName : yup.string().required(),
        latitude : yup.string().required(),
        longitude : yup.string().required(),
        medias : yup.array().min(2),
        organizer : yup.object().shape({
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
          this.isDisabled = valid
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
    handleDonationCategory () {
      return this.fetchListDonationCategory()
        .then(response => {
          const content = response.content
          console.log(content)
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
    getMoreProvinces() {
      if(this.page <= this.totalPages - 1) {
        const payload = {
        page : this.page
      }
      return this.getProvince(payload)
        .then(response => {
          this.page ++
          response.content.forEach(cont => {
            this.provinces.push(cont)
          })
          
        })
      }else{
        return
      }
    },
    handleProvince() {
      const payload = {
        page : 0
      }
      return this.getProvince(payload)
        .then(response => {
          this.provinces = response.content
          this.totalPages = response.totalPages
        })
    },
    onSubmit() {
      const payload = {
        ...this.payloadDonation,
        medias : [...this.medias],
        organizer : {
          id : this.initiator.accountId
        },
        donationCategory : {
          id : this.category.id
        },
        province : {
          id : this.province.id
        }
      }
      console.log('on submit', payload)
      return this.postDonation(payload)
        .then(response => {
          console.log(response)
        })
    },
    getLocation (params) {
      this.payloadDonation.latitude = params.coordinate.latitude
      this.payloadDonation.longitude = params.coordinate.longitude
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
      this.showImageDonation = media.response.url
      this.$set(this.medias, 0, media.response)
    },
    getResponseVideo(media) {
      this.showVideoDonation = media.response.url
      this.$set(this.medias, 1, media.response)
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
      isEnded : false,
      showImageDonation: '',
      showVideoDonation: "",
      isPlay : false,
      medias : [],
      payloadDonation: {
        title: '',
        description: '',
        targetAmount: 0,
        recipientName: '',
        expiredAt: null,
        latitude: "",
        longitude : "",
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