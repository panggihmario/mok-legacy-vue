<template>
  <div>
    <HeaderContent label="Dashboard" :list="items" />

    <div class="chart__label">Perkembangan Jumlah User</div>
    <div class="chart__container">
      <ChartUser
        :payloadMonth="payloadMonth"
        :payloadYear="payloadYear"
       />
    </div>
    <div class="chart__label">Perkembangan Jumlah Seleb</div>
    <div class="chart__container">
      <ChartSeleb/>
    </div>

    <div class="chart__label">Unggahan User</div>
    <div class="chart__container">
      <ChartFeed/>
    </div>

    <div class="chart__label">Produk</div>
    <div class="chart__container">
      <ChartProduct/>
    </div>

    <div class="chart__label">Order</div>
    <div class="chart__container">
      <ChartOrder/>
    </div>


  
  </div>
</template>

<script>
import ChartUser from "./ChartUser";
import ChartSeleb from "./ChartSeleb";
import ChartFeed from "./ChartFeed";
import ChartProduct from "./ChartProduct"
import HeaderContent from "@/containers/HeaderContent";
import ChartOrder from "./ChartOrder"
export default {
  data() {
    return {
      items: [
        {
          text: "Dashboard",
          disabled: true,
        },
      ],
      payloadMonth : {},
      payloadYear : {}
    };
  },
  mounted() {
    this.getListCurrentDate()
  },
  methods : {
    getListCurrentDate() {
      const currentDate = new Date()
      const currentMonth = currentDate.getMonth()
      const currentYear = currentDate.getFullYear()
      let startAt
      if(currentMonth - 2 <= 0 ) {
        startAt = 1
      }else{
        startAt = currentMonth
      }
      const monthsParam = {
        startAt : startAt,
        endAt : currentMonth + 1
      }
      const yearParam = {
        startAt : currentYear -2,
        endAt : currentYear
      }
      this.payloadMonth = monthsParam
      this.payloadYear = yearParam
    }
  },
  components: {
    HeaderContent,
    ChartUser,
    ChartSeleb,
    ChartFeed,
    ChartProduct,
    ChartOrder
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