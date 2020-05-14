<template>
  <div :style="{ width: '300px' }">
    <HeaderContent label="Post Feed" />
    <custom-form :onSubmit="handleSubmit">
      <div class="d-flex align-center">
        <div class="form__image-box mr-6">
          <v-img
            v-if="image"
            :src="image"
            class="form__image"
            :lazy-src="image"
						max-width="100%"
						max-height="100%"
          />
          <div v-else class="form__image-no" />
        </div>
        <custom-upload id="feedPost" class="mr-6" @response="getResponse" />
        <video
          width="200"
          height="200"
          v-if="video"
          :src="video"
          controls
          autoplay
        />
      </div>

      <br />
      <custom-textarea
        label="Description"
        v-model="payload.description"
        :value="payload.description"
				rules="required"
				name="Description"
      />
      <custom-select
        :items="items"
        item-text="name"
        item-value="id"
        v-model="payload.channelId"
        label="Channel"
      />
      <custom-button  :loading="loading" type="submit" color="primary">Submit</custom-button>
    </custom-form>
    <v-snackbar v-model="alertSucces" top right color="success">
      Success Post
    </v-snackbar>
		<v-snackbar v-model="alertFailed" top right color="error">
      Failed Post
    </v-snackbar>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import HeaderContent from "../../containers/HeaderContent";
export default {
  components: {
    HeaderContent
  },
  data() {
    return {
      items: [],
			channel: {},
			loading : false,
			alertSucces : false,
			alertFailed : false,
      payload: {
        description: "",
        channelId: "",
        media: []
      },
      image: "",
      video: "",
			snackbar: false,
			status : ''
    };
  },
  methods: {
    ...mapActions({
      getChannel: "channel/getListChannel",
			postFeed: "post/postFeed",
			getAllChannel : "channel/getAllChannel"
    }),
    getResponse(payload) {
			this.status = payload.status
      if (payload.status === "success") {
				this.status = payload.status
        if (payload.response.type === "image") {
          this.image = payload.response.url;
          this.payload.media.push(payload.response);
        } else {
					this.video = payload.response.url;
					this.payload.media.push(payload.response)
        }
      }
    },
    async handleSubmit() {
      const params = {
        typePost: "seleb",
        post: this.payload
      };
			this.loading = true
			const response = await this.postFeed(params);
      if (response.status === 200) {
				this.image = "";
				this.video = ""
				this.alertSucces = true;
				this.loading = false
				setTimeout(() => {
					this.$router.push('/post')
					this.alertSucces = false
				}, 500)
      } else {
				this.loading = false
				this.alertFailed = true
				setTimeout(() => {
					this.alertFailed = false
				},2000)
      }
    },
    async getResponseChannel() {
			const response = await this.getAllChannel();
			console.log(response)
      if (response.status === 200) {
        const responseData = response.data.data;
        const formatResponse = responseData.map(d => {
          return {
            name: d.name,
            id: d.id
          };
        });
        this.items = formatResponse;
        console.log(responseData);
      } else {
        return response;
      }
    }
  },
  mounted() {
    this.getResponseChannel();
  }
};
</script>

<style lang="sass" scoped>
.form
	&__image-box
		width: 213px
		height: 145px
		border-radius: 5px
	&__image
		width: 100%
		height: 100%
		overflow: hidden
	&__image-no
		width: 100%
		height: 100%
		background-color: #EEEEEE
		border-radius: 5px
	&__box
		width: 400px
</style>
