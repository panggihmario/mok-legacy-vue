<template>
  <div>
    <div @click="openMedia" :class="d.link">Lihat Post</div>
    <v-dialog 
      v-model="dialog" width="662px"  
      @click:outside="closeDialog"
      persistent
    >
      <div :class="d['dg__btn-left']">
        <v-btn
          @click="slideLeft"
          style="background: rgba(0, 0, 0, 0.5)"
          fab
          dark
          small
        >
          <v-icon small>fas fa-arrow-left</v-icon>
        </v-btn>
      </div>
      <v-card width="850px">
        <v-carousel
          height="100%"
          hide-delimiter-background
          hide-delimiters
          :show-arrows="false"
          v-model="feedPosition"
        >
          <v-carousel-item v-for="(feed, i) in feeds" :key="i">
            <Items
              :isAdmin="isAdmin"
              :item="feeds[feedPosition]"
              ref="items"
              @triggerNextAction="triggerNextAction"
              @closeDialog="closeDialog"
              :feedPosition="feedPosition"
              :feeds="feeds"
              :dialog="dialog"
              @setLevelPriority="setLevelPriority"
            />
          </v-carousel-item>
        </v-carousel>
      </v-card>
      <div :class="d['dg__btn-right']">
        <v-btn
          @click="slideRight"
          style="background: rgba(0, 0, 0, 0.5)"
          fab
          dark
          small
        >
          <v-icon small>fas fa-arrow-right</v-icon>
        </v-btn>
      </div>
    </v-dialog>
  </div>
</template>

<script>
import DeletedBy from "./deletedBy.vue";
import { mapActions } from "vuex";
import CarouselMedia from "./carouselMedia.vue";
import items from "./itemsFile.vue";
export default {
  components: {
    DeletedBy,
    CarouselMedia,
    Items : items
  },
  props: {
    item: Object,
    isAdmin: {
      type: Boolean,
      default: false,
    },
    feeds: {
      type: Array,
    },
    levelPriority : {
      type : [Number , String]
    },
    indexItem : {
      type : [Number, String]
    }
  },
  data() {
    return {
      dialog: false,
      feedPosition: 0,
    };
  },
  methods: {
    ...mapActions({
      updatePostFeed: "post/updatePostFeed",
    }),
    setChange(value) {
      this.isChanging = value
      this.isPublish[this.feedPosition] = true
    },
    setLevelPriority (value) {
      this.$emit('setLevelPriority', value)
    },
    slideRight() {
      // const video = videojs(`videodialog`)
      // video.dispose()
      if (this.feeds.length - 1 === this.feedPosition) {
        this.feedPosition = 0;
      } else {
        this.feedPosition++;
      }
    },
    slideLeft() {
      // const video = videojs(`videodialog`)
      // video.dispose()
      
      if (this.feedPosition === 0) {
        this.feedPosition = this.feeds.length - 1;
      } else {
        this.feedPosition--;
      }
    },
    triggerNextAction() {
      this.slideRight()
      this.$refs.items[0].stopVideo()
    },
    closeDialog() {
      const videos = [...document.getElementsByTagName('video')]
      videos.forEach(v => {
        v.pause()
      })
      this.dialog = false;
      this.$emit("refreshDataFeed");
      this.isPublish = []
    },
    openMedia() {
      this.dialog = true;
      this.feedPosition = this.item.index
    },
  },
};
</script>

<style src="./style.scss" lang="scss" module="d">
</style>