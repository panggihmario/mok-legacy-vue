<template>
  <div>
    <HeaderContent :list="items" :label="$t('title.userCreate')" />
    <FormNews
      :data="data"
      :loading="loading"
      @onSubmit="onSubmit"
      @setUsername="setUsername"
      @setEmail="setEmail"
      :listAccountType="listAccountType"
      :listBadge="listBadge"
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
import FormNews from "@/containers/Form/formUser";
import { mapActions } from "vuex";
export default {
  components: {
    HeaderContent,
    FormNews,
  },
  data() {
    return {
      alertError: false,
      alertSuccess: false,
      errorMessage: "",
      loading: false,
      genderType: ["MALE", "FEMALE"],
      listAccountType: [],
      listBadge: [],
      items: [
        {
          text: "Manage Account",
          disabled: false,
          href: "/admin",
        },
        {
          text: "List User",
          disabled: false,
          href: "/admin",
        },
        {
          text: "Create User",
        },
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
        role: "",
        // donationBadgeId: "",
      },
    };
  },
  mounted() {
    this.handleGetListRole();
  },
  methods: {
    ...mapActions({
      createUser: "account/createUser",
      getListRole: "account/getListRole",
    }),
    setUsername (value) {
      this.data.username = value
    },
    setEmail(value) {
      this.data.email = value
    },
    handleGetListRole() {
      const payload = "EXTERNAL";
      return this.getListRole(payload).then((response) => {
        const responsData = response.data.data;
        this.listAccountType = response.data.data;
        const filterData = responsData.filter((d) => {
          return (
            d !== "ROLE_ADMIN" &&
            d !== "ROLE_SYSTEM" &&
            d !== "ROLE_ADMIN_SOCIAL" &&
            d !== "ROLE_ADMIN_FINANCE"
          );
        });
        this.listAccountType = filterData;
      });
    },
    async onSubmit(payload) {
      this.loading = true;
      const username = payload.username.toLowerCase()
      const response = await this.createUser(payload);
      if (response.status === 201) {
        this.loading = false;
        this.alertSuccess = true;
        setTimeout(() => {
          this.$router.push({
            name: "User",
            params: {
              page: 1,
            },
            query: {
              search: "",
            },
          });
        }, 1000);
      } else {
        this.loading = false;
        this.alertError = true;
        if (response.response) {
          this.errorMessage = response.response.data.data;
        } else {
          this.errorMessage = "Failed Create Account";
        }
      }
    },
  },
};
</script>
