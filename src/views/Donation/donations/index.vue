<template>
  <div>
    <HeaderContent
      label="List Penggalangan Dana"
      :list="crumbs"
    >
      <div :class="d.header">
        <custom-button size="x-medium" >
          Filter Data
        </custom-button>
        <k-input/>
        <custom-button 
          size="x-medium" 
          color="primary"
          @click="openFormDonation"
        >
          Buat Penggalangan Dana Baru
        </custom-button>
      </div>
    </HeaderContent>
    <Tabledonation
      :items="donations"
    />
  </div>
</template>

<script>
import HeaderContent from "@/containers/HeaderContent";
import Tabledonation from "./table.vue"
import { mapActions } from "vuex";
export default {
  components : {
    HeaderContent,
    Tabledonation
  },
  data () {
    return {
      crumbs: [
        {
          text: "Penggalangan Dana",
          disabled: true,
        },
      ],
      donations : []
    }
  },
  mounted () {
    this.handleDonations()
  },
  methods : {
    ...mapActions({
      getListDonation: "donation/getListDonation",
      deleteDonation: "donation/deleteDonation",
      fetchDonations : 'donation/fetchDonations'
    }),
    openFormDonation() {
      this.$router.push({
        name : 'createDonation'
      })
    },
    handleDonations () {
      const payload = {
        page : 0
      }
      return this.fetchDonations(payload)
        .then(response => {
          console.log(response)
          const content = response.content
          this.donations = content
        })
    }
  }
}
</script>

<style lang="scss" src="../donation.scss" module="d" ></style>