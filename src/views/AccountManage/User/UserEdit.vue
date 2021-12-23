<template>
  <div>
    <HeaderContent :list="items" label="Edit Management Account" />
    <FormUser 
      :data="data" 
      :loading="loading" 
      @onSubmit="onSubmit" 
      @deleteUser="handleDelete"
    />
    <v-snackbar top right v-model="alertError" color="error">
      Edit Failed
    </v-snackbar>
    <v-snackbar top right v-model="alertSuccess" color="success">
      Edit Success
    </v-snackbar>
  </div>
</template>

<script>
import HeaderContent from "@/containers/HeaderContent";
import FormUser from "@/containers/Form/formUser";
import { mapActions, mapState } from "vuex";
export default {
  components: {
    HeaderContent,
    FormUser,
  },
  data() {
    return {
      loading: false,
      alertError: false,
      alertSuccess: false,
      oldPassword: "",
      items: [
        {
          text: "Manage Account",
          disabled: false,
          href: "/user",
        },
        {
          text: "List Management",
          disabled: false,
          href: "/user",
        },
        {
          text: "Edit Management",
        },
      ],
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
        accountType: "",
        role: "",
      },
    };
  },
  methods: {
    ...mapActions({
      getAccountById: "account/getAccountById",
      updateAccount: "account/updateAccount",
      deleteUser: "account/deleteUser",
    }),
    handleDelete() {
      const id = this.$route.params.id;
      return this.deleteUser(id)
        .then(() => {
          this.$router.push("/user");
        })
    },
    async onSubmit(params) {
      const id = this.$route.params.id;
      const payload = {
        id,
        data: params,
      };
      this.loading = true;
      const response = await this.updateAccount(payload);
      if (response.status === 200) {
        this.loading = false;
        this.alertSuccess = true;
        setTimeout(() => {
          this.$router.push("/user");
        }, 1000);
      } else {
      	this.loading = false
      	this.alertError = true
      }
    },
    async handleResponseById() {
      const id = this.$route.params.id;
      const params = {
        id: id,
        type: "users",
      };
      const response = await this.getAccountById(params);
      if (response.status === 200) {
        const responseData = response.data.data;
        const tempData = { ...this.data };
        const dataById = {
          ...tempData,
          name: responseData.name,
          username: responseData.username,
          photo: responseData.photo,
          gender: responseData.gender,
          mobile: responseData.mobile,
          email: responseData.email,
          isVerified: responseData.isVerified,
          role: responseData.role,
          accountType: responseData.accountType,
        };
        this.oldPassword = responseData.password;
        this.data = dataById;
        console.log(dataById);
      }
    },
  },
  mounted() {
    this.handleResponseById();
  },
};
</script>



<style lang="sass" scoped>
.account-edit
  &__title
    font-size: $font-size-24
  &__subtitle
    font-size: $font-size-12
.verified-box
  border-radius: 4px
  p
    font-size: $font-size-18
    line-height: 18px
  span
    font-size: $font-size-12
    line-height: 18px
</style>
