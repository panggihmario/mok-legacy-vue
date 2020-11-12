<template>
  <custom-form :onSubmit="handleSubmit">
    <v-row>
      <v-col cols="4">
        <custom-input
          label="Judul Donasi"
          placeholder="Masukkan nama judul donasi"
          rules="required"
          v-model="donation.title"
          :value="donation.title"
          name="Donation Label"
        />
        <custom-textarea
          label="Deskripsi Donasi"
          placeholder="Masukkan deskripsi donasi"
          rules="required"
          name="Decription"
          v-model="donation.description"
          :value="donation.description"
        />
        <div class="form__upload d-flex justify-center align-center">
          <v-img
            :src="donationPhoto"
            v-show="donationPhoto"
            @click="reUpload"
            max-height="100%"
            max-width="100%"
          />
          <custom-upload
            id="donation-image"
            @response="getDonationImage"
            :class="donationPhoto && 'form__button-upload'"
          />
        </div>
      </v-col>
      <v-col cols="4">
        <custom-autocomplete
          v-model="donation.organizer.id"
          :search-input.sync="responseOrganizer"
          :items="items"
          item-text="name"
          item-value="id"
          placeholder="Masukkan Nama penyelenggara"
          label="Nama penyelenggara"
        />
        <custom-input
          label="Target Donasi"
          rules="required"
          v-model="donation.targetAmount"
          name="Donation Target"
          :value="donation.targetAmount"
          type="number"
        />
        <date-picker
          label="Berakhir pada"
          v-model="donation.expiredAt"
          :value="donation.expiredAt"
          rules="required"
          name="Date"
        />
        <custom-autocomplete
          v-model="donation.verifier.id"
          :search-input.sync="responseVerifier"
          :items="listVerifier"
          item-text="name"
          item-value="id"
          :value="donation.verifier.id"
          placeholder="Diverifikasi oleh"
          label="Diverifikasi oleh"
        />
        <custom-input
          label="Nama Wali/Penerima Uang"
          placeholder="Masukkan nama wali"
          rules="required"
          v-model="donation.recipientName"
          :value="donation.recipientName"
          name="Receiver Name"
        />
        <custom-button
          class="mr-6 grey--text"
          @click="previewResult"
					color="whitesnow"
        >
          Preview
        </custom-button>
        <custom-button
          color="primary"
          type="submit"
          class="white--text"
          :loading="loading"
          >{{labelButton}}</custom-button
        >
      </v-col>
    </v-row>
    <v-dialog max-width="360px" v-model="dialog">
      <v-card>
        <div class="card__header">
          <div class="charcoal--text">Ikut Berdonasi</div>
        </div>
        <div class="d-flex flex-column justify-center card__image-container ">
          <img width="100%" :src="donationPhoto" />
        </div>
        <div class="card__box-container ">
          <div class="card__box d-flex flex-column justify-space-between">
            <div class="card__box__title charcoal--text">
              {{ donation.title }}
            </div>
            <div class="d-flex">
              <div class="card__box__left">
                <div class="grey--text card__box__left-title">
                  Dana Terkumpul
                </div>
                <div class="carmine--text">
                  Rp 50.000
                </div>
                <v-progress-linear
                  color="carmine"
                  value="15"
                ></v-progress-linear>
              </div>
              <div class="card__box__right">
                <div class="card__box__right-title white--text">
                  Berakhir Dalam
                </div>
                <div class="white--text">63 hari</div>
              </div>
              <div></div>
            </div>
          </div>
        </div>
        <br />
        <v-card-text>
          <div class="card__donation-target">Target Donasi</div>
          <div class="charcoal--text">
            Rp {{ donation.targetAmount.toLocaleString("id") }}
          </div>
          <br />
          <div class="card__content-title">Diverifikasi oleh</div>
          <div class="charcoal--text">{{ verifier }}</div>
          <br />
          <div class="card__content-title">Wali Penerima</div>
          <div class="charocoal--text">{{ donation.recipientName }}</div>
          <br />
          <div>{{ donation.description }}</div>
        </v-card-text>
      </v-card>
    </v-dialog>
  </custom-form>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
    };
  },
  props: {
    donation: {
      type: Object,
    },
    listVerifier: {
      type: Array,
    },
    items: {
      type: Array,
    },
    organizers: {
      type: String,
    },
    verifier: {
      type: String,
    },
    donationPhoto: {
      type: String,
    },
    loading: {
      type: Boolean
		},
		labelButton : {
			type : String
		}
  },
  computed: {
    responseOrganizer: {
      get() {
        return this.organizers;
      },
      set(value) {
        this.$emit("getParamOrganizer", value);
      },
    },
    responseVerifier: {
      get() {
        return this.verifier;
      },
      set(value) {
        this.$emit("getParamsVerifier", value);
      },
    },
  },
  methods: {
    previewResult() {
      this.dialog = true;
    },
    handleSubmit() {
      this.$emit("handleSubmit", this.donation);
    },
    getDonationImage(payload) {
      if (payload.status === "success") {
				// console.log(payload)
        // const urlProfile = payload.response.url;
        const urlData = payload.response;
        this.$emit("getDonationPhoto", urlData);
        // this.donation.media.push(payload.response);
        // console.log(payload.response)
        // this.donation.media.splice(0,1,  payload.response)
      }
    },
    reUpload() {
      document.getElementById("donation-image").click();
    },
  },
};
</script>

<style lang="sass" scoped>
.form
	&__upload
		width: 100%
		height: 145px
		border-radius: 5px
		border: 1px dashed #BBBBBB
	&__button-upload
		position: absolute
		visibility: hidden
.card
	&__header
		height: 56px
		display: flex
		justify-content: center
		align-items: center
	&__image-container
		height: 230px
		overflow: hidden
	&__box
		width: 340px
		height: 174px
		background: #FFFFFF
		box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1)
		border-radius: 16px
		&__title
			padding: 16px 12px 0 12px
			font-size: 20px
			font-weight: bold
		&__left
			padding: 0 10px 10px 16px
			width: 100%
		&__left-title
			font-size: 10px
		&__right
			background-color: #BC1C22
			width: 150px
			border-radius: 16px 0
			padding: 10px
		&__right-title
			font-size: 12px
	&__box-container
		width: 100%
		display: flex
		justify-content: center
		margin-top: -30px
		z-index: 1000
	&__donation-target
		font-size: 12px
		font-weight: 500
	&__content-title
		font-size: 12px
		font-weight: 500
		color: #40BFC1
</style>
