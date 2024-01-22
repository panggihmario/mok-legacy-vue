<template>
  <div>
    <!-- <div :class="d['container-media']">
      <video-player :style="{ objectFit: 'contain' }" :id="`videodialog`" class="vjs-custom-skin video-player"
              ref="videoPlayer" :options="optionsVideo">
          </video-player>
    </div> -->
   
    <div :class="d['detail__header']">
      <div :class="d.first">
        <img :src="item.image" />
      </div>
      <!-- {{ optionsVideo }} -->
      <div :class="d.second">
        <!-- <video id="video-donation" :src="item.video" />
        <div :class="d['detail-iconvideo']">
          <v-icon @click="onVideo" size="30px" color="black">
            {{ isPlay? 'fas fa-pause-circle': 'fas fa-play-circle' }}
          </v-icon>
        </div> -->
       
        <!-- <div :class="d['container-media']"> -->
        <video-player
        @click="onClick"
        :style="{ objectFit: 'contain' }" :id="`videodialog`" class="vjs-custom-skin video-player"
            ref="videoPlayer" :options="optionsVideo">
        </video-player>

        <!-- </div> -->

      </div>
      <div :class="d.third">
        <div :class="d['detail__location']">
          <v-icon color="charcoal" size="12px">fas fa-map-marker-alt</v-icon>
          <div>{{ item.province }}</div>
        </div>
        <div :class="d['detail__header-content']">
          <div :class="d['detail-title']"> {{ item.title }} </div>
          <div :class="d['detail-time']">
            <div :class="d['detail-time-icon']">
              <v-icon size="10px" color="primary">fas fa-coins</v-icon>
            </div>
            <div class="d-flex justify-space-between" :class="d['detail-duration']">
              <div>Target Pengumpulan Dana</div>
              <div>Rp {{ item.targetAmount.toLocaleString('id') }}</div>
              <div>{{ item.targetAmount > 0 ? `Rp ${item.targetAmount.toLocaleString('id')}` : 'Tidak dibatasi' }}</div>
            </div>
          </div>
          <div :class="d['detail-time']">
            <div :class="d['detail-time-icon']">
              <v-icon size="10px" color="primary">far fa-clock</v-icon>
            </div>
            <div v-if="isEnded || item.status === 'Inactive'" class="d-flex justify-space-between"
              :class="d['detail-duration']">
              <div>Sudah Berakhir</div>
            </div>
            <div v-else class="d-flex justify-space-between" :class="d['detail-duration']">
              <div>Waktu pengumpulan dana</div>
              <div>{{ reminder }}</div>
            </div>
          </div>
          <div :class="d['detail__initiator']">
            <div>
              <div :class="d['initiator-title']">Initiator</div>
              <div :class="d['initiator-name']">{{ item.initiator }}</div>
            </div>
            <div>
              <div :class="d['initiator-title']">Wali Penerima</div>
              <div :class="d['initiator-name']">{{ item.recipientName }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div :class="d['detail__description']">
      {{ item.description }}
    </div>
  </div>
</template>


<script>
import moment from 'moment'

export default {

  props: {
    item: {
      type: Object
    },
    vod: {
      type: Object
    }
  },
  computed: {
    optionsVideo() {
      const item = this.item.vod
      if (item.vodUrl) {
        const url = new URL(item.vodUrl)
        const split = url.pathname.split(".")
        const extension = split[split.length - 1]
        const temp = { ...this.playerOptions }
        if (extension === 'm3u8') {
          const hls = {
            ...temp,
            sources: [
              {
                withCredentials: false,
                type: 'application/x-mpegURL',
                src: item.vodUrl
              }
            ]
          }
          return hls
        } else {
          const mp4 = {
            ...temp,
            sources: [
              {
                withCredentials: false,
                type: 'video/mp4',
                src: item.vodUrl
              }
            ]
          }
          return mp4
        }
      }
    }
  },
  watch: {
    item(value) {
      const expiredAt = moment(value.expiredAt)
      const isPass = moment(expiredAt).diff(moment(), 'miliseconds')
      if (value.expiredAt) {
        if (isPass > 0) {
          this.isEnded = false
          const durationData = moment.duration(expiredAt.diff(moment()))
          const duration = durationData._data
          const daysDuration = durationData.asDays()
          const hours = duration.hours
          const minutes = duration.minutes
          if (daysDuration > 0 && daysDuration < 1) {
            this.reminder = `${hours} jam ${minutes} menit`
          } else {
            this.reminder = `${Math.floor(daysDuration)} hari`
          }

        } else {
          this.isEnded = true
        }
      } else {
        this.reminder = 'Tidak dibatasi'
      }
    }
  },
  data() {
    return {
      isPlay: false,
      isEnded: false,
      reminder: '',
      playerOptions: {
        overNative: true,
        autoplay: false,
        controls: true,
        controlBar : {
          volumePanel : false,
          pictureInPictureToggle : false,
          currentTimeDisplay : false,
          durationDisplay : false,
          timeDivider : false,
          fullscreenToggle : false,
          remainingTimeDisplay : false,
        },
        height : 230,
        techOrder: ['flash', 'html5'],
        sourceOrder: true,
        flash: {
          hls: { withCredentials: false },
          swf: '/static/media/video-js.swf'
        },
        html5: { hls: { withCredentials: false } },
        sources: [],
      },
    }
  },
  methods: {
    onClick() {
        console.log('player play!')
      },
      onPlayerPause(player) {
        console.log('player pause!', player)
      },
    onVideo() {
      const video = document.getElementById('video-donation')
      if (video.paused) {
        this.isPlay = true
        video.play()
      } else {
        this.isPlay = false
        video.pause()
      }
    },
  }
}
</script>

<style lang="scss" module="d" src="../donation.scss" ></style>

<style>
.relative-position {
  position: relative;
}


video {
  object-fit: inherit !important;
}

.video-js {
  object-fit: inherit !important;

}
.vjs-custom-skin > .video-js .vjs-big-play-button {
    font-size: 1.5em;

}
</style>