<template>
  <div>
    <HeaderContent label="Dashboard" :list="items" />

    <div class="chart__label">Perkembangan Jumlah User</div>
    <div class="chart__container">
      <ChartUser />
    </div>
    <div class="chart__label">Perkembangan Jumlah Seleb</div>
    <div class="chart__container">
      <ChartSeleb/>
    </div>

    <div class="chart__label">Unggahan User</div>
    <div class="chart__container">
      <ChartFeed/>
    </div>


  
  </div>
</template>

<script>
import ChartUser from "./ChartUser";
import ChartSeleb from "./ChartSeleb";
import ChartFeed from "./ChartFeed";
import HeaderContent from "@/containers/HeaderContent";
export default {
  data() {
    return {
      items: [
        {
          text: "Dashboard",
          disabled: true,
        },
      ],
    };
  },
  components: {
    HeaderContent,
    ChartUser,
    ChartSeleb,
    ChartFeed
  },
};
</script>

<style lang="scss" scoped>

.chart {
  &__label {
    font-size: 14px;
    letter-spacing: 0.01em;
    font-weight: 500;
    color: #4a4a4a;
    margin-bottom: 14px;
  }
  &__container {
    background: #ffffff;
    box-shadow: 1px 3px 8px rgba(0, 0, 0, 0.04);
    border-radius: 8px;
    margin-bottom: 16px;
    padding: 24px;
  }
}
</style>