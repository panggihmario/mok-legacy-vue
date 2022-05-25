<template>
  <div>
    <Header-Content label="Dashboard" :list="items" />

    <div class="d-flex justify-space-between align-center">
      <div>
        <h3 style="margin-bottom: -8px">User Activity</h3>
        <span class="font-12 font-weight-medium grey--text"
          >Timezone = UTC±00:00</span
        >
      </div>
      <div class="d-flex align-center">
        <v-btn
          text
          color="primary"
          class="text-capitalize mr-2"
          @click="actionResetFilter"
          >reset</v-btn
        >
        <v-text-field
          v-model="payloadFilter.username"
          placeholder="All User"
          outlined
          dense
          hide-details
          clearable
          class="mr-2"
          style="width: 180px"
        ></v-text-field>
        <v-select
          v-model="payloadFilter.timeline"
          :items="itemsFilter"
          outlined
          dense
          hide-details
          background-color="whitesnow"
          class="font-12 mr-2"
          style="width: 110px"
        ></v-select>
        <div v-if="payloadFilter.timeline == 'HOUR'" class="mr-2">
          <Date-Picker
            :payloadData="payloadData"
            :tab="payloadFilter.timeline"
            :isReset="isReset"
            oneday
            @resetFalse="isReset = false"
          ></Date-Picker>
        </div>
        <div v-else class="mr-2">
          <Date-Picker
            v-if="payloadFilter.timeline == 'DAY'"
            :payloadData="payloadData"
          ></Date-Picker>
          <Month-Picker
            v-else-if="payloadFilter.timeline == 'MONTH'"
            :payloadData="payloadData"
          ></Month-Picker>
          <Year-Picker
            v-else-if="payloadFilter.timeline == 'YEAR'"
            :payloadData="payloadData"
          ></Year-Picker>
        </div>
        <Hour-Picker
          :payloadData="payloadData"
          :tab="payloadFilter.timeline"
          :isReset="isReset"
          class="mr-2"
          @resetFalse="isReset = false"
        ></Hour-Picker>
        <v-btn
          class="text-capitalize"
          depressed
          color="secondary"
          @click="actionSubmitGetDataChart"
          >Show Chart</v-btn
        >
      </div>
    </div>

    <div class="mt-4">
      <span>
        Rata-rata : <b>{{ meanData }}</b> Post dilihat pada
        <b>{{
          startDateAtShow == endDateAtShow
            ? `${startDateAtShow}`
            : `${startDateAtShow} - ${endDateAtShow}`
        }}</b>
        ketika jam
        <b>{{ `${startHourAtShow} - ${endHourAtShow}` }}</b>
      </span>
    </div>

    <div class="bitcoin-price mt-6">
      <svg
        style="width:0; height:0; position:absolute;"
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          <linearGradient id="btcFill" x1="1" x2="1" y1="0" y2="1">
            <stop offset="0%" stop-color="#9CD0FF"></stop>
            <stop offset="100%" stop-color="#ffffff"></stop>
          </linearGradient>
        </defs>
      </svg>
      <Chart
        classChart="chart-user"
        :labels="labelChart"
        :datasets="datasets"
      />
    </div>

    <v-snackbar v-model="alertFailed" top right color="error">
      {{ alertFailedMessage }}
    </v-snackbar>
  </div>
</template>

<script>
import Menu from "../containers/menu.vue";
import Chart from "../containers/chart.vue";
import HeaderContent from "@/containers/HeaderContent";
import DatePicker from "./datePicker.vue";
import MonthPicker from "./monthPicker.vue";
import YearPicker from "./yearPicker.vue";
import HourPicker from "./hourPicker.vue";
import { mapActions } from "vuex";

