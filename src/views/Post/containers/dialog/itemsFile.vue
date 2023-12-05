<template>
  <div ref="itemsfile" height="552px" width="850px">
    <v-row no-gutters>
      <v-col cols="5">
        <div :class="d.left">
          <CarouselMedia
            :feed="detailFeed"
            ref="carouselMedia"
            :isAdmin="isAdmin"
            :item="item"
            @triggerNextAction="triggerNextAction"
            :description="description"
            @setIsPublish="setIsPublish"
            @setIsReject="setIsReject"
            :dialog="dialog"
            :expiredEpochDate="expiredEpochDate"
            :levelPriority="levelPriority"
            :isChanging="isChanging"
            :isPublish="isPublish"
            :isReject="isReject"
            @setIsSchedule="setIsSchedule"
            :isSchedule="isSchedule"
          />
        </div>
      </v-col>
      <v-col cols="7">
        <Description
          :item="item"
          v-model="description"
          :description="description"
          :floatingLink="floatingLink"
          :floatingLinkLabel="floatingLinkLabel"
          :levelPriority="levelPriority"
          :expiredEpochDate="expiredEpochDate"
          @closeDialog="closeDialog"
          :isAdmin="isAdmin"
          @setFloatingLabel="setFloatingLabel"
          @setFloatingLink="setFloatingLink"
          @saveCaption="saveCaption"
          @saveChanging="saveChanging"
          @setDescription="setDescription"
          @setChange="setChange"
          @setExpiredDatePayload="setExpiredDatePayload"
          @setLevelPriority="setLevelPriority"
          @onCancelCaption="onCancelCaption"
          :isChanging="isChanging"
          :isPublish="isPublish"
          :isSchedule="isSchedule"
          :initExpiredDate="initExpiredDate"
          @setInitData="setInitData"
        />
      </v-col>
    </v-row>
    <div>

    </div>
    <v-snackbar
      v-model="snackbar"
      :timeout="timeout"
      outlined
      top
      color="warning"
    >
      <div v-if="errorObject">
        <div v-if="errorObject.response.status === 401">
        <div>{{ errorObject.response.data.error }}</div>
        <div>{{ errorObject.response.data.error_description}}</div>
      </div>
      <div v-else>
        <div>{{ errorObject.response.data.message }}</div>
        <div>{{ errorObject.response.data.data }}</div>
      </div>
      </div>
    </v-snackbar>
  </div>
</template>

<script>
import CarouselMedia from "./carouselMedia.vue";
import Description from "./description/index.vue";
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
    dialog : {
      type : Boolean
    },
  },
  watch : {
    feedPosition (prev) {
      const id = this.feeds[prev].id
      return this.getFeedById(id)
    },
    dialog(value) {
      if(value) {
        const id = this.item.id
        this.getFeedById(id)
      }
     
    }
  },
  data () {
    return {
      isPublish : false,
      isReject : false,
      isSchedule : false,
      errorObject : null,
      snackbar : false,
      timeout : 3000,
      snackbar : false,
      errorObject : null,
      timeout :3000,
      isChanging : false,
      description : '',
      floatingLink : '',
      floatingLinkLabel : '',
      initDescription: '',
      detailFeed: {
        medias: [],
      },
      expiredEpochDate : '',
      levelPriority : null,
      initExpiredDate : null,
      idFeed : ''
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
      fetchVodUrl : 'post/fetchVodUrl',
      updateDetailListKonten : 'post/updateDetailListKonten'
    }),
    setIsSchedule (value) {
      this.isSchedule = value
    },
    setInitData () {
      const id = this.item.id
      return this.getFeedById(id)
    },
    setLevelPriority (value) {
      this.levelPriority = value
    },
    setExpiredDatePayload (value) {
      this.expiredEpochDate = value
    },
    setDescription(value) {
      this.description = value
     
    },
    onCancelCaption () {
      this.description = this.initDescription
    },
    resetData () {
      this.detailFeed = {
        medias : []
      }
    },
    setFloatingLabel (value) {
      this.floatingLinkLabel = value
    },
    setFloatingLink (value) {
      this.floatingLink = value
    },
    getFeedById(id) {
      this.detailFeed = {
        medias : []
      }
      return this.fetchFeedById(id)
        .then(response => {
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
          this.initDescription = response.description
          this.floatingLink = response.floatingLink
          this.floatingLinkLabel = response.floatingLinkLabel
          // this.expiredEpochDate = response.expiredAt
          this.initExpiredDate = response.expiredAt
          if(this.$route.name === 'draft'){
            this.expiredEpochDate = this.item.expiredAt ? this.item.expiredAt : response.expiredAt
            if(this.item.levelPriority) {
              this.levelPriority = this.item.levelPriority
            }else {
              this.levelPriority = response.levelPriority > 0 ? response.levelPriority : null
            }
          }else{
            this.levelPriority = response.levelPriority > 0 ? response.levelPriority : null
            this.expiredEpochDate = response.expiredAt
          }
         
        })
        .catch (err => {
          this.snackbar = true
          this.errorObject = err
        })
    },
    stopVideo () {
      this.$refs.carouselMedia.stopVideo()
    },
    setIsPublish() {
      this.isPublish  = true
      this.isChanging = false
    },
    setIsReject () {
      this.isReject = true
      this.isChanging = false
    },
    setChange(value) {
      this.isChanging = value
    },
    triggerNextAction() {
      this.$emit('triggerNextAction')
      this.levelPriority = null
    },
    closeDialog() {
      this.$emit("closeDialog");
      this.isPublish  = false
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
          floatingLinkLabel: this.floatingLinkLabel,
          levelPriority : this.levelPriority,
          expiredAt : this.expiredEpochDate
        },
      }
      console.log(payload)
      return this.updatePostFeed(payload)
        .then(() => {
          return this.getFeedById(id);
        })
        .catch ((err) => {
          this.snackbar = true
          this.errorObject = err
        })
    },
    saveChanging(payload) {
      const id = this.detailFeed.id;
      const data = {
        id: id,
        params: {
          ...payload,
        },
      }
      return this.updateDetailListKonten(data)
        .then((response) => {
          return this.getFeedById(id);
        })
        .catch ((err) => {
          this.snackbar = true
          this.errorObject = err
        })
    },
    getFeed (id) {
      // console.log('getFeed', id)
    },
  }
}
</script>

<style src="./style.scss" lang="scss" module="d">
</style>