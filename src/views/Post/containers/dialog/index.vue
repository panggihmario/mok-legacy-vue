<template>
  <div>
    <div @click="openMedia" :class="d.link">Lihat Post</div>
    <v-dialog v-model="dialog" width="850" @click:outside="closeDialog">
      <v-card>
        <v-row no-gutters>
          <v-col cols="6">
            <div :class="d.left">
                <v-carousel
                  height="456"
                  v-model="slidePosition"
                  hide-delimiters
                  :show-arrows="false"
                  class="mb-4"
                >
                  <v-carousel-item
                    v-for="(item, i) in detailFeed.medias"
                    hide-delimiters
                    :key="i"
                    reverse-transition="fade-transition"
                    transition="fade-transition"
                  >
                  
                    <video
                      v-if="item.type === 'video'"
                      controls
                      :src="item.url"
                      :id="`videodialog-${i}`"
                      autoplay
                      :class="d.vid"
                    />
                    <div :class="d['container-image']" v-else >
                      <img 
                        :class="d.img"
                        :src="item.url" 
                      />
                    </div>
                  </v-carousel-item> 
                </v-carousel>
              <div class="d-flex">
                <div class="d-flex" v-if="detailFeed.medias.length > 1">
                  <v-btn 
                    icon 
                    @click="slideLeft"
                  >
                    <v-icon small>fas fa-chevron-left</v-icon>
                  </v-btn>
                  <v-btn
                    class="mr-4"
                    @click="slideRight"
                    icon
                  >
                  <v-icon small>fas fa-chevron-right</v-icon>
                  </v-btn>
                </div>
                <v-menu
                  v-if="isAdmin"
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
                    <v-date-picker no-title v-model="date"> </v-date-picker>
                    <v-time-picker no-title v-model="timeSchedule" />
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="menu = false">
                      Cancel
                    </v-btn>
                    <v-btn text color="primary" @click="setDate"> OK </v-btn>
                  </v-card>
                </v-menu>
                <custom-button
                  v-if="isAdmin"
                  :loading="loading"
                  @click="publishFeed"
                  class="ml-4"
                  size="small"
                  color="secondary"
                  >Post Content Sekarang</custom-button
                >
              </div>
            </div>
          </v-col>
          <v-col cols="6">
            <div :class="d.right">
              <div :class="d.icon">
                <v-icon @click="closeDialog" size="18px">fas fa-times</v-icon>
              </div>
              <div :class="d.desc">
                <span :class="d.user">{{ item.createBy }}</span>
                {{ item.description }}
              </div>
            </div>
          </v-col>
        </v-row>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import moment from "moment";
import { mapActions } from "vuex";
export default {
  props: {
    item : Object,
    isAdmin : {
      type : Boolean,
      default : false
    }
  },
  data() {
    return {
      dialog: false,
      detailFeed : {
        medias : [],
      },
      date: "",
      menu: false,
      timeSchedule: "",
      humanDate: "",
      tempItem: null,
      loading: false,
      slidePosition : 0
    };
  },
  computed: {
    srcImage() {
      if (this.item.medias) {
        return this.item.medias[0].thumbnail.medium;
      }
    },
    srcVideo() {
      if (this.item.medias) {
        return this.item.medias[0].url;
      }
    },
    isVideo() {
      if (this.item.medias) {
        const type = this.item.medias[0].type;
        if (type === "video") {
          return true;
        } else {
          return false;
        }
      }
    },
  },
  methods: {
    ...mapActions({
      updatePostFeed: "post/updatePostFeed",
      fetchFeedById : "post/fetchFeedById"
    }),
    getFeedById(id) {
      return this.fetchFeedById(id)
        .then(response => {
          this.detailFeed.medias = response.medias
          this.$nextTick(() => {
            this.dialog = true;
          })
        })
    },
    slideLeft() {
      const slide = this.slidePosition
      const idVideo = document.getElementById(`videodialog-${slide}`)
      if (idVideo) {
        console.log(idVideo)
        idVideo.pause();
        idVideo.currentTime = 0;
      }
      this.slidePosition--
    },
    slideRight () {
      const slide = this.slidePosition
      const c = document.querySelectorAll('video')
      const idVideo = document.getElementById(`videodialog-${slide}`)
      if (idVideo) {
        idVideo.pause();
        idVideo.currentTime = 0;
      }
      this.slidePosition++
    },
    closeDialog() {
      const slide = this.slidePosition
      const idVideo = document.getElementById(`videodialog-${slide}`);
      if (idVideo) {
        idVideo.pause();
        idVideo.currentTime = 0;
      }
      this.dialog = false;
    },
    openMedia() {
      const idVideo = document.getElementById(`videodialog${this.item.id}`);
      if (idVideo) {
        idVideo.play();
      }
      const id = this.item.id
      return this.getFeedById(id)
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
    convertEpoch(scheduleDate, scheduleTime) {
      let schedule = `${scheduleDate} ${scheduleTime}`;
      const epochDate = moment(schedule, "YYYY-MM-DD HH:mm")
        .add(7, "hours")
        .unix();
      const miliEpoch = epochDate * 1000;
      const item = this.item;
      const temp = {
        ...item,
        isScheduled: true,
        scheduledTime: miliEpoch,
      };
      this.tempItem = temp;
    },
    getPayload (humanDate) {
      const item = this.item
      const medias = this.detailFeed.medias
      const itemWithSchedule = this.tempItem
      let payload
      if(humanDate) {
        payload = {
          id : item.id,
          type : 'schedule',
          params : {
            ...itemWithSchedule,
            medias : [...medias]
          }
        }
      }else{
        payload = {
          id : item.id,
          type : 'publish',
          params : {
            ...item,
            medias : [...medias]
          }
        }
      }
      return payload
    },
    publishFeed() {
      this.loading = true;
      const payload = this.getPayload(this.humanDate)
      return this.updatePostFeed(payload)
        .then((response) => {
          setTimeout(() => {
            this.loading = false;
            this.dialog = false;
            this.$emit("refreshDataFeed");
          }, 1500)
        })
        .catch((err) => {
          this.loading = false;
        });
    },
  },
};
</script>

<style lang="scss" module="d">
.user {
  font-size: 12px;
  color: $black;
  font-weight: bold;
}
.link {
  color: #1890ff;
  text-decoration: underline;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
}
.left {
  padding: 28px 24px 24px 28px;
}
.container-image {
  display: flex;
  align-items: center;
  background-color: #000000;
  height: 100%;
  justify-content: center;
}
.img {
  max-width: 100%;
  max-height: 100%;
}
.vid {
  width: 100% !important;
  height: 100% !important;
  object-fit: cover;
}
.right {
  padding: 12px 12px 12px 0;
}
.icon {
  text-align: right;
  cursor: pointer;
}
.desc {
  font-size: 12px;
  color: #000000;
  padding-right: 46px;
}
.schedule {
  background: #ffffff;
  border: 0.6px solid #bbbbbb;
  border-radius: 4px;
  box-sizing: border-box;
  width: 138px;
  height: 24px;
  padding: 6px;
  font-size: 10px;
  cursor: pointer;
}
.icon-input {
  position: absolute;
  right: 15px;
  bottom: 3px;
}
</style>