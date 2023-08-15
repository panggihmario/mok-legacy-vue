<template>
  <div>
    <div :class="d['detail__header']">
      <div :class="d.first">
        <img :src="item.image" />
      </div>
      <div :class="d.second">
        <video id="video-donation" :src="item.video" />
        <div :class="d['detail-iconvideo']">
          <v-icon @click="onVideo" size="30px" color="black">
            {{ isPlay? 'fas fa-pause-circle': 'fas fa-play-circle' }}
          </v-icon>
        </div>

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
            <div  class="d-flex justify-space-between" :class="d['detail-duration']">
              <div>Target Pengumpulan Dana</div>
              <div>Rp {{ item.targetAmount.toLocaleString('id') }}</div>
            </div>
          </div>
          <div :class="d['detail-time']">
            <div :class="d['detail-time-icon']">
              <v-icon size="10px" color="primary">far fa-clock</v-icon>
            </div>
            <div v-if="isEnded || item.status === 'Inactive'" class="d-flex justify-space-between" :class="d['detail-duration']">
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
import moment  from 'moment'

export default {

  props: {
    item: {
      type: Object
    }
  },
  watch : {
    item(value) {
      console.log(value)
      const expiredAt = moment(value.expiredAt)
      const isPass = moment(expiredAt).diff(moment(), 'miliseconds')
      if(value.expiredAt) {
        if(isPass > 0 ) {
          this.isEnded = false
          const durationData = moment.duration(expiredAt.diff(moment()))
          const duration = durationData._data
          const daysDuration = durationData.asDays()
          const hours = duration.hours
          const minutes = duration.minutes
          if(daysDuration > 0 && daysDuration < 1) {
            this.reminder = `${hours} jam ${minutes} menit`
          }else{
            this.reminder = `${Math.floor(daysDuration)} hari`
          }

        }else{
          this.isEnded = true
        }
      }else{
        this.reminder = '-'
      }
      
      
    }
  },
  data () {
    return {
      isPlay : false,
      isEnded : false,
      reminder : ''
    }
  },
  methods : {
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
  }
}
</script>

<style lang="scss" module="d" src="../donation.scss" >

</style>