<template>
  <div>
    <div class="input-wrapper">
      <input
        :class="dt.schedule"
        placeholder="DD/MM/YYYY  HH:MM"
        readonly
        @click="openDialog"
        v-model="humanDate"
      />
    </div>
    <v-dialog v-model="menudate" width="700px">
      <v-card>
        <div :class="dt.container">
          <v-date-picker v-model="scheduleDate"></v-date-picker>
          <v-time-picker v-model="scheduledTime" class="ml-6" ampm-in-title>
          </v-time-picker>
          <div class="d-flex justify-space-between mt-4">
            <div :class="dt.display">
              {{ newFormatDate }} {{ scheduledTime }}
            </div>
            <div>
              <custom-button @click="menudate = false" class="mr-4"
                >Batalkan</custom-button
              >
              <custom-button @click="setSchedule" color="primary"
                >Jadwalkan Publikasi</custom-button
              >
            </div>
          </div>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import moment from "moment";
import { mapMutations } from "vuex";
export default {
  props: ["item"],
  data() {
    return {
      menudate: false,
      menu: false,
      scheduleDate: "",
      scheduledTime: "",
      humanDate: "",
    };
  },
  computed: {
    newFormatDate() {
      if (this.scheduleDate) {
        const [year, month, date] = this.scheduleDate.split("-");
        const f = `${date}/${month}/${year}`;
        return f;
      } else {
        return null;
      }
    },
  },
  methods: {
    openDialog() {
      this.menudate = true;
    },
    ...mapMutations({
      setEpochFeed: "post/setEpochFeed",
    }),
    setSchedule() {
      const [year, month, date] = this.scheduleDate.split("-");
      const f = `${date}/${month}/${year}`;
      const format = `${f} ${this.scheduledTime}`;
      this.humanDate = format;
      this.menudate = false;
      this.convertEpoch(this.scheduleDate, this.scheduledTime);
    },
    convertEpoch(scheduleDate, scheduleTime) {
      let schedule = `${scheduleDate} ${scheduleTime}`;
      const epochDate = moment(schedule, "YYYY-MM-DD HH:mm")
        .add(7, "hours")
        .unix();
      const miliEpoch = epochDate * 1000;
      const payload = {
        index: this.item.index,
        time: miliEpoch,
      };
      this.$emit('setEpochDate', miliEpoch)
      // this.setEpochFeed(payload);
    },
  },
};
</script>

<style lang="scss" module="dt">
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
.container {
  padding: 32px;
}
.display {
  background: #ffffff;
  border: 1px solid #dddddd;
  box-sizing: border-box;
  border-radius: 4px;
  width: 180px;
  height: 40px;
  padding: 10px 10px 10px 14px;
  color: #4a4a4a;
  font-size: 12px;
  font-weight: 500;
}
</style>

<style type="text/css">
.input-wrapper {
  display: inline-block;
  position: relative;
}
.input-wrapper:after {
  font-family: "Font Awesome 5 Free";
  font-weight: 900;
  content: "\f0dd";
  position: absolute;
  right: 6px;
  top: -1px;
}
</style>