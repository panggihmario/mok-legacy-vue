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
    <div class="d-flex justify-end mt-2">
    <v-pagination
      v-model="page"
      :length="totalPages"
      @input="onInput"
    ></v-pagination>
  </div>
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
      page : 1,
      totalPages : 0,
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
    onInput(e) {
      const payload = {
        page : e - 1
      }
      return this.fetchDonations(payload)
        .then(response => {
          const content = response.content
          const totalPages = response.totalPages
          this.totalPages = totalPages
          this.donations = content
        })
    },
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
          const totalPages = response.totalPages
          this.totalPages = totalPages
          this.donations = content
        })
    }
  }
}
</script>

<style lang="scss" src="../donation.scss" module="d" ></style>