<template>
  <div>
    <custom-button @click="openDetail(item)" class="mr-2" size="small">Detail</custom-button>
    <custom-button :loading="isLoading" @click="setStatus('INACTIVE', item)" v-if="item.status === 'ACTIVE'" size="small">
      <div class="warning--text"> Disable </div>
    </custom-button>
    <custom-button :loading="isLoading" @click="setStatus('ACTIVE', item)" v-else size="small">
      <div class="success--text">Enable</div>
    </custom-button>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  props : {
    item : {
      type : Object
    }
  },  
  data () {
    return {
      isLoading : false
    }
  },
  methods : {
    openDetail(item) {
      this.$router.push({
        name: 'detailReferralCode',
        params: {
          code: item.referralCode
        }
      })
      const dataReferralCode = {
        referralCode : item.referralCode,
      }
      window.localStorage.setItem('dataReferralCode', dataReferralCode)
    },
    ...mapActions({
      updateStatusReferralCode: 'manageSocmed/updateStatusReferralCode'
    }),
    setStatus(status, item) {
      this.isLoading = true
      const payload = {
        status,
        referralCode: item.referralCode
      }
      return this.updateStatusReferralCode(payload)
        .then(response => {
          this.isLoading = false
          this.$emit("refreshData")
        })
        .catch(err => {
          this.isLoading = false
          this.$emit("setError", err)
        })
    }
  }
}
</script>