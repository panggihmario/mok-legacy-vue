<template>
  <div>
    <HeaderContent :list="crumbs" label="News">
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
    <FormNews 
			:payloadNews="payloadNews" 
			:propsImage="propsImage"
			:propsThumbnail="propsThumbnail"
			@getImageUpload="getImageUpload"
			@getThumbnail="getThumbnail"
			:categoryNews="categoryNews"
			:schedule="true"
			@getEpochDate="getEpochDate"
		/>
		
		<!-- <div class="review__image">
			<v-img
				:src="imageNews"
				:lazy-src="imageNews"
			/>
		</div>
		<div class="review__content">
			<p class="review__content__header black--text">
				{{headline}}
			</p>
			<div  v-html="content" class="review__content__description black--text">
			</div>
		</div> -->
		<v-snackbar top v-model="alertSuccess" color="success">
			{{successMessage}}
    </v-snackbar>
    <v-snackbar top v-model="alertFailed" color="error">
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
			categoryNews : [],
			failedMessage : "",
      payloadNews: {
        headline: "",
        title: "",
        content: "",
        linkReference: "",
        media: []
      },
			propsImage: "",
			propsThumbnail : '',
			imageNews : '',
			headline : '',
			content : '',
			crumbs : [
				{
					text : 'News',
					disabled : false,
					href : '/publisher',
					exact : true
				},
				{
					text : 'Review News',
					disabled : true
				}
			]
    };
  },
  components: {
    FormNews,
    HeaderContent
  },
  methods: {
		getThumbnail(params) {
			this.payloadNews.thumbnailUrl = params.url
		},
		getEpochDate(e) {
			this.payloadNews.scheduledTime = e
			this.$nextTick(() => {
				console.log(this.payloadNews)

			})
		},
		getImageUpload(payload){
			const temp = this.payloadNews.medias.map(media => {
				return {
					...media,
					metadata : payload.metadata,
					thumbnail : payload.thumbnail,
					type : payload.type,
					url : payload.url
				}
			})
			this.payloadNews.medias.splice(0, 1, temp[0]);
		},
    ...mapActions({
      getNewsById: "news/getNewsById",
      publishNews: "news/publishNews",
			rejectNews: "news/rejectNews",
			getCategoryNews : 'news/getCategoryNews',
			scheduleNews : 'news/scheduleNews'
		}),
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
    async handleResponse() {
      const id = this.$route.params.id;
      const response = await this.getNewsById(id);
      if (response.status === 200) {
				const responseData = response.data.data;
				console.log("response",responseData)
				if(responseData.medias.length > 0){
					this.imageNews = responseData.medias && responseData.medias[0].url
				}
				this.headline = responseData.headline
				this.propsImage = responseData.medias.length > 0 ? responseData.medias[0].thumbnail.medium : ''
				this.content = responseData.content
				this.payloadNews = responseData;
				this.propsThumbnail = responseData.thumbnailUrl
      } else {
				return
      }
		},
		async publishWithSchedule(params) {
			const response = await this.scheduleNews(params);
      this.handleResponsePublish(response)
		},
		async publishWithoutSchedule(params) {
			const response = await this.publishNews(params);
      this.handleResponsePublish(response)
		},
		handleResponsePublish(response) {
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
    onPublish() {
      const params = {
        id: this.$route.params.id,
        data: this.payloadNews
			};
			const isSchedule = this.payloadNews.isScheduled
			this.loadingPublish = true
			if(isSchedule) {

				this.publishWithSchedule(params)
			}else{
				console.log("masuk else")
				this.publishWithoutSchedule(params)
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
				this.loading = false
      }
    }
  },
  mounted() {
		this.handleResponse();
		this.handleCategoryNews()
		//  document.querySelectorAll( 'oembed[url]' ).forEach( element => {
		// 		console.log(element)
    //     const anchor = document.createElement( 'a' );

    //     anchor.setAttribute( 'href', element.getAttribute( 'url' ) );
    //     anchor.className = 'embedly-card';

    //     element.appendChild( anchor );
    // } );
  }
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