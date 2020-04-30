<template>
  <div>
    <HeaderContent :list="items" label="Edit Management Account">
      <custom-button
        color="carmine"
        class="white--text"
        @click="handleClick('create')"
        >Create Account</custom-button
      >
    </HeaderContent>
    <v-row dense class="mt-8">
      <v-col cols="6" class="d-flex justify-space-between">
        <!-- <div class="d-flex align-center">
          <span class="mr-4">Sort</span>
          <custom-select
            hideDetails
            :items="listRole"
            v-model="role"
            @change="getByRole"
            clearable
          />
        </div>
        <div class="d-flex align-center">
          <span class="mr-4">Filter</span>
          <custom-select
            hideDetails
            :items="filter"
            v-model="isActive"
            @change="filterByStatus"
            clearable
          />
        </div> -->
      </v-col>
      <v-col cols="6">
        <div class="d-flex justify-end">
          <custom-input
            placeholder="Search"
            @keyup.enter="onSearch"
            v-model="payloadSearch"
          />
        </div>
      </v-col>
    </v-row>

    <div class="mt-6">
      <v-data-table
        :headers="headers"
        :items="data"
        v-model="selected"
        item-key="user"
        hide-default-footer
      >
        <template v-slot:item.user="{ item }">
          <div class="d-flex align-center">
            <v-avatar size="35" class="mr-2">
              <img :src="item.photo" />
            </v-avatar>
            <div class="d-flex flex-column">
              <span class="account-manage__user__title font-weight-medium">{{
                item.user
              }}</span>
              <span class="account-manage__user__subtitle font-weight-light">{{
                item.role
              }}</span>
            </div>
          </div>
        </template>
        <template v-slot:item.status="{ item }">
          <span v-if="item.status" class="primary--text">Active</span>
          <span v-else class="silver--text">Inactive</span>
        </template>
        <template v-slot:item.manage="{ item }">
          <custom-button icon @click="moveEdit(item.id)">
            <v-icon small>mdi-pencil</v-icon>
          </custom-button>
          <custom-button icon @click="handleDelete(item.id)">
            <v-icon small color="safetyorange">mdi-delete</v-icon>
          </custom-button>
        </template>
      </v-data-table>
      <v-row dense class="mt-8">
        <v-col cols="6">
          <!-- <custom-button :disabled="!selected.length" class="carmine--text">Delete All</custom-button> -->
        </v-col>
        <v-col cols="6">
          <v-pagination
            class="d-flex justify-end"
            v-model="page"
            :length="pageCount"
            prev-icon="mdi-menu-left"
            next-icon="mdi-menu-right"
            @input="getDataBaseOnPage"
          ></v-pagination>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import HeaderContent from "@/containers/HeaderContent";
import { mapActions } from "vuex";
export default {
  components: {
    HeaderContent
  },
  data() {
    return {
      payloadSearch: "",
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
      params: {},
      isActive: "",
      role: "",
      listRole: [
        "USER",
        "SELEB",
        "MGR_SELEB",
        "ADMIN",
        "ADMIN_SOCIAL",
        "SUPERVISOR",
        "EDITOR"
      ],
      filter: ["Active", "Inactive"],
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
      data: []
    };
  },
  methods: {
    async getByRole() {
			let payload;
      if (this.role) {
        payload = {
          ...this.params,
          sortBy: this.role
        };
      } else {
        payload = {
					...this.params,
					sortBy : ""
        };
      }
			this.params = payload;
			const data = {
				type: "management",
				param : {
					page : this.page - 1,
					...this.params
				},
			};
			const response = await this.getListAdmin(data);
			console.log(response)
    },
    filterByStatus() {
      const payload = {
        ...this.params,
        filterBy: this.isActive
      };
      this.params = payload;
      console.log(this.params);
    },
    handleClick(params) {
      this.$router.push(`/admin/${params}`);
    },
    moveEdit(id) {
      this.$router.push({
        name: "adminEdit",
        params: {
          id: id
        }
      });
    },
    async handleDelete(id) {
      const response = await this.deleteAccount(id);
      if (response.status === 200) {
        this.handleResponseListAdmin();
      }
    },
    async onSearch() {
      const payload = {
        params: this.payloadSearch,
        type: "management"
      };
      const response = await this.searchAccount(payload);
      if (response.status === 200) {
        this.formatResponse(response);
      } else {
        console.log(response);
      }
    },
    ...mapActions({
      getListAdmin: "account/getListRespone",
      searchAccount: "account/searchAccount",
      deleteAccount: "account/deleteAccount"
    }),
    formatResponse(response) {
      const totalData = response.data.data.totalPages;
      this.pageCount = totalData;
      const dataResponse = response.data.data.content;
      const formatResponse = dataResponse.map(d => {
        return {
          id: d.id,
          photo: d.photo,
          role: d.accountType,
          status: d.enabled,
          user: d.username
        };
      });
      this.data = formatResponse;
    },
    async getDataBaseOnPage() {
      const payload = {
				type: "management",
				param : {
					page : this.page - 1,
					...this.params
				},
      };
      const response = await this.getListAdmin(payload);
      if (response.status === 200) {
        this.formatResponse(response);
      } else {
        console.log(response);
      }
    },
    async handleResponseListAdmin() {
      const params = {
        type: "management"
      };
      const response = await this.getListAdmin(params);
      if (response.status === 200) {
        this.formatResponse(response);
      } else {
        console.log(response);
      }
    }
  },
  mounted() {
    this.handleResponseListAdmin();
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
