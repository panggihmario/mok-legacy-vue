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
    />
		<v-snackbar top v-model="alertSuccess"  color="success" >
			Create News Success
		</v-snackbar>
		<v-snackbar top v-model="alertFailed"  color="error" >
			Create News Failed
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
        return this.payloadNews[field];
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
      this.payloadNews.medias.splice(0, 1, payload);
    },
    async handleCategoryNews () {
      const response = await this.getCategoryNews()
      if(response.status === 200) {
        const responseData = response.data.data
        console.log(responseData)
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
      if (statusValid) {
      	this.loadingDraft = true;
        const response = await this.createDraft(this.payloadNews);
        if (response.status === 201) {
					this.alertSuccess = true
					setTimeout(() => {
						this.alertSuccess = false
          	this.$router.push("/editor");
					}, 500)
          this.loadingDraft = false;
        } else {
					this.alertFailed = true
					setTimeout(() => {
						this.alertFailed = false
					}, 1500)
          this.loadingDraft = false;
          return response;
        }
      }
    },
    async onSubmit() {
      const statusValid = this.isFormValid;
      if (statusValid) {
				this.loadingSubmit = true
        const response = await this.createNews(this.payloadNews);
        if (response.status === 201) {
					this.loadingSubmit = false
					this.alertSuccess = true
					setTimeout(() => {
						this.alertSuccess = false
          	this.$router.push("/editor");
					}, 500)
        } else {
					this.alertFailed = true
					setTimeout(() => {
						this.alertFailed = false
					}, 1500)
					this.loadingSubmit = false
        }
      } else {
        return;
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
			loadingDraft: false,
			loadingSubmit : false,
			alertSuccess : false,
			alertFailed : false,
      payloadNews: {
        headline: "",
        title: "",
        content: "",
        linkReference: "",
        medias: [],
        newsCategory : ""
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
