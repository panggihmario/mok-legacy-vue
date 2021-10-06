<template>
  <div>
    <div class="action__container">
      <Menu @changeSort="changeSort" />
      <div v-if="label === 'Daily'">
        <Date @getPayloadDate="getPayloadDate" />
      </div>
      <div v-if="label === 'Monthly'">
        <Month @getPayloadMonth="getPayloadMonth" />
      </div>
      <div v-if="label === 'Yearly'">
        <Year @getPayloadYear="getPayloadYear" />
      </div>
    </div>
    <Chart classChart="chart-feed" :labels="labels" :datasets="datasets" />
  </div>
</template>

<script>
import Menu from "../containers/menu.vue";
import Date from "../containers/date.vue";
import Chart from "../containers/chart.vue";
import Month from "../containers/month.vue";
import Year from "../containers/year.vue";
import { mapActions } from "vuex";
export default {
  components: {
    Menu,
    Date,
    Chart,
    Month,
    Year,
  },
  data() {
    return {
      label: "Daily",
      payloadDate: {},
      labels: {
        xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        yLabels: 5,
        yLabelsTextFormatter: (val) => Math.round(val * 100) / 100,
      },
      datasets: [],
      payloadMonth: {
        startAt: 6,
        endAt: 9,
      },
      payloadYear: {
        startAt: 2019,
        endAt: 2021,
      },
    };
  },
  mounted() {
    this.handleFetchUser();
  },
  methods: {
    ...mapActions({
      fetchStatisticsData: "dashboard/fetchStatisticsData",
    }),
    changeSort(params) {
      this.label = params;
      const type = params.toLowerCase();
      switch (params) {
        case "Daily":
          return this.getDailyData(type);
        case "Monthly":
          return this.getMontylyData(type);
        case "Yearly":
          return this.getYearlyData(type);
      }
    },
    getDailyData(type) {
      const payload = {
        type,
        data: "posts",
        params: { ...this.payloadDate },
      };
      return this.fetchApi(payload);
    },
    getMontylyData(type) {
      const payload = {
        type,
        data: "posts",
        params: { ...this.payloadMonth },
      };
      return this.fetchApi(payload);
    },
    getYearlyData(type) {
      const payload = {
        type,
        data: "posts",
        params: { ...this.payloadYear },
      };
      return this.fetchApi(payload);
    },
    getPayloadDate(payload) {
      this.payloadDate = { ...payload };
      return this.handleFetchUser();
    },
    getPayloadMonth(payload) {
      this.payloadMonth = { ...payload };
      const type = this.label.toLowerCase();
      const d = {
        type,
        data: "posts",
        params: { ...payload },
      };
      return this.fetchApi(d);
    },
    getPayloadYear(payload) {
      this.payloadYear = { ...payload };
      const type = this.label.toLowerCase();
      const d = {
        type,
        data: "posts",
        params: { ...payload },
      };
      return this.fetchApi(d);
    },
    handleFetchUser() {
      const type = this.label.toLowerCase();
      const payload = {
        type,
        params: { ...this.payloadDate },
        data: "posts",
      };
      return this.fetchApi(payload);
    },
    printError() {
      return;
    },
    printSuccess(data, xLabels) {
      const formatDataset = data.map((d) => {
        return {
          data: d.data,
          smooth: true,
          showPoints: true,
          className: "curve1",
        };
      });
      const label = {
        xLabels,
        yLabels: 6,
        yLabelsTextFormatter: (val) => {
          const c = Math.round(val * 10) / 10;
          return c;
        },
      };
      this.labels = label;
      this.datasets = formatDataset;
    },
    fetchApi(payload) {
      return this.fetchStatisticsData(payload)
        .then((response) => {
          const xLabels = response.xlabels;
          const data = response.datasets;
          if (xLabels.length > 0) {
            return this.printSuccess(data, xLabels);
          } else {
            return this.printError();
          }
        })
        .catch((err) => {
          return this.printError();
        });
    },
  },
};
</script>

<style src="../style.scss" lang="scss" scoped>
</style>