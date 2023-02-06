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
              <v-icon size="10px" color="primary">far fa-clock</v-icon>
            </div>
            <div class="d-flex justify-space-between" :class="d['detail-duration']">
              <div>Waktu pengumpulan dana</div>
              <div>1 hari</div>
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
export default {
  props: {
    item: {
      type: Object
    }
  },
  data () {
    return {
      isPlay : false
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