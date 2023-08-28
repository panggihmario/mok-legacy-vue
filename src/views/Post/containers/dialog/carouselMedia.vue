<template>
  <div>
    <v-carousel
      v-model="slidePosition"
      hide-delimiters
      :show-arrows="false"
      class="mb-4"
      height="100%"
    >
      <v-carousel-item
        v-for="(item, i) in feed.medias"

        :key="i"
        reverse-transition="fade-transition"
        transition="fade-transition"
      > 
        <Media :item="item" :i="i" />
      </v-carousel-item>
    </v-carousel>
    <div class="d-flex align-start  black--text">
      <div class="d-flex" v-if="feed.medias.length > 1">
        <div :class="d['box-icon']" @click="slideLeft">
          <v-icon color="charcoal" x-small>fas fa-chevron-left</v-icon>
        </div>
        <div :class="d['box-icon']" @click="slideRight">
          <v-icon color="charcoal" x-small >fas fa-chevron-right</v-icon>
        </div>
      </div>
     
      <v-menu
        v-if="isAdmin && !isPublish "
        ref="menu"
        v-model="menu"
        :close-on-content-click="false"
        :return-value.sync="date"
        transition="scale-transition"
        offset-y
        min-width="auto"
      >
        <template v-slot:activator="{ on, attrs }">
          <div style="position: relative">
            <input
              :class="d.schedule"
              placeholder="DD/MM/YYYY  HH:MM"
              readonly
              v-bind="attrs"
              v-on="on"
              v-model="humanDate"
            />
          </div>
        </template>
        <v-card class="pa-2">
          <v-date-picker v-model="date" class="mr-2"> </v-date-picker>
          <v-time-picker v-model="timeSchedule" />
          <v-spacer></v-spacer>
          <v-btn text color="primary" @click="menu = false"> Cancel </v-btn>
          <v-btn text color="primary" @click="setDate"> OK </v-btn>
        </v-card>
      </v-menu>
      <custom-button
        v-if="isAdmin && !isPublish"
        :loading="loading"
        @click="publishFeed"
        class="ml-2"
        size="x-small"
        color='secondary'
      >
       Post Content Sekarang
      </custom-button>
      <custom-button
        v-if="isAdmin && isPublish"
        class="ml-4"
        size="small"
        color="success"
      >
        Success
      </custom-button>
      <div v-if="$route.name === 'reject'">
        <DeletedBy :item="feed" />
      </div>
    </div>
  </div>
</template>

<script>
import DeletedBy from "./deletedBy.vue";
import { mapActions } from "vuex";
import moment from "moment";
import Media from "./media.vue"
export default {
  components: {
    DeletedBy,
    Media
  },
  data() {
    return {
      slidePosition: 0,
      loading: false,
      humanDate: "",
      timeSchedule: "",
      menu: false,
      date: "",
      tempFeed: null,
      isPublish : false
    };
  },
  props: {
    feed: {
      type: Object,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    description : {
      type : String
    },
    item : {
      type : Object
    },
  },
  computed : {
    isContain () {
      console.log(this.item)
    }
  },
  methods: {
    ...mapActions({
      updatePostFeed: "post/updatePostFeed",
    }),
    publishFeed() {
      this.loading = true;
      const payload = this.getPayload(this.humanDate);
      return this.updatePostFeed(payload)
        .then((response) => {
          setTimeout(() => {
            this.loading = false;
            this.isPublish = true
            this.$emit('triggerNextAction')
            this.$emit('setIsPublish', true)
          }, 1500);
        })
        .catch((err) => {
          this.loading = false;
          this.isPublish = false
        });
    },
    getPayload(humanDate) {
      const item = this.feed;
      const medias = this.feed.medias;
      const itemWithSchedule = this.tempFeed;
      let payload;
      if (humanDate) {
        payload = {
          id: item.id,
          type: "schedule",
          params: {
            ...itemWithSchedule,
            medias: [...medias],
            description : this.description,
            channel : this.item.channel
          },
        };
      } else {
        payload = {
          id: item.id,
          type: "publish",
          params: {
            ...item,
            medias: [...medias],
            description : this.description,
            channel : this.item.channel
          },
        };
      }
      return payload;
    },
    convertEpoch(scheduleDate, scheduleTime) {
      let schedule = `${scheduleDate} ${scheduleTime}`;
      const epochDate = moment(schedule, "YYYY-MM-DD HH:mm")
        .add(7, "hours")
        .unix();
      const miliEpoch = epochDate * 1000;
      const feed = this.feed;
      const temp = {
        ...feed,
        isScheduled: true,
        scheduledTime: miliEpoch,
      };
      this.tempFeed = temp;
    },
    slideLeft() {
      if (this.slidePosition === 0) {
        this.slidePosition = this.feed.medias.length - 1;
      } else {
        this.slidePosition--;
      }
      this.stopVideo();
      // this.playVideo();
    },
    setDate() {
      const d = this.date;
      const t = this.timeSchedule;
      const [year, month, date] = d.split("-");
      const f = `${date}/${month}/${year}`;
      const format = `${f} ${t}`;
      this.humanDate = format;
      this.convertEpoch(d, t);
      this.menu = false;
    },
    slideRight() {
      // this.slidePosition++;
      if (this.slidePosition === this.feed.medias.length - 1) {
        this.slidePosition = 0;
      } else {
        this.slidePosition++;
      }
      this.stopVideo();
      // this.playVideo();
    },
    stopVideo() {
      const slide = this.slidePosition;
      const medias = this.feed.medias;
      let idVideo;
      medias.forEach((m, idx) => {
        if (m.type === "video") {
          if (idx === slide) {
            idVideo = document.getElementById(`videodialog-${slide}-${m.id}`);
          }else{
            idVideo = ''
          }
        }
      });
      if (idVideo) {
        idVideo.pause()
        // idVideo.load()
        idVideo.currentTime = 0;
      }
    },
    playVideo() {
      const slide = this.slidePosition;
      const medias = this.feed.medias;
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
    },
  },
};
</script>

<style src="./style.scss" lang="scss" module="d">
</style>