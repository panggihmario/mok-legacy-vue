<template>
  <div>
    <HeaderContent :list="items" :label="$t('title.userCreate')" />
		<FormNews
			:data="data"
			:loading="loading"
			@onSubmit="onSubmit"
			type="create"
		/>
    <v-snackbar top right v-model="alertError" color="error">
      {{ errorMessage }}
    </v-snackbar>
		<v-snackbar top right v-model="alertSuccess" color="success">
			Create Success
    </v-snackbar>
  </div>
</template>

<script>
import HeaderContent from "@/containers/HeaderContent";
import FormNews from '@/containers/Form/formUser'
import { mapActions } from "vuex";
export default {
  components: {
    HeaderContent,FormNews
  },
  data() {
    return {
			alertError : false,
			alertSuccess : false,
			errorMessage : '',
			loading : false,
      genderType: ["MALE", "FEMALE"],
      items: [
        {
          text: "Manage Account",
          disabled: false,
          href: "/admin"
        },
        {
          text: "List User",
          disabled: false,
          href: "/admin"
        },
        {
          text: "Create User"
        }
      ],
      status: "",
      data: {
        name: "",
        username: "",
        photo: "",
        gender: "",
        password: "",
        address: "di ujung langit",
        email: "",
        mobile: "",
        isVerified: false,
        accountType: "SELEB",
        role: "SELEB"
      }
    };
  },
  methods: {
    ...mapActions({
      createUser: "account/createUser"
    }),
    async onSubmit(payload) {
			this.loading = true
      const response = await this.createUser(payload);
      if (response.status === 201) {
				this.loading = false
				this.alertSuccess = true
				setTimeout(() => {
					this.$router.push({
            name : 'User',
            params  : {
              page : 1
            },
            query : {
              search : ""
            }
          });
				},1000)
      } else {
				this.loading = false
				this.alertError = true
				if(response.response) {
					this.errorMessage = response.response.data.data
				}else{
					this.errorMessage = 'Failed Create Account'
				}
      }
    }
  }
};
</script>


