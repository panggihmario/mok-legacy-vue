<template>
  <custom-form :onSubmit="handleSubmit">
    <div class="d-flex align-center">
      <div class="form__image-box mr-6">
        <v-img
          v-if="channel.photo"
          :src="channel.photo"
          class="form__image"
          :lazy-src="channel.photo"
        />
        <div
          v-else
          class="form__image-no"
          :class="{ 'form__image-error': isNoImage }"
        />
      </div>
      <div class="mt-6">
        <custom-upload id="channel" @response="getResponse" />
        <span v-show="isNoImage" class="form__text-alert error--text">The Image field is required</span>
      </div>
    </div>
    <div class="form__box mt-6">
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

    <div class="sensitif__box pa-3 charcoal--text mb-6">
      <div class="d-flex justify-space-between mb-4">
        <span class="black--text">
          <b>Sensitif Channel</b>
        </span>
        <v-checkbox
          v-model="channel.isSensitive"
          hide-details
          class="pa-0 ma-0"
        ></v-checkbox>
      </div>
      <span
        >Postingan user yang menggunakan channel ini tidak akan di tampilkan di
        feed <b>Following</b></span
      >
    </div>

    <custom-button
      :loading="loading"
      color="primary"
      class="white--text"
      type="submit"
      >{{ labelButton }}</custom-button
    >
  </custom-form>
</template>

<script>
export default {
  props: {
    channel: {
      type: Object,
    },
    labelButton: {
      type: String,
    },
    loading: {
      type: Boolean,
    },
  },
  data() {
    return {
      isNoImage: false,
    };
  },
  methods: {
    handleSubmit() {
      if (this.channel.photo) {
        this.$emit("onSubmit", this.channel);
      } else {
        this.isNoImage = true;
      }
    },
    getResponse(payload) {
      this.status = payload.status;
      this.channel.photo = payload.response.url;
      if (payload.response.url) {
        this.isNoImage = false;
      }
    },
  },
};
</script>

<style lang="sass" scoped>
.form
	&__image-box
		width: 213px
		height: 145px
	&__image
		width: 100%
		height: 100%
		border-radius: 5px
	&__image-no
		width: 100%
		height: 100%
		background-color: #EEEEEE
		border-radius: 5px
	&__image-error
		width: 100%
		height: 100%
		background-color: #EEEEEE
		border: 1px dashed #A8071A
		border-radius: 5px
	&__box
		width: 400px
	&__text-alert
		font-size: 12px
.sensitif
	&__box
		background: rgba(168, 7, 26, .05)
		width: 400px
		border-radius: 5px
		font-size: 14px
</style>
