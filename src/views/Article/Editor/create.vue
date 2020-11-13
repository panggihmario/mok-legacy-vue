<template>
  <custom-form refForm="form">
    <HeaderContent label="Buat News">
      <custom-button
        type="submit"
        :loading="loadingDraft"
        @click="onDraft"
        class="primary--text mr-6"
        >Safe To Draft</custom-button
      >
      <custom-button
        color="primary"
        @click="onSubmit"
        type="submit"
        class="white--text"
				:loading="loadingSubmit"
        >Submit</custom-button
      >
    </HeaderContent>
    <FormNews 
      :payloadNews="payloadNews" 
      :categoryNews="categoryNews"
      @getImageUpload="getImageUpload"
      @getThumbnail="getThumbnail"
    />
		<v-snackbar top v-model="alertSuccess"  color="success" >
			Create News Success
		</v-snackbar>
		<v-snackbar top v-model="alertFailed"  color="error" >
			Create News Failed
		</v-snackbar>
    <v-snackbar top v-model="alertImage"  color="error" >
      NO image / thumbnail
		</v-snackbar>
  </custom-form>
</template>

<script>
import { mapState, mapActions } from "vuex";
import HeaderContent from "@/containers/HeaderContent";
import FormNews from "@/containers/Form/formNews";
export default {
  components: {
    HeaderContent,
    FormNews
  },
  computed: {
    ...mapState(["user"]),
    isFormValid() {
      return Object.keys(this.payloadNews).every(field => {
        if(field === 'linkReference' || field === 'isScheduled' || field === 'scheduledTime') {
          return true
        }else {
          return this.payloadNews[field];
        }
      });
    }
  },
  mounted(){
    this.handleCategoryNews()
  },
  methods: {
    ...mapActions({
      createNews: "news/createNews",
      createDraft: "news/createDraft",
      getCategoryNews : 'news/getCategoryNews',
    }),
    getImageUpload(payload) {
      const tempImage = []
      tempImage.splice(0,1, payload)
      this.payloadNews.medias = tempImage
    },
    getThumbnail(params) {
      this.payloadNews.thumbnailUrl = params.url
    },
    async handleCategoryNews () {
      const response = await this.getCategoryNews()
      if(response.status === 200) {
        const responseData = response.data.data
        const formatData = responseData.map(r => {
          return {
            name : r.name,
            id : r.id
          }
        })
        this.categoryNews = formatData
      }
    },
    async onDraft() {
      const statusValid = this.isFormValid;
      console.log(this.payloadNews)
      if (statusValid) {
        this.loadingDraft = true;
        const payload = {
          params : this.payloadNews,
          type : 'draft'
        }
        return this.actionPostNews(payload)
      }else{
        this.alertImage = true
        if(this.payloadNews.medias && this.payloadNews.thumbnailUrl){
          this.alertImage = false
        }
        return
      }
    },
    async actionPostNews (payloadNews) {
      const response = await this.createNews(payloadNews);
        if (response.status === 201) {
          this.alertSuccess = true
          setTimeout(() => {
            this.alertSuccess = false
            this.$router.push("/editor");
          }, 500)
          this.loadingDraft = false; 
          this.loadingSubmit = false
        } else {
          this.alertFailed = true
          setTimeout(() => {
            this.alertFailed = false
          }, 1500)
          this.loadingDraft = false;
          this.loadingSubmit = false
          return response;
        }
    },
    onSubmit() {
      const statusValid = this.isFormValid; 
      if (statusValid) {
        const payload = {
          params : this.payloadNews,
          type : 'submit'
        }
				this.loadingSubmit = true
        return this.actionPostNews(payload)
      } else {
        console.log("masuk else")
        this.alertImage = true
        if(this.payloadNews.medias && this.payloadNews.thumbnailUrl){
          this.alertImage = false
        }
        return
      }
    },
    getImage(payload) {
      if (payload.status === "success") {
        this.image = payload.response.thumbnail;
        this.payloadNews.media.push(payload.response);
      }
    }
  },
  data() {
    return {
      image: "",
      categoryNews : [],
      alertImage : false,
			loadingDraft: false,
			loadingSubmit : false,
			alertSuccess : false,
			alertFailed : false,
      payloadNews: {
        headline: "",
        title: "",
        content: "",
        linkReference: "",
        medias: null,
        newsCategory : "",
        thumbnailUrl : '',
        isScheduled : false,
        scheduledTime : null,
        metaKeyword : '',
        newsTagString : ''
      },
      dialog: false
    };
  }
};
</script>

<style lang="sass" scoped>
.create-article
	&__label
		font-size: 24px
		font-weight: 500
</style>
