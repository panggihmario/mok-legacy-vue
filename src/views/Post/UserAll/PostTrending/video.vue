<template>
  <div>
    <video
      ref="videoPlayer"
      class="video-js video-custom"
      width="100%"
      height="100%"
    ></video>
  </div>
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
    isShow: {
      type: Boolean,
      default() {
        return false;
      },
    },
  },
  watch: {
    isShow() {
      console.log("show", this.isShow);

      console.log("stop video");
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
    console.log("play video");
    this.player = videojs(this.$refs.videoPlayer, this.options, () => {
      this.player.log("onPlayerReady", this);
    });
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
</style>
