<template>
  <div>
    <Header-Content label="Dashboard" :list="items" />
    <Filters
      @setData="setData"
    >
      <LineChart 
        :chartData="chartData"/>
    </Filters>
    <!-- <DataTable/> -->
  </div>
</template>

<script>

import HeaderContent from "@/containers/HeaderContent";
import Filters from "./Header/index.vue"
import Chart from "../containers/chart.vue"
import LineChart from "./lineChart.vue"
import DataTable from "./dataTable.vue"
export default {
  components : {
    HeaderContent,
    Filters,
    Chart,
    LineChart,
    DataTable
  },
  data () {
    return {
      keyword : '',
      labels : {
        
      },
      datasets : [],
      payloadFilter: {
        username: "",
        timeline: "HOUR",
      },
      itemsList : [],
      items: [
        {
          text: "Dashboard Sosmed",
          disabled: true,
        },
      ],
      chartData : {
        labels : [],
        datasets : []
      },
      dataChart : {
        labels : [],
        datasets : []
      }
    }
  },
  methods : {
    setData (response) {
      const xLabels = response.xlabels;
      const data = response.datasets;
      const dataForChart = data.map(d => {
        return {
          data : d.data,
          backgroundColor: (context) => {
            const { ctx} = context.chart
            var gradient = ctx.createLinearGradient(0, 0, 0, 400);
            gradient.addColorStop(1, 'rgba(177, 218, 255, 0.787755)');   
            gradient.addColorStop(0, 'rgba(214, 235, 255, 0.411077)');
            return gradient
          },
          borderColor :  '#1890FF',
          fill: true,
          tension: 0.1,
        }
      })
      this.chartData.labels = xLabels
      this.chartData.datasets = dataForChart
      return this.printSuccess(data, xLabels);
    },
    printSuccess(data, xLabels) {
      const formatDataset = data.map((d) => {
        return {
          data: d.data,
          smooth: true,
          showPoints: true,
          className: "curve1",
          fill: true,
          // stroke: true,
        };
      });
      const arrayData = data[0].data
      const highestData = Math.max(...arrayData)
      let totalYLabel
      if(highestData > 5) {
        totalYLabel = 6
      }else{
        totalYLabel = highestData + 1
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
  }
}
</script>

<style lang="scss">
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
</style>