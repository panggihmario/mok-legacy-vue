<template>
  <div>
    <div>
      <span class="account-manage__title font-weight-medium">List Management Account</span>
      <div class="account-manage__subTitle font-weight-medium">
        <span class="carmine--text">Account Manage</span>&nbsp;
        <span class="grey--text">&#47;&nbsp;List Account</span>
      </div>
    </div>

    <v-row dense class="mt-8">
      <v-col cols="6" class="d-flex justify-space-between">
        <div class="d-flex align-center">
          <span class="mr-4">Sort</span>
          <custom-select hideDetails dense :items="sort" />
        </div>
        <div class="d-flex align-center">
          <span class="mr-4">Filter</span>
          <custom-select hideDetails dense :items="filter" />
        </div>
      </v-col>
      <v-col cols="6">
        <div class="d-flex justify-end">
          <custom-input></custom-input>
        </div>
      </v-col>
    </v-row>

    <div>
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
        <template v-slot:item.status="{ item }">
          <span v-if="item.status == 'Active'" class="primary--text">{{ item.status }}</span>
          <span v-else class="silver--text">{{ item.status }}</span>
        </template>
        <template v-slot:item.manage>
          <custom-button icon>
            <v-icon small>mdi-pencil</v-icon>
          </custom-button>
          <custom-button icon>
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
export default {
  data() {
    return {
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
          role: "Staff",
          status: "Active"
        },
        {
          user: "Si Berani",
          role: "Manager",
          status: "Inactive"
        }
      ]
    };
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
