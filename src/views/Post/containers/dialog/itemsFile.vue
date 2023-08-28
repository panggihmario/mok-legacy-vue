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
          :floatingLink="floatingLink"
          :floatingLinkLabel="floatingLinkLabel"
          @closeDialog="closeDialog"
          :isAdmin="isAdmin"
          @setFloatingLabel="setFloatingLabel"
          @setFloatingLink="setFloatingLink"
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
      floatingLink : '',
      floatingLinkLabel : '',
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
      fetchVodUrl : 'post/fetchVodUrl'
    }),
    setFloatingLabel (value) {
      this.floatingLinkLabel = value
    },
    setFloatingLink (value) {
      this.floatingLink = value
    },
    getFeedById(id) {
      return this.fetchFeedById(id)
        .then(response => {
          // console.log(response)
          const medias = response.medias
          medias.forEach((media, idx, array) => {
            if(media.type === 'video' && !media.vodUrl) {
              const vodFileId = media.vodFileId
              if(vodFileId){
                this.fetchVodUrl(vodFileId)
                  .then(response => {
                    array[idx].vodUrl = response.vodUrl
                  })
              }
            }
          })
          this.detailFeed = {
            ...response,
            medias
          }
          this.description = response.description;
          this.floatingLink = response.floatingLink
          this.floatingLinkLabel = response.floatingLinkLabel
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
          channel : channelValue,
          floatingLink :this.floatingLink,
          floatingLinkLabel: this.floatingLinkLabel
        },
      }
      return this.updatePostFeed(payload)
        .then(() => {
          return this.getFeedById(id);
        })
    },
    getFeed (id) {
      console.log('getFeed', id)
    },
  }
}
</script>

<style src="./style.scss" lang="scss" module="d">
</style>