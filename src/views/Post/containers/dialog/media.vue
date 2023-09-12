<template>
  <!-- <div :class="d['container-box']"> -->
  <div :class="d['container-box']">
    <div :class="d['container-media']">
      <video-player v-if="item.type === 'video'" :id="`videodialog`" :style="{ objectFit: isContain }"
        class="vjs-custom-skin video-player" ref="videoPlayer" :options="optionsVideo">
      </video-player>

      <img v-else :class="d.vid" :src="item.thumbnail.large" :lazy-src="item.thumbnail.small"
        :style="{ objectFit: isContain }" alt="media" loading="lazy" :id="`videodialog`" />
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
  // components : {
  //   VideoPlayer
  // },
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
  data() {
    return {
      status: true,
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
        sources: [
          // {
          //   withCredentials: false,
          //   type: 'application/x-mpegURL',
          //   src: this.item.vodUrl
          // },
        ],
      },
      videoOptions: {
        overNative: true,
        autoplay: false,
        controls: true,
        techOrder: ['flash', 'html5'],
        sourceOrder: true,
        controlBar: {
          fullscreenToggle: false,

        },
        html5: { hls: { withCredentials: false } },
        // sources: [
        //   {
        //     withCredentials: false,
        //     type: 'application/x-mpegURL',
        //     src: this.item.vodUrl
        //   }
        // ]
        sources: [
          //         {
          //   type: 'rtmp/mp4',
          //   src: 'rtmp://184.72.239.149/vod/&mp4:BigBuckBunny_115k.mov'
          // }, 
          {
            withCredentials: false,
            type: 'application/x-mpegURL',
            src: 'http://playertest.longtailvideo.com/adaptive/bipbop/gear4/prog_index.m3u8'
          }],
      }
    }
  },
  methods: {
    async onPlayVideo(id) {
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
      if (this.item.type === video) {
        const url = new URL(this.item.vodUrl)
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
          console.log('masuk else')
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
</style>