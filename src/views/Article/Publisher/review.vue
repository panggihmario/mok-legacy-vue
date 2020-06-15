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
        <custom-button @click="onPublish" color="primary"
          >Publish</custom-button
        >
      </div>
    </HeaderContent>
    <FormNews :payloadNews="payloadNews" :propsImage="propsImage" />
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
      const response = await this.publishNews(params);
      if (response.status === 200) {
        this.$router.push("/publisher");
      } else {
        console.log("publish", response);
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
				this.$router.push("/publisher");
				this.loading = false
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
