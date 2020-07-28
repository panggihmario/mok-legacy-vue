<template>
  <div>
    <div class="mt-8">
      <div class="d-flex align-center">
        <v-avatar size="100" class="mr-4">
          <img :src="data.photo" />
        </v-avatar>
        <div class="d-flex flex-column">
          <span class="profile__title font-weight-medium charcoal--text">{{ data.name }}</span>
          <span class="profile__subtitle font-weight-medium grey--text">
            <v-icon>mdi-room</v-icon>
            {{ data.address }}
          </span>
        </div>
      </div>
      <custom-button text color="primary">Edit</custom-button>
    </div>

    <div class="profile__table">
      <v-row>
        <v-col cols="2">Role</v-col>
        <v-col cols="4">{{ data.role }}</v-col>
        <v-col cols="6"></v-col>
      </v-row>
      <v-row>
        <v-col cols="2">User Id</v-col>
        <v-col cols="4">{{ data.id }}</v-col>
        <v-col cols="6"></v-col>
      </v-row>
      <v-row>
        <v-col cols="2">Username</v-col>
        <v-col cols="4">{{ data.username }}</v-col>
        <v-col cols="6">
          <custom-button text color="primary">Edit</custom-button>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="2">Name</v-col>
        <v-col cols="4">{{ data.name }}</v-col>
        <v-col cols="6">
          <custom-button text color="primary">Edit</custom-button>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="2">Email</v-col>
        <v-col cols="4">{{ data.email }}</v-col>
        <v-col cols="6">
          <custom-button text color="primary">Edit</custom-button>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="2">Password</v-col>
        <v-col cols="4">{{ data.password }}</v-col>
        <v-col cols="6">
          <custom-button text color="primary">Edit</custom-button>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="2">Phone</v-col>
        <v-col cols="4">{{ data.phone }}</v-col>
        <v-col cols="6">
          <custom-button text color="primary">Edit</custom-button>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      gender: ["male", "female"],
      data: {
        role: "Staff",
        id: "142-234-2020",
        username: "lalaagatha",
        name: "Lala Agatha",
        photo:
          "https://instagram.fcgk12-1.fna.fbcdn.net/v/t51.2885-19/s320x320/24838845_192490384661021_8458923387798945792_n.jpg?_nc_ht=instagram.fcgk12-1.fna.fbcdn.net&_nc_ohc=qWhDOYy5AicAX_UJ7pW&oh=311d0058734e21883b3d6ab0cb6e9c8c&oe=5EB66DA7",
        email: "lalagatha@gmail.com",
        password: "Bleh123",
        address: "Jakarta, Indonesia",
        phone: "081-421-xxxxxxxx"
      }
    };
  },
  computed: {
    dataKey() {
      const newData = Object.keys(this.data);
      return newData;
    },
    dataValue() {
      const newData = Object.values(this.data);
      return newData;
    }
  }
};
</script>


<style lang="sass" scoped>
.profile
  &__title
    font-size: $font-size-24
  &__subtitle
    font-size: $font-size-12
  &__table
    font-size: $font-size-12
</style>
