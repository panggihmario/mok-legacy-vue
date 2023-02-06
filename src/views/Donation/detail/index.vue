<template>
  <div>
    <HeaderContent
      label="Penggalangan Dana"
      :list="crumbs"
    />
    <div :class="d['detail__container']">
      <MediaContent :item="donation" />
      <Amount :item="donation" />
      <div :class="d['detail__line']"></div>
      <Activity/>
    </div>
    
  </div>
</template>

<script>
import HeaderContent from "@/containers/HeaderContent";
import { mapActions } from "vuex";
import MediaContent from "./header.vue"
import Amount from "./amount.vue"
import Activity from "./activity.vue"
export default {
  components : {
    HeaderContent,
    MediaContent,
    Amount,
    Activity
  },
  data () {
    return {
      crumbs: [
        {
          text: "List Penggalangan Dana",
          disabled: false,
        },
        {
          text: "Penggalangan Dana",
          disabled: true,
        },
      ],
      donation : {
        image : '',
        video : '',
        province : '',
        title : '',
        description : '',
        recipientName : '',
        initiator : '',
        targetAmount : 0,
        amountCollected : 0,
        amountWithdraw : 0
      },
    }
  },
  mounted() {
    this.handleDetail()
  },
  methods : {
    ...mapActions({
      fetchDetailDonation : 'donation/fetchDetailDonation'
    }),
    handleDetail () {
      const id = this.$route.params.id
      return this.fetchDetailDonation(id)
        .then(response => {
          console.log(response)
          const medias = response.medias
          let image,video
          medias.forEach(media => {
            if(media.type === 'image'){
              this.image = media.url
              image = media.url
            }else{
              this.video = media.url
              video = media.url
            }
          })
          this.donation = Object.assign({} , this.donation ,{
            province : response.province.name,
            initiator : response.initiator.name,
            recipientName : response.recipientName,
            title : response.title,
            description : response.description,
            image,
            video,
            targetAmount : response.targetAmount,
            amountCollected : response.amountCollected,
            amountWithdraw : response.amountWithdraw
          })
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style lang="scss" module="d" src="../donation.scss" ></style>