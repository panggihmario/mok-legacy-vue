<template>
  <div>
    <HeaderContent
      :list="items"
      label="Create Management Account"
      @click="handleClick"
    />
		<FormAdmin
			:data="data"
			:loading="loading"
			@handleSubmit="handleSubmit"
		/>
			<v-snackbar top right  v-model="alertError" color="error">
			{{errorMessage}}
		</v-snackbar>
  </div>
</template>

<script>
import HeaderContent from "@/containers/HeaderContent";
import FormAdmin from "@/containers/Form/formAdmin"
import { mapActions } from "vuex";
export default {
  components: {
		HeaderContent,
		FormAdmin
  },
  data() {
    return {
			loading : false,
      items: [
        {
          text: "Manage Account",
          disabled: false,
          href: "/admin"
        },
        {
          text: "List Management",
          disabled: false,
          href: "/admin"
        },
        {
					text: "Create Management",
					disabled : true
        }
      ],
      status: "",
      data: {
        username: "",
        name: "",
        photo: "",
        birthDate: "2020-04-22T14:39:59.608Z",
        gender: "",
        mobile: "",
        email: "",
        accountType: "",
        note: "",
        password: "",
        role: "",
        mobile: ""
			},
			alertError : false,
			errorMessage : ''
    };
  },
  methods: {
    ...mapActions({
      createAdmin: "account/createAdmin"
    }),
    handleClick() {
      console.log("saved");
    },
    getResponse(payload) {
      this.status = payload.status;
      this.data.photo = payload.response.url;
    },
    async handleSubmit(params) {
      const payload = {
				...params,
				role : this.data.accountType
			};
			this.loading = true
      const response = await this.createAdmin(payload);
      if (response.status === 201) {
				this.$router.push("/admin");
				this.loading = false
      } else {
				this.loading = false
				this.alertError = true
				if(response.response) {
					this.errorMessage = response.response.data.data
				}else{
					this.errorMessage = 'Failed Create Account'
				}
				setTimeout(() => {
					this.alertError = false
				}, 3000)
      }
    }
  }
};
</script>

