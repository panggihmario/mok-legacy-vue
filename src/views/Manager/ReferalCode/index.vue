<template>
  <div>
    <HeaderContent :list="items" label="Referral Code" >
      <custom-button @click="openDialog" class="white--text" color="secondary">Buat Referral</custom-button>
    </HeaderContent>
    <FilterComponent
      @getCodeByUsername="getCodeByUsername"
      @onClearUsername="onClearUsername"
      @getCodeByKeyword="getCodeByKeyword"
      @onSelectUser="onSelectUser"
      :selectedUser="selectedUser"
      :referralCode="referralCode"
      @setReferralCode="setReferralCode"
      @setError="setError"
      @changeFilter="changeFilter"
    />
    <DialogComponent  
      @closeDialog="closeDialog" 
      @openDialogSuccess="openDialogSuccess"
      @setError="setError"
      :dialog="dialog"  
    />
    <DialogSuccess 
      :dialogSucces="dialogSucces"  
      @closeDialogSuccess="closeDialogSuccess" 
    />
    <TableCode 
      v-if="isSearch" 
      :items="dataCode" 
      @setError="setError"
      :totalElements="totalElements"
      :totalPages="totalPages"
      :currentPage="currentPage"
      @setCurrentPage="setCurrentPage"
      @refreshData="refreshData"
    />
    <div v-else class="code__mention">Tidak ada data ditampilkan, silahkan cari berdasarkan username atau referral code</div>
   <AlertError
    :snackbar="snackbar"
    :errorObject="errorObject"
    @setSnackBar="setSnackBar"
   />
  </div>
</template>

<script>
import HeaderContent from "@/containers/HeaderContent";
import FilterComponent from "./filter.vue"
import DialogComponent from "./dialogCreate.vue"
import DialogSuccess from "./dialogSuccess.vue"
import TableCode from "./tableReferral.vue"
import AlertError from "./alertError.vue";
import { mapActions } from "vuex";
export default {
  components : {
    HeaderContent,
    FilterComponent,
    DialogComponent,
    DialogSuccess,
    TableCode,
    AlertError
  },
  data () {
    return {
      dialog : false,
      accountId :  "",
      selectedUser : {},
      totalElements : 0,
      currentPage : 1,
      totalPages : 0,
      referralCode : '',
      errorObject : null,
      snackbar : false,
      timeout : 3000,
      dialogSucces : false,
      isSearch : false,
      dataCode : [],
      items: [
        {
          text: "Kontent",
          disabled: true,
        },
        {
          text: "Referral Code",
          disabled: true,
        },
      ],
    }
  },
  methods : {
    ...mapActions({
      searchReferralCode : 'manageSocmed/searchReferralCode'
    }),
    changeFilter () {
      this.referralCode = ''
      this.accountId = ""
    },
    refreshData () {
      const payload = {
        referralCode : this.referralCode,
        accountId : this.accountId,
        page : this.currentPage - 1,
        size : 10
      }
      return this.handleSearchApi(payload)
    },
    setCurrentPage(value) {
      this.currentPage = value
      const payload = {
        referralCode : this.referralCode,
        accountId : this.accountId,
        page : value - 1,
        size : 10
      }
      return this.handleSearchApi(payload)
    },
    setSnackBar (value) {
      this.snackbar = value
    },
    setReferralCode (value) {
      this.referralCode = value
      this.accountId = ""
    },
    onClearUsername() {
      this.dataCode = []
      this.isSearch = false
    },
    handleSearchApi (payload) {
      return this.searchReferralCode(payload)
        .then(response => {
          const content = response.content
          const totalElements = response.totalElements
          const totalPages = response.totalPages
          this.totalPages = totalPages
          this.dataCode = content
        })
        .catch(err => {
          this.setError(err)
        })
    },
    getCodeByKeyword ( value ) {
      this.currentPage = 1
      this.isSearch = true
      const payload = {
        referralCode : value,
        accountId : '',
        page : 0,
        size : 10
      }
      return this.handleSearchApi(payload)
    },
    setError (err) {
      this.errorObject = err
      this.snackbar = true
    },
    onSelectUser (value) {
      this.referralCode = ""
      if(value) {
        this.accountId = value.accountId
        this.isSearch = true
        const payload = {
          accountId : value.accountId,
          referralCode : '',
          page : this.currentPage - 1,
          size : 10
        }
        return this.handleSearchApi(payload)
      }else {
        this.isSearch = false
      }
      
    },
    getCodeByUsername( value) {
      this.isSearch = true
      const payload = {
        accountId : value.accountId,
        referralCode : ''
      }
      return this.searchReferralCode(payload)
        .then(response => {
          const content = response.content
          this.dataCode = content
        })
    },
    openDialog () {
      this.dialog = true
    },
    closeDialog( ) {
      this.dialog = false
    },
    closeDialogSuccess () {
      this.dialogSucces = false
    },
    openDialogSuccess () {
      this.dialogSucces = true
      setTimeout(() => {
        this.dialogSucces = false
      },2000)
    }
  }
}
</script>

<style lang="scss" src="./style.scss"></style>