<template>
  <div>
    <HeaderContent label="Buat Donation" :list="crumbs" />
		<FormDonation
			:donation="donation"
			:listVerifier="listVerifier"
			:items="items"
			:verifier="verifier"
			:organizers="organizers"
			:donationPhoto="donationPhoto"
			:loading="loading"
			@getParamOrganizer="getParamOrganizer"
			@getParamsVerifier="getParamsVerifier"
			@handleSubmit="handleSubmit"
			@getDonationPhoto="getDonationPhoto"
		/>
    <v-snackbar v-model="alertSuccess" right top color="success">
      Create Donation Success
    </v-snackbar>
    <v-snackbar v-model="alertFailed" right top color="error">
      Create Donation Failed
    </v-snackbar>
  </div>
</template>

<script>
import moment from "moment";
import HeaderContent from "../../../containers/HeaderContent";
import FormDonation from '../../../containers/Form/formDonation';
import { mapActions } from "vuex";
export default {
  components: {
		HeaderContent,
		FormDonation
  },
  data() {
    return {
      dialog: false,
      loading: false,
      alertSuccess: false,
      alertFailed: false,
      value: "",
      organizers: "",
      verifier: "",
      listVerifier: [],
      expire: "",
      items: [],
      crumbs: [
        {
          text: "List Channel",
          href: "/channel",
          disabled: false
        },
        {
          text: "List Donasi",
          href: "/donation",
          disabled: false
        },

        {
          text: "Buat Donasi",
          disabled: true
        }
      ],
      donationPhoto: "",
      donation: {
        title: "",
        description: "",
        targetAmount: "",
        organizer: {
          id: ""
        },
        verifier: {
          id: ""
        },
        recipientName: "",
        media: [],
        expiredAt: ""
      }
    };
  },
  methods: {
    ...mapActions({
      getListOrganizer: "donation/getListOrganizer",
      getListVerifier: "donation/getListVerifier",
      createDonation: "donation/createDonation"
		}),
		getParamOrganizer(payload) {
			this.organizers = payload
		},
		getParamsVerifier(payload) {
			this.verifier = payload
		},
		getDonationPhoto(payload) {
			this.donationPhoto = payload.thumbnail
			this.donation.media.splice(0,1,  payload)
		},
    async handleSubmit(payload) {
			const x = moment(payload.expiredAt, 'YYYY-MM-DD').unix();
			const mili = x * 1000
			const newPayload = {
				...payload,
				expiredAt : mili
			}
      this.loading = true;
      const response = await this.createDonation(newPayload);
      if (response.status === 201) {
        this.loading = false;
        this.alertSuccess = true;
        setTimeout(() => {
          this.alertSuccess = false;
          this.$router.push("/donation");
        }, 1000);
      } else {
        this.loading = false;
        this.alertFailed = true;
        setTimeout(() => {
          this.alertFailed = false;
        }, 2500);
      }
    },
    previewResult() {
      this.dialog = true;
    },
    async handleResponseOrganizer(value) {
      const response = await this.getListOrganizer(value);
      if (response.status === 200) {
        const result = response.data.data.content;
        this.items = result;
      } else {
        console.log({ error: response.response });
      }
    },
    async handleResponseVerifier(value) {
      const response = await this.getListVerifier(value);
      if (response.status === 200) {
        const result = response.data.data.content;
        this.listVerifier = result;
      } else {
        console.log({ error: response.response });
      }
    }
  },
  watch: {
    organizers(value) {
      this.handleResponseOrganizer(value);
    },
    verifier(value) {
      this.handleResponseVerifier(value);
    }
  }
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
		height: 40px
		display: flex
		justify-content: center
		align-items: center
</style>
