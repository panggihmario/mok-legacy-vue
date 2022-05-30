<template>
  <div>
    <template>
      <div class="text-center">
        <v-menu
          v-model="menu"
          :close-on-content-click="false"
          :nudge-width="200"
          offset-y
          max-width="430px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="whitesnow"
              height="40px"
              class="text-capitalize black--text"
              depressed
              dark
              v-bind="attrs"
              v-on="on"
            >
              {{
                endDate == null ? "Month" : `${startDateShow} - ${endDateShow}`
              }}
              <v-icon>mdi-chevron-down</v-icon>
            </v-btn>
          </template>

          <v-card>
            <div class="pa-4">
              <v-row no-gutters>
                <v-col cols="7">
                  <div class="d-flex justify-space-between align-center">
                    <v-icon
                      class="cursor-pointer"
                      color="secondary"
                      small
                      @click="subtrYear"
                      >mdi-chevron-left</v-icon
                    >
                    <span class="font-10">{{ payload.year }}</span>
                    <v-icon
                      class="cursor-pointer"
                      color="secondary"
                      small
                      @click="sumYear"
                      >mdi-chevron-right</v-icon
                    >
                  </div>
                  <v-row no-gutters class="mt-2">
                    <v-col
                      v-for="(m, i) in months"
                      :key="m"
                      cols="2"
                      class="pa-1"
                    >
                      <div
                        class="d-flex justify-center align-center box-month__list cursor-pointer"
                        :class="{
                          'box-selected__true':
                            parseInt(
                              `${payload.year}${i < 10 ? `0${i}` : i}`
                            ) == dStart ||
                            parseInt(
                              `${payload.year}${i < 10 ? `0${i}` : i}`
                            ) == dEnd,
                          'box-selected__secondary':
                            parseInt(`${payload.year}${i < 10 ? `0${i}` : i}`) >
                              dStart &&
                            parseInt(`${payload.year}${i < 10 ? `0${i}` : i}`) <
                              dEnd,
                          'box-selected__disable':
                            parseInt(`${payload.year}${i < 10 ? `0${i}` : i}`) <
                            dStart,
                          'box-month__today':
                            parseInt(
                              `${payload.year}${i < 10 ? `0${i}` : i}`
                            ) == dToday,
                        }"
                        @click="
                          setDatePayload(
                            i,
                            parseInt(`${payload.year}${i < 10 ? `0${i}` : i}`)
                          )
                        "
                      >
                        <span class="font-10">{{ m }}</span>
                      </div>
                    </v-col>
                  </v-row>
                </v-col>

                <v-col cols="5" class="pl-4">
                  <div>
                    <span class="font-weight-medium font-12">Dari Bulan</span>
                    <div class="d-flex align-center box-month px-2">
                      <span
                        v-if="startDateShow"
                        class="font-weight-medium font-12"
                        >{{ startDateShow }}</span
                      >
                      <span v-else class="font-weight-medium font-12 grey--text"
                        >MM:YY</span
                      >
                    </div>
                  </div>
                  <div class="mt-2">
                    <span class="font-weight-medium font-12">Sampai Bulan</span>
                    <div class="d-flex align-center box-month px-2">
                      <span
                        v-if="endDateShow"
                        class="font-weight-medium font-12"
                        >{{ endDateShow }}</span
                      >
                      <span v-else class="font-weight-medium font-12 grey--text"
                        >MM:YY</span
                      >
                    </div>
                  </div></v-col
                >
              </v-row>
            </div>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn text class="text-capitalize" @click="cancelDate">
                Cancel
              </v-btn>
              <v-btn
                color="primary"
                text
                class="text-capitalize"
                @click="menu = false"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-menu>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    payloadData: {
      type: Object,
    },
    tab: {
      type: String,
      default: "",
    },
  },
  data: () => ({
    fav: true,
    menu: false,
    message: false,
    hints: true,
    dToday: null,
    dStart: null,
    dEnd: null,
    keyFocusStart: null,
    keyFocusEnd: null,
    firstDay: null,
    lastDay: null,
    startDate: null,
    endDate: null,
    startDateShow: null,
    endDateShow: null,
    payload: {
      year: "",
      month: "",
      dateFirst: "",
      dateLast: "",
    },
    months: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "Mei",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Okt",
      "Nov",
      "Des",
    ],
  }),
  watch: {
    startDate() {
      this.payloadData.startDateAt = this.startDate;
    },
    endDate() {
      this.payloadData.endDateAt = this.endDate;
    },
    tab() {
      this.startDate = null;
      this.endDate = null;
      this.startDateShow = null;
      this.endDateShow = null;
      this.dStart = null;
      this.dEnd = null;
      this.keyFocusStart = null;
      this.keyFocusEnd = null;
    },
  },
  mounted() {
    this.getToday();
    // this.getFirstDayLastDay();
  },
  methods: {
    getToday() {
      const d = new Date();
      const dateNow = d.getDate();
      const monthNow = d.getMonth();
      const yearNow = d.getFullYear();
      this.payload.dateFirst = dateNow;
      this.payload.month = monthNow;
      this.payload.year = yearNow;
      this.dToday = parseInt(
        `${yearNow}${monthNow < 10 ? `0${monthNow}` : monthNow}`
      );
    },
    getFirstDayLastDay() {
      const m = this.payload.month;
      const y = this.payload.year;
      this.firstDay = new Date(y, m, 1).getDay();
      this.lastDay = new Date(y, m + 1, 0).getDate();
    },
    sumYear() {
      this.payload.year++;
      this.getFirstDayLastDay();
    },
    subtrYear() {
      this.payload.year--;
      this.getFirstDayLastDay();
    },
    sumMonth(m) {
      if (m != 1) {
        this.payload.month = m;
      } else {
        this.payload.month++;
        if (this.payload.month > 11) {
          this.payload.month = 0;
        }
      }
      this.getFirstDayLastDay();
    },
    subtrMonth(m) {
      if (m != 1) {
        this.payload.month = m;
      } else {
        this.payload.month--;
        if (this.payload.month < 0) {
          this.payload.month = 11;
        }
      }
      this.getFirstDayLastDay();
    },
    setDatePayload(m, key) {
      if (this.startDate == null) {
        this.setStartDate(m);
      } else if (this.startDate != null && this.endDate == null) {
        if (key >= this.dStart) {
          this.setEndDate(m);
        }
      } else if (this.endDate != null) {
        this.startDate = null;
        this.endDate = null;
        this.dStart = null;
        this.dEnd = null;
        this.keyFocusStart = null;
        this.keyFocusEnd = null;
      }
    },
    setStartDate(m) {
      this.startDate = `${m < 9 ? `0${m + 1}` : m + 1}/${this.payload.year}`;
      this.startDateShow = `${this.months[m]}`;
      this.dStart = parseInt(`${this.payload.year}${m < 10 ? `0${m}` : m}`);
      this.keyFocusStart = `${this.payload.year}${m}`;
    },
    setEndDate(m) {
      this.endDate = `${m < 9 ? `0${m + 1}` : m + 1}/${this.payload.year}`;
      this.endDateShow = `${this.months[m]}`;
      this.dEnd = parseInt(`${this.payload.year}${m < 10 ? `0${m}` : m}`);
      this.keyFocusEnd = `${this.payload.year}${m}`;
    },
    cancelDate() {
      this.startDate = null;
      this.endDate = null;
      this.dStart = null;
      this.dEnd = null;
      this.keyFocusStart = null;
      this.keyFocusEnd = null;
      this.menu = false;
    },
    submitDate() {},
  },
};
</script>

<style lang="sass" scoped>
.font-10
  font-size: 10px
.font-12
  font-size: 12px
.cursor-pointer
  cursor: pointer
.box-selected
  &__not
    border: 1px solid white
    height: 28px
  &__true
    background: $secondary !important
    border: 1px solid rgba($secondary, .3) !important
    border-radius: 500px
    color: white !important
  &__secondary
    border-radius: 500px
    background: rgba($secondary, .2) !important
  &__disable
    color: grey
    background: white !important
    cursor: default !important
.box-month
  height: 32px
  border: 1px solid #bbbbbb
  border-radius: 4px
  &__list
    border: 1px solid $whitesnow
    border-radius: 4px
    background: $whitesnow
  &__today
    border: 1px solid rgba($secondary, .3)
</style>
