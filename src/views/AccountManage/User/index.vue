<template>
  <div>
    <HeaderContent :list="items" :label="$t('title.user')">
      <custom-button
        color="carmine"
        class="white--text"
        @click="handleClick('create')"
      >
				{{ $t('button.userCreate') }}
			</custom-button>
    </HeaderContent>

    <v-row dense class="mt-8">
      <v-col cols="6" class="d-flex">
        <div class="d-flex align-center mr-12">
          <span>Total User&nbsp;:&nbsp;{{ totalUser }}</span>
        </div>
        <!-- <div class="d-flex align-center font-weight-medium">
          <span class="mr-4">Filter</span>
          <custom-select hideDetails :items="filter" />
        </div>-->
      </v-col>
      <v-col cols="6">
        <div class="d-flex justify-end">
          <custom-input placeholder="Search" @keyup.enter="onSearch" v-model="payloadSearch" />
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
        item-key="id"
        hide-default-footer
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
          <span v-if="item.type == 'General'" class="grey--text">{{item.type}}</span>
          <span v-else class="primary--text">{{ item.type }}</span>
        </template>

        <template v-slot:item.verified="{ item }">
          <span v-if="item.verified" class="dodgerblue--text">Verified</span>
          <span v-else class="silver--text">Not Verified</span>
        </template>

        <template v-slot:item.manage="{ item }">
          <custom-button icon @click="moveToEdit(item.id)">
            <v-icon small>mdi-pencil</v-icon>
          </custom-button>
          <custom-button @click="openModalDelete(item.id)" icon>
            <v-icon small color="carmine">delete</v-icon>
          </custom-button>
        </template>
      </v-data-table>

      <Dialog-Delete
        title="Yakin menghapus user ini?"
        description="User yang kamu hapus tidak akan tampil di halaman user lagi"
        :dialog="dialog"
        :closeModalDelete="closeModalDelete"
        :handleDelete="handleDelete"
				:loading="loading"
      ></Dialog-Delete>
      <div class="mt-8">
        <v-pagination
          class="d-flex justify-end"
          v-model="page"
          :length="pageCount"
          prev-icon="mdi-menu-left"
          next-icon="mdi-menu-right"
          @input="getDataBaseOnPage"
          :total-visible="6"
        ></v-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderContent from "@/containers/HeaderContent";
import DialogDelete from "@/components/material/DialogDelete";
import { mapACtions, mapActions } from "vuex";
export default {
  components: {
    HeaderContent,
    DialogDelete
  },
  data() {
    return {
      payloadSearch: "",
      loading: false,
      dialog: false,
      idUser: "",
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
			totalUser : 0,
      itemsPerPage: 10,
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
      data: []
    };
  },
  methods: {
    ...mapActions({
      getListRespone: "account/getListRespone",
      searchAccount: "account/searchAccount",
      deleteUser: "account/deleteUser"
    }),
    openModalDelete(id) {
      this.dialog = true;
      this.idUser = id;
    },
    closeModalDelete() {
      this.dialog = false;
      this.idUser = "";
    },
    async handleDelete() {
      const id = this.idUser;
      this.loading = true;
      const response = await this.deleteUser(id);
      if (response.status === 200) {
        this.loading = false;
				this.idUser = "";
				this.dialog = false
        this.getDataBaseOnPage();
      } else {
        this.loading = false;
				this.idUser = "";
				this.dialog = false
      }
    },
    async onSearch() {
      const payload = {
        params: this.payloadSearch,
        type: "users"
      };
      const response = await this.searchAccount(payload);
      if (response.status === 200) {
        this.formattingResponse(response);
      } else {
        console.log(response);
      }
    },
    moveToEdit(id) {
      this.$router.push({
        name: "userEdit",
        params: {
          id: id
        }
      });
    },
    handleClick(params) {
      this.$router.push(`/user/${params}`);
    },
    formattingResponse(response) {
			const totalDataUser = response.data.data.totalElements;
			this.totalUser = totalDataUser
			this.totalPages = totalDataUser
			const totalData = response.data.data.totalPages;
      this.pageCount = totalData;
      const responseData = response.data.data.content;
      const formatResponse = responseData.map(r => {
        return {
          user: r.name,
          username: r.username,
          photo: r.photo,
          verified: r.isVerified,
          type: r.accountType,
          id: r.id
        };
      });
      this.data = formatResponse;
    },
    async getDataBaseOnPage() {
      const params = {
        type: "users",
        param: {
          page: this.page - 1
        }
      };
      const response = await this.getListRespone(params);
      if (response.status === 200) {
        this.formattingResponse(response);
      }
    },
    async handleResponse() {
      const params = {
        type: "users",
        page: 0
      };
      const response = await this.getListRespone(params);
      if (response.status === 200) {
        this.formattingResponse(response);
      }
    }
  },
  mounted() {
    this.handleResponse();
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
