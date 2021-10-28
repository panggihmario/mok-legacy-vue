<template>
  <div class="chart-user">
    <trend-chart
      :datasets="datasets"
      :grid="grid"
      :labels="labels"
      :min="0"
      padding="5"
      :interactive="true"
      @mouse-move="onMouseMove"
      class="random-chart"
      v-if="datasets.length"
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
        <div class="tooltip-data">
          <div class="tooltip-data-item tooltip-data-item--1">
            {{ tooltipData.data[0] }}
          </div>
          <div class="tooltip-data-item tooltip-data-item--2">
            {{ tooltipData.data[1] }}
          </div>
          <div class="tooltip-data-item tooltip-data-item--3">
            {{ tooltipData.data[2] }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { createPopper } from "@popperjs/core";
export default {
  props : ['datasets', 'labels'],
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
      const chart = document.querySelector(".random-chart");
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
    height: 250px;
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
  .curve1 {
    .stroke {
      stroke: #1890FF;
      stroke-width: 2;
    }
    .point {
      fill: #1890FF;
      stroke: #1890FF;
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
        &--1:before {
          background: #1890FF;
        }
      }
    }
  }
}
</style>