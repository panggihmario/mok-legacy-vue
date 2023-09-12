<template>
  <div>
    <video
      autoplay
      controls
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
    sources: {
      type: String,
      default() {
        return "";
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
      if (this.player) {
        this.player.dispose();
      }
    },
  },
  data() {
    return {
      player: null,
      videoOptions: {
        controlBar: {
          timeDivider: false,
          durationDisplay: false,
        },
      },
    };
  },
  mounted() {
    this.player = videojs(
      this.$refs.videoPlayer,
      { ...this.videoOptions, sources: [{ src: this.sources }] },
      () => {
        this.player.log("onPlayerReady", this);
      }
    );
  },
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
