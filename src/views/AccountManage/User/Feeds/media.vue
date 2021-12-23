<template>
  <div>
    <MediaImage
      :url="content.post.medias[0].thumbnail.medium"
      :class="$style['card__image']"
      aspect-ratio="1"
      @click.stop="dialog = true"
    />
    <v-dialog  @click:outside="closeDialog" v-model="dialog" max-width="800">
      <div :class="$style['card__container']">
        <v-row no-gutters>
          <v-col cols="6" :class="$style['card__left']">
            <MediaImage
              v-if="content.post.medias[0].type  === 'image' "
              :url="content.post.medias[0].thumbnail.medium"
              :class="$style['card__image']"
              width="100%"
              min-height="400"
            />
            <video 
              v-else
              :id="`video-${content.id}`"
              :src="content.post.medias[0].url" 
              :class="$style['card__video']"
              controls
            />
          </v-col>
          <v-col cols="6" :class="$style['card__right']" > 
            <div class="text-right">
              <v-icon 
                style="cursor : pointer" small
                @click="closeDialog"
                > fas fa-times</v-icon>
            </div>
            <Content
              :data="content"
              @deletePost="deletePost"
            />
          </v-col>
        </v-row>
      </div>
    </v-dialog>
  </div>
</template>

<script>
import MediaImage from "./image.vue";
import Content from "./content.vue";
export default {
  props: ["content", "index"],
  components : {
    MediaImage,
    Content
  },
  data() {
    return {
      dialog: false,
    };
  },
  methods: {
    deletePost (id) {
      this.dialog = false
      const payload = {
        idx : this.index,
        id
      }
      this.$emit('deletePost' , payload)
    },
    closeDialog() {
      const isImage = this.content.post.medias[0].type
      if(isImage === 'image' ){
        this.dialog = false
      }else{
        const idVideo = `video-${this.content.id}`
        const getVideo = document.getElementById(idVideo)
        getVideo.pause()
        getVideo.currentTime  = 0
        this.dialog = false
      }
      
    }
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
    object-fit: fill;
  }
  &__right {
    padding: 12px 12px 12px 0 !important;
  }
}
</style>