<template>
  <div>
    <Header-Content label="Dashboard" :list="items" />

    <div class="d-flex justify-space-between align-center">
      <h3>User Activity</h3>
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
    this.handleGetDataChart();
  },
  methods: {
    ...mapActions({
      fetchStatisticsUserSeen: "dashboard/fetchStatisticsUserSeen",
      searchUser: "account/searchUser",
    }),
    handleGetDataChart() {
      let dataChart = {
        firstDate: "677789879",
        datasets: [
          {
            data: [0, 20],
            legend: "user_seen",
            total: 20,
          },
        ],
        xLabels: ["14 Jan", "15 jan"],
      };

      this.labelChart.xLabels = dataChart.xLabels;
      this.datasets[0].data = dataChart.datasets[0].data;
    },
    actionSubmitGetDataChart() {
      let startDateAt =
        this.payloadData.startDateAt != null
          ? this.payloadData.startDateAt.split(":")
          : null;
      let endDateAt =
        this.payloadData.endDateAt != null
          ? this.payloadData.endDateAt.split(":")
          : null;
      let toEpochStart =
        startDateAt != null
          ? `${startDateAt[2]}/${startDateAt[1]}/${startDateAt[0]}`
          : null;
      let toEpochEnd =
        endDateAt != null
          ? `${endDateAt[2]}/${endDateAt[1]}/${endDateAt[0]}`
          : null;
      let epochStart = new Date(toEpochStart).getTime();
      let epochEnd = new Date(toEpochEnd).getTime();

      let payload = {
        filterBy: this.payloadFilter.timeline.toLowerCase(),
        params: {
          startHourAt:
            this.payloadData.startHourAt != null
              ? this.payloadData.startHourAt.split(":")[0]
              : null,
          startMinuteAt:
            this.payloadData.startHourAt != null
              ? this.payloadData.startHourAt.split(":")[1]
              : null,
          endHourAt:
            this.payloadData.endHourAt != null
              ? this.payloadData.endHourAt.split(":")[0]
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
              ? this.payloadData.startDateAt.split(":")[0]
              : this.payloadData.startDateAt,
          endDateAt:
            this.payloadFilter.timeline == "HOUR" ||
            this.payloadFilter.timeline == "DAY"
              ? epochEnd != 0
                ? epochEnd
                : null
              : this.payloadFilter.timeline == "MONTH"
              ? this.payloadData.endDateAt.split(":")[0]
              : this.payloadData.endDateAt,
        },
      };

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
          console.log({ res });
          this.labelChart.xLabels = res.xlabels;
          this.datasets[0].data = res.datasets[0].data;
          let startIfNull = this.payloadData.startDateAt.split(":");
          if (res.datasets[0].data.length <= 1) {
            this.datasets[0].data.unshift(0);
            this.labelChart.xLabels.unshift(
              `${this.months[startIfNull[0] - 1]} ${startIfNull[1]}`
            );
          }
        })
        .catch((err) => {
          this.alertFailed = true;
          this.alertFailedMessage = `Error: ${err.response.message}`;
          setTimeout(() => {
            this.alertFailed = false;
            this.alertFailedMessage = "";
          }, 3000);
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
          this.alertFailedMessage = `Error: ${err.response.message}`;
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
  },
};
</script>

<style lang="scss">
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
