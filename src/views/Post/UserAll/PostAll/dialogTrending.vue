<template>
  <v-dialog v-model="dialog" width="356" @click:outside="closeDialog">
    <v-card class="notif">
      <v-icon @click="closeDialog" class="notif__close" size="small"
        >fas fa-times</v-icon
      >
      <v-icon color="secondary">fas fa-exclamation-circle</v-icon>
      <div>
        <div class="notif__label">Trendingkan Konten</div>
        <div style="font-size: 12px" class="mt-2">
          Postingan ini akan ditrendingkan hingga:
        </div>
        <div class="mt-3 mb-5">
          <v-menu
            v-model="menuDate"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
            min-width="600"
          >
            <template v-slot:activator="{ on, attrs }">
              <div v-on="on" class="date__wrapper">
                <div>
                  {{ displayDate }}
                </div>
                <v-icon size="small">fas fa-calendar</v-icon>
              </div>
            </template>
            <div class="white">
              <section class="d-flex">
                <v-date-picker
                  v-model="date"
                  no-title
                  :min="currentDate"
                  :max="maxDate"
                ></v-date-picker>
                <v-time-picker
                  v-model="time"
                  ampm-in-title
                  full-width
                  header-color="secondary"
                ></v-time-picker>
              </section>
              <section class="pa-4">
                <v-btn
                  class="text-capitalize"
                  depressed
                  color="secondary"
                  style="letter-spacing: 1px"
                  @click="handlePickDate"
                  :disabled="date == null || time == null"
                  >Submit</v-btn
                >
              </section>
            </div>
          </v-menu>
        </div>
        <div class="d-flex" style="gap: 8px">
          <custom-button @click="closeDialog" size="small"
            >Batalkan</custom-button
          >
          <custom-button
            size="small"
            color="secondary"
            @click="actionSubmit"
            :disabled="date == null"
          >
            Trendingkan Sekarang
          </custom-button>
        </div>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
import moment from "moment";

export default {
  data() {
    return {
      menuDate: false,
      displayDate: null,
      date: null,
      time: null,
    };
  },
  watch: {
    dialog() {
      this.displayDate = null;
      this.date = null;
      this.time = null;
    },
  },
  props: {
    dialog: {
      type: Boolean,
    },
  },
  computed: {
    currentDate() {
      const d = moment().add(3, "days").format("YYYY-MM-DD");
      return d;
    },
    maxDate() {
      const d = moment().add(3, "months").format("YYYY-MM-DD");
      return d;
    },
  },
  methods: {
    closeDialog() {
      this.$emit("closeDialog", false);
    },
    actionSubmit() {
      this.$emit("actionSubmit");
    },
    handlePickDate() {
      this.menuDate = false;
      const display = moment(`${this.date} ${this.time}`).format(
        "DD/MM/YYYY HH:mm"
      );
      this.displayDate = display;
      const currentEnd = moment(`${this.date} ${this.time}`).format(
        "YYYY-MM-DD HH:mm"
      );
      const epochTotal = moment(currentEnd).valueOf();
      this.$emit("getEpoch", epochTotal);
    },
  },
};
</script>

<style lang="scss" scoped src="../style.scss"></style>

<style lang="scss" scoped>
.date {
  &__wrapper {
    display: flex;
    border: 1px solid #a8a8a8;
    height: 40px;
    border-radius: 4px;
    padding: 0 9px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    // width: 100px;
    cursor: pointer;
    &:hover {
      border-color: black !important;
    }
    & input {
      font-size: 11px;
      height: 100%;
      width: inherit;
      &:focus {
        border: none;
        outline: none;
      }
    }
  }
}
</style>
