<template>
  <div>
    <HeaderContent label="Edit News">
      <div>
        <custom-button 
					@click="onReject" 
					class="carmine--text mr-4"
					:loading="loading"
        >
					Reject
				</custom-button>
        <custom-button 
					@click="onPublish" 
					color="primary"
					:loading="loadingPublish"
        >Publish</custom-button
        >
      </div>
    </HeaderContent>
    <FormNews :payloadNews="payloadNews" :propsImage="propsImage" />
		<v-snackbar top v-model="alertSuccess" color="success">
			{{successMessage}}
    </v-snackbar>
    <v-snackbar top v-model="alertFailed" color="success">
			{{failedMessage}}
    </v-snackbar>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import FormNews from "../../../containers/Form/formNews";
import HeaderContent from "../../../containers/HeaderContent";
export default {
  data() {
    return {
			loading : false,
			loadingPublish : false,
			alertSuccess : false,
			alertFailed : false,
			successMessage : "",
			failedMessage : "",
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
  components: {
    FormNews,
    HeaderContent
  },
  methods: {
    ...mapActions({
      getNewsById: "news/getNewsById",
      publishNews: "news/publishNews",
      rejectNews: "news/rejectNews"
    }),
    async handleResponse() {
      const id = this.$route.params.id;
      const response = await this.getNewsById(id);
      if (response.status === 200) {
        const responseData = response.data.data;
        this.payloadNews = responseData;
        this.propsImage = responseData.media[0].thumbnail;
      } else {
        console.log(response);
      }
    },
    async onPublish() {
      const params = {
        id: this.$route.params.id,
        data: this.payloadNews
			};
			this.loadingPublish = true
      const response = await this.publishNews(params);
      if (response.status === 200) {
				this.loadingPublish = false
				this.alertSuccess = true
				this.successMessage = 'Publish Success'
				setTimeout(() => {
					this.$router.push("/publisher");
					this.alertSuccess = false
				},1500)
      } else {
				this.loadingPublish = false
				this.alertFailed = true
				this.failedMessage = "Publish Failed"
				setTimeout(() => {
					this.alertFailed = false
				},3000)
      }
    },
    async onReject() {
      const params = {
        id: this.$route.params.id,
        data: this.payloadNews
      };
			const response = await this.rejectNews(params);
			this.loading = true
      if (response.status === 200) {
				this.loading = false
					this.alertSuccess = true
					this.successMessage = 'Reject Success'
				setTimeout(() => {
					this.$router.push("/publisher");
					this.alertSuccess = false
				},1500)
      } else {
				console.log("publish", response);
				this.loading = false
      }
    }
  },
  mounted() {
    this.handleResponse();
  }
};
</script>
