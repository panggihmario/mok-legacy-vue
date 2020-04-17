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
          />
          <div v-else class="form__image-no" />
        </div>
        <custom-upload id="feedPost" @response="getResponse" />
      </div>
      <br />
      <custom-textarea
        label="Description"
        v-model="payload.description"
        :value="payload.description"
      />
      <custom-select
        :items="items"
        item-text="name"
        item-value="id"
        v-model="payload.channelId"
        label="Channel"
      />
      <custom-button type="submit" color="primary">Submit</custom-button>
    </custom-form>
		 <v-snackbar
      v-model="snackbar"
			top
    >
			Success Post
      <v-btn
        color="pink"
        text
        @click="snackbar = false"
      >
        Close
      </v-btn>
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
      payload: {
        description: "",
        channelId: "",
        media: []
      },
      image: "",
      snackbar: false
    };
  },
  methods: {
    ...mapActions({
      getChannel: "channel/getListChannel",
      postFeed: "post/postFeed"
    }),
    getResponse(payload) {
      if (payload.status === "success") {
        this.image = payload.response.url;
        this.payload.media.push(payload.response);
      }
    },
    async handleSubmit() {
      const params = {
        typePost: "seleb",
        post: this.payload
      };
      const response = await this.postFeed(params);
      if (response.status === 200) {
        console.log("success post");
        this.payload = {
          description: "",
          channelId: "",
          media: []
				};
				this.image = ""
				this.snackbar = true
      } else {
        console.log(response);
      }
    },
    async getResponseChannel() {
      const response = await this.getChannel();
      if (response.status === 200) {
        const responseData = response.data.data.content;
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
