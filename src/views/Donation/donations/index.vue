<template>
  <div>
    <HeaderContent
      label="List Penggalangan Dana"
      :list="crumbs"
    >
      <div :class="d.header">
        <custom-button size="x-medium" v-if="!isExpand" @click="openExpand" >
          Filter Data
        </custom-button>
        <k-input @keyup.enter="onEnter" v-model="keyword"/>
        <custom-button 
          size="x-medium" 
          color="primary"
          @click="openFormDonation"
        >
          Buat Penggalangan Dana Baru
        </custom-button>
      </div>
    </HeaderContent>
    <Expand 
      v-if="isExpand"
      @onCancel="onCloseExpand"
      @onFilter="onFilter"
    />
    <Tabledonation
      :items="donations"
      @refreshData="refreshData"
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
import Expand from "./expand.vue"
import { mapActions } from "vuex";
export default {
  components : {
    HeaderContent,
    Tabledonation,
    Expand
  },
  data () {
    return {
      page : 1,
      totalPages : 0,
      params : {},
      keyword : '',
      isExpand : false,
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
    refreshData() {
      this.handleDonations()
    },
    onFilter(params) {
      this.params = {...params}
      const payload = {
        ...params,
        page : this.page - 1
      }
      return this.fetchDonations(payload)
        .then(response => {
          const content = response.content
          const totalPages = response.totalPages
          this.totalPages = totalPages
          this.donations = content
        })
        .catch (err => {
          console.log(err.response)
        })
    },
    openExpand() {
      this.isExpand = true
    },  
    onCloseExpand() {
      this.isExpand = false
      this.handleDonations()
    },
    onEnter() {
      const payload = {
        page : this.page - 1,
        search : this.keyword
      }
      return this.fetchDonations(payload)
        .then(response => {
          const content = response.content
          const totalPages = response.totalPages
          this.totalPages = totalPages
          this.donations = content
        })
    },
    onInput(e) {
      this.page = e
      const payload = {
        ...this.params,
        page : e - 1,
        search : this.keyword,
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
        page : this.page - 1
      }
      return this.fetchDonations(payload)
        .then(response => {
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