export default {
  components: {
    HeaderContent,
    Menu,
    Chart,
    DatePicker,
    MonthPicker,
    YearPicker,
    HourPicker,
  },
  data() {
    return {
      alertFailed: false,
      alertFailedMessage: "",
      isReset: false,
      items: [
        {
          text: "Dashboard Sosmed",
          disabled: true,
        },
      ],
      itemsFilter: ["HOUR", "DAY", "MONTH", "YEAR"],
      payloadFilter: {
        username: "",
        timeline: "HOUR",
      },
      payloadData: {
        startDateAt: null,
        endDateAt: null,
        startHourAt: null,
        endHourAt: null,
      },
      labelChart: {
        xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        yLabels: 5,
        yLabelsTextFormatter: (val) => Math.round(val * 100) / 100,
      },
      datasets: [
        {
          data: [0, 0, 0, 0, 0, 0, 0],
          legend: "user_seen",
          fill: true,
          className: "curve-btc",
          stroke: true,
        },
      ],
      totalData: 0,
      meanData: 0,
      startDateAtShow: "",
      endDateAtShow: "",
      startHourAtShow: "",
      endHourAtShow: "",
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
    };
  },
  watch: {
    "payloadFilter.timeline"() {
      this.payloadData = {
        startDateAt: null,
        endDateAt: null,
        startHourAt: null,
        endHourAt: null,
      };
    },
  },
  mounted() {
    this.handleGetDataChartFirstMounted();
  },
  methods: {
    ...mapActions({
      fetchStatisticsUserSeen: "dashboard/fetchStatisticsUserSeen",
      searchUser: "account/searchUser",
    }),
    handleGetDataChartFirstMounted() {
      let year = new Date().getFullYear();
      let month = new Date().getMonth();
      let date = new Date().getDate() - 1;
      let today = new Date(Date.UTC(year, month, date)).getTime();
      let payload = {
        filterBy: this.payloadFilter.timeline.toLowerCase(),
        params: {
          startHourAt: this.timeUTCmin7adjustment("00"),
          startMinuteAt: "00",
          endHourAt: this.timeUTCmin7adjustment("23"),
          endMinuteAt: "59",
          username: null,
          startDateAt: today,
        },
      };
      this.handleFetchUserSeen(payload);
    },
    actionSubmitGetDataChart() {
      let startDateAt =
        this.payloadData.startDateAt != null
          ? this.payloadFilter.timeline == "YEAR"
            ? this.payloadData.startDateAt
            : this.payloadData.startDateAt.split("/")
          : null;
      let endDateAt =
        this.payloadData.endDateAt != null
          ? this.payloadFilter.timeline == "YEAR"
            ? this.payloadData.endDateAt
            : this.payloadData.endDateAt.split("/")
          : null;
      let toEpochStart =
        startDateAt != null
          ? this.payloadFilter.timeline == "YEAR"
            ? this.payloadData.startDateAt
            : Date.UTC(startDateAt[2], startDateAt[1] - 1, startDateAt[0])
          : // : `${startDateAt[2]}/${startDateAt[1]}/${startDateAt[0]}`
            null;
      let toEpochEnd =
        endDateAt != null
          ? this.payloadFilter.timeline == "YEAR"
            ? this.payloadData.endDateAt
            : Date.UTC(endDateAt[2], endDateAt[1] - 1, endDateAt[0])
          : // : `${endDateAt[2]}/${endDateAt[1]}/${endDateAt[0]}`
            null;
      let epochStart = new Date(toEpochStart).getTime();
      let epochEnd = new Date(toEpochEnd).getTime();

      let payload = {
        filterBy: this.payloadFilter.timeline.toLowerCase(),
        params: {
          startHourAt:
            this.payloadData.startHourAt != null
              ? this.timeUTCmin7adjustment(
                  this.payloadData.startHourAt.split(":")[0]
                )
              : null,
          startMinuteAt:
            this.payloadData.startHourAt != null
              ? this.payloadData.startHourAt.split(":")[1]
              : null,
          endHourAt:
            this.payloadData.endHourAt != null
              ? this.timeUTCmin7adjustment(
                  this.payloadData.endHourAt.split(":")[0]
                )
              : null,
          endMinuteAt:
            this.payloadData.endHourAt != null
              ? this.payloadData.endHourAt.split(":")[1]
              : null,
          username: null,
          startDateAt:
            this.payloadFilter.timeline == "HOUR" ||
            this.payloadFilter.timeline == "DAY"
              ? epochStart != 0
                ? epochStart
                : null
              : this.payloadFilter.timeline == "MONTH"
              ? this.payloadData.startDateAt.split("/")[0]
              : this.payloadData.startDateAt,
        },
      };
      if (this.payloadData.startDateAt != this.payloadData.endDateAt) {
        payload.params = {
          ...payload.params,
          endDateAt:
            this.payloadFilter.timeline == "HOUR" ||
            this.payloadFilter.timeline == "DAY"
              ? epochEnd != 0
                ? epochEnd
                : null
              : this.payloadFilter.timeline == "MONTH"
              ? this.payloadData.endDateAt.split("/")[0]
              : this.payloadData.endDateAt,
        };
      }

      let nullValue = 0;
      for (const [key, value] of Object.entries(payload.params)) {
        if (key != "username" && value == null) {
          this.alertFailed = true;
          this.alertFailedMessage = "Harap Isi Tanggal dan Jam";
          setTimeout(() => {
            this.alertFailed = false;
            this.alertFailedMessage = "";
          }, 3000);
          nullValue = 1;
        }
      }
      if (nullValue == 0) {
        if (
          this.payloadFilter.username == "" ||
          this.payloadFilter.username == null
        ) {
          this.handleFetchUserSeen(payload);
        } else {
          this.handleGetUser(payload);
        }
      }
    },
    handleFetchUserSeen(payload) {
      return this.fetchStatisticsUserSeen(payload)
        .then((res) => {
          this.labelChart.xLabels = [];
          if (this.payloadFilter.timeline == "HOUR") {
            for (let i = 0; i < res.xlabels.length; i++) {
              this.labelChart.xLabels.push(
                `${this.timeUTCplus7adjustment(res.xlabels[i])}:00`
              );
            }
          } else {
            this.labelChart.xLabels = res.xlabels;
          }

          this.datasets[0].data = res.datasets[0].data;
          this.totalData = res.datasets[0].totalPost;
          this.meanData = Math.round(
            ((this.totalData / res.datasets[0].data.length) * 100) / 100
          );
          if (this.payloadFilter.timeline == "MONTH") {
            let dMonthStart = parseInt(payload.params.startDateAt);
            let dMonthEnd = payload.params.endDateAt
              ? parseInt(payload.params.endDateAt)
              : dMonthStart;
            let year = new Date().getFullYear();
            this.startDateAtShow = `${this.months[dMonthStart]} ${year}`;
            this.endDateAtShow = `${this.months[dMonthEnd]} ${year}`;
          } else if (this.payloadFilter.timeline == "YEAR") {
            this.startDateAtShow = `${payload.params.startDateAt}`;
            this.endDateAtShow = `${payload.params.endDateAt}`;
          } else {
            let dStart = new Date(payload.params.startDateAt);
            let dEnd = payload.params.endDateAt
              ? new Date(payload.params.endDateAt)
              : dStart;
            this.startDateAtShow = `${dStart.getDate()} ${
              this.months[dStart.getMonth()]
            } ${dStart.getFullYear()}`;
            this.endDateAtShow = `${dEnd.getDate()} ${
              this.months[dEnd.getMonth()]
            } ${dEnd.getFullYear()}`;
          }
          this.startHourAtShow = `${this.timeUTCplus7adjustment(
            payload.params.startHourAt
          )}:${payload.params.startMinuteAt}`;
          this.endHourAtShow = `${this.timeUTCplus7adjustment(
            payload.params.endHourAt
          )}:${payload.params.endMinuteAt}`;

          if (res.datasets[0].data.length <= 1) {
            this.datasets[0].data.unshift(0);
            if (this.payloadFilter.timeline == "HOUR") {
              this.labelChart.xLabels.unshift(this.startHourAtShow);
            } else if (this.payloadFilter.timeline == "YEAR") {
              this.labelChart.xLabels.unshift(this.payloadData.startDateAt);
            } else if (this.payloadFilter.timeline == "DAY") {
              let startIfNull = this.payloadData.startDateAt.split("/");
              this.labelChart.xLabels.unshift(
                `${startIfNull[0]} ${this.months[startIfNull[1] - 1]}`
              );
            } else {
              let startIfNull = this.payloadData.startDateAt.split("/");
              this.labelChart.xLabels.unshift(
                `${this.months[startIfNull[0] - 1]} ${startIfNull[1]}`
              );
            }
          }
        })
        .catch((err) => {
          if (err.response.status == 404) {
            this.alertFailed = true;
            this.alertFailedMessage = `Data Kosong`;
            setTimeout(() => {
              this.alertFailed = false;
              this.alertFailedMessage = "";
            }, 3000);

            this.startDateAtShow = payload.params.startDateAt;
            this.startHourAtShow = `${this.timeUTCplus7adjustment(
              payload.params.startHourAt
            )}:${payload.params.startMinuteAt}`;
            this.endHourAtShow = `${this.timeUTCplus7adjustment(
              payload.params.endHourAt
            )}:${payload.params.endMinuteAt}`;

            if (this.payloadFilter.timeline == "HOUR") {
              let dStart = new Date(payload.params.startDateAt);
              this.labelChart.xLabels = [
                this.startHourAtShow,
                this.endHourAtShow,
              ];
              this.startDateAtShow = `${dStart.getDate()} ${
                this.months[dStart.getMonth()]
              }`;
              this.endDateAtShow = this.startDateAtShow;
            } else if (this.payloadFilter.timeline == "DAY") {
              let dStart = new Date(payload.params.startDateAt);
              let dEnd = new Date(payload.params.endDateAt);
              this.labelChart.xLabels = [
                `${dStart.getDate()} ${this.months[dStart.getMonth()]}`,
                `${dEnd.getDate()} ${this.months[dEnd.getMonth()]}`,
              ];
              this.startDateAtShow = `${dStart.getDate()} ${
                this.months[dStart.getMonth()]
              }`;
              this.endDateAtShow = payload.params.endDateAt
                ? `${dEnd.getDate()} ${this.months[dEnd.getMonth()]}`
                : this.startDateAtShow;
            } else if (this.payloadFilter.timeline == "MONTH") {
              this.labelChart.xLabels = [
                `${this.months[parseInt(payload.params.startDateAt) - 1]}`,
                `${this.months[parseInt(payload.params.endDateAt) - 1]}`,
              ];
              this.startDateAtShow = `${
                this.months[parseInt(payload.params.startDateAt) - 1]
              }`;
              this.endDateAtShow = payload.params.endDateAt
                ? `${this.months[parseInt(payload.params.endDateAt) - 1]}`
                : this.startDateAtShow;
            } else {
              this.labelChart.xLabels = [
                `${payload.params.startDateAt}`,
                `${payload.params.endDateAt}`,
              ];
              (this.startDateAtShow = `${payload.params.startDateAt}`),
                (this.endDateAtShow = payload.params.endDateAt
                  ? `${payload.params.endDateAt}`
                  : this.startDateAtShow);
            }
            this.datasets[0].data = [0, 0];
          } else {
            this.alertFailed = true;
            this.alertFailedMessage = `Error: ${err.response.data.message}`;
            setTimeout(() => {
              this.alertFailed = false;
              this.alertFailedMessage = "";
            }, 3000);
          }
        });
    },
    handleGetUser(payload) {
      return this.searchUser(this.payloadFilter.username)
        .then((res) => {
          if (res.status == 200) {
            this.handleFetchUserSeen(payload);
          }
        })
        .catch((err) => {
          this.alertFailed = true;
          this.alertFailedMessage = `Error: ${err.response.data.message}`;
          setTimeout(() => {
            this.alertFailed = false;
            this.alertFailedMessage = "";
          }, 3000);
        });
    },
    actionResetFilter() {
      this.payloadFilter.username = "";
      this.payloadFilter.timeline = "HOUR";
      this.isReset = true;
    },
    timeUTCmin7adjustment(h) {
      let hnum = parseInt(h);
      let hmin7 = hnum - 7;
      let datah = "";
      if (hmin7 < 0) {
        hmin7 += 24;
      }
      datah = hmin7 < 10 ? `0${hmin7}` : `${hmin7}`;
      // return datah;
      return h;
    },
    timeUTCplus7adjustment(h) {
      let hnum = parseInt(h);
      let hplus7 = hnum + 7;
      let datah = "";
      if (hplus7 > 23) {
        hplus7 -= 24;
      }
      datah = hplus7 < 10 ? `0${hplus7}` : `${hplus7}`;
      // return datah;
      return h;
    },
  },
};
</script>

<style lang="scss">
.font-12 {
  font-size: 12px;
}
.bitcoin-price {
  .vtc {
    height: 250px;
    font-size: 12px;
    @media (min-width: 699px) {
      height: 350px;
    }
  }
  // .grid,
  // .labels {
  //   line {
  //     stroke: rgba(#f69119, 0.5);
  //   }
  // }
  // .x-labels {
  //   .label {
  //     text {
  //       display: none;
  //     }
  //     line {
  //       opacity: 0.3;
  //     }
  //     &:nth-child(6n + 1),
  //     &:first-child {
  //       text {
  //         display: block;
  //       }
  //       line {
  //         opacity: 1;
  //       }
  //     }
  //   }
  // }
  .curve-btc {
    .stroke {
      stroke: $secondary;
      stroke-width: 4;
    }
    .fill {
      fill: url(#btcFill);
      fill-opacity: 0.5;
    }
  }
}
</style>
