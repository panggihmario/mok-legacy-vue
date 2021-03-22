<template>
  <div>
    <HeaderContent :list="crumbs" label="News">
      <div>
        <custom-button
          @click="onPublish"
          color="primary"
          :loading="loadingPublish"
        >
          Publish
        </custom-button>
      </div>
    </HeaderContent>
    <FormNews
      :payloadNews="payloadNews"
      :propsImage="propsImage"
      :categoryNews="categoryNews"
      :propsThumbnail="propsThumbnail"
      @getImageUpload="getImageUpload"
      @getThumbnail="getThumbnail"
    />
    <v-snackbar top v-model="alertSuccess" color="success">
      {{ successMessage }}
    </v-snackbar>
    <v-snackbar top v-model="alertFailed" color="error">
      {{ failedMessage }}
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
      loading: false,
      loadingPublish: false,
      alertSuccess: false,
      alertFailed: false,
      successMessage: "",
      failedMessage: "",
      payloadNews: {
        headline: "",
        title: "",
        content: "",
        linkReference: "",
        media: [],
        newsCategory: {},
        thumbnailUrl: "",
        metaKeyword: "",
        newsTagString: "",
      },
      propsImage: "",
      propsThumbnail: "",
      categoryNews: [],
      imageNews: "",
      headline: "",
      content: "",
      crumbs: [
        {
          text: "News",
          disabled: false,
          href: "/publisher",
          exact: true,
        },
        {
          text: "Edit News",
          disabled: true,
        },
      ],
    };
  },
  components: {
    FormNews,
    HeaderContent,
  },
  methods: {
    ...mapActions({
      getNewsById: "news/getNewsById",
      publishNews: "news/publishNews",
      rejectNews: "news/rejectNews",
      getCategoryNews: "news/getCategoryNews",
    }),
    getThumbnail(params) {
      this.payloadNews.thumbnailUrl = params.url;
    },
    getImageUpload(payload) {
      if (this.payloadNews.medias.length > 0) {
        const temp = this.payloadNews.medias.map((media) => {
          return {
            ...media,
            metadata: payload.metadata,
            thumbnail: payload.thumbnail,
            type: payload.type,
            url: payload.url,
          };
        });
        this.payloadNews.medias.splice(0, 1, temp[0]);
        this.$nextTick(() => {
          console.log(this.payloadNews.medias);
        });
      } else {
        this.payloadNews.medias.push(payload);
      }
    },
    async handleCategoryNews() {
      const response = await this.getCategoryNews();
      if (response.status === 200) {
        const responseData = response.data.data;
        const formatData = responseData.map((r) => {
          return {
            name: r.name,
            id: r.id,
          };
        });
        this.categoryNews = formatData;
      }
    },
    async handleResponse() {
      const id = this.$route.params.id;
      const response = await this.getNewsById(id);
      if (response.status === 200) {
        const responseData = response.data.data;
        this.propsImage =
          responseData.medias.length > 0
            ? responseData.medias[0].thumbnail.medium
            : "";
        this.imageNews =
          responseData.medias.length > 0
            ? responseData.medias[0].thumbnail.medium
            : "";
        this.propsThumbnail = responseData.thumbnailUrl;
        this.headline = responseData.headline;
        this.content = responseData.content;
        this.payloadNews = responseData;
      } else {
        return;
      }
    },
    async onPublish() {
      const params = {
        id: this.$route.params.id,
        data: this.payloadNews,
      };
      this.loadingPublish = true;
      const response = await this.publishNews(params);
      console.log("======", response)
      if (response.status === 200) {
        this.loadingPublish = false;
        this.alertSuccess = true;
        this.successMessage = "Publish Success";
        setTimeout(() => {
          this.$router.push("/publisher");
          this.alertSuccess = false;
        }, 1500);
      } else {
        this.loadingPublish = false;
        this.alertFailed = true;
        this.failedMessage = "Publish Failed";
        setTimeout(() => {
          this.alertFailed = false;
        }, 3000);
      }
    },
    // async onReject() {
    //   const params = {
    //     id: this.$route.params.id,
    //     data: this.payloadNews
    //   };
    // 	const response = await this.rejectNews(params);
    // 	this.loading = true
    //   if (response.status === 200) {
    // 		this.loading = false
    // 			this.alertSuccess = true
    // 			this.successMessage = 'Reject Success'
    // 		setTimeout(() => {
    // 			this.$router.push("/publisher");
    // 			this.alertSuccess = false
    // 		},1500)
    //   } else {
    // 		this.loading = false
    //   }
    // }
  },
  mounted() {
    this.handleResponse();
    this.handleCategoryNews();
  },
};
</script>

<style lang="sass" scoped>
.review
	&__image
		width: 205px
	&__content
		margin-top: 32px
		width: 510px
		&__header
			font-size: 24px
			font-weight: bold
			line-height: 35px
		&__description
			font-size: 14px
			line-height: 20px
			letter-spacing: 0.01em
</style>
