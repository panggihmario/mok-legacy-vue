<template>
  <div>
    <HeaderContent label="Buat Channel" :list="items" />
    <div class="mt-4" />
    <FormChannel 
			:channel="channel" 
			@onSubmit="onSubmit" 
			labelButton="Add Channel"
		/>
  </div>
</template>

<script>
import FormChannel from "../../../containers/Form/formChannel";
import HeaderContent from "../../../containers/HeaderContent";
import { mapActions } from "vuex";
export default {
  components: {
    HeaderContent,
    FormChannel
  },
  data() {
    return {
      channel: {
        name: "",
        description: "",
        photo: ""
      },
      image: "",
      status: "",
      items: [
        {
          text: "Manage Channel",
          disabled: false,
          href: "/channel"
        },
        {
          text: "Buat Channel",
          disabled: true
        }
      ]
    };
  },
  methods: {
    ...mapActions({
      createChannel: "channel/createChannel"
    }),
    async onSubmit(payload) {
      const response = await this.createChannel(this.channel);
      if (response.status === 200) {
        this.$router.push("/channel");
      } else {
        return response;
      }
    },
    getResponse(payload) {
      this.status = payload.status;
      this.channel.photo = payload.response.url;
    }
  }
};
</script>
