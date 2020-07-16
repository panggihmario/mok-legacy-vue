<template>
  <div>
    <HeaderContent :label="$t('title.channelEdit')" :list="items" />
    <div class="mt-4" />
    <FormChannel
      :channel="channel"
      @onSubmit="onSubmit"
      :labelButton="$t('button.channelEdit')"
      :loading="loading"
    />
    <v-snackbar top right v-model="alertSuccess" color="success">
      Post Success
    </v-snackbar>
    <v-snackbar top right v-model="alertError" color="error">
      Post Failed
    </v-snackbar>
  </div>
</template>

<script>
import HeaderContent from "../../../containers/HeaderContent";
import FormChannel from "../../../containers/Form/formChannel";
import { mapActions } from "vuex";
export default {
  components: {
    HeaderContent,
    FormChannel
  },
  data() {
    return {
      channel: {},
			loading: false,
			alertSuccess : false,
			alertError : false,
      items: [
        {
          text: "Manage Channel",
          disabled: false,
          href: "/channel"
        },
        {
          text: "Edit Channel",
          disabled: true
        }
      ]
    };
  },
  methods: {
    ...mapActions({
      editChannel: "channel/editChannel",
      getChannelById: "channel/getChannelById"
    }),
    async onSubmit(payload) {
      this.loading = true;
      const response = await this.editChannel(payload);
      if (response.status === 200) {
				this.alertSuccess = true
				setTimeout(() => {
					this.$router.push("/");
					this.alertSuccess = false
				},500)
        this.loading = false;
      } else {
				this.loading = false;
				this.alertError = true
				setTimeout(() => {
					this.$router.push("/");
					this.alertError = false
				},500)
      }
    },
    getResponse(payload) {
      this.status = payload.status;
      this.channel.photo = payload.response.url;
    },
    async getChannel() {
      const id = this.$route.params.id;
      const response = await this.getChannelById(id);
      if (response.status === 200) {
        const data = response.data.data;
        const payload = {
          name: data.name,
          id: data.id,
          description: data.description,
          photo: data.photo
        };
        this.channel = payload;
      } else {
        return response;
      }
    }
  },
  mounted() {
    this.getChannel();
  }
};
</script>
