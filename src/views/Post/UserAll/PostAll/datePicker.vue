<template>
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
        <!-- <input
          v-bind="attrs"
          v-on="on"
          readonly
          v-model="displayDate"
          placeholder="DD/MM/YYYY"
        /> -->
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
          @click="handlePickDate"
          :disabled="date == '' || time == ''"
          >Set Date</v-btn
        >
      </section>
    </div>
  </v-menu>
</template>

<script>
import moment from "moment";

export default {
  props: ["displayDateProps"],
  data() {
    return {
      menuDate: false,
      date: "",
      time: "",
      displayDate: "",
    };
  },
  computed: {
    currentDate() {
      const d = moment().add(1, "day").format("YYYY-MM-DD");
      return d;
    },
    maxDate() {
      const d = moment().add(1, "year").format("YYYY-MM-DD");
      return d;
    },
  },
  mounted() {
    this.displayDate = moment(this.displayDateProps).format("DD/MM/YYYY HH:mm");
  },
  methods: {
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
