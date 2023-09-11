<template>
    <video ref="videoPlayer" id="idVideo" class="video-js video-custom"></video>
</template>

<script>
import videojs from "video.js";
import "video.js/dist/video-js.css";
export default {
  name: "VideoPlayer",
  props: {
    options: {
      type: Object,
      default() {
        return {};
      },
    },
    dialog: {
      type: Boolean,
      default() {
        return false;
      },
    },
  },
  watch: {
    dialog(value) {
      if (this.player) {
        this.player.dispose();
      }
    },
  },
  data() {
    return {
      player: null,
    };
  },
  mounted() {
    this.player = videojs(this.$refs.videoPlayer, this.options, () => {
      this.player.log("onPlayerReady", this);
    });
    // const el = document.getElementById('idVideo')
    // if(this.player.isFullscreen_) {
    //   console.log('true')
    // }else{
    //   console.log('false')
    // }
  },
  beforeDestroy() {
    if (this.player) {
      this.player.dispose();
    }
  },
};
</script>

<style>
.video-js {
  height: 100% !important;
  width: 100% !important;
}
@media screen and (display-mode: fullscreen) {
  video {
    object-fit: contain;
  }
}
</style>
