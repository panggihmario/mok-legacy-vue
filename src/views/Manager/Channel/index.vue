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
      <custom-button class="white--text" color="carmine" @click="handleClick"
        >Tambah Channel</custom-button
      >
    </HeaderContent>
    <v-data-table :headers="headers" hide-default-footer :items="channels">
      <template v-slot:item.channelImage="{ item }">
        <div class="image__container">
          <div class="image__box">
            <v-img
              max-width="100%"
              max-height="100%"
              :src="item.channelImage"
            />
          </div>
        </div>
      </template>
      <template v-slot:item.action="{ item }">
        <div class="d-flex justify-space-between">
          <v-btn icon color="primary">
            <v-icon @click="moveEdit(item.id)">edit</v-icon>
          </v-btn>
          <v-dialog v-model="dialog" width="500">
            <template v-slot:activator="{ on }">
              <v-btn v-on="on" icon color="orangered">
                <v-icon>delete_outline</v-icon>
              </v-btn>
            </template>
            <v-card class="pa-8">
              <div>
                <span>Apakah anda yakin?</span>
              </div>
              <div class="d-flex justify-end">
                <v-btn
                  color="carmine"
                  class="white--text"
                  @click="dialog = false"
                  >No</v-btn
                >
                <v-btn
                  color="primary"
                  class="ml-4"
                  @click="handleDelete(item.id)"
                  >Yes</v-btn
                >
              </div>
            </v-card>
          </v-dialog>
        </div>
      </template>
    </v-data-table>
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
			this.totalPages = response.totalPages
			const content = response.content
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
    async handleDelete(id) {
      const response = await this.deleteChannel(id);
      this.dialog = false;
      if (response.status === 200) {
        this.getResponseChannel();
      } else {
        return response;
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
		},
  },
  created() {
    this.getResponseChannel();
  },
  data() {
    return {
			dialog: false,
			page : 1,
			totalPages : 0,
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
          width: "70"
        },
        {
          text: "Gambar Channel",
          value: "channelImage",
          width: "150"
        },
        {
          text: "Nama Channel",
          value: "channelName",
          width: "150"
        },
        {
          text: "Deskripsi",
          value: "description",
          width: "600"
        },
        {
          text: "Manage",
          value: "action",
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
  &__failed
    background: grey
  &__container
    padding: 10px
</style>
