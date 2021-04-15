<template>
  <div>
    <HeaderContent label="Kategori News">
      <!-- <custom-button
        color="primary"
        class="white--text"
        @click="moveToCreateCategory"
      >
        Buat Kategori News
      </custom-button> -->
    </HeaderContent>

    <div class="category__top-container">
      <div class="category__top-header">Sumber Berita</div>
      <div @click="editSource" style="cursor: pointer" class="category__top-action secondary--text"><v-icon color="secondary" size="9">$edit</v-icon>  Edit Sumber</div>
      <v-btn depressed color="white" class="mt-4">
        <div class="text-capitalize">Kompas.com</div>
      </v-btn>
    </div>

    <v-row no-gutters>
      <v-col cols="5">
        <v-data-table
          :headers="headers"
          :items="items"
          disable-filtering
          disable-sort
          disable-pagination
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
          <!-- <template v-slot:[`item.actions`]="{ item }">
            <v-btn @click="moveToEdit(item.id)" icon>
              <v-icon x-small>$edit</v-icon>
            </v-btn>
            <v-btn @click="openDialogDelete(item.id)" icon>
              <v-icon x-small>$delete</v-icon>
            </v-btn>
          </template> -->
          <template v-slot:header.action>
            <custom-button
              color="primary"
              class="white--text"
              @click="openDialogCreate"
            >
              Create Category
            </custom-button>
          </template>
          <template v-slot:body="{ items }">
            <tbody>
              <tr
                v-for="(item, idx) in items"
                :key="idx"
                @click="selectRow(item,idx)"
                :class="idx === indexRow ? 'row__highlight' : ''"
              >
                <td>{{ item.sequence }}</td>
                <td>{{ item.name }}</td>
                <td></td>
              </tr>
            </tbody>
          </template>
        </v-data-table>
      </v-col>
      <v-col cols="7">
        <RightSide 
          :categoryWebhose="categoryWebhose"
          :category="category"
          @reGetCategory="reGetCategory"
        />
      </v-col>
    </v-row>

    <DialogCreate
      :dialogCreate="dialogCreate"
      @closeDialogCreate="closeDialogCreate"
    />

    <DialogSource
      :dialogSource="dialogSource"
      @closeDialogSource="closeDialogSource"
    />

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
import RightSide from "./rightSide";
import DialogCreate from "./create";
import DialogSource from "./source"
export default {
  components: {
    HeaderContent,
    DialogDelete,
    RightSide,
    DialogCreate,
    DialogSource
  },
  data() {
    return {
      items: [],
      categoryWebhose : [],
      id: "",
      dialog: false,
      dialogCreate : false,
      dialogSource : false,
      category : '',
      loading: false,
      indexRow: null,
      headers: [
        {
          text: "No",
          value: "sequence",
          class: "whitesnow",
          width: 100,
        },
        {
          text: "Nama",
          value: "name",
          class: "whitesnow",
        },
        {
          value: "action",
          class: "whitesnow",
          align: "end",
        },
      ],
    };
  },
  methods: {
    editSource() {
      this.dialogSource = true
    },
    selectRow(item,idx) {
      this.indexRow = idx;
      this.category = item
    },
    openDialogCreate() {
      this.dialogCreate = true
    },
    closeDialogCreate (payload) {
      this.dialogCreate = payload
      return this.handleCategoryNews()
    },
    reGetCategory() {
      return this.handleCategoryNews()
    },
    closeDialogSource(payload) {
      this.dialogSource = payload
    },
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
      getCategoryAgregrator: "news/getCategoryAgregrator",
    }),
    async handleCategoryNews() {
      const response = await this.getCategoryNews();
      if (response.status === 200) {
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
    handleGetAgregratorCategory() {
      return this.getCategoryAgregrator()
        .then((response) => {
          let data = response.reduce((r, e) => {
            let group = e.name[0];
            var regex = /^[a-zA-Z]*$/;
            let isSpecial = regex.test(group)
            if(!isSpecial) {
              // if(!r['special']){
              //   r['special'] = {group : 'special' ,children: []}
              //   r['special'].children.push(e);
              // }else{
              //   r['special'].children.push(e);
              // }
            }
            else{
              if (!r[group]) {
                r[group] = { group, children: [e] };
              } else r[group].children.push(e);
            }
            return r;
          }, {});
          let result = Object.values(data);
          const sortResult = result.sort((a,b) => {
            if(a.group < b.group) {
              return -1
            }
            if(a.group > b.group) {
              return 1
            }
            return 0
          })
          this.categoryWebhose = sortResult
          
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    this.handleCategoryNews();
    this.handleGetAgregratorCategory();
  },
};
</script>

<style lang="sass" scoped>
.row
  &__highlight
    background-color: #F1F7FE
.category
  &__top-container
    background-color: #FAFAFA
    width: 100%
    height: 148px
    margin-bottom: 16px
    padding: 24px
  &__top-header
    color: #4A4A4A
    font-size: 14px
    font-weight: bold
    letter-spacing: 0.01em
  &__top-action
    font-size: 10px
    letter-spacing: 0.01em
    margin-top: 12px
</style>
