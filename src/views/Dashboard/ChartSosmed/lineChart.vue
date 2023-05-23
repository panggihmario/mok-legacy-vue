<template>
  <div v-if="chartData.labels.length > 0">
    <LineChartGenerator 
    :chart-options="chartOptions" 
    :chart-data="dynamicData" 
    :chart-id="chartId"
    :dataset-id-key="datasetIdKey" 
    :plugins="plugins" :css-classes="cssClasses" :styles="styles" :width="width"
    :height="height" />
    <button @click="updating">click me</button>
    {{ dynamicData }}
  </div>

</template>

<script>
import { Line as LineChartGenerator } from "vue-chartjs/legacy";

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  CategoryScale,
  PointElement,
  Filler,
  LineController
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  CategoryScale,
  PointElement,
  LineController,
  Filler
);

export default {
  name: "LineChart",
  components: {
    LineChartGenerator,
  },
  props: {
    chartId: {
      type: String,
      default: "line-chart",
    },
    datasetIdKey: {
      type: String,
      default: "label",
    },
    width: {
      type: Number,
      default: 400,
    },
    height: {
      type: Number,
      default: 400,
    },
    cssClasses: {
      default: "",
      type: String,
    },
    styles: {
      type: Object,
      default: () => { },
    },
    plugins: {
      type: [Array, Object],
      // default: () => [],
    },
    chartData : {
      type : [Object, Array],
    }
  },
  computed : {
    dynamicData () {
      console.log("dataChart", this.dataChart)
      return this.dataChart
    }
  },
  mounted ( ) {
    this.renderChart()
  },
  data() {
    return {
      dataChart: {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
        ],
        datasets: [
          {
            label: "Data One",
            backgroundColor: "#f87979",
            data: [40, 39, 10, 40, 39, 80, 40],
          },
        ],
      },
      // dataChart :
      //   {
      //     labels : [],
      //     datasets : []
      //   },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: false,
        },
      },

    };
  },
  watch : {
    chartData : {
      handler (value) {
      console.log("watch",value)
      this.dataChart.labels = value.labels
      this.dataChart.datasets = value.datasets
      },
      deep : true
    }
  },
  methods : {
    updating() {
      console.log('log')
      this.dataChart.labels = [
      "January",
          "February",
          "March",
          "April",
      ]
      this.dataChart.datasets = [
      {
            label: "Data One",
            backgroundColor: "#f87979",
            data: [40, 39, 10, 40, 39, 80, 40],
          },
      ]
    },
    renderChart () {
      this.dataChart.labels = this.chartData.labels
      this.dataChart.datasets = this.chartData.datasets
    },
 
  },

};
</script>
<!-- <template>
  <div>
    <button @click="updating">click me</button>
    <LineChartGenerator
      :chart-options="chartOptions"
      :chart-data="chartData"
      :chart-id="chartId"
      :dataset-id-key="datasetIdKey"
      :plugins="plugins"
      :css-classes="cssClasses"
      :styles="styles"
      :width="width"
      :height="height"
    />
  </div>
</template>

<script>
import { Line as LineChartGenerator } from "vue-chartjs/legacy";

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  CategoryScale,
  PointElement,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  CategoryScale,
  PointElement
);

export default {
  name: "LineChart",
  components: {
    LineChartGenerator,
  },
  props: {
    chartId: {
      type: String,
      default: "line-chart",
    },
    datasetIdKey: {
      type: String,
      default: "label",
    },
    width: {
      type: Number,
      default: 400,
    },
    height: {
      type: Number,
      default: 400,
    },
    cssClasses: {
      default: "",
      type: String,
    },
    styles: {
      type: Object,
      default: () => {},
    },
    plugins: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    updating() {
      const x = ["jan", "feb"];
      const y = [
        {
          label: "Data One",
          backgroundColor: "#f87979",
          data: [40, 39],
        },
      ];
      this.chartData.labels = x;
      this.chartData.datasets = y;
    },
  },
  data() {
    return {
      chartData: {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
        ],
        datasets: [
          {
            label: "Data One",
            backgroundColor: "#f87979",
            data: [40, 39, 10, 40, 39, 80, 40],
          },
        ],
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
      },
    };
  },
};
</script> -->
