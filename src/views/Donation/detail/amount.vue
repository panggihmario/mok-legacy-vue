<template>
  <div :class="d['detail__amount']">
    <div :class="d['amount-colect']">
      <div :class="d['amount-title']">Dana Terkumpul</div>
      <div :class="d['amount-balance']">
      Rp {{ item.amountCollected.toLocaleString('id') }} / <span :class="d['amount-target']">Rp{{ item.targetAmount.toLocaleString('id') }}</span>
      </div>
      <v-progress-linear
        v-model="percentAmountCollected"
        color="white"
        rounded
      />
    </div>
    <div :class="d['amount-withdraw']">
      <div :class="d['amount-title']">Penarikan Dana</div>
      <div :class="d['amount-balance']">{{ item.amountWithdraw }}</div>
      <v-progress-linear
        v-model="value"
        color="white"
        rounded
      />
    </div>
  </div>
</template>

<script>
export default {
  props : {
    item : {
      type : Object
    }
  },
  computed  : {
    percentAmountCollected () {
      const collect = this.item.amountCollected
      const target = this.item.targetAmount
      const percent = (collect / target) * 100
      return percent
    }
  },
  data () {
    return {
      value : 0
    }
  }
}
</script>

<style lang="scss" module="d" src="../donation.scss"  ></style>