<template>
  <div>
    <HeaderContent :label="$t('title.donationEdit')" :list="crumbs" />
    <FormDonation
      :donation="donation"
      :listVerifier="listVerifier"
      :items="items"
      :verifier="verifier"
      :organizers="organizers"
      :donationPhoto="donationPhoto"
      :loading="loading"
			:labelButton="$t('button.donationEdit')"
      @getParamOrganizer="getParamOrganizer"
      @getParamsVerifier="getParamsVerifier"
      @handleSubmit="handleSubmit"
      @getDonationPhoto="getDonationPhoto"
    />
    <v-snackbar v-model="alertSuccess" right top color="success">
      Edit Donation Success
    </v-snackbar>
    <v-snackbar v-model="alertFailed" right top color="error">
      Edit Donation Failed
    </v-snackbar>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import moment from "moment";
import HeaderContent from "@/containers/HeaderContent";
import FormDonation from "@/containers/Form/formDonation";
export default {
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
          text: "Ubah Detail Donasi",
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
  components: {
    HeaderContent,
    FormDonation
  },
  methods: {
    ...mapActions({
      getDonationById: "donation/getDonationById",
      editDonation: "donation/editDonation"
    }),
    async handleSubmit(value) {
			const x = moment(value.expiredAt, "YYYY-MM-DD").unix();
			const mili = x * 1000
      const params = {
        ...value,
        expiredAt: mili
      };
      const payload = {
        id: this.$route.params.id,
        params
			};
      this.loading = true;
      const response = await this.editDonation(payload);
      if (response.status === 200) {
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
    async handleResponseDonation() {
      const id = this.$route.params.id;
      const response = await this.getDonationById(id);
      if (response.status === 200) {
				const data = response.data.data;
				const z = data.expiredAt/1000
        const x = moment.unix(z).format("YYYY-MM-DD");
        this.donation.title = data.title;
				this.donation.description = data.description;
				if(data.media.length > 0) {
					this.donationPhoto = data.media[0].thumbnail;
				}
        this.donation.media = data.media;
        this.donation.organizer.id = data.organizer.id;
        this.donation.verifier.id = data.verifier.id;
        this.verifier = data.verifier.name;
        this.organizers = data.organizer.name;
        this.donation.targetAmount = data.targetAmount;
        this.donation.expiredAt = x;
				this.donation.recipientName = data.recipientName;
      }
    },
    ...mapActions({
      getListOrganizer: "donation/getListOrganizer",
      getListVerifier: "donation/getListVerifier",
      createDonation: "donation/createDonation"
    }),
    getParamOrganizer(payload) {
      this.organizers = payload;
    },
    getParamsVerifier(payload) {
      this.verifier = payload;
    },
    getDonationPhoto(payload) {
			this.donationPhoto = payload.thumbnail;
			const newImage = this.donation.media.map(d => {
				return {
					id : d.id,
					...payload
				}
			})
			this.donation.media = newImage
    },
    async handleResponseOrganizer(value) {
      const response = await this.getListOrganizer(value);
      if (response.status === 200) {
        const result = response.data.data.content;
        this.items = result;
      }
    },
    async handleResponseVerifier(value) {
      const response = await this.getListVerifier(value);
      if (response.status === 200) {
        const result = response.data.data.content;
        this.listVerifier = result;
      }
    }
  },
  mounted() {
    this.handleResponseDonation();
    this.handleResponseOrganizer("");
    this.handleResponseVerifier("");
  }
  // watch: {
  //   organizers(value) {
  // 		setTimeout(() => {
  // 			this.handleResponseOrganizer(value);
  // 		},500)
  //   },
  //   verifier(value) {
  //     this.handleResponseVerifier(value);
  //   }
  // }
};
</script>
