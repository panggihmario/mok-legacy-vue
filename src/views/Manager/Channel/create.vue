<template>
  <div>
    <HeaderContent 
			label="Buat Channel" 
			:list="items" 
		/>
		<div class="mt-4"/>
    <custom-form :onSubmit="handleSubmit">
      <div class="d-flex align-center">
        <div class="form__image-box mr-6">
          <v-img
            v-if="channel.photo"
            :src="channel.photo"
            class="form__image"
            :lazy-src="channel.photo"
          />
          <div v-else class="form__image-no" />
        </div>
        <custom-upload id="channel" @response="getResponse" />
      </div>
      <div class="form__box" >
        <custom-input 
					label="Nama Channel" 
					v-model="channel.name"
					:value="channel.name"
					rules="required"
					name="Name"
				/>
        <custom-textarea 
					label="Deskripsi Channel" 
					v-model="channel.description"
					:value="channel.description"
					rules="required"
					name="Description"
				/>
      </div>
			<custom-button
				color="carmine"
				class="white--text"
				type="submit"
			>Buat Channel</custom-button>
    </custom-form>
  </div>
</template>

<script>
import HeaderContent from "../../../containers/HeaderContent";
import { mapActions } from "vuex"
export default {
  components: {
    HeaderContent
  },
  data() {
    return {
			channel : {
				name : '',
				description : '',
				photo : ''
			},
      image: "",
      status: "",
      items: [
        {
          text: "Manage Channel",
          disabled: false,
					href: "/channel",
        },
        {
          text: "Buat Channel",
					disabled: true,
        }
      ]
    };
  },
  methods: {
		...mapActions({
			createChannel : 'channel/createChannel'
		}),
    getResponse(payload) {
      this.status = payload.status;
      this.channel.photo = payload.response.url;
    },
    async handleSubmit() {
			const response = await this.createChannel(this.channel)
			if(response.status === 200) {
				this.$router.push('/channel')
			}else{
				return response
			}
		}
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
