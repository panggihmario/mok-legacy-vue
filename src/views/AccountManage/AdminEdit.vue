<template>
  <div>
    <HeaderContent :list="items" label="Edit Management Account" />
    <FormAdmin :data="data" :loading="loading" @onSubmit="onSubmit" />
    <v-snackbar top right v-model="alertError" color="error">
      {{ errorMessage }}
    </v-snackbar>
  </div>
</template>

<script>
import HeaderContent from "@/containers/HeaderContent";
import { mapActions } from "vuex";
import FormAdmin from "@/containers/Form/formAdmin";
export default {
  components: {
    HeaderContent,
    FormAdmin
  },
  data() {
    return {
      loading: false,
      oldPassword: "",
			errorMessage: "",
			alertError : false,
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
          text: "Edit Management"
        }
      ],
      data: {
        username: "",
        name: "",
        photo: "",
        birthDate: "2020-04-22T14:39:59.608Z",
        gender: "",
        mobile: "",
        email: "",
        accountType: "",
        password: "",
        role: "",
        mobile: "",
        note: ""
      }
    };
  },
  methods: {
    ...mapActions({
      getAccountById: "account/getAccountById",
      updateAccount: "account/updateAccount"
    }),
    async onSubmit(params) {
      const id = this.$route.params.id;
      let data = {};
      if (params.password) {
        const newParams = {
          ...params,
          role: params.accountType
        };
        data = newParams;
      } else {
        const newParams = {
          ...params,
          password: this.oldPassword,
          role: params.accountType
        };
        data = newParams;
      }
      const payload = {
        id,
        data
			};
			console.log(payload)
      this.loading = true;
      const response = await this.updateAccount(payload);
      if (response.status === 200) {
        this.$router.push("/admin");
        this.loading = false;
      } else {
        this.loading = false;
        this.alertError = true;
        if (response.response) {
          this.errorMessage = response.response.data.data;
        } else {
          this.errorMessage = "Failed Create Account";
        }
        setTimeout(() => {
          this.alertError = false;
        }, 3000);
      }
    },
    async getResponseById() {
      const id = this.$route.params.id;
      const params = {
        id: id,
        type: "management"
      };
      const response = await this.getAccountById(params);
      if (response.status === 200) {
        const data = response.data.data;
        const newD = {
          ...this.data,
          username: data.username,
          name: data.name,
          photo: data.photo,
          accountType: data.accountType,
          mobile: data.mobile,
          email: data.email,
          gender: data.gender,
          note: data.note
        };
        this.oldPassword = data.password;
        this.data = newD;
      }
      console.log(response);
    }
  },
  mounted() {
    this.getResponseById();
  }
};
</script>

<style lang="sass" scoped>
.account-edit
  &__title
    font-size: $font-size-24
  &__subtitle
    font-size: $font-size-12
</style>
