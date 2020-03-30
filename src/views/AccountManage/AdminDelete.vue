<template>
  <div>
    <HeaderContent
      :list="items"
      label="Edit Management Account"
      @click="handleClick"
      labelAction="Save"
    />

    <div class="mt-8">
      <span class="account-delete__subtitle">Account Name</span>
      <div class="d-flex align-center">
        <v-avatar size="100" class="mr-4">
          <img :src="data.photo" />
        </v-avatar>
        <div class="d-flex flex-column">
          <span class="account-delete__title font-weight-medium charcoal--text">{{ data.user }}</span>
          <span
            class="account-delete__subtitle font-weight-medium grey--text"
          >&commat;{{ data.username }}</span>
        </div>
      </div>

      <v-row>
        <v-col cols="6">
          <custom-textarea label="Alasan Menghapus Akun"></custom-textarea>
          <custom-input label="Password" background-color="whitesnow"></custom-input>
          <custom-input label="Confirm Password" background-color="whitesnow"></custom-input>
        </v-col>
        <v-col cols="6"></v-col>
      </v-row>
    </div>
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
          href: "channel"
        },
        {
          text: "List Management",
          disabled: false,
          href: "channel"
        },
        {
          text: "Edit Management"
        }
      ],
      data: {
        user: "Si Tampan",
        username: "sekaliduakali",
        photo:
          "https://instagram.fcgk12-1.fna.fbcdn.net/v/t51.2885-19/s320x320/24838845_192490384661021_8458923387798945792_n.jpg?_nc_ht=instagram.fcgk12-1.fna.fbcdn.net&_nc_ohc=qWhDOYy5AicAX_UJ7pW&oh=311d0058734e21883b3d6ab0cb6e9c8c&oe=5EB66DA7",
        role: "Staff",
        status: "Active"
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
.account-delete
  &__title
    font-size: $font-size-24
  &__subtitle
    font-size: $font-size-12
</style>
