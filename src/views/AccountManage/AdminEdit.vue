<template>
  <div>
    <HeaderContent :list="items" label="Edit Management Account" />

    <custom-form :onSubmit="handleSubmit">
      <div class="mt-8">
        <div class="d-flex align-center">
          <v-avatar size="100" class="mr-4">
            <img :src="data.photo" />
          </v-avatar>
          <div class="d-flex flex-column">
            <span class="account-edit__title font-weight-medium charcoal--text">{{ data.user }}</span>
            <span
              class="account-edit__subtitle font-weight-medium grey--text"
            >&commat;{{ data.username }}</span>
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
      data: {
        name: "Si Tampan",
        username: "sekaliduakali",
        photo:
          "https://instagram.fcgk12-1.fna.fbcdn.net/v/t51.2885-19/s320x320/24838845_192490384661021_8458923387798945792_n.jpg?_nc_ht=instagram.fcgk12-1.fna.fbcdn.net&_nc_ohc=qWhDOYy5AicAX_UJ7pW&oh=311d0058734e21883b3d6ab0cb6e9c8c&oe=5EB66DA7",
        role: "Foo",
        gender: "Bar",
        status: "Active",
        password: "tampansekali",
        email: "tampan@banget.com",
        phone: "081-123-234",
        address: "Jakardah, Indonesia"
      }
    };
  },
  methods: {
    handleSubmit() {
      console.log("saved");
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
