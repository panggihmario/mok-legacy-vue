<template>
  <div height="552px" width="850px">
    <v-row no-gutters>
      <v-col cols="6">
        <div :class="d.left">
          <CarouselMedia
            :feed="detailFeed"
            ref="carouselMedia"
            :isAdmin="isAdmin"
            :item="item"
            @triggerNextAction="triggerNextAction"
            :description="description"
            @setIsPublish="setIsPublish"
          />
        </div>
      </v-col>
      <v-col cols="6">
        <Description
          :item="item"
          v-model="description"
          :description="description"
          @closeDialog="closeDialog"
          :isAdmin="isAdmin"
          @saveCaption="saveCaption"
          @setChange="setChange"
          :isChanging="isChanging"
          :isPublish="isPublish"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import CarouselMedia from "./carouselMedia.vue";
import Description from "./description.vue";
import { mapActions } from "vuex";
export default {
  components : {
    CarouselMedia,
    Description
  },
  props : {
    isAdmin: {
      type: Boolean,
      default: false,
    },
    item : {
      type : Object
    },
    feedPosition : {
      type : Number
    },
    feeds : {
      type : Array
    },
    
  },
  watch : {
    feedPosition (prev) {
      const id = this.feeds[prev].id
      return this.getFeedById(id)
    }
  },
  data () {
    return {
      isPublish : false,
      isChanging : false,
      description : '',
      detailFeed: {
        medias: [],
      },
    }
  },
  mounted() {
    const id = this.item.id
    this.getFeedById(id)
  },  
  methods : {
    ...mapActions({
      updatePostFeed: "post/updatePostFeed",
      fetchFeedById: "post/fetchFeedById",
    }),
    getFeedById(id) {
      return this.fetchFeedById(id)
        .then(response => {
          this.description = response.description;
          this.detailFeed = response
        })
    },
    stopVideo () {
      this.$refs.carouselMedia.stopVideo()
    },
    setIsPublish() {
      this.isPublish  = true
      this.isChanging = false
    },
    setChange(value) {
      this.isChanging = value
    },
    triggerNextAction() {
      this.$emit('triggerNextAction')
    },
    closeDialog() {
      this.$emit("closeDialog");
    },
    saveCaption(channelValue) {
      const id = this.detailFeed.id;
      const payload = {
        id: id,
        type: "edit",
        params: {
          ...this.detailFeed,
          description: this.description,
          medias: this.detailFeed.medias,
          channel : channelValue
        },
      }
      return this.updatePostFeed(payload)
        .then(() => {
          return this.fetchFeedById(id);
        })
        .then((response) => {
          this.description = response.description;
        });
    },
    getFeed (id) {
      console.log('getFeed', id)
    },
  }
}
</script>

<style src="./style.scss" lang="scss" module="d">
</style>