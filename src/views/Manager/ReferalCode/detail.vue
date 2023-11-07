<template>
  <div>
    <HeaderContent :list="items" label="Referral Code" >
    </HeaderContent>
    <div >
      <div class="code__detail-label mb-4">Code : <span class="code__detail-sub"> {{ this.$route.params.code }} </span></div>
      <v-data-table
        :headers="headers"
        hide-default-footer
        class="grey--text my-table mt-6"
        :items="itemsData"
      >
        <template v-slot:item.createAt="{ item }">
          <div>{{ formatDate(item.createAt) }}</div>
        </template>
        <template v-slot:no-data>
          <div>Belum ada yang menggunakan kode refferal ini</div>
        </template>
      </v-data-table>
      <AlertError
        :snackbar="snackbar"
        :errorObject="errorObject"
        @setSnackBar="setSnackBar"
      />
    </div>
  </div>
</template>

<script>
import HeaderContent from "@/containers/HeaderContent";
import { mapActions } from "vuex";
import moment from "moment"
import AlertError from "./alertError.vue";
export default {
  components : {
    HeaderContent,
    AlertError
  },
  data () {
    return {
      items: [
        {
          text: "Kontent",
          disabled: true,
        },
        {
          text: "Referral Code",
          disabled: true,
        },
        {
          text: "Detail",
          disabled: true,
        },
      ],
      headers : [
        {
          text : 'Username',
          sortable : false,
          value : 'username',
          filterable : false
        },
        {
          text : 'Digunakan Pada',
          sortable : false,
          value : 'createAt',
          filterable : false
        }
      ],
      itemsData : [],
      snackbar : false,
      errorObject : null,
    }
  },
  mounted () {
    this.fetchData()
  },
  methods : {
    ...mapActions({
      fetchDetailReferralCode : 'manageSocmed/fetchDetailReferralCode',
    }),
    setSnackBar (value) {
      this.snackbar = value
    },
    formatDate (value) {
      const reformat = moment(value).format("DD/MM/YYYY HH:MM:ss")
      return reformat
    },
    fetchData () {
      const payload = {
        referralCode : this.$route.params.code,
        params : {
          page : 0,
          size : 10
        }
      }
      return this.fetchDetailReferralCode(payload)
        .then(response => {
          const content  = response.content
          this.itemsData = content
        })
        .catch(err => {
          this.errorObject = err
          this.snackbar = true
        })
    }
  }
}
</script>

<style lang="scss" src="./style.scss"></style>