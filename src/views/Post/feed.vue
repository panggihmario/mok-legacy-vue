<template>
  <div>
    <HeaderContent :list="list" label="List Feed">
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
          <video width="100%" height="100%" v-if="dialogMedia.type === 'video'" :src="dialogMedia.url" controls autoplay />
          <v-img :src="dialogMedia.url" v-else/>
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
      list: [
        {
          text: "Post",
          disabled: false,
          href: "post"
        },
        {
          text: "List Feed"
        }
      ],
      items: [],
      itemsDummy: [
        {
          date: "06/06/20",
          image: "",
          description: "coba aja dl",
          type: "Type"
        },
        {
          date: "06/06/20",
          image: "",
          description: "coba aja dl22",
          type: "Type"
        }
      ],
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
          value: "action",
          class: "whitesnow",
          align: "center",
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
			console.log(payload)
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
    getResponseFeed(payload) {
      return this.getListFeed(payload)
        .then(response => {
					console.log(response)
          const content = response.data.data.content;
          this.totalPage = response.data.data.totalPages;
          const formatingContent = content.map(c => {
            const newDte = this.formatingDate(c.createAt);
						return {
							date : newDte,
							description : c.post.description,
							id : c.id,
							type : c.typePost,
							media : c.post.medias
						}
          });
          this.items = formatingContent;
        })
        .catch(error => {
          console.log(error);
        });
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
