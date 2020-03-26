<template>
  <div>
    <HeaderContent label="Buat Channel" :list="items" />
		<div class="mt-4"/>
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
        <custom-upload id="channel" @response="getResponse" />
        {{ status }}
      </div>
      <div :style="{width : '400px'}" >
        <custom-input label="Nama Channel" />
        <custom-textarea label="Deskripsi Channel" />
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
export default {
  components: {
    HeaderContent
  },
  data() {
    return {
      image: "",
      status: "",
      items: [
        {
          text: "Manage Channel",
          disabled: false,
          href: "channel"
        },
        {
          text: "Buat Channel",
          disabled: true
        }
      ]
    };
  },
  methods: {
    getResponse(payload) {
      console.log({ payload });
      this.status = payload.status;
      this.image = payload.response.url;
    },
    handleSubmit() {
			this.$router.push('/channel')
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
</style>
