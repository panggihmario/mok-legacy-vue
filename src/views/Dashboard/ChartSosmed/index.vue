<template>
  <div>
    <HeaderContent label="Dashboard" :list="items" />

    <div class="d-flex justify-space-between align-center">
      <h3>User Activity</h3>
      <div class="d-flex align-center">
        <v-btn text color="primary" class="text-capitalize mr-2">reset</v-btn>
        <v-text-field
          v-model="payloadFilter.username"
          outlined
          dense
          hide-details
          clearable
          class="mr-2"
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
        <div class="mr-2">
          <Date-Picker v-if="payloadFilter.timeline == 'DAY'"></Date-Picker>
          <Month-Picker
            v-else-if="payloadFilter.timeline == 'MONTH'"
          ></Month-Picker>
          <Year-Picker
            v-else-if="payloadFilter.timeline == 'YEAR'"
          ></Year-Picker>
        </div>
        <Hour-Picker class="mr-2"></Hour-Picker>
        <v-btn class="text-capitalize" depressed color="secondary"
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
      items: [
        {
          text: "Dashboard Sosmed",
          disabled: true,
        },
      ],
      itemsFilter: ["DAY", "MONTH", "YEAR"],
      payloadFilter: {
        username: "All User",
        timeline: "DAY",
        datetime: "",
        hour: "",
      },
      labelChart: {
        xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        yLabels: 5,
        yLabelsTextFormatter: (val) => Math.round(val * 100) / 100,
      },
      datasets: [
        {
          data: [70, 100, 400, 180, 100, 300, 500],
          fill: true,
          className: "curve-btc",
          stroke: true,
        },
      ],
    };
  },
  methods: {},
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
