<template>
  <div>
    <HeaderContent label="List Feed">
      <custom-button
        color="carmine"
        @click="moveToPostProduct"
        class="white--text mr-6"
      >Post Product</custom-button>
      <custom-button color="carmine" class="white--text" @click="moveToCreate">Post Feed</custom-button>
    </HeaderContent>

    <v-data-table :headers="headers" hide-default-footer :items="items" class="grey--text">
      <template v-slot:item.image="{ item }">
        <custom-button
          color="carmine"
          class="white--text"
          @click="showMedia(item)"
          size="small"
        >Show Media</custom-button>
      </template>

      <template v-slot:item.action="{ item }">
        <custom-button @click="openModalDelete(item.id)" size="small">
          <v-icon small color="carmine">delete</v-icon>
        </custom-button>
      </template>
    </v-data-table>

    <div class="mt-8">
      <v-pagination
        class="d-flex justify-end"
        v-model="page"
        :length="totalPage"
        prev-icon="mdi-menu-left"
        next-icon="mdi-menu-right"
        :total-visible="6"
        @input="getDataBaseOnPage"
      ></v-pagination>
    </div>

    <v-dialog v-model="dialog" max-width="350">
      <v-card>
        <div v-if="dialogMedia">
          <v-img :src="dialogMedia.url" v-if="dialogMedia.type === 'image'" />
          <video width="100%" height="100%" v-else :src="dialogMedia.url" controls autoplay />
        </div>
        <div v-else>no media</div>
      </v-card>
    </v-dialog>

    <Dialog-Delete
      title="Yakin menghapus feed ini?"
      description="Feed yang kamu hapus tidak akan tampil di halaman feed lagi"
      :dialog="dialogDelete"
      :closeModalDelete="closeModalDelete"
      :handleDelete="deleteFeed"
    ></Dialog-Delete>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import HeaderContent from "@/containers/HeaderContent";
import DialogDelete from "@/components/material/DialogDelete";
export default {
  components: {
    HeaderContent,
    DialogDelete
  },
  data() {
    return {
      accountId: "",
      idUser: "",
      page: 1,
      totalPage: 0,
      dialog: false,
      dialogMedia: {},
      dialogDelete: false,
      loading: false,
      items: [],
      headers: [
        {
          text: "Tanggal",
          value: "date",
          class: "whitesnow",
          sortable: false,
          filterable: false,
          width: "100"
        },
        {
          text: "Photo Feed/Product",
          value: "image",
          class: "whitesnow",
          sortable: false,
          filterable: false,
          width: "190"
        },
        {
          text: "Deskripsi Feed/Product",
          value: "description",
          class: "whitesnow",
          sortable: false,
          filterable: false
        },
        {
          text: "Type Post",
          value: "type",
          class: "whitesnow",
          sortable: false,
          filterable: false
        },
        {
          text: "Action",
          value: "action",
          class: "whitesnow",
          sortable: false,
          filterable: false,
          width: 200
        }
      ]
    };
  },
  mounted() {
    this.handleListFeed();
  },
  methods: {
    ...mapActions({
      getListFeed: "post/getListFeed",
      deletePost: "post/deletePost"
    }),
    showMedia(payload) {
      this.dialog = true;
      this.dialogMedia = payload.media[0];
    },
    formatingDate(rawDate) {
      const newDt = new Date(rawDate);
      const day = newDt.getDate();
      const month = newDt.getMonth() + 1;
      const year = newDt.getFullYear();
      const newFormat = `${day}/${month}/${year}`;
      return newFormat;
    },
    moveToCreate() {
      this.$router.push("/post/create");
    },
    moveToPostProduct() {
      this.$router.push("/post/product");
    },
    openModalDelete(id) {
      this.dialogDelete = true;
      this.idUser = id;
    },
    closeModalDelete() {
      this.dialogDelete = false;
      this.idUser = "";
    },
    async deleteFeed() {
      const id = this.idUser;
      const response = await this.deletePost(id);
      if (response.status === 200) {
        this.handleListFeed();
        this.dialogDelete = false;
        this.idUser = "";
        this.loading = false;
      } else {
        console.log(response);
        this.dialogDelete = false;
        this.idUser = "";
        this.loading = false;
      }
    },
    getDataBaseOnPage() {
      const id = localStorage.getItem("persada_id");
      const payload = {
        id: id,
        typePost: "seleb",
        page: this.page - 1
      };
      this.getResponseFeed(payload);
    },
    async getResponseFeed(payload) {
      const response = await this.getListFeed(payload);
      if (response.status === 200) {
        const content = response.data.data.content;
        this.totalPage = response.data.data.totalPages;
        const formatingContent = content.map(c => {
          const newDte = this.formatingDate(c.createAt);
          if (c.typePost === "seleb") {
            return {
              date: newDte,
              description: c.post.description,
              media: c.post.media,
              id: c.id,
              type: c.typePost
            };
          } else if (c.typePost === "product") {
            return {
              date: newDte,
              description: c.postProduct.name || "",
              media: c.postProduct.media,
              id: c.id,
              type: c.typePost
            };
          } else {
            return {
              date: newDte,
              id: c.id,
              type: c.typePost
            };
          }
        });
        this.items = formatingContent;
      } else {
        console.log(response);
      }
    },
    handleListFeed() {
      const id = localStorage.getItem("persada_id");
      const payload = {
        id: id,
        typePost: "seleb",
        page: 0
      };
      this.getResponseFeed(payload);
    }
  }
};
</script>
