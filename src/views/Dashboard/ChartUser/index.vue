<template>
  <div>
    <div class="action__container">
      <Menu @changeSort="changeSort" />
      <div v-if="label === 'Daily'">
        <Date 
          @getPayloadDate="getPayloadDate" 
          :firstDate="firstDate"
        />
      </div>
      <div v-if="label === 'Monthly'">
        <Month @getPayloadMonth="getPayloadMonth" />
      </div>
      <div v-if="label === 'Yearly'">
        <Year @getPayloadYear="getPayloadYear" />
      </div>
    </div>
    <Chart classChart="chart-user" :labels="labels" :datasets="datasets" />
    <div class="footer">
      <div class="total__container">
        <div class="total__label">Total User</div>
        <div class="total__count">{{totalUser}}</div>
      </div>
      <div v-if="isError" class="footer__error">
        {{errorMessage}}
      </div>
    </div>
    
  </div>
</template>

<script>
import moment from "moment"
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
  props : ['payloadMonth', 'payloadYear'],
  data() {
    return {
      label: "Daily",
      errorMessage : '',
      isError : false,
      payloadDate: {},
      firstDate : '',
      totalUser : 0,
      labels: {
        xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        yLabels: 5,
        yLabelsTextFormatter: (val) => Math.round(val * 100) / 100,
      },
      datasets: [],
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
        case "Yearly" :
          return this.getYearlyData(type);
      }
    },
    getDailyData(type) {
      const payload = {
        type,
        data: "user-registers",
        params: { ...this.payloadDate },
      };
      return this.fetchApi(payload);
    },
    getMontylyData(type) {
      const payload = {
        type,
        data: "user-registers",
        params: { ...this.payloadMonth },
      };
      return this.fetchApi(payload);
    },
    getYearlyData(type) {
      const payload = {
        type,
        data: "user-registers",
        params: { ...this.payloadYear },
      };
      console.log("====", payload)
      return this.fetchApi(payload);
    },
    getPayloadDate(payload) {
      this.payloadDate = { ...payload };
      return this.handleFetchUser();
    },
    getPayloadMonth(payload) {
      const type = this.label.toLowerCase();
      const d = {
        type,
        data: "user-registers",
        params: { ...payload },
      };
      return this.fetchApi(d);
    },
    getPayloadYear(payload) {
      const type = this.label.toLowerCase();
      const d = {
        type,
        data: "user-registers",
        params: { ...payload },
      };
      return this.fetchApi(d);
    },
    handleFetchUser() {
      const type = this.label.toLowerCase();
      const payload = {
        type,
        params: { ...this.payloadDate },
        data: "user-registers",
      };
      return this.fetchApi(payload);
    },
    printError(payload) {
      if(payload.type === 'monthly'){
        const startMonth = moment().month(payload.params.startAt -1 ).format("MMMM")
        const endMonth = moment().month(payload.params.endAt - 1).format("MMMM")
        this.isError = true
        this.errorMessage = `there are no data from ${startMonth} until ${endMonth}`
        setTimeout(() => {
          this.isError = false
          this.errorMessage = ''
        },3000)
      }
      return
    },
    printSuccess(data, xLabels) {
      const totalUser = data[0].totalUser;
          this.totalUser = totalUser;
          const formatDataset = data.map((d) => {
            return {
              data: d.data,
              smooth: true,
              showPoints: true,
              className: "curve1",
            };
          });
      const arrayData = data[0].data
      const highestData = Math.max(...arrayData)
      let totalYLabel
      if(highestData > 5) {
        totalYLabel = 6
      }else{
        
        if(highestData === 0) {
          totalYLabel = 2
        }else{
          totalYLabel = highestData + 1
        }
      }
          const label = {
            xLabels,
            yLabels: totalYLabel,
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
          const epochDate = response.firstDate
          const startDate = moment(epochDate).format('YYYY-MM-DD')
          const limitDate = moment(startDate).add(8,'days').format('YYYY-MM-DD')
          this.firstDate = limitDate
          const xLabels = response.xlabels;
          const data = response.datasets;
          console.log("===",response)
          if(xLabels.length > 0) {
            return this.printSuccess(data, xLabels)
          }else{
            return this.printError(payload)
          }
        })
        .catch((err) => {
          return this.printError()
        });
    },
  },
};
</script>

<style src="../style.scss" lang="scss" scoped>
</style>