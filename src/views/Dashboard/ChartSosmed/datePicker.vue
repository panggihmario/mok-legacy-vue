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
              {{ endDate == null ? "Date" : `${startDate} - ${endDate}` }}
              <v-icon>mdi-chevron-down</v-icon>
            </v-btn>
          </template>

          <v-card>
            <div class="pa-4">
              <v-row no-gutters>
                <v-col cols="6">
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
                  <div class="d-flex justify-space-between align-center">
                    <div>
                      <v-icon
                        class="cursor-pointer"
                        color="secondary"
                        small
                        @click="subtrMonth(1)"
                        >mdi-chevron-left</v-icon
                      >
                      <v-icon
                        class="cursor-pointer"
                        color="secondary"
                        small
                        @click="subtrMonth(0)"
                        >mdi-chevron-double-left</v-icon
                      >
                    </div>
                    <span class="font-12 font-weight-medium">{{
                      months[payload.month]
                    }}</span>
                    <div>
                      <v-icon
                        class="cursor-pointer"
                        color="secondary"
                        small
                        @click="sumMonth(11)"
                        >mdi-chevron-double-right</v-icon
                      >
                      <v-icon
                        class="cursor-pointer"
                        color="secondary"
                        small
                        @click="sumMonth(1)"
                        >mdi-chevron-right</v-icon
                      >
                    </div>
                  </div>
                  <div class="mt-2">
                    <div class="d-flex flex-wrap">
                      <div
                        v-for="d in days"
                        :key="d"
                        class="font-10 font-weight-medium text-center mb-2"
                        :class="{ 'red--text': d == 'Min' }"
                        style="width: 14%"
                      >
                        {{ d }}
                      </div>
                    </div>
                    <div class="d-flex">
                      <div class="d-flex flex-wrap">
                        <div
                          v-for="d in firstDay"
                          :key="d + 999"
                          class="font-10 font-weight-medium text-center mb-2"
                          :class="{ 'red--text': d == 'Min' }"
                          style="width: 14%"
                        ></div>
                        <div
                          v-for="d in lastDay"
                          :key="d + payload.month + payload.year"
                          class="d-flex justify-center align-center font-10 font-weight-medium text-center cursor-pointer box-selected__not mb-2"
                          :class="{
                            'box-selected__true':
                              `${payload.year}${payload.month}${d}` ==
                                keyFocusStart ||
                              `${payload.year}${payload.month}${d}` ==
                                keyFocusEnd,
                            'box-selected__secondary':
                              parseInt(
                                `${payload.year}${
                                  payload.month < 10
                                    ? `0${payload.month}`
                                    : payload.month
                                }${d < 10 ? `0${d}` : d}`
                              ) > dStart &&
                              parseInt(
                                `${payload.year}${
                                  payload.month < 10
                                    ? `0${payload.month}`
                                    : payload.month
                                }${d < 10 ? `0${d}` : d}`
                              ) < dEnd,
                            'box-selected__disable':
                              parseInt(
                                `${payload.year}${
                                  payload.month < 10
                                    ? `0${payload.month}`
                                    : payload.month
                                }${d < 10 ? `0${d}` : d}`
                              ) < dStart,
                            'box-date__today':
                              parseInt(
                                `${payload.year}${
                                  payload.month < 10
                                    ? `0${payload.month}`
                                    : payload.month
                                }${d < 10 ? `0${d}` : d}`
                              ) == dToday,
                          }"
                          style="width: 14%"
                          @click="
                            setDatePayload(
                              d,
                              parseInt(
                                `${payload.year}${
                                  payload.month < 10
                                    ? `0${payload.month}`
                                    : payload.month
                                }${d < 10 ? `0${d}` : d}`
                              )
                            )
                          "
                        >
                          {{ d }}
                        </div>
                      </div>
                    </div>
                  </div>
                </v-col>
                <v-col cols="6" class="pl-6">
                  <div>
                    <span class="font-weight-medium font-12">Dari Tanggal</span>
                    <div class="d-flex align-center box-date px-2">
                      <span
                        v-if="startDate"
                        class="font-weight-medium font-12"
                        >{{ startDate }}</span
                      >
                      <span v-else class="font-weight-medium font-12 grey--text"
                        >DD:MM:YY</span
                      >
                    </div>
                  </div>
                  <div class="mt-2">
                    <span class="font-weight-medium font-12"
                      >Sampai Tanggal</span
                    >
                    <div class="d-flex align-center box-date px-2">
                      <span v-if="endDate" class="font-weight-medium font-12">{{
                        endDate
                      }}</span>
                      <span v-else class="font-weight-medium font-12 grey--text"
                        >DD:MM:YY</span
                      >
                    </div>
                  </div>
                </v-col>
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
    payload: {
      year: "",
      month: "",
      dateFirst: "",
      dateLast: "",
    },
    days: ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"],
    months: [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember",
    ],
  }),
  mounted() {
    this.getToday();
    this.getFirstDayLastDay();
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
        `${yearNow}${monthNow < 10 ? `0${monthNow}` : monthNow}${
          dateNow < 10 ? `0${dateNow}` : dateNow
        }`
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
    setDatePayload(d, key) {
      if (this.startDate == null) {
        this.setStartDate(d);
      } else if (this.startDate != null && this.endDate == null) {
        if (key >= this.dStart) {
          this.setEndDate(d);
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
    setStartDate(d) {
      this.startDate = `${d < 10 ? `0${d}` : d}:${
        this.payload.month < 10 ? `0${this.payload.month}` : this.payload.month
      }:${this.payload.year}`;
      this.dStart = parseInt(
        `${this.payload.year}${
          this.payload.month < 10
            ? `0${this.payload.month}`
            : this.payload.month
        }${d < 10 ? `0${d}` : d}`
      );
      this.keyFocusStart = `${this.payload.year}${this.payload.month}${d}`;
    },
    setEndDate(d) {
      this.endDate = `${d < 10 ? `0${d}` : d}:${
        this.payload.month < 10 ? `0${this.payload.month}` : this.payload.month
      }:${this.payload.year}`;
      this.dEnd = parseInt(
        `${this.payload.year}${
          this.payload.month < 10
            ? `0${this.payload.month}`
            : this.payload.month
        }${d < 10 ? `0${d}` : d}`
      );
      this.keyFocusEnd = `${this.payload.year}${this.payload.month}${d}`;
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
    border: 1px solid rgba($secondary, .3)
    border-radius: 500px
    color: white !important
  &__secondary
    border: 1px solid rgba($secondary, .0)
    border-radius: 500px
    background: rgba($secondary, .2)
  &__disable
    color: grey
    background: white !important
    cursor: default !important
.box-date
  height: 32px
  border: 1px solid #bbbbbb
  border-radius: 10px
  &__today
    border: 1px solid rgba($secondary, .3)
    border-radius: 500px
</style>
