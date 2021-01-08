<template>
  <div>
    <HeaderContent label="List Category News">
      <custom-button
        color="primary"
        class="white--text"
        @click="moveToCreateCategory"
      >
        Buat Kategori News
      </custom-button>
    </HeaderContent>
    <v-row>
      <v-col cols="6">
        <v-data-table
          :headers="headers"
          :items="items"
          disable-filtering
          disable-sort
          hide-default-footer
        >
          <template v-slot:[`item.sequence`]="props">
            <v-edit-dialog
              :return-value.sync="props.item.sequence"
              @open="open"
              @close="close"
              @save="save(props.item)"
              @cancel="cancel"
            >
              {{ props.item.sequence }}
              <template v-slot:input>
                <v-text-field
                  v-model="props.item.sequence"
                  single-line
                  label="Edit"
                  type="number"
                />
              </template>
            </v-edit-dialog>
          </template>
          <template v-slot:[`item.actions`]="{ item }">
            <v-btn @click="moveToEdit(item.id)" icon>
              <v-icon x-small>$edit</v-icon>
            </v-btn>
            <v-btn @click="openDialogDelete(item.id)" icon>
              <v-icon x-small>$delete</v-icon>
            </v-btn>
          </template>
        </v-data-table>
      </v-col>
    </v-row>

    <DialogDelete
      title="Yakin menghapus category ini?"
      description="Category yang kamu hapus tidak akan tampil dihalaman category news"
      :dialog="dialog"
      @closeDialog="closeDialog"
      @handleDelete="handleDelete"
      :loading="loading"
    />
  </div>
</template>

<script>
import HeaderContent from "@/containers/HeaderContent";
import moment from "moment";
import { mapActions } from "vuex";
import DialogDelete from "@/components/material/Dialog/DialogDelete";
export default {
  components: {
    HeaderContent,
    DialogDelete,
  },
  data() {
    return {
      items: [],
      id: "",
      dialog: false,
      loading: false,
      headers: [
        {
          text: "Nama",
          value: "name",
          class: "whitesnow",
        },
        {
          text: "Position",
          value: "sequence",
          class: "whitesnow",
        },
        {
          text: "",
          value: "actions",
          class: "whitesnow",
          align: "end",
        },
      ],
    };
  },
  methods: {
    open() {
      this.snack = true;
      this.snackColor = "info";
      this.snackText = "Dialog opened";
    },
    close() {
      console.log("Dialog closed");
    },
    async save(c) {
      const payload = {
        id: c.id,
        sequence: Number(c.sequence),
      };
      const response = await this.editSequence(payload);
      if (response.status === 200) {
        this.handleCategoryNews();
      } else {
        return;
      }
    },
    cancel() {},
    moveToEdit(id) {
      this.$router.push({
        name: "categoryNewsEdit",
        params: {
          id,
        },
      });
    },
    closeDialog() {
      this.id = "";
      this.dialog = false;
    },
    openDialogDelete(id) {
      this.id = id;
      this.dialog = true;
    },
    handleDelete() {
      this.loading = true;
      return this.deleteCategoryNews(this.id)
        .then((r) => {
          this.dialog = false;
          this.loading = false;
          this.handleCategoryNews();
        })
        .catch((err) => {
          this.loading = false;
          return err;
        });
    },
    moveToCreateCategory() {
      this.$router.push("/categorynews/create");
    },
    ...mapActions({
      getCategoryNews: "news/getCategoryNews",
      deleteCategoryNews: "news/deleteCategoryNews",
      editSequence: "news/editSequence",
    }),
    async handleCategoryNews() {
      const response = await this.getCategoryNews();
      if (response.status === 200) {
        console.log(response);
        const responseData = response.data.data;
        const formatingList = responseData.map((r) => {
          const unixDate = r.createAt / 1000;
          const formatingDate = moment.unix(unixDate).format("D/M/YYYY");
          return {
            date: formatingDate,
            name: r.name,
            id: r.id,
            sequence: r.sequence,
          };
        });
        this.items = formatingList;
      }
    },
  },
  mounted() {
    this.handleCategoryNews();
  },
};
</script>
