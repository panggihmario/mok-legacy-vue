<template>
  <div>
    <HeaderContent :list="items" :label="$t('title.account')">
      <custom-button
        color="primary"
        class="white--text"
        @click="handleClick('create')"
      >
        {{ $t("button.accountCreate") }}
      </custom-button>
    </HeaderContent>
    <v-row dense class="mt-8">
      <v-col cols="6" class="d-flex justify-space-between"> </v-col>
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
        <template v-slot:item="{ item }">
          <tr>
            <td class="item__data">
              <div class="d-flex align-center">
                <v-avatar size="35" class="mr-2">
                  <img
                    :src="
                      item.photo
                        ? item.photo
                        : 'https://dummyimage.com/100x100/ddd/ddd'
                    "
                  />
                </v-avatar>
                <div class="d-flex flex-column">
                  <span
                    class="account-manage__user__title font-weight-medium"
                    >{{ item.user }}</span
                  >
                  <span
                    class="account-manage__user__subtitle font-weight-light"
                    >{{ item.role }}</span
                  >
                </div>
              </div>
            </td>
            <td class="item__data">{{ item.role }}</td>
            <td class="item__data secondary--text">
              <span v-if="item.status" class="kellygreen--text">Active</span>
              <span v-else class="silver--text">Inactive</span>
            </td>
            <td class="item__data">
              <div class="d-flex justify-space-between align-center">
                <v-btn icon @click="moveEdit(item.id)">
                  <v-icon x-small>$edit</v-icon>
                </v-btn>
                <v-btn icon @click="openDialog(item.id)">
                  <v-icon x-small>$delete</v-icon>
                </v-btn>
              </div>
            </td>
          </tr>
        </template>
      </v-data-table>

      <div class="d-flex justify-end mt-10">
        <v-pagination
          class="d-flex justify-end"
          v-model="page"
          :length="pageCount"
          prev-icon="mdi-menu-left"
          next-icon="mdi-menu-right"
          @input="getDataBaseOnPage"
        ></v-pagination>
      </div>

      <Dialog-Delete
        title="Yakin menghapus user ini?"
        description="User yang kamu hapus tidak akan tampil di halaman user lagi"
        :dialog="dialog"
        @closeDialog="closeDialog"
        @handleDelete="handleDelete"
      ></Dialog-Delete>
    </div>
  </div>
</template>

<script>
import HeaderContent from "@/containers/HeaderContent";
import DialogDelete from "@/components/material/Dialog/DialogDelete";
import { mapActions } from "vuex";

export default {
  components: {
    HeaderContent,
    DialogDelete,
  },
  data() {
    return {
      idUser: "",
      dialog: false,
      loading: false,
      payloadSearch: "",
      items: [
        {
          text: "Manage Account",
          disabled: false,
          href: "channel",
        },
        {
          text: "List Management",
          disabled: true,
        },
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
        "EDITOR",
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
          width: 300,
        },
        {
          text: "Role",
          value: "role",
          class: "whitesnow",
          sortable: false,
          filterable: false,
          width: 200,
        },
        {
          text: "Status",
          value: "status",
          class: "whitesnow",
          sortable: false,
          filterable: false,
        },
        {
          text: "Manage",
          value: "manage",
          class: "whitesnow",
          align: "center",
          sortable: false,
          filterable: false,
          width: 140,
        },
      ],
      data: [],
    };
  },
  methods: {
    async getByRole() {
      let payload;
      if (this.role) {
        payload = {
          ...this.params,
          sortBy: this.role,
        };
      } else {
        payload = {
          ...this.params,
          sortBy: "",
        };
      }
      this.params = payload;
      const data = {
        type: "management",
        param: {
          page: this.page - 1,
          ...this.params,
        },
      };
      const response = await this.getListAdmin(data);
    },
    handleClick(params) {
      this.$router.push(`/admin/${params}`);
    },
    moveEdit(id) {
      this.$router.push({
        name: "adminEdit",
        params: {
          id: id,
        },
      });
    },
    openDialog(id) {
      this.dialog = true;
      this.idUser = id;
    },
    closeDialog() {
      this.dialog = false;
      this.idUser = "";
    },
    async handleDelete() {
      const id = this.idUser;
      const response = await this.deleteAccount(id);
      if (response.status === 200) {
        console.log(response)
        this.handleResponseListAdmin();
        this.dialog = false;
        this.idUser = "";
      } else {
        this.dialog = false;
        this.idUser = "";
      }
    },
    async onSearch() {
      const keyword = this.payloadSearch;
      if (keyword.length > 0) {
        const payload = {
          params: keyword,
          type: "management",
        };
        const response = await this.searchAccount(payload);
        if (response.status === 200) {
          this.formatResponse(response);
        }
      } else {
        return this.handleResponseListAdmin()
      }
    },
    ...mapActions({
      getListAdmin: "account/getListRespone",
      searchAccount: "account/searchAccount",
      deleteAccount: "account/deleteAccount",
    }),
    formatResponse(response) {
      const totalData = response.data.data.totalPages;
      this.pageCount = totalData;
      const dataResponse = response.data.data.content;
      console.log("data", dataResponse);
      const formatResponse = dataResponse.map((d) => {
        return {
          id: d.id,
          photo: d.photo,
          role: d.accountType,
          status: d.enabled,
          user: d.username,
        };
      });
      this.data = formatResponse;
    },
    async getDataBaseOnPage() {
      const payload = {
        type: "management",
        param: {
          page: this.page - 1,
          ...this.params,
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
        type: "management",
      };
      const response = await this.getListAdmin(params);
      if (response.status === 200) {
        this.formatResponse(response);
      } else {
        console.log(response);
      }
    },
  },
  mounted() {
    this.handleResponseListAdmin();
  },
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
.item
  &__data
    padding-top: 16px
    padding-bottom: 16px
    // border-bottom: none !important
</style>
