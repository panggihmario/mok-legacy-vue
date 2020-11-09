<template>
  <div>
    <HeaderContent :label="$t('title.channelAdd')" :list="items" />
    <div class="mt-4" />
<<<<<<< HEAD
    <FormChannel
      :channel="channel"
      @onSubmit="onSubmit"
      labelButton="Add Channel"
      :loading="loading"
    />
    <v-snackbar top right v-model="alertSuccess" color="success">
      Post Success
    </v-snackbar>
    <v-snackbar top right v-model="alertError" color="error">
      Post Failed
    </v-snackbar>
=======
    <FormChannel 
			:channel="channel" 
			@onSubmit="onSubmit" 
			:labelButton="$t('button.channelAdd')"
			:loading="loading"
		/>
		<v-snackbar top right  v-model="alertSuccess" color="success">
			Post Success
		</v-snackbar>
			<v-snackbar top right  v-model="alertError" color="error">
			Post Failed
		</v-snackbar>
>>>>>>> development
  </div>
</template>

<script>
import FormChannel from "../../../containers/Form/formChannel";
import HeaderContent from "../../../containers/HeaderContent";
import { mapActions } from "vuex";

export default {
  components: {
    HeaderContent,
    FormChannel,
  },
  data() {
    return {
      loading: false,
      alertSuccess: false,
      alertError: false,
      channel: {
        name: "",
        description: "",
        photo: "",
        isSensitive: "",
      },
      image: "",
      status: "",
      items: [
        {
          text: "Manage Channel",
          disabled: false,
          href: "/",
        },
        {
          text: "Buat Channel",
          disabled: true,
        },
      ],
    };
  },
  methods: {
    ...mapActions({
      createChannel: "channel/createChannel",
    }),
    async onSubmit(payload) {
      this.loading = true;
      const response = await this.createChannel(this.channel);
      if (response.status === 201) {
        this.alertSuccess = true;
        setTimeout(() => {
          this.$router.push("/");
          this.alertSuccess = false;
        }, 500);
        this.loading = false;
      } else {
        this.loading = false;
        setTimeout(() => {
          this.alertError = false;
        }, 1000);
      }
    },
    getResponse(payload) {
      this.status = payload.status;
      this.channel.photo = payload.response.url;
    },
  },
};
</script>
