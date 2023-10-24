<template>
  <div>
    <HeaderContent :list="items" label="Referral Code" >
      <custom-button @click="openDialog" class="white--text" color="secondary">Buat Referral</custom-button>
    </HeaderContent>
    <FilterComponent
      @getCodeByUsername="getCodeByUsername"
      @onClearUsername="onClearUsername"
      @getCodeByKeyword="getCodeByKeyword"
    />
    <DialogComponent  
      @closeDialog="closeDialog" 
      @openDialogSuccess="openDialogSuccess"
      :dialog="dialog"  
    />
    <DialogSuccess 
      :dialogSucces="dialogSucces"  
      @closeDialogSuccess="closeDialogSuccess" 
    />
    <TableCode v-if="isSearch" :items="dataCode" />
    <div v-else class="code__mention">Tidak ada data ditampilkan, silahkan cari berdasarkan username atau referral code</div>
    <v-snackbar v-model="snackbar" :timeout="timeout"  top color="warning">
     <div v-if="errorObject">
       <div v-if="errorObject.response">
         <div v-if="errorObject.response.status === 401">
         <div>{{ errorObject.response.data.error }}</div>
         <div>{{ errorObject.response.data.error_description }}</div>
         </div>
         <div v-else>
           <div>{{ errorObject.response.data.message }}</div>
           <div>{{ errorObject.response.data.data }}</div>
         </div>
       </div>
       <div v-else>  {{ errorObject }}</div>
     </div>
   </v-snackbar>
  </div>
</template>

<script>
import HeaderContent from "@/containers/HeaderContent";
import FilterComponent from "./filter.vue"
import DialogComponent from "./dialogCreate.vue"
import DialogSuccess from "./dialogSuccess.vue"
import TableCode from "./tableReferral.vue"
import { mapActions } from "vuex";
export default {
  components : {
    HeaderContent,
    FilterComponent,
    DialogComponent,
    DialogSuccess,
    TableCode
  },
  data () {
    return {
      dialog : false,
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
    onClearUsername() {
      this.dataCode = []
      this.isSearch = false
    },
    getCodeByKeyword ( value ) {
      console.log(value)
      this.isSearch = true
      const payload = {
        referralCode : value
      }
      return this.searchReferralCode(payload)
        .then(response => {
          const content = response.content
          this.dataCode = content
        })
        .catch(err => {
          this.errorObject = err
          this.snackbar = true
        })
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
          console.log(content)
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