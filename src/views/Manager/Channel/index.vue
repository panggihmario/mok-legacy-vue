<template>
  <div>
    <HeaderContent :list="items" label="List Channel">
      <custom-input
        placeholder="Search channel"
        class="mr-4"
        width="200"
        v-model="payloadSearch"
        @keyup.enter="handleSearch"
      />
      <custom-button class="white--text" color="carmine" @click="handleClick">Tambah Channel</custom-button>
    </HeaderContent>

    <v-data-table :headers="headers" hide-default-footer :items="channels" class="grey--text">
      <template v-slot:item.channelImage="{ item }">
        <div class="image__container">
          <div class="image__box">
            <v-img max-width="100%" max-height="100%" :src="item.channelImage" />
          </div>
        </div>
      </template>
      <template v-slot:item.channelType="{ item }">
        <div>
          <span
            v-text="item.channelType"
            :class="{'carmine--text':item.channelType === 'Sensitive'}"
          ></span>
        </div>
      </template>
      <template v-slot:item.action="{ item }">
        <div class="d-flex justify-center">
          <div class="d-flex justify-space-between manage__box">
            <v-btn icon color="grey" x-small>
              <v-icon @click="moveEdit(item.id)">edit</v-icon>
            </v-btn>
            <v-btn @click="openModalDelete(item.id)" icon color="carmine" x-small>
              <v-icon>delete_outline</v-icon>
            </v-btn>
          </div>
        </div>
      </template>
    </v-data-table>

    <v-dialog v-model="dialog" persistent width="300">
      <v-card>
        <v-card-title>Delete Confirmation</v-card-title>
        <v-card-text>
          <div>You are about to delete the channel</div>
          <div>Are you sure ?</div>
        </v-card-text>
        <v-card-actions>
          <custom-button @click="closeModalDelete">cancel</custom-button>
          <v-spacer />
          <custom-button
            color="carmine"
            class="white--text"
            @click="handleDelete"
            :loading="loading"
          >delete</custom-button>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-pagination
      class="d-flex justify-end"
      prev-icon="mdi-menu-left"
      next-icon="mdi-menu-right"
      v-model="page"
      :length="totalPages"
      @input="getChannelByPage"
    ></v-pagination>
  </div>
</template>

<script>
import HeaderContent from "@/containers/HeaderContent";
import { mapActions } from "vuex";
import axios from "axios";
export default {
  components: {
    HeaderContent
  },
  methods: {
    ...mapActions({
      listChannel: "channel/getListChannel",
      deleteChannel: "channel/deleteChannel",
      searchChannel: "channel/searchChannel"
    }),
    async handleSearch() {
      const response = await this.searchChannel(this.payloadSearch);
      if (response.status === 200) {
        const responseData = response.data.data;
        this.formatingResponse(responseData);
      } else {
        return response;
      }
    },
    formatingResponse(response) {
      this.totalPages = response.totalPages;
      const content = response.content;
      const newFormatResponse = content.map((res, index) => {
        return {
          channelImage: res.photo,
          channelName: res.name,
          description: res.description,
          id: res.id,
          no: index + 1
        };
      });
      this.channels = newFormatResponse;
    },
    handleClick() {
      this.$router.push("/channel/create");
    },
    moveEdit(payload) {
      this.$router.push({
        name: "channelEdit",
        params: {
          id: payload
        }
      });
    },
    openModalDelete(id) {
      this.dialog = true;
      this.idUser = id;
    },
    closeModalDelete(id) {
      this.dialog = false;
      this.idUser = "";
    },
    async handleDelete() {
      const id = this.idUser;
      const response = await this.deleteChannel(id);
      this.loading = true;
      if (response.status === 200) {
        this.getResponseChannel();
        this.dialog = false;
        this.idUser = "";
        this.loading = false;
      } else {
        return response;
        this.dialog = false;
        this.idUser = "";
        this.loading = false;
      }
    },
    async getResponseChannel() {
      const payload = {
        page: 0
      };
      const response = await this.listChannel(payload);
      if (response.status === 200) {
        const responseData = response.data.data;
        this.formatingResponse(responseData);
      } else {
        return response;
      }
    },
    async getChannelByPage() {
      const payload = {
        page: this.page - 1
      };
      const response = await this.listChannel(payload);
      if (response.status === 200) {
        const responseData = response.data.data;
        this.formatingResponse(responseData);
      } else {
        return response;
      }
    }
  },
  created() {
    this.getResponseChannel();
  },
  data() {
    return {
      idUser: "",
      dialog: false,
      loading: false,
      page: 1,
      totalPages: 0,
      items: [
        {
          text: "Manage Channel",
          disabled: false,
          href: "channel"
        }
      ],
      payloadSearch: "",
      headers: [
        {
          text: "No",
          value: "no",
          width: "70",
          class: "whitesnow",
          sortable: false,
          filterable: false
        },
        {
          text: "Gambar Channel",
          value: "channelImage",
          width: "150",
          class: "whitesnow",
          sortable: false,
          filterable: false
        },
        {
          text: "Nama Channel",
          value: "channelName",
          width: "150",
          class: "whitesnow",
          sortable: false,
          filterable: false
        },
        {
          text: "Jenis",
          value: "channelType",
          width: "150",
          class: "whitesnow",
          sortable: false,
          filterable: false,
          align: "center"
        },
        {
          text: "Deskripsi",
          value: "description",
          width: "400",
          class: "whitesnow",
          sortable: false,
          filterable: false
        },
        {
          text: "Manage",
          value: "action",
          class: "whitesnow",
          sortable: false,
          filterable: false,
          align: "center"
        }
      ],
      channels: []
    };
  }
};
</script>

<style lang="sass" scoped>
.image
  &__box
    width: 50px
    height: 50px
    background-color: grey
    border-radius: 5px
    overflow: hidden
  &__failed
    background: grey
  &__container
    padding: 10px
.manage
  &__box
    width: 100px
</style>
