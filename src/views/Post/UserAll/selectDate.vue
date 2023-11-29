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
        <div v-on="on" class="date__wrapper font-12">
          <div :style="displayDateTrending?'color: #000':'color: #858585'">
            {{ displayDateTrending ? displayDateTrending : "Dipublish pada" }}
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
  data: () => ({
    fav: true,
    menu: false,
    message: false,
    hints: true,
    selectedDate: "",
    dates: [],
  }),
  computed: {
    ...mapState({
      paramsDateTrending: (state) => state.post.paramsDateTrending,
      displayDateTrending: (state) => state.post.displayDateTrending,
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
        return this.paramsDateTrending;
      },
      set(value) {
        this.setParamsDateTrending(value);
        const after = this.checkRangeDate(value);
        if (after[1] && after[0]) {
          this.setParamsDateTrending(after);
        } else {
          this.setParamsDateTrending(value);
        }
      },
    },
  },
  mounted() {
    this.onReset();
  },
  methods: {
    ...mapMutations({
      setParamsDateTrending: "post/setParamsDateTrending",
      setDisplayDateTrending: "post/setDisplayDateTrending",
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
      this.setDisplayDateTrending("");
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
        this.setDisplayDateTrending(from);
        if (this.choosenDate.length > 1) {
          // const end = this.formatter(d[1]);
          // const fullDate = `${from} - ${end}`;
          const afterCheckRangeDate = this.checkRangeDate(this.choosenDate);
          const start = this.formatter(afterCheckRangeDate[0]);
          const end = this.formatter(afterCheckRangeDate[1]);
          const fullDate = `${start} - ${end}`;
          this.setDisplayDateTrending(fullDate);
          this.setParamsDateTrending(afterCheckRangeDate);
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
.date {
  &__wrapper {
    display: flex;
    background-color: white;
    border: transparent;
    height: 38px;
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
.font-12 {
  font-size: 12px;
}
</style>
