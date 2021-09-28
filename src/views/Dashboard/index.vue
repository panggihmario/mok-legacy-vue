<template>
  <div>
    dashboard
    <div class="random">
      <TrendChart
        :datasets="[
          {
            data: [10, 50, 20, 120, 40, 60, 80],
            smooth: true,
            fill: true,
          },
        ]"
        :grid="{
          verticalLines: true,
          horizontalLines: true,
        }"
        :labels="{
          xLabels,
          yLabels: 5,
					yLabelsTextFormatter: val => Math.round(val * 100) / 100
        }"
        :min="0"
      >
      </TrendChart>
    </div>
  </div>
</template>

<script>
import moment from "moment"
import Publisher from "./Publisher";
import Editor from "./Editor";
import { mapState } from "vuex";
export default {
  data() {
    return {
      xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    };
  },
  components: {
    Publisher,
    Editor,
  },
   mounted() {
     const w = moment().week(1).year(2021).format("DD/MM/YYYY");
     console.log("==== ini week",w)
   },
   computed: {
    ...mapState(["user"]),
  },
};
</script>

<style lang="scss" scoped>
.random {
	.vtc {
		height: 300px;
	}
}
</style>