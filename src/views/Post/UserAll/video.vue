<template>
  <!-- <video controls ref="videoPlayer" id="idVideo" class="video-js video-custom vjs-default-skin vjs-duration vjs-time-control"></video> -->
  <video-player class="vjs-custom-skin" ref="videoPlayer" :options="options">
  </video-player>
</template>

<script>
import videojs from "video.js";
import "video.js/dist/video-js.css";
export default {
name: "VideoPlayer",
props: {
  url : {
    type : String,
  },
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
// mounted() {
//   this.player = videojs(this.$refs.videoPlayer, this.options, () => {
//     this.player.log("onPlayerReady", this);
//   });
// },
// beforeDestroy() {
//   if (this.player) {
//     this.player.dispose();
//   }
// },
};
</script>

<style>
.video-js {
height: 100% !important;
width: 100% !important;
}
</style>
