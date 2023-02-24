<template>
  <div :class="d['detail__amount']">
    <div>
      <div :class="d['amount-colect']">
        <div :class="d['amount-title']">Dana Terkumpul</div>
        <div :class="d['amount-balance']">
          Rp {{ item.amountCollected.toLocaleString('id') }} / <span :class="d['amount-target']">Rp{{
            item.targetAmount.toLocaleString('id')
          }}</span>
        </div>
        <v-progress-linear v-model="percentAmountCollected" color="white" rounded />
      </div>
      <div :class="d['amount-list']">
        <div v-for="(debit, idx) in debits" :key="idx">
          <div class="d-flex" style="gap : 20px">
            <div>{{ formated(debit.createAt) }}</div>
            <div> {{ debit.accountName ? debit.accountName : 'unknown' }} </div>
            <div style="margin-left : auto">Rp {{ debit.nominal.toLocaleString('id') }} </div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <div :class="d['amount-withdraw']">
        <div :class="d['amount-title']">Penarikan Dana</div>
        <div :class="d['amount-balance']">Rp {{ item.amountWithdraw.toLocaleString('id') }}</div>
        <v-progress-linear v-model="value" color="white" rounded />
      </div>
      <div :class="d['amount-list']">
        <div v-for="(credit, idx) in credits" :key="idx">
          <div class="d-flex" style="gap : 20px">
            <div>{{ formated(credit.createAt) }}</div>
            <div> {{ credit.accountName ? credit.accountName : 'unknown' }} </div>
            <div style="margin-left : auto">Rp {{ credit.nominal.toLocaleString('id') }} </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { mapActions } from 'vuex'
import moment from "moment"
export default {
  props: {
    item: {
      type: Object
    }
  },
  computed: {
    percentAmountCollected() {
      const collect = this.item.amountCollected
      const target = this.item.targetAmount
      const percent = (collect / target) * 100
      return percent
    },

  },
  data() {
    return {
      value: 0,
      debits: [],
      credits : []
    }
  },
  mounted() {
    this.handleBalanceHistory()
    this.handleWithdrawHistory()
  },
  methods: {
    ...mapActions({
      fetchBalanceHistory: 'donation/fetchBalanceHistory'
    }),
    formated(epoch) {
      const humanDate = moment(epoch).format('DD MMM YYYY')
      return humanDate
    },
    handleBalanceHistory() {
      const payload = {
        id: this.$route.params.id,
        params: {
          page: 0,
          size: 10,
          type: 'DEBIT'
        }
      }
      return this.fetchBalanceHistory(payload)
        .then(response => {
         
          this.debits = response
        })
    },
    handleWithdrawHistory() {
      const payload = {
        id: this.$route.params.id,
        params: {
          page: 0,
          size: 10,
          type: 'CREDIT'
        }
      }
      return this.fetchBalanceHistory(payload)
        .then(response => {
          this.credits = response
        })
    }
  }
}
</script>

<style lang="scss" module="d" src="../donation.scss"  >

</style>