<template>
  <div>
    <v-data-table :headers="headers" hide-default-footer :items="drafts">
      <template v-slot:item.action="{item}">
        <div class="d-flex justify-space-between">
          <!-- <custom-button @click="moveToEdit(item.id)" class="primary--text">Edit</custom-button> -->
          <v-btn icon @click="moveToEdit(item.id)">
            <v-icon x-small>$edit</v-icon>
          </v-btn>
          <!-- <custom-button>
            <v-icon @click="openModalDelete(item.id)">delete</v-icon>
          </custom-button> -->
          <v-btn @click="openModalDelete(item.id)" icon >
            <v-icon x-small>$delete</v-icon>
          </v-btn>
        </div>
      </template>
    </v-data-table>

    <Dialog-Delete
      title="Yakin menghapus draft ini?"
      description="Draft yang kamu hapus tidak akan bisa dikembalikan lagi"
      :dialog="dialog"
      :closeModalDelete="closeModalDelete"
      :handleDelete="handleDelete"
    ></Dialog-Delete>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import DialogDelete from "@/components/material/DialogDelete";
export default {
  components: {
    DialogDelete
  },
  props: ["drafts"],
  methods: {
    ...mapActions({
      deleteDraft: "news/deleteDraft"
    }),
    moveToEdit(id) {
      this.$router.push({
        name: "editArticle",
        params: {
          id: id
        }
      });
    },
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
      const response = await this.deleteDraft(id);
      if (response.status === 200) {
        this.$emit("updateListDraft");
      } else {
        console.log(id);
      }
    }
  },
  data() {
    return {
      loading: false,
      dialog: false,
      idUser: "",
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
          text: "Headline",
          value: "headline",
          class: "whitesnow",
          sortable: false,
          filterable: false,
          width: "750"
        },
        {
          text: "",
          value: "action",
          class: "whitesnow",
          sortable: false,
          filterable: false
        }
      ]
    };
  }
};
</script>