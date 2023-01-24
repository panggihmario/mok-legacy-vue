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
    <Tabledonation/>
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
    }
  },
  mounted () {
    this.handleResponse()
  },
  methods : {
    ...mapActions({
      getListDonation: "donation/getListDonation",
      deleteDonation: "donation/deleteDonation",
    }),
    openFormDonation() {
      this.$router.push({
        name : 'createDonation'
      })
    },
    async handleResponse() {
      const payload = {
        page: 0,
      };
      const response = await this.getListDonation(payload);
      if (response.status === 200) {
        const responseData = response.data.data;
        console.log(responseData)
        // this.formatingResponseData(responseData);
      }
    },
  }
}
</script>

<style lang="scss" src="../donation.scss" module="d" ></style>