<template>
  <div>
    <HeaderContent :list="items" label="Edit Management Account" />
    <custom-form :onSubmit="handleClick">
      <div class="mt-8">
        <div class="d-flex align-center">
          <v-avatar size="100" class="mr-4">
            <img :src="data.photo" />
          </v-avatar>
          <div class="d-flex flex-column">
            <span class="account-edit__title font-weight-medium charcoal--text">{{ data.name }}</span>
            <span
              class="account-edit__subtitle font-weight-medium grey--text"
            >&commat;{{ data.username }}</span>
          </div>
        </div>

        <v-row>
          <v-col cols="6">
            <custom-input dense label="Name" v-model="data.name"></custom-input>
            <custom-select dense label="Gender" v-model="data.gender"></custom-select>
            <custom-input dense label="Username" v-model="data.username"></custom-input>
            <custom-input dense label="Password" v-model="data.password"></custom-input>
            <custom-input dense label="Email" v-model="data.email"></custom-input>
            <custom-input dense label="Phone" v-model="data.phone"></custom-input>

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
          href: "/user"
        },
        {
          text: "List Management",
          disabled: false,
          href: "/user"
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
        gender: "Foo",
        password: "bleh123",
        address: "Indonesia, Jakarta",
        email: "sitampan@mail.com",
        phone: "08784510****",
        isVerified: false
      }
    };
  },
  methods: {
    handleClick() {
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
.verified-box
  border-radius: 4px
  p
    font-size: $font-size-18
    line-height: 18px
  span
    font-size: $font-size-12
    line-height: 18px
</style>
