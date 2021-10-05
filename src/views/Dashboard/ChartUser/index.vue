<template>
  <div class="ctr">
    <div class="action__ctr">
      <Menus @changeSort="changeSort" />
      <div v-if="label === 'Daily'">
        <Date @getPayloadDate="getPayloadDate" />
      </div>
      <div v-if="label === 'Monthly'">
        <Monthly
					@getPayloadMonth="getPayloadMonth"
				/>
      </div >
			<div v-if="label === 'Yearly' " >
				<Year
					@getPayloadYear="getPayloadYear"
				/>
			</div> 
    </div>
    <Chart :datasets="datasets" :labels="labels" />
    <div class="total__ctr">
      <div class="total__label">Total User</div>
      <div class="total__count">{{ totalUser }}</div>
    </div>
  </div>
</template>

<script>
import Chart from "./chart.vue";
import Menus from "./menu.vue";
import Date from "./date.vue";
import Monthly from "./month.vue";
import Year from "./year.vue";
import { mapActions } from "vuex";
export default {
  components: {
    Chart,
    Menus,
    Date,
    Monthly,
		Year
  },
  data() {
    return {
      label: "Daily",
      payloadDate: {},
			payloadMonth : {
				startAt : 6,
        endAt : 9
			},
			payloadYear : {
				startAt : 2019,
        endAt : 2021
			},
      totalUser: 0,
      datasets: [
        {
          data: [70, 100, 400, 180, 100, 300, 500],
          smooth: true,
          showPoints: true,
          fill: true,
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
  methods: {
    changeSort(params) {
      this.label = params;
			if(params === 'Monthly'  ) {
				const type = this.label.toLowerCase();
				const payload = {
					type,
					params: { ...this.payloadMonth },
				};
      	return this.fetchApi(payload);
			}
			if(params === 'Yearly') {
				const type = this.label.toLowerCase();
				const payload = {
					type,
					params: { ...this.payloadYear },
				};
      	return this.fetchApi(payload);
			}
      if(params === 'Daily') {
        const type = this.label.toLowerCase();
				const payload = {
					type,
					params: { ...this.payloadDate },
				};
      	return this.fetchApi(payload);
      }
    },
    ...mapActions({
      fetchStatisticsUser: "dashboard/fetchStatisticsUser",
    }),
    fetchApi(payload) {
      return this.fetchStatisticsUser(payload)
        .then((response) => {
          const xLabels = response.xlabels;
          const data = response.datasets;
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
    handleFetchUser() {
      const type = this.label.toLowerCase();
      const payload = {
        type,
        params: { ...this.payloadDate },
      };
      return this.fetchApi(payload);
    },
    getPayloadDate(payload) {
      this.payloadDate = { ...payload };
      return this.handleFetchUser();
    },
		getPayloadMonth(payload) {
			this.payloadMonth = { ...payload }
			const type = this.label.toLowerCase();
				const data = {
					type,
					params: { ...payload },
				};
      	return this.fetchApi(data);
		},
		getPayloadYear(data) {
			this.payloadYear = {...data}
			const type = this.label.toLowerCase()
			const payload = {
				type ,
				params : {...data}
			}
			return this.fetchApi(payload)
		}
  },
  mounted() {
    this.handleFetchUser();
  },
};
</script>

<style lang="scss" scoped>
.action {
  &__ctr {
    margin-bottom: 16px;
    display: flex;
    justify-content: space-between;
  }
}
.total {
  &__ctr {
    padding: 16px;
    border: 2px solid #1890ff;
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
    color: #1890ff;
    font-size: 14px;
    font-weight: 500;
    letter-spacing: 0.01em;
  }
}
</style>

