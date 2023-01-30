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
            <k-checkbox v-model="isAmount" label="Tidak ada limit" @click="onClick" />
          </div>

          <div :class="d.box">
            <k-date title="Berakir pada" />
            <k-checkbox v-model="isAmount" label="Tidak ada batas waktu" @click="onClick" />
          </div>
          <k-select title="Kategori" :items="items" v-model="item" />
          <k-select title="Provinsi" :items="items" v-model="item" />
          <k-map title="Lokasi" />
          <k-select title="Initiator" :items="items" v-model="item" />
          <k-input label="Nama Wali / Penerima Donasi" />
          <div class="d-flex" style="gap : 8px">
            <custom-button>Batalkan</custom-button>
            <custom-button type="submit" color="primary">Publikasikan Donasi</custom-button>
          </div>
        </div>
      </div>
    </form>
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
    onSubmit() {
      console.log('on submit', this.payloadDonation)
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
    onClick(e) {
      console.log("e")
    },
    getResponseImage(media) {
      this.showImageDonation = media.response.url
      console.log(media)
      this.payloadDonation.media.push(media.response)
      this.$set(this.payloadDonation.media, 0, media.response)
    },
    getResponseVideo(media) {
      this.showVideoDonation = media.response.url
      this.payloadDonation.media.push(media.response)
    },
    onClearImage() {
      this.showImageDonation = ''
    },
    onClearVideo () {
      this.showVideoDonation = ''
    }
  },
  data() {
    return {
      amount: 0,
      isAmount: false,
      showImageDonation: '',
      showVideoDonation: "",
      isPlay : false,
      payloadDonation: {
        title: '',
        description: '',
        targetAmount: 0,
        organizer: {},
        verifier: {},
        recipientName: '',
        media: [],
        expiredAt: null
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

<style lang="scss" module="d">
.columns {
  display: flex;
  gap: 40px;
}

.subcolumns {
  display: flex;
  // grid-template-columns: 78% 22%;
  // flex-wrap: wrap;
  height: 9.375rem;
  gap: 10px;
}

.subcolumns div:nth-child(1) {
  flex: 1 1 80%;
}

.subcolumns div:nth-child(2) {
  flex: 1 1 20%;
  // position: relative;
}

.subcolumns>div {
  border-radius: 5px;
  display: block;
  border: 1px dashed #BBBBBB;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.subcolumns .videobox {
  position: relative;
}

.subcolumns .hasMedia {
  border: none;
  overflow: hidden;
  border-radius: 5px;
  position: relative;
  height: inherit;
  display: block;
}

.subcolumns .hasVideo {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  // border: none;
  overflow: hidden;
  border-radius: 5px;
}

.boxvideo {
  position: relative;
  height: 100%;
  display: flex;
  justify-content: center;
}

.actionsVideo {
  position: absolute;
  z-index: 2;
  display: flex;
  align-items: center;
  height: 100%;
  width: 100%;
  justify-content: center;
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

.image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.video {
  max-width: 100%;
  max-height: 100%;
  object-fit: fill;
}

.hasMedia .btn-del {
  z-index: 1;
  position: absolute;
  background-color: white;
  color: $charcoal;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.01em;
  padding: 10px 24px;
  border-radius: 6px;
  bottom: 8px;
  left: 8px;
  cursor: pointer;
}

.hasVideo .btn-del-video {
  z-index: 10;
  position: absolute;
  bottom: 8px;
  background-color: white;
  color: $charcoal;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.01em;
  padding: 10px;
  border-radius: 6px;
  cursor: pointer;
  // left: 15%;
}
</style>