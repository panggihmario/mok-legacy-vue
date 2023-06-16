<template>
  <div :class="d['container-box']">
  
    <div :class="d['container-image']" >
      <!-- <v-icon 
        dark 
        large 
        v-if="item.type === 'video' && isPlay "
        :class="d['icon-play']"
        @click="onPlayVideo(`videodialog-${i}-${item.id}`)"
      >
        fas fa-play-circle
      </v-icon> -->
      <video
        v-if="item.type === 'video'"
        :src="item.url"
        :id="`videodialog-${i}-${item.id}`"
        :class="d.vid"
        :style="{ objectFit : isContain }"
        alt="media"
        controls
        muted
        playsinline="playsinline"
        preload="none"
        :poster="item.thumbnail.medium"
      >
      </video>
      <!-- <VideoPlayer
        v-if="item.type === 'video'"
        :options="videoOptions"
        :style="{ objectFit : isContain }"
      /> -->
      <img
        v-else
        :class="d.img"
        :src="item.thumbnail.medium"
        :lazy-src="item.thumbnail.small"
        :style="{ objectFit : isContain }"
        alt="media"
        loading="lazy"
      />
      
    </div>
  </div>
  
</template>

<script>
import VideoPlayer from './video.vue';
export default {
  components : {
    VideoPlayer
  },
  props : {
    item : {
      type : Object
    },
    i : {
      type : Number
    }
  },
  data () {
    return {
      status : true,
      videoOptions: {
        controls: true,
        sources: [
          {
            src:
              this.item.url,
              type: 'video/mp4'
          }
        ]
      }
    }
  },
  methods : {
    async onPlayVideo (id) {
      // const id = `videodialog-${this.i}-${this.item.id}`
      const video = document.getElementById(id)
      try {
        // await videoElem.play();
        // playButton.classList.add("playing");
        await video.play();
        this.status = false 
      } catch (err) {
        console.log(err)
        // playButton.classList.remove("playing");
      }
    }
  },
  computed : {
    isPlay() {
      return this.status
    },
    isContain () {
      const metadata = this.item.metadata
      const width = Number(metadata.width)
      const height = Number(metadata.height)
      const ratio = height / width
      if(width >= height) {
        return 'contain'
      }else {
        if(ratio < 1.5) {
          return 'contain'
        }else{
          return 'cover'
        }
      }
    }
  }
}

</script>

<style src="./style.scss" lang="scss" module="d">
</style>