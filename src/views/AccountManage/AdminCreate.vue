<template>
  <div>
    <HeaderContent :list="items" label="Create Management Account" @click="handleClick" />
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
            <div class="d-flex justify-space-between">
              <custom-select
                label="Pilih jenis akun"
                background-color="whitesnow"
                placeholder="Pilih jenis akun"
                v-model="data.role"
              ></custom-select>
              <custom-select label="Gender" background-color="whitesnow" v-model="data.gender"></custom-select>
            </div>
            <custom-input label="Name" background-color="whitesnow" v-model="data.name"></custom-input>
            <custom-input label="Username" background-color="whitesnow" v-model="data.username"></custom-input>
            <custom-input label="Password" background-color="whitesnow" v-model="data.password"></custom-input>
            <custom-input label="Confirm Password" background-color="whitesnow"></custom-input>
            <custom-input label="Email" background-color="whitesnow" v-model="data.email"></custom-input>
            <custom-input label="Phone" background-color="whitesnow" v-model="data.phone"></custom-input>
            <custom-textarea label="Address" v-model="data.address"></custom-textarea>
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
          text: "List Management",
          disabled: false,
          href: "/admin"
        },
        {
          text: "Edit Management"
        }
      ],
      status: "",
      data: {
        name: "",
        username: "",
        photo: "",
        role: "",
        gender: "",
        password: "",
        address: "",
        email: "",
        phone: ""
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
</style>
