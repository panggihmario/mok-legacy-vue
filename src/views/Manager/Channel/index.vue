<template>
  <div>
    <HeaderContent :list="items" :label="$t('title.channel')">
      <custom-input
        placeholder="Search channel"
        class="mr-4"
        width="200"
        v-model="payloadSearch"
        @keyup.enter="handleSearch"
      />
      <custom-button class="white--text" color="primary" @click="handleClick">{{
        $t("button.channelAdd")
      }}</custom-button>
    </HeaderContent>

    <v-data-table
      :headers="headers"
      hide-default-footer
      disable-filtering
      disable-sort
      :items="channels"
      class="grey--text"
    >
      <template v-slot:item="{ item }">
        <tr>
          <td>{{ item.no }}</td>
          <td>
            <div class="image__container">
              <div class="image__box">
                <v-img
                  max-width="100%"
                  height="100%"
                  :src="item.channelImage"
                />
              </div>
            </div>
          </td>
          <td>{{ item.channelName }}</td>
          <td>
            <div>
              <span
                v-text="item.channelType"
                :class="{ 'carmine--text': item.channelType === 'Sensitive' }"
              ></span>
            </div>
          </td>
          <td>{{ item.description }}</td>
          <td>
            <div class="d-flex justify-space-between align-center">
              <v-btn icon @click="moveEdit(item.id)">
                <v-icon x-small>$edit</v-icon>
              </v-btn>
              <v-btn @click="openModalDelete(item.id)" icon>
                <v-icon x-small>$delete</v-icon>
              </v-btn>
            </div>
          </td>
        </tr>
      </template>
    </v-data-table>

    <Dialog-Delete
      title="Yakin menghapus channel ini?"
      description="Channel yang kamu hapus tidak akan tampil di halaman channel lagi"
      :dialog="dialog"
      @closeDialog="closeDialog"
      @handleDelete="handleDelete"
    ></Dialog-Delete>

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
      page: 1,
      totalPages: 0,
      items: [
        {
          text: "Manage Channel",
          disabled: false,
          href: "channel",
        },
      ],
      payloadSearch: "",
      headers: [
        {
          text: "No",
          value: "no",
          width: "70",
          class: "whitesnow",
        },
        {
          text: "Gambar Channel",
          value: "channelImage",
          width: "130",
          class: "whitesnow",
        },
        {
          text: "Nama Channel",
          value: "channelName",
          width: "150",
          class: "whitesnow",
        },
        {
          text: "Jenis",
          value: "channelType",
          width: "120",
          class: "whitesnow",
          align: "center",
        },
        {
          text: "Deskripsi",
          value: "description",
          width: "400",
          class: "whitesnow",
        },
        {
          text: "Manage",
          value: "action",
          class: "whitesnow",
          align: "center",
          width: "140",
        },
      ],
      channels: [],
    };
  },
  created() {
    this.getResponseChannel();
  },
  methods: {
    ...mapActions({
      listChannel: "channel/getListChannel",
      deleteChannel: "channel/deleteChannel",
      searchChannel: "channel/searchChannel",
    }),
    async getResponseChannel() {
      const payload = {
        page: 0,
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
        page: this.page - 1,
      };
      const response = await this.listChannel(payload);
      if (response.status === 200) {
        const responseData = response.data.data;
        this.formatingResponse(responseData);
      } else {
        return response;
      }
    },
    async handleSearch() {
      const payload = {
        page: this.page - 1,
        search: this.payloadSearch,
      };
      const response = await this.searchChannel(payload);
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
          no: index + 1,
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
          id: payload,
        },
      });
    },
    openModalDelete(id) {
      this.dialog = true;
      this.idUser = id;
    },
    closeDialog() {
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
  },
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
    padding: 10px 0
.manage
  &__box
    width: 80px
</style>
