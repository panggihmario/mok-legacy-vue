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
import TableCode from "./tableCode/tableReferral.vue"
import AlertError from "./alertError.vue";
import { mapActions } from "vuex";
export default {
  beforeRouteLeave(to, from, next) {
  // $('body').css('overflow', 'auto');
    if(to.name !== 'detailReferralCode') {
      localStorage.removeItem('userValue')
      localStorage.removeItem('filterBy')
      localStorage.removeItem('keyword')
    }
  next()
},
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
      selectedUser : null,
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
  computed : {
    sortBy () {
      const sort = window.localStorage.getItem('filterBy')
      return sort
    }
  },
  mounted() {
    const keyword = window.localStorage.getItem('keyword')
    const userValue = window.localStorage.getItem('userValue')
    if(keyword || userValue) {
      const user = JSON.parse(userValue)
      let payload = {
        referralCode : keyword ? keyword : '',
        accountId : user ? user.id : '',
        page : this.currentPage - 1,
        size : 10
      }
      this.isSearch = true
      setTimeout(() => {
        this.referralCode = keyword
        this.selectedUser = user
      },500)
      return this.handleSearchApi(payload)
    }else{
      this.isSearch = false
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
      const account = JSON.parse(window.localStorage.getItem('userValue'))
      const code = window.localStorage.getItem('keyword')
      const payload = {
        referralCode : code ?code : '',
        accountId : account ? account.id : '',
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
      if(value) {
        this.currentPage = 1
        window.localStorage.setItem('keyword', value)
        this.isSearch = true
        const payload = {
          referralCode : value,
          accountId : '',
          page : 0,
          size : 10
        }
        return this.handleSearchApi(payload)
      }else{
        window.localStorage.removeItem('keyword')
        this.isSearch = false
        return
      }
    },
    setError (err) {
      this.errorObject = err
      this.snackbar = true
    },
    onSelectUser (value) {
      this.referralCode = ""
      this.selectedUser = value
      if(value) {
        window.localStorage.setItem("userValue", JSON.stringify(value))
        this.accountId = value.id
        this.isSearch = true
        const payload = {
          accountId : value.id,
          referralCode : '',
          page : this.currentPage - 1,
          size : 10
        }
        return this.handleSearchApi(payload)
      }else {
        window.localStorage.removeItem('userValue')
        this.isSearch = false
      }
    },
    getCodeByUsername( value) {
      this.isSearch = true
      const payload = {
        accountId : value.id,
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