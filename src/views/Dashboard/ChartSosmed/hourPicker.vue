<template>
  <div>
    <template>
      <div class="text-center">
        <v-menu
          v-model="menu"
          :close-on-content-click="false"
          :nudge-width="200"
          offset-y
          max-width="300px"
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
                payload.hourStart == null || payload.hourEnd == null
                  ? "Hour"
                  : `${payload.hourStart} - ${payload.hourEnd}`
              }}
              <v-icon>mdi-chevron-down</v-icon>
            </v-btn>
          </template>

          <v-card>
            <div class="pa-4">
              <div>
                <span class="font-weight-medium font-12">Dari Jam</span>
                <v-menu
                  ref="menu2"
                  v-model="menu2"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  :return-value.sync="payload.hourStart"
                  transition="scale-transition"
                  offset-y
                  max-width="290px"
                  min-width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <div
                      class="d-flex align-center box-year px-2"
                      v-bind="attrs"
                      v-on="on"
                    >
                      <span
                        v-if="payload.hourStart"
                        class="font-weight-medium font-12"
                        >{{ payload.hourStart }}</span
                      >
                      <span v-else class="font-weight-medium font-12 grey--text"
                        >hh:mm</span
                      >
                      <v-spacer></v-spacer>
                      <v-btn
                        v-if="payload.hourStart"
                        icon
                        small
                        @click="payload.hourStart = null"
                      >
                        <v-icon size="14px">mdi-close</v-icon>
                      </v-btn>
                    </div>
                  </template>
                  <v-time-picker
                    v-if="menu2"
                    v-model="payload.hourStart"
                    full-width
                    no-title
                    @click:minute="$refs.menu2.save(payload.hourStart)"
                  ></v-time-picker>
                </v-menu>
              </div>

              <div class="mt-2">
                <span class="font-weight-medium font-12">Sampai Jam</span>
                <v-menu
                  ref="menu3"
                  v-model="menu3"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  :return-value.sync="payload.hourEnd"
                  transition="scale-transition"
                  offset-y
                  max-width="290px"
                  min-width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <div
                      class="d-flex align-center box-year px-2"
                      v-bind="attrs"
                      v-on="on"
                    >
                      <span
                        v-if="payload.hourEnd"
                        class="font-weight-medium font-12"
                        >{{ payload.hourEnd }}</span
                      >
                      <span v-else class="font-weight-medium font-12 grey--text"
                        >hh:mm</span
                      >
                      <v-spacer></v-spacer>
                      <v-btn
                        v-if="payload.hourEnd"
                        icon
                        small
                        @click="payload.hourEnd = null"
                      >
                        <v-icon size="14px">mdi-close</v-icon>
                      </v-btn>
                    </div>
                  </template>
                  <v-time-picker
                    v-if="menu3"
                    v-model="payload.hourEnd"
                    full-width
                    no-title
                    @click:minute="$refs.menu3.save(payload.hourEnd)"
                  ></v-time-picker>
                </v-menu>
              </div>
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
    isReset: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    menu: false,
    menu2: false,
    menu3: false,
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
    payload: {
      year: "",
      month: "",
      dateFirst: "",
      dateLast: "",
      hourStart: null,
      hourEnd: null,
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
    "payload.hourStart"() {
      this.payloadData.startHourAt = this.payload.hourStart;
    },
    "payload.hourEnd"() {
      this.payloadData.endHourAt = this.payload.hourEnd;
    },
    tab() {
      this.payload.hourStart = null;
      this.payload.hourEnd = null;
      this.dStart = null;
      this.dEnd = null;
      this.keyFocusStart = null;
      this.keyFocusEnd = null;
    },
    isReset() {
      if (this.isReset) {
        this.payload.hourStart = null;
        this.payload.hourEnd = null;
        this.dStart = null;
        this.dEnd = null;
        this.keyFocusStart = null;
        this.keyFocusEnd = null;
      }
      setTimeout(() => {
        this.$emit("resetFalse");
      }, 100);
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
      this.dToday = yearNow;
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
    setDatePayload(y) {
      if (this.startDate == null) {
        this.setStartDate(y);
      } else if (this.startDate != null && this.endDate == null) {
        if (this.dToday - y >= this.dStart) {
          this.setEndDate(y);
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
    setStartDate(y) {
      this.startDate = this.dToday - y;
      this.dStart = `${this.startDate}`;
      this.keyFocusStart = `${this.startDate}`;
    },
    setEndDate(y) {
      this.endDate = this.dToday - y;
      this.dEnd = `${this.endDate}`;
      this.keyFocusEnd = `${this.endDate}`;
    },
    cancelDate() {
      this.payload.hourStart = null;
      this.payload.hourEnd = null;
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
.font-14
  font-size: 14px
.cursor-pointer
  cursor: pointer
.box-selected
  &__not
    border: 1px solid white
    height: 28px
  &__true
    background: $secondary !important
    border-radius: 500px
    color: white !important
  &__secondary
    border-radius: 500px
    background: rgba($secondary, .2) !important
  &__disable
    color: grey
    background: white !important
    cursor: default !important
.box-year
  height: 32px
  border: 1px solid #bbbbbb
  border-radius: 4px
  &__list
    background: $whitesnow
    border-radius: 4px
  &__today
    border: 1px solid rgba($secondary, .3)
</style>
