<template>
  <div class="text-center">
    <v-menu
      v-model="menu"
      :close-on-content-click="false"
      :nudge-width="400"
      offset-y
      @input="onClick"
    >
      <template v-slot:activator="{ on, attrs }">
        <custom-input
          v-bind="attrs"
          hide-details
          v-on="on"
          dense
          readonly
          placeholder="Tanggal"
          v-model="displayDate"
        ></custom-input>
      </template>

      <v-card class="dt__card" flat>
        <v-row>
          <v-col cols="6">
            <v-date-picker
              width="250"
              v-model="choosenDate"
              no-title
              range
              :max="maxDate"
            >
            </v-date-picker>
          </v-col>
          <v-col class="dt__box-right">
            <div>
              <custom-input
                outlined
                dense
                color="secondary"
                label="Dari Tanggal"
                readonly
                v-model="fromDate"
                hide-details
                append-icon="mdi-calendar"
              />

              <div class="mb-2"></div>
              <custom-input
                outlined
                dense
                color="secondary"
                label="Sampai Tanggal"
                readonly
                v-model="endDate"
                hide-details
                append-icon="mdi-calendar"
              />
            </div>
            <!-- <div class="mb-2"></div> -->
            <div>
              <!-- <custom-button
                color="warning"
                size="small"
                @click="onReset"
              >Reset Tanggal</custom-button>
              <div class="warning-sign">{{showWarning}} </div> -->
              <div class="d-flex justify-end">
                <v-btn class="mr-4" small @click="onReset" text color="warning">
                  <div class="dt__text-button">Reset</div>
                </v-btn>
                <v-btn @click="closeMenu" small color="secondary">
                  <div class="dt__text-button">OK</div>
                </v-btn>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-card>
    </v-menu>
  </div>
</template>

<script>
import moment from "moment";
import { mapMutations, mapState } from "vuex";

export default {
  props: {
    reset: {
      type: Boolean,
      default: false,
    },
    tab: {
      type: [Number, String],
      default: 0,
    },
  },
  data: () => ({
    fav: true,
    menu: false,
    message: false,
    hints: true,
    selectedDate: "",
    dates: [],
  }),
  watch: {
    reset(newVal, oldVal) {
      this.onReset();
    },
    tab() {
      this.onReset();
    },
  },
  computed: {
    ...mapState({
      paramsDate: (state) => state.post.paramsDate,
      displayDate: (state) => state.post.displayDate,
    }),
    fromDate() {
      if (this.choosenDate.length > 0) {
        return this.formatter(this.choosenDate[0]);
      }
    },
    endDate() {
      if (this.choosenDate.length > 1) {
        return this.formatter(this.choosenDate[1]);
      }
    },
    showWarning() {
      const [from, end] = this.choosenDate;
      if (from && end) {
        const mFrom = moment(from);
        const mEnd = moment(end);
        if (mFrom > mEnd) {
          return "wrong range date";
        } else {
          return;
        }
      }
    },
    currentDate() {
      const d = moment().format("YYYY-MM-DD");
      return d;
    },
    maxDate() {
      // v-if="$route.name  !== 'schedule'  "
      if (this.$route.name === "schedule") {
        return null;
      } else {
        return this.currentDate;
      }
    },
    choosenDate: {
      get() {
        return this.paramsDate;
      },
      set(value) {
        this.setParamsDate(value);
        const after = this.checkRangeDate(value);
        if (after[1] && after[0]) {
          this.setParamsDate(after);
        } else {
          this.setParamsDate(value);
        }
      },
    },
  },
  methods: {
    ...mapMutations({
      setParamsDate: "post/setParamsDate",
      setDisplayDate: "post/setDisplayDate",
    }),
    checkRangeDate(value) {
      const [first, second] = value;
      const mFirst = moment(first);
      const mSecond = moment(second);
      if (mFirst > mSecond) {
        return [second, first];
      } else {
        return [first, second];
      }
    },
    onReset() {
      this.choosenDate = [];
      this.setDisplayDate("");
      this.$emit("onResetDate");
    },
    formatter(value) {
      const v = moment(value).format("DD/MM/YYYY");
      return v;
    },
    closeMenu() {
      this.menu = false;
      this.onClick();
    },
    onClick() {
      if (this.choosenDate.length > 0) {
        const d = this.choosenDate;
        const from = this.formatter(d[0]);
        this.setDisplayDate(from);
        if (this.choosenDate.length > 1) {
          // const end = this.formatter(d[1]);
          // const fullDate = `${from} - ${end}`;
          const afterCheckRangeDate = this.checkRangeDate(this.choosenDate);
          const start = this.formatter(afterCheckRangeDate[0]);
          const end = this.formatter(afterCheckRangeDate[1]);
          const fullDate = `${start} - ${end}`;
          this.setDisplayDate(fullDate);
          this.setParamsDate(afterCheckRangeDate);
          this.$emit("onSetDate", { start, end });
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.dt {
  &__card {
    padding: 16px;
    background-color: $whitesnow;
  }
  &__box-right {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  &__text-button {
    font-size: 9px;
    font-weight: 500;
  }
}
.warning-sign {
  font-size: 12px;
  font-weight: 500;
  color: #777777;
}
</style>
