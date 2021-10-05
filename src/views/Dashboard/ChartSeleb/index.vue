<template>
  <div>
    <div class="action__container">
      <Menu @changeSort="changeSort" />
      <div v-if="label === 'Daily'">
        <Date @getPayloadDate="getPayloadDate" />
      </div>
      <div v-if="label === 'Monthly'">
        <Monthly @getPayloadMonth="getPayloadMonth" />
      </div>
      	<div v-if="label === 'Yearly' " >
				<Year
					@getPayloadYear="getPayloadYear"
				/>
			</div> 
    </div>
    <Chart :datasets="datasets" :labels="labels" />
    <div class="total__ctr">
      <div class="total__label">Total Seleb</div>
      <div class="total__count">{{ totalUser }}</div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import Menu from "./Menu.vue";
import Date from "./Date.vue";
import Chart from "./Chart.vue";
import Monthly from "./Month.vue";
import Year from "./Year.vue";
export default {
  data() {
    return {
      label: "Daily",
      payloadDate: {},
      payloadMonth: {
        startAt: 6,
        endAt: 9,
      },
      payloadYear: {
        startAt: 2019,
        endAt: 2021,
      },
      totalUser : 0,
      datasets: [
        {
          data: [70, 100, 400, 180, 100, 300, 500],
          smooth: true,
          showPoints: true,
          className: "curve1",
        },
      ],
      labels: {
        xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        yLabels: 5,
        yLabelsTextFormatter: (val) => Math.round(val * 100) / 100,
      },
    };
  },
  components: {
    Menu,
    Date,
    Chart,
    Monthly,
    Year
  },
  mounted() {
    this.handleFetchUser();
  },
  methods: {
    ...mapActions({
      fetchStatisticsSeleb: "dashboard/fetchStatisticsData",
    }),
    changeSort(params) {
      this.label = params;
      if (params === "Monthly") {
        const type = this.label.toLowerCase();
        const payload = {
          type,
          data: "seleb-registers",
          params: { ...this.payloadMonth },
        };
        return this.fetchApi(payload);
      }
      if (params === "Yearly") {
        const type = this.label.toLowerCase();
        const payload = {
          type,
          data: "seleb-registers",
          params: { ...this.payloadYear },
        };
        return this.fetchApi(payload);
      }
      if (params === "Daily") {
        const type = this.label.toLowerCase();
        const payload = {
          type,
          params: { ...this.payloadDate },
          data: "seleb-registers",
        };
        return this.fetchApi(payload);
      }
    },
    handleFetchUser() {
      const type = this.label.toLowerCase();
      const payload = {
        type,
        params: { ...this.payloadDate },
        data: "seleb-registers",
      };
      return this.fetchApi(payload);
    },
    getPayloadDate(payload) {
      this.payloadDate = { ...payload };
      return this.handleFetchUser();
    },
    getPayloadYear (data) {
      this.payloadYear = {...data}
			const type = this.label.toLowerCase()
			const payload = {
				type ,
				params : {...data},
        data: "seleb-registers",
			}
			return this.fetchApi(payload)
    },
    getPayloadMonth(payload) {
      this.payloadMonth = { ...payload };
      const type = this.label.toLowerCase();
      const d = {
        type,
        data: "seleb-registers",
        params: { ...payload },
      };
      return this.fetchApi(d);
    },
    fetchApi(payload) {
      return this.fetchStatisticsSeleb(payload)
        .then((response) => {
          const xLabels = response.xlabels;
          const data = response.datasets;
          const totalUser = data[0].totalSeleb;
          this.totalUser = totalUser;
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
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
  },
};
</script>

<style src="../style.scss" lang="scss" scoped>
</style>

<style lang="scss" scoped>
.total {
  &__ctr {
    padding: 16px;
    border: 2px solid #52C41A;
    box-sizing: border-box;
    border-radius: 8px;
    width: 77px;
  }
  &__label {
    font-size: 8px;
    font-weight: 500;
    letter-spacing: 0.01em;
    color: #777777;
  }
  &__count {
    color: #52C41A;
    font-size: 14px;
    font-weight: 500;
    letter-spacing: 0.01em;
  }
}
</style>