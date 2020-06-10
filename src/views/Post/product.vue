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
				rules="required|min_value:1"
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
        label="Variant"
        v-model="params.color"
        :value="params.color"
				name="Variant"
				placeholder="Jika ada beberapa, pisahkan dengan koma"
      />
      <custom-input 
				label="Size"
				name="Size"
				v-model="params.size" 
				placeholder="Jika ada beberapa, pisahkan dengan koma"
				:value="params.size" />
			<custom-input
				label="Weight"
				name="weight"
				rules="required"
				suffix="gram"
				v-model="params.measurement.weight"
				:value="params.measurement.weight"
			/>
			<custom-input
				label="Length"
				name="length"
				rules="required"
				suffix="cm"
				v-model="params.measurement.length"
				:value="params.measurement.length"
			/>
			<custom-input
				label="Height"
				name="height"
				rules="required"
				suffix="cm"
				v-model="params.measurement.height"
				:value="params.measurement.height"
			/>
			<custom-input
				label="Width"
				name="width"
				rules="required"
				suffix="cm"
				v-model="params.measurement.width"
				:value="params.measurement.width"
			/>
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
      <custom-button :loading="loading" type="submit" color="primary">Submit</custom-button>
      <v-snackbar v-model="snackbar" top right color="success" >
        Success Post
      </v-snackbar>
			<v-snackbar v-model="snackbarFailed" top right color="error" >
        Failed Post
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
			this.loading = true
			const response = await this.postProduct(payload);
      if (response.status === 201) {
				this.snackbar = true;
				this.loading = false
				setTimeout(() => {
					this.$router.push('/post')
					this.snackbar = false
				},1000)
      } else {
				this.loading = false
				this.snackbarFailed = true
				setTimeout(() => {
					this.snackbarFailed = false
				}, 2500)
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
			loading : false,
			snackbarFailed : false,
      params: {
        name: "",
        price: 0,
        description: "",
        color: "",
        size: "",
				media: [],
				measurement : {
					weight : "",
					length : "", 
					height : "",
					width : ""
				}
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
