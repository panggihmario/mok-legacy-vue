<template>
  <!-- <div :class="d['container-box']"> -->
  <div :class="d['container-box']" v-if="item.vodUrl || item.thumbnail">
    <div :class="d['container-media']">
      <video-player :style="{objectFit : isContain}"  v-if="item.type === 'video' && optionsVideo" :id="`videodialog-${item.id}`"
        class="vjs-custom-skin video-player" ref="videoPlayer" :options="optionsVideo">
      </video-player>
      <img v-else :class="d.vid" :src="item.thumbnail.large" :lazy-src="item.thumbnail.small"
        :style="{ objectFit: isContain }" alt="media" loading="lazy" :id="`videodialog`" />
    </div>
    <div :class="d['container-nav']">
      <v-icon size="15px" color="grey">fas fa-home</v-icon>
      <v-icon size="15px" color="grey">fas fa-shopping-cart</v-icon>
      <v-icon size="15px" color="grey">fas fa-plus</v-icon>
      <v-icon size="15px" color="grey">fas fa-bell</v-icon>
      <v-icon size="15px" color="grey">far fa-user</v-icon>
    </div>
  </div>
  <!-- </div> -->
</template>

<script>
import VideoPlayer from './video.vue';
export default {
  props: {
    item: {
      type: Object
    },
    i: {
      type: Number
    },
    dialog: {
      type: Boolean
    }
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener('resize', this.onResize);
    })
  },

  beforeDestroy() { 
    window.removeEventListener('resize', this.onResize); 
  },
  data() {
    return {
      status: true,
      fit: '',
      playerOptions: {
        overNative: true,
        autoplay: false,
        controls: true,
        techOrder: ['flash', 'html5'],
        sourceOrder: true,
        flash: {
          hls: { withCredentials: false },
          swf: '/static/media/video-js.swf'
        },
        html5: { hls: { withCredentials: false } },
        sources: [],
        controlBar: {
          timeDivider: false,
          currentTimeDisplay: false,
          timeDivider: false,
          durationDisplay: false
          // remainingTimeDisplay : false,
        },
      },
    }
  },
  methods: {
    onResize() {
      const element = document.getElementById(`videodialog-${this.item.id}`)
      console.log()
        if (window.innerHeight === screen.height) {
          element.classList.add('isContain')
        } else {
          element.classList.remove('isContain')
        }


    },
  },
  computed: {
    player() {
      return this.$refs.videoPlayer.player
    },
    vodUrl() {
      const item = this.item
      if (item.vodUrl) {
        return item.vodUrl
      } else {
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
    optionsVideo() {
      const item = this.item
      const temp = { ...this.playerOptions }
      if (item.vodUrl) {
        const url = new URL(item.vodUrl)
        const split = url.pathname.split(".")
        const extension = split[split.length - 1]
        if (extension === 'm3u8') {
          const hls = {
            ...temp,
            sources: [
              {
                withCredentials: false,
                type: 'application/x-mpegURL',
                src: this.item.vodUrl
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
                src: this.item.vodUrl
              }
            ]
          }
          return mp4
        }
      } else {
        const mp4 = {
          ...temp,
          sources: [
            {
              withCredentials: false,
              type: 'video/mp4',
              src: this.item.url
            }
          ]
        }
        return mp4
      }
    },
    isContain() {
      const metadata = this.item.metadata
      const width = Number(metadata.width)
      const height = Number(metadata.height)
      const ratio = height / width
      if (width >= height) {
        return 'contain'
      } else {
        if (ratio < 1.5) {
          return 'contain'
        } else {
          return 'cover'
        }
      }
    }
  }
}

</script>

<style src="./style.scss" lang="scss" module="d"></style>

<style>
.relative-position {
  position: relative;
}

.video-player {
  height: 100%;
}

video {
  object-fit: inherit !important;
}

.video-js {
  object-fit: inherit !important;
}

.isContain {
  object-fit: contain !important;
}

.isCover {
  object-fit: cover;
}
.vjs-fullscreen {
  object-fit: contain !important;;
}

@media all and (display-mode: fullscreen) {

  /* every CSS goes here that you want 
  to apply or alter in the fullscreen mode*/
  video {
    /* object-fit: contain !important; */
  }
}
</style>