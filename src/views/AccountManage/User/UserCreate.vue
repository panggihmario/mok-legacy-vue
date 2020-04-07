<template>
  <div>
    <HeaderContent :list="items" label="Create User" @click="handleClick" />
    <custom-form :onSubmit="handleSubmit">
      <div class="mt-8">
        <div class="d-flex align-center">
          <v-avatar size="100" class="mr-4">
            <img :src="data.photo" />
          </v-avatar>
          <div class="d-flex flex-column">
            <span
              class="account-edit__subtitle font-weight-medium charcoal--text mb-3"
            >Unggah foto profil</span>
            <custom-upload id="create" @response="getResponse"></custom-upload>
          </div>
        </div>

        <v-row>
          <v-col cols="6">
            <custom-input label="Name" background-color="whitesnow" v-model="data.name"></custom-input>
            <custom-select label="Gender" background-color="whitesnow" v-model="data.gender"></custom-select>
            <custom-input label="Username" background-color="whitesnow" v-model="data.username"></custom-input>
            <custom-input label="Password" background-color="whitesnow" v-model="data.password"></custom-input>
            <custom-input label="Confirm Password" background-color="whitesnow"></custom-input>
            <custom-input label="Email" background-color="whitesnow" v-model="data.email"></custom-input>
            <custom-input label="Phone" background-color="whitesnow" v-model="data.phone"></custom-input>

            <div class="verified-box my-10 pa-6 font-weight-medium whitesnow">
              <p>Verified Account</p>
              <span>
                Akun ini sudah memenuhi
                <span class="dodgerblue--text">Syarat & Ketentuan</span> untuk dirubah statusnya
                menjadi Verified Account
              </span>
              <div class="verified-box d-flex align-center justify-space-between mt-6 pa-2 white">
                <span class="dodgerblue--text">Change this account to Verified Account</span>
                <v-checkbox v-model="data.isVerified" hide-details class="pa-0 ma-0"></v-checkbox>
              </div>
            </div>

            <custom-button color="carmine" class="white--text" type="submit">Save</custom-button>
          </v-col>
          <v-col cols="6"></v-col>
        </v-row>
      </div>
    </custom-form>
  </div>
</template>

<script>
import HeaderContent from "@/containers/HeaderContent";

export default {
  components: {
    HeaderContent
  },
  data() {
    return {
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
        address: "",
        email: "",
        phone: "",
        isVerified: false
      }
    };
  },
  methods: {
    handleClick() {
      console.log("saved");
    },
    getResponse(payload) {
      console.log({ payload });
      this.status = payload.status;
      this.data.photo = payload.response.url;
    },
    handleSubmit() {
      const payload = this.data;
      console.log("submitted", payload);
    }
  }
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
