<template>
  <v-menu
    v-model="menuDate"
    :close-on-content-click="false"
    transition="scale-transition"
    offset-y
    min-width="auto"
  >
    <template v-slot:activator="{ on, attrs }">
      <div class="date__wrapper">
        <input
          v-bind="attrs"
          v-on="on"
          readonly
          v-model="displayDate"
          placeholder="DD/MM/YYYY"
        />
        <v-icon size="small">fas fa-calendar</v-icon>
      </div>
    </template>
    <v-date-picker
      v-model="date"
      no-title
      @input="handlePickDate"
      :min="currentDate"
      :max="maxDate"
    ></v-date-picker>
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
      displayDate: "",
    };
  },
  computed: {
    currentDate() {
      const d = moment().add(1, "day").format("YYYY-MM-DD");
      return d;
    },
    maxDate() {
      const d = moment().add(365, "day").format("YYYY-MM-DD");
      return d;
    },
  },
  mounted() {
    this.displayDate = moment(this.displayDateProps).format("DD/MM/YYYY");
  },
  methods: {
    handlePickDate() {
      this.menuDate = false;
      const display = moment(this.date).format("DD/MM/YYYY");
      this.displayDate = display;
      const currentEnd = moment(this.date).format("YYYY-MM-DD");
      const current = moment().format("HH:mm:ss");
      const total = `${currentEnd} ${current}`;
      const epochTotal = moment(total).valueOf();
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
