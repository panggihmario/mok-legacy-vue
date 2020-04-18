<template>
  <div :style="{ width: '350px' }">
    <HeaderContent label="Post Product" />
    <custom-form :onSubmit="handleSubmit">
      <custom-input 
				label="Name" 
				name="Name"
				rules="required"
				v-model="params.name" 
				:value="params.name" />
      <custom-input
        label="Price"
        v-model="params.price"
        :value="params.price"
        type="number"
				rules="required"
				name="Price"
      />
      <custom-input
        label="Description"
        v-model="params.description"
        :value="params.description"
				name="Description"
				rules="required"
      />
      <custom-input
        label="Color"
        v-model="params.color"
        :value="params.color"
				rules="required"
				name="Color"
      />
      <custom-input 
				label="Size"
				name="Size"
				rules="required" 
				v-model="params.size" 
				:value="params.size" />
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
        <custom-upload id="feedPost" class="mr-6" @response="getResponse" />
        {{ status }}
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
      <custom-button type="submit" color="primary">Submit</custom-button>
      <v-snackbar v-model="snackbar" top>
        Success Post
        <v-btn color="pink" text @click="snackbar = false">
          Close
        </v-btn>
      </v-snackbar>
    </custom-form>
  </div>
</template>

<script>
import HeaderContent from "../../containers/HeaderContent";
import { mapActions } from "vuex";
export default {
  components: {
    HeaderContent
  },
  methods: {
    ...mapActions({
      postProduct: "post/postProduct"
    }),
    async handleSubmit() {
      const payload = {
        typePost: "product",
        postProduct: this.params
      };
      const response = await this.postProduct(payload);
      if (response.status === 200) {
        this.params = {
          name: "",
          price: 0,
          description: "",
          color: "",
          size: "",
          media: []
        };
        this.image = "";
        this.video = "";
        this.snackbar = true;
				console.log("success post");
				this.$router.push('/post')
      } else {
        console.log(response);
      }
    },
    getResponse(payload) {
      this.status = payload.status;
      if (payload.status === "success") {
        this.status = payload.status;
        if (payload.response.type === "image") {
          this.image = payload.response.url;
          this.params.media.push(payload.response);
        } else {
          this.video = payload.response.url;
          this.params.media.push(payload.response);
        }
      }
    }
  },
  data() {
    return {
      snackbar: false,
      params: {
        name: "",
        price: 0,
        description: "",
        color: "",
        size: "",
        media: []
      },
      image: "",
      video: "",
      status: ""
    };
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
