<template>
  <div>
    <HeaderContent :list="items" label="Edit Management Account">
      <custom-button
        color="carmine"
        class="white--text"
        @click="handleClick('create')"
      >Create Account</custom-button>
    </HeaderContent>

    <v-row dense class="mt-8">
      <v-col cols="6" class="d-flex">
        <div class="d-flex align-center mr-12">
          <span>Total User&nbsp;:&nbsp;{{ data.length }}</span>
        </div>
        <div class="d-flex align-center font-weight-medium">
          <span class="mr-4">Filter</span>
          <custom-select outlined hideDetails dense :items="filter" />
        </div>
      </v-col>
      <v-col cols="6">
        <div class="d-flex justify-end">
          <custom-input outlined placeholder="Search"></custom-input>
        </div>
      </v-col>
    </v-row>

    <div class="mt-6">
      <v-data-table
        :headers="headers"
        :items="data"
        :page.sync="page"
        :items-per-page="itemsPerPage"
        v-model="selected"
        item-key="user"
        hide-default-footer
        @page-count="pageCount = $event"
      >
        <template v-slot:item.user="{ item }">
          <div class="d-flex align-center">
            <v-avatar size="35" class="mr-2">
              <img :src="item.photo" />
            </v-avatar>
            <span class="font-weight-medium">{{ item.user }}</span>
          </div>
        </template>

        <template v-slot:item.type="{ item }">
          <span v-if="item.type == 'General'" class="grey--text">{{ item.type }}</span>
          <span v-else class="primary--text">{{ item.type }}</span>
        </template>

        <template v-slot:item.verified="{ item }">
          <span v-if="item.verified == 'Verified'" class="dodgerblue--text">{{ item.verified }}</span>
          <span v-else class="silver--text">{{ item.verified }}</span>
        </template>

        <template v-slot:item.manage>
          <custom-button icon @click="handleClick('edit')">
            <v-icon small>mdi-pencil</v-icon>
          </custom-button>
        </template>
      </v-data-table>

      <div class="mt-8">
        <v-pagination
          class="d-flex justify-end"
          v-model="page"
          :length="pageCount"
          total-visible="5"
          prev-icon="mdi-menu-left"
          next-icon="mdi-menu-right"
        ></v-pagination>
      </div>
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
          href: "/user"
        },
        {
          text: "List User"
        }
      ],
      sort: ["Oldest", "Newest"],
      filter: ["Today", "This Month"],
      page: 1,
      pageCount: 0,
      itemsPerPage: 5,
      selected: [],
      headers: [
        {
          text: "User",
          value: "user",
          class: "whitesnow",
          sortable: false,
          filterable: false
        },
        {
          text: "Username",
          value: "username",
          class: "whitesnow",
          sortable: false,
          filterable: false
        },
        {
          text: "Account Type",
          value: "type",
          class: "whitesnow",
          sortable: false,
          filterable: false
        },
        {
          text: "Verified Account",
          value: "verified",
          class: "whitesnow",
          sortable: false,
          filterable: false
        },
        {
          text: "Manage",
          value: "manage",
          class: "whitesnow",
          align: "center",
          sortable: false,
          filterable: false,
          width: 200
        }
      ],
      data: [
        {
          user: "Aku",
          username: "hensem_maksimal",
          photo:
            "https://instagram.fcgk12-1.fna.fbcdn.net/v/t51.2885-19/s320x320/24838845_192490384661021_8458923387798945792_n.jpg?_nc_ht=instagram.fcgk12-1.fna.fbcdn.net&_nc_ohc=qWhDOYy5AicAX_UJ7pW&oh=311d0058734e21883b3d6ab0cb6e9c8c&oe=5EB66DA7",
          type: "Bussiness Account",
          verified: "Verified"
        },
        {
          user: "Dia",
          username: "takbhagiaa",
          photo:
            "https://instagram.fcgk12-1.fna.fbcdn.net/v/t51.2885-19/s320x320/24838845_192490384661021_8458923387798945792_n.jpg?_nc_ht=instagram.fcgk12-1.fna.fbcdn.net&_nc_ohc=qWhDOYy5AicAX_UJ7pW&oh=311d0058734e21883b3d6ab0cb6e9c8c&oe=5EB66DA7",
          type: "General",
          verified: "Not Verified"
        }
      ]
    };
  },
  methods: {
    handleClick(params) {
      this.$router.push(`/user/${params}`);
    }
  }
};
</script>

<style lang="sass" scoped>
.account-manage
  &__title
    font-size: $font-size-24
  &__subTitle
    font-size: $font-size-12
</style>
