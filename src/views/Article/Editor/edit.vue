<template>
  <custom-form refForm="form">
    <HeaderContent label="Edit News">
      <div class="d-flex">
        <custom-button
          type="submit"
          class="carmine--text mr-6"
          @click="handleDraft"
					:loading="loadingDraft"
        >
          Safe To Draft
        </custom-button>
        <custom-button
          class="white--text"
          color="carmine"
          type="submit"
          @click="onSubmit"
					:loading="loadingSubmit"
        >
          Submit
        </custom-button>
      </div>
    </HeaderContent>
    <FormNews :payloadNews="payloadNews" :propsImage="propsImage" />
    <v-snackbar top v-model="alertSuccess" color="success">
      Edit News Success
    </v-snackbar>
    <v-snackbar top v-model="alertFailed" color="error">
      Edit News Failed
    </v-snackbar>
  </custom-form>
</template>

<script>
import { mapActions } from "vuex";
import HeaderContent from "../../../containers/HeaderContent";
import FormNews from "../../../containers/Form/formNews";
export default {
  components: {
    FormNews,
    HeaderContent
  },
  mounted() {
    this.handleResponse();
  },
  data() {
    return {
			alertSuccess : false,
			alertFailed : false,
			loadingDraft : false,
			loadingSubmit : false,
      payloadNews: {
        headline: "",
        title: "",
        content: "",
        linkReference: "",
        media: []
      },
      propsImage: ""
    };
  },
  methods: {
    ...mapActions({
      getNewsById: "news/getNewsById",
      editDraft: "news/editDraft",
      submitNews: "news/createNews",
      updateNews: "news/updateNews"
    }),
    async handleResponse() {
      const id = this.$route.params.id;
      const response = await this.getNewsById(id);
      if (response.status === 200) {
        const responseData = response.data.data;
        this.payloadNews = responseData;
        this.propsImage = responseData.media[0].thumbnail;
      }
    },
    async handleDraft() {
      const id = this.$route.params.id;
      const data = {
        id,
        params: this.payloadNews,
        type: "draft"
			};
			this.loadingDraft = true
      const response = await this.updateNews(data);
      if (response.status === 200) {
				this.alertSuccess = true
				this.loadingDraft = false
				setTimeout(() => {
					this.$router.push("/editor");
					this.alertSuccess = false
				}, 1000)
      } else {
				this.loadingDraft = false
				this.alertFailed = true
				setTimeout(() => {
					this.alertFailed = false
				}, 2500)
      }
    },
    async onSubmit() {
			 const id = this.$route.params.id;
      const data = {
        id,
        params: this.payloadNews,
        type: "submit"
			};
			this.loadingSubmit = true
      const response = await this.updateNews(data);
      if (response.status === 200) {
				this.alertSuccess = true
				this.loadingSubmit = false
				setTimeout(() => {
					this.$router.push("/editor");
					this.alertSuccess = false
				}, 1000)
      } else {
				this.loadingSubmit = false
				this.alertFailed = true
				setTimeout(() => {
					this.alertFailed = false
				}, 2500)
      }
		}
  }
};
</script>
