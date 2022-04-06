<template>
  <div>
    <div @click="openMedia" :class="d.link">Lihat Post</div>
    <v-dialog v-model="dialog" width="850px"  @click:outside="closeDialog">
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
          height="552"
          hide-delimiter-background
          hide-delimiters
          :show-arrows="false"
          v-model="feedPosition"
        >
          <v-carousel-item v-for="(feed, i) in feeds" :key="i">
            <div   height="552px" width="850px">
              <v-row no-gutters>
                <v-col cols="6">
                  <div :class="d.left">
                    <CarouselMedia 
                      :feed="detailFeed"
                      ref="carouselMedia"
                      :isAdmin="isAdmin"
                      @triggerNextAction="triggerNextAction"
                      :description="description"
                      :item="feeds[feedPosition]"
                      @setChange="setChange"
                    />
                  </div>
                </v-col>
                <v-col cols="6">
                  <!-- <div class="red--text" >{{isPublish}}</div> -->
                  <Description
                    :item="feeds[feedPosition]"
                    v-model="description"
                    :description="description"
                    @closeDialog="closeDialog"
                    :isAdmin="isAdmin"
                    @saveCaption="saveCaption"
                    @setChange="setChange"
                    :isChanging="isChanging"
                    :isPublish="isPublish[feedPosition]"
                  />
                  
                </v-col>
              </v-row>
            </div>
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
import moment from "moment";
import Description from "./description.vue";
import DeletedBy from "./deletedBy.vue";
import { mapActions } from "vuex";
import CarouselMedia from "./carouselMedia.vue";
export default {
  components: {
    Description,
    DeletedBy,
    CarouselMedia,
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
  },
  data() {
    return {
      dialog: false,
      isChanging: false,
      isPublish : [],
      feedPosition: 0,
      detailFeed: {
        medias: [],
      },
      date: "",
      menu: false,
      timeSchedule: "",
      humanDate: "",
      tempItem: null,
      loading: false,
      slidePosition: 0,
      description: "",
    };
  },
  watch : {
    feedPosition (prev) {
      const id = this.feeds[prev].id
      return this.getFeedById(id)
    }
  },
  methods: {
    ...mapActions({
      updatePostFeed: "post/updatePostFeed",
      fetchFeedById: "post/fetchFeedById",
    }),
    setChange(value) {
      this.isChanging = value
      this.isPublish[this.feedPosition] = true
    },
    slideRight() {
      if (this.feeds.length - 1 === this.feedPosition) {
        this.feedPosition = 0;
      } else {
        this.feedPosition++;
      }
    },
    slideLeft() {
      if (this.feedPosition === 0) {
        this.feedPosition = this.feeds.length - 1;
      } else {
        this.feedPosition--;
      }
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
    getFeedById(id) {
      this.detailFeed.medias = []
      return this.fetchFeedById(id).then((response) => {
        const slide = this.slidePosition;
        const medias = response.medias;
        this.description = response.description;
        this.detailFeed = response
        let idVideo;
        medias.forEach((m, idx) => {
          if (m.type === "video") {
            if (idx === slide) {
              idVideo = document.getElementById(`videodialog-${slide}-${m.id}`);
            }
          }
        });
        if (idVideo) {
          idVideo.play();
        }
      });
    },
    triggerNextAction() {
      this.slideRight()
      this.$refs.carouselMedia[0].stopVideo()
    },
    closeDialog() {
      this.$refs.carouselMedia[0].stopVideo()
      this.dialog = false;
      this.slidePosition = 0;
      this.$emit("refreshDataFeed");
      this.isPublish = []
    },
    openMedia() {
      this.dialog = true;
      this.feedPosition = this.item.index
      const id = this.item.id;
      return this.getFeedById(id);
    },
  },
};
</script>

<style src="./style.scss" lang="scss" module="d">
</style>