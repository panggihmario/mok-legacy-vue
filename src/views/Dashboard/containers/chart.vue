<template>
  <div class="chart-user">
    <trend-chart
      v-if="datasets"
      :datasets="datasets"
      :grid="{
        verticalLines: true,
        horizontalLines: true,
      }"
      :labels="labels"
      :min="0"
      padding="5"
      :interactive="true"
      @mouse-move="onMouseMove"
      :class="classChart"
    ></trend-chart>
    <div
      id="pop"
      role="tooltip"
      ref="tooltip"
      class="tooltip"
      :class="{ 'is-active': tooltipData }"
    >
      <div class="tooltip-container" v-if="tooltipData">
        
        <strong>{{ labels.xLabels[tooltipData.index] }}</strong>
        <div  class="tooltip-data">
          <div :class="`tooltip-data-item tooltip-data-item--${pointClass}`">
            {{ tooltipData.data[0] }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { createPopper } from "@popperjs/core";
export default {
  props: {
    tooltipClass : {
      type : String,
      default : '1'
    },
    pointClass : {
      type : String,
      default : 'secondary'
    },
    datasets: {
      type: Array,
      default() {
        return [
          {
            data: [70, 100, 400, 180, 100, 300, 500],
            smooth: true,
            showPoints: true,
            className: "curve1",
          },
        ];
      },
    },
    labels: {
      type: Object,
      default() {
        return {
          xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          yLabels: 5,
          yLabelsTextFormatter: (val) => Math.round(val * 100) / 100,
        };
      },
    },
    classChart: {
      type: String,
    },
  },
  data() {
    return {
      grid: {
        verticalLines: true,
        horizontalLines: true,
        verticalLinesNumber: 1,
        horizontalLinesNumber: 1,
      },
      tooltipData: null,
      popper: null,
      popperIsActive: false,
    };
  },
  methods: {
    initPopper() {
      const chart = document.querySelector(`.${this.classChart}`);
      const ref = chart.querySelector(".active-line");
      const tooltip = this.$refs.tooltip;
      this.popper = createPopper(ref, tooltip, {
        placement: "auto",
      });
    },
    onMouseMove(params) {
      this.popperIsActive = !!params;
      this.popper.update();
      this.tooltipData = params || null;
    },
  },
  mounted() {
    this.initPopper();
  },
};
</script>

<style lang="scss">
.chart-user {
  width: 100%;
  .vtc {
    height: 203px;
    font-size: 12px;
    @media (min-width: 699px) {
      height: 320px;
    }
  }
  .labels {
    stroke: rgba(0, 0, 0, 0.05);
  }
  .active-line {
    stroke: rgba(0, 0, 0, 0.2);
  }
  .point {
    stroke-width: 2;
    transition: stroke-width 0.2s;
  }
  .point.is-active {
    stroke-width: 5;
  }
  .curve2 {
    .stroke {
      stroke: #52C41A;
      stroke-width: 2;
    }
    .point {
      fill: #52C41A;
      stroke: #52C41A;
    }
  }
  .curve1 {
    .stroke {
      stroke: #1890ff;
      stroke-width: 2;
    }
    .point {
      fill: #1890ff;
      stroke: #1890ff;
    }
  }
  .curve3{
    .stroke {
      stroke: #F47500;
      stroke-width: 2;
    }
    .point {
      fill: #F47500;
      stroke: #F47500;
    }
  }
  .curve-cancel {
    .stroke {
      stroke: #FF5252;
      stroke-width: 2;
    }
    .point {
      fill: #FF5252;
      stroke: #FF5252;
    }
  }
  .tooltip {
    &:not(.is-active) {
      display: none;
    }
    padding: 10px;
    background: #fff;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
    pointer-events: none;
    &-data {
      display: flex;
      &-item {
        display: flex;
        align-items: center;
        &:not(:first-child) {
          margin-left: 20px;
        }
        &:before {
          content: "";
          display: block;
          width: 15px;
          height: 15px;
          margin-right: 5px;
        }
        &--secondary:before {
          background: #1890ff;
        }
        &--kellygreen:before{
          background: #52C41A;
        }
        &--primary:before{
          background: #F47500;
        }
      }
    }
  }
}
</style>