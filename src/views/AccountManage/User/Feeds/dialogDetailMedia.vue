<template>
  <div :class="$style['card__container']">
    <v-row no-gutters>
      <v-col cols="6" :class="$style['card__left']">
        <div style="height: 500px; background: black; border-radius: 8px">
          <MediaImage
            v-if="content.post.medias[mediaIdx].type === 'image'"
            :url="content.post.medias[mediaIdx].thumbnail.medium"
            :class="$style['card__image']"
            width="100%"
            height="500"
          />
          <video
            v-else
            :id="`video-${content.id}`"
            :src="content.post.medias[mediaIdx].url"
            :class="$style['card__video']"
            class="vid"
            controls
          />
        </div>
        <div class="row no-gutters mt-2">
          <div class="col">
            <div v-if="content.post.medias && content.post.medias.length > 1">
              <v-btn
                icon
                tile
                @click="changeMediaIdx(-1)"
                :disabled="mediaIdx == 0"
              >
                <v-icon>mdi-chevron-left</v-icon>
              </v-btn>
              <v-btn
                icon
                tile
                @click="changeMediaIdx(1)"
                :disabled="mediaIdx == content.post.medias.length - 1"
              >
                <v-icon>mdi-chevron-right</v-icon>
              </v-btn>
            </div>
          </div>
        </div>
      </v-col>
      <v-col cols="6" class="row no-gutters" :class="$style['card__right']">
        <div class="col">
          <Content :data="content" @deletePost="deletePost" />
        </div>
        <div class="col-1">
          <div class="text-right">
            <v-icon style="cursor : pointer" small @click="closeDialog">
              fas fa-times</v-icon
            >
          </div>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import MediaImage from "./image.vue";
import Content from "./content.vue";

export default {
  components: {
    MediaImage,
    Content,
  },
  props: ["dialogProps", "content", "idx"],
  data() {
    return {
      dialog: false,
      mediaIdx: 0,
    };
  },
  watch: {
    idx() {
      this.mediaIdx = 0;
    },
    dialogProps() {
      if (this.dialogProps == false) {
        this.closeDialog();
        this.mediaIdx = 0;
      }
    },
  },
  methods: {
    changeMediaIdx(v) {
      this.mediaIdx += v;
    },
    deletePost(id) {
      this.dialog = false;
      const payload = {
        idx: this.idx,
        id,
      };
      this.$emit("deletePost", payload);
    },
    closeDialog() {
      const isImage = this.content.post.medias[this.mediaIdx].type;
      this.$emit("closeDialog");
      if (isImage === "image") {
        this.dialog = false;
      } else {
        const idVideo = `video-${this.content.id}`;
        const getVideo = document.getElementById(idVideo);
        getVideo.pause();
        getVideo.currentTime = 0;
        this.dialog = false;
      }
    },
  },
};
</script>

<style lang="scss" module>
//$
.card {
  &__container {
    background: #ffffff;
    box-shadow: 0px 4px 24px rgba(253, 82, 154, 0.06);
    border-radius: 16px;
    height: 100%;
  }
  &__image {
    border-radius: 8px;
    cursor: pointer;
  }
  &__left {
    padding: 28px 24px 32px 30px !important;
  }
  &__video {
    width: 100% !important;
    height: 100% !important;
    display: block;
    object-fit: contain;
    border-radius: 8px;
  }
  &__right {
    padding: 12px 12px 12px 0 !important;
  }
}
</style>
