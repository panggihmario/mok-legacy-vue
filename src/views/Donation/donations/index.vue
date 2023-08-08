<template>
  <div>
    <HeaderContent
      label="List Penggalangan Dana"
      :list="crumbs"
    >
      <div :class="d.header">
        <custom-button style="margin-top : auto" size="x-medium" v-if="!isExpand" @click="openExpand" >
          Filter Data
        </custom-button>
        <k-input @keyup.enter="onEnter" v-model="keyword"/>
        <custom-button 
          size="x-medium" 
          color="primary"
          @click="openFormDonation"
          style="margin-top : auto"
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
      :statusFind="statusFind"
      :isLoading="isLoading"
    />
    <div class="d-flex justify-end mt-2">
    <v-pagination
      v-if="totalPages > 1"
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
      statusFind : '',
      params : {},
      keyword : '',
      isLoading : false,
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
    handleData (payload) {
      return this.fetchDonations(payload)
        .then(response => {
          this.page = 1
          this.isLoading = false
          const content = response.content
          const totalPages = response.totalPages
          this.totalPages = totalPages
          this.donations = content
        })
        .catch (err => {
          this.isLoading = false
        })
    },
    onFilter(params) {
      this.statusFind = 'filter'
      this.params =  {...params}
      const payload = {
        ...params,
        page : 0,
        search : this.keyword
      }
      this.isLoading = true
      console.log(payload)
      return this.handleData(payload)
    },
    openExpand() {
      this.isExpand = true
    },  
    onCloseExpand(item) {
      this.isExpand = false
      this.statusFind = ''
      const payload = {
        ...item,
        search : this.keyword,
        page : 0
      }
      this.isLoading = true
      this.params = item
      return this.handleData(payload)
    },
    onEnter() {
      this.statusFind = this.keyword.length > 0 ? 'search' : ''
      const payload = {
        ...this.params,
        search : this.keyword,
        page : 0
      }
      this.isLoading = true
      return this.handleData(payload)
    },
    onInput(e) {
      this.page = e
      const payload = {
        ...this.params,
        page : e - 1,
        search : this.keyword,
      }
      this.isLoading = true
      return this.fetchDonations(payload)
        .then(response => {
          this.isLoading = false
          const content = response.content
          const totalPages = response.totalPages
          this.totalPages = totalPages
          this.donations = content
        })
        .catch(() => { this.isLoading = false })
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
      this.isLoading = true
      return this.fetchDonations(payload)
        .then(response => {
          this.isLoading = false
          const content = response.content
          const totalPages = response.totalPages
          this.totalPages = totalPages
          this.donations = content
        })
        .catch(() => { this.isLoading = false })
    }
  }
}
</script>

<style lang="scss" src="../donation.scss" module="d" ></style>