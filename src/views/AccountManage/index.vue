<template>
  <div>
    <HeaderContent
      :list="items"
      label="Edit Management Account"
      labelAction="Create Account"
      @click="handleClick('create')"
    />

    <v-row dense class="mt-8">
      <v-col cols="6" class="d-flex justify-space-between">
        <div class="d-flex align-center">
          <span class="mr-4">Sort</span>
          <custom-select hideDetails outlined dense :items="sort" />
        </div>
        <div class="d-flex align-center">
          <span class="mr-4">Filter</span>
          <custom-select hideDetails outlined dense :items="filter" />
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
        show-select
        @page-count="pageCount = $event"
      >
        <template v-slot:item.user="{ item }">
          <div class="d-flex align-center">
            <v-avatar size="35" class="mr-2">
              <img :src="item.photo" />
            </v-avatar>
            <div class="d-flex flex-column">
              <span class="account-manage__user__title font-weight-medium">{{ item.user }}</span>
              <span class="account-manage__user__subtitle font-weight-light">{{ item.role }}</span>
            </div>
          </div>
        </template>

        <template v-slot:item.status="{ item }">
          <span v-if="item.status == 'Active'" class="primary--text">{{ item.status }}</span>
          <span v-else class="silver--text">{{ item.status }}</span>
        </template>

        <template v-slot:item.manage>
          <custom-button icon @click="handleClick('edit')">
            <v-icon small>mdi-pencil</v-icon>
          </custom-button>
          <custom-button icon @click="handleClick('delete')">
            <v-icon small color="safetyorange">mdi-delete</v-icon>
          </custom-button>
        </template>
      </v-data-table>

      <v-row dense class="mt-8">
        <v-col cols="6">
          <custom-button :disabled="!selected.length" class="carmine--text">Delete All</custom-button>
        </v-col>
        <v-col cols="6">
          <v-pagination
            class="d-flex justify-end"
            v-model="page"
            :length="pageCount"
            total-visible="5"
            prev-icon="mdi-menu-left"
            next-icon="mdi-menu-right"
          ></v-pagination>
        </v-col>
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
          text: "List Management"
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
          filterable: false,
          width: 400
        },
        {
          text: "Role",
          value: "role",
          class: "whitesnow",
          sortable: false,
          filterable: false
        },
        {
          text: "Status",
          value: "status",
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
          user: "Si Tampan",
          photo:
            "https://instagram.fcgk12-1.fna.fbcdn.net/v/t51.2885-19/s320x320/24838845_192490384661021_8458923387798945792_n.jpg?_nc_ht=instagram.fcgk12-1.fna.fbcdn.net&_nc_ohc=qWhDOYy5AicAX_UJ7pW&oh=311d0058734e21883b3d6ab0cb6e9c8c&oe=5EB66DA7",
          role: "Staff",
          status: "Active"
        },
        {
          user: "Si Berani",
          photo:
            "https://instagram.fcgk12-1.fna.fbcdn.net/v/t51.2885-19/s320x320/24838845_192490384661021_8458923387798945792_n.jpg?_nc_ht=instagram.fcgk12-1.fna.fbcdn.net&_nc_ohc=qWhDOYy5AicAX_UJ7pW&oh=311d0058734e21883b3d6ab0cb6e9c8c&oe=5EB66DA7",
          role: "Manager",
          status: "Inactive"
        }
      ]
    };
  },
  methods: {
    handleClick(params) {
      this.$router.push(`/admin/${params}`);
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
  &__user
    &__title
      font-size: $font-size-12
    &__subtitle
      font-size: $font-size-10
</style>
