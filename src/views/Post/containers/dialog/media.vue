<template>
  <!-- <div :class="d['container-box']"> -->
    <div :class="d['container-box']">
      <div :class="d['container-media']"  >
        <!-- <video
        v-if="item.type === 'video'"
        :src="vodUrl"
        :id="`videodialog-${i}-${item.id}`"
        :class="d.vid"
        :style="{ objectFit : isContain }"
        alt="media"
        controls
        playsinline="playsinline"
        :poster="item.thumbnail.large"
        /> -->
      <VideoPlayer
        v-if="item.type === 'video'"
        :options="videoOptions" 
        :id="`videodialog`"
        :dialog="dialog"
        :style="{ objectFit : isContain }"
      />
      <img
        v-else
        :class="d.vid"
        :src="item.thumbnail.medium"
        :lazy-src="item.thumbnail.small"
        :style="{ objectFit : isContain }"
        alt="media"
        loading="lazy"
        :id="`videodialog`"
      />
      </div>
      <div :class="d['container-nav']">
        <v-icon size="15px" color="white">fas fa-home</v-icon>
        <v-icon size="15px" color="white">fas fa-shopping-cart</v-icon>
        <v-icon size="15px" color="white">fas fa-plus</v-icon>
        <v-icon size="15px" color="white">fas fa-bell</v-icon>
        <v-icon size="15px" color="white">far fa-user</v-icon>
      </div>
    </div>
  <!-- </div> -->
  
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
    },
    dialog : {
      type : Boolean
    }
  },
  data () {
    return {
      status : true,
      videoOptions: {
        controls: true,
        // autoplay: true,
        controlBar : {
          fullscreenToggle: false,
        },
        sources: [
          {
            src:
              this.item.vodUrl,
             
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
    vodUrl () {
      const item = this.item
      if(item.vodUrl) {
        return item.vodUrl
      }else{
        const url = item.url
        const hrefURL = new URL(url)
        const pathName = hrefURL.pathname
        const origin = hrefURL.origin
        const splitPathName = pathName.split('/')
        const lastIndex = splitPathName.pop()
        const splitLastIndex = lastIndex.split('.')
        const [first, second] = splitLastIndex
        const newFormatFileUrl = `${first}_h265.${second}`
        const joinPathName = `${splitPathName.join("/")}/${newFormatFileUrl}`
        const fullPath = `${origin}${joinPathName}`
        return fullPath
      }
    },
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