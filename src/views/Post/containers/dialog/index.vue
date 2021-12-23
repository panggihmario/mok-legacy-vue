<template>
  <div>
    <div @click="openMedia" :class="d.link">Lihat Post</div>
    <v-dialog v-model="dialog" width="850" @click:outside="closeDialog" >
      <v-card>
        <v-row no-gutters>
          <v-col cols="6">
            <div :class="d.left">
              <div :class="d['container-image']">
                <video
                  v-if="isVideo"
                  :src="srcVideo"
                  autoplay
                  controls
                  id="videodialog"
                />
                <v-img
                  v-else
                  :src="srcImage"
                  contain
                  aspect-ratio="1"
                  max-height="456"
                />
                <!-- <Carousel/> -->
              </div>
              <div class="d-flex">
                <v-menu
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
                <span :class="d.user">{{item.createBy}}</span> {{ item.description }}
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
import Carousel from "./carousel.vue"
export default {
  components : {
    Carousel
  },
  props: ["item"],
  data() {
    return {
      dialog: false,
      date: "",
      menu: false,
      timeSchedule: "",
      humanDate: "",
      tempItem: null,
      loading: false,
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
    isVideo () {
      if(this.item.medias) {
        const type = this.item.medias[0].type
        if(type === 'video'  ){
          return true
        }else {
          return false
        }
      }
    }
  },
  methods: {
    ...mapActions({
      updatePostFeed: "post/updatePostFeed",
    }),
    closeDialog(){
      const idVideo = document.getElementById('videodialog')
      if(idVideo){
        idVideo.pause()
        idVideo.currentTime = 0
      }
      this.dialog = false
    },
    openMedia() {
      // const idVideo = document.getElementById('videodialog')
      // if(idVideo){
      //   idVideo.play()
      // }
      this.dialog = true;
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
    publishFeed() {
      this.loading = true;
      let data;
      if (this.humanDate) {
        data = this.tempItem;
      } else {
        const item = this.item;
        data = item;
      }
      const payload = {
        id: data.id,
        type: "schedule",
        params: {
          ...data,
        },
      };
      return this.updatePostFeed(payload)
        .then((response) => {
          this.loading = false;
          this.dialog = false;
          this.$emit("refreshDataFeed");
        })
        .catch((err) => {
          this.loading = false;
          console.log(err.response);
        });
    },
  },
};
</script>

<style lang="scss" module="d">
.user {
  font-size: 12px;
  color:  $black;
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
  height: 456px;
  display: flex;
  align-items: center;
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