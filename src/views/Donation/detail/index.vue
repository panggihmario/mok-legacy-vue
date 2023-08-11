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
        amountWithdraw : 0,
        createAt : '',
        expiredAt : ''
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
    getVodUrl (item) {
      if(item.vodUrl) {
        return item.vodUrl
      }else{
        const url = item.url
        const hrefURL = new URL(url)
        const pathName = hrefURL.pathname
        const origin = hrefURL.origin
        const splitPathName = pathName.split('/')
        const lastIndex = splitPathName.pop()
        const splitLastIndex = lastIndex.split('.')
        const [first, second] = splitLastIndex
        const newFormatFileUrl = `${first}_h265.${second}`
        const joinPathName = `${splitPathName.join("/")}/${newFormatFileUrl}`
        const fullPath = `${origin}${joinPathName}`
        return fullPath
      }
    },
    handleDetail () {
      const id = this.$route.params.id
      return this.fetchDetailDonation(id)
        .then(response => {
          const medias = response.medias
          let image,video
          medias.forEach(media => {
            if(media.type === 'image'){
              this.image = media.url
              image = media.url
            }else{
              this.video = media.url
              const url = this.getVodUrl(media)
              video = url
              
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
            amountWithdraw : response.amountWithdraw,
            createAt : response.createAt,
            expiredAt : response.expiredAt,
            status : response.status
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