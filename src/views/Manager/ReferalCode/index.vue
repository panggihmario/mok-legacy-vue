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
          console.log(response)
          this.dataCode = content
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