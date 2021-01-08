<template>
  <div>
    <Header-Content label="Reported Post" :list="crumbs"></Header-Content>
    <!-- <Header-Option :option="option"></Header-Option> -->

    <v-data-table
      :headers="headers"
      hide-default-footer
      :items="reports"
      disable-sort
      disable-filtering
      class="grey--text table__data"
    >
      <template v-slot:[`item.image`]="{ item }">
        <div class="d-flex justify-center image__container">
          <div class="image__box">
            <v-img
              max-width="100%"
              height="100%"
              :src="item.post.media[0].small"
            />
          </div>
        </div>
      </template>
      <template v-slot:[`item.report`]="{ item }">
        <div class="d-flex flex-column my-4">
          <span :class="{ 'silver--text': item.provoke == 0 }"
            >Tidak manusiawi, kasar dan memprovokasi</span
          >
          <span :class="{ 'silver--text': item.disturbing == 0 }"
            >Tidak sesuai dengan konten dan sangat mengganggu</span
          >
          <span :class="{ 'silver--text': item.illegal == 0 }"
            >Masalah keamanan dan illegal di mata hukum</span
          >
          <span :class="{ 'silver--text': item.other.length == 0 }"
            >Other -
            <span
              class="table__show-reason secondary--text"
              @click="openDialogReason(item.id)"
              >Lihat Alasan</span
            ></span
          >
          <span>TOTAL</span>
        </div>
      </template>
      <template v-slot:[`item.count`]="{ item }">
        <div class="d-flex flex-column">
          <span
            :class="{ 'silver--text': item.provoke == 0 }"
            v-text="item.provoke"
          ></span>
          <span
            :class="{ 'silver--text': item.disturbing == 0 }"
            v-text="item.disturbing"
          ></span>
          <span
            :class="{ 'silver--text': item.illegal == 0 }"
            v-text="item.illegal"
          ></span>
          <span
            :class="{ 'silver--text': item.other.length == 0 }"
            v-text="item.other.length"
          ></span>
          <span
            v-text="
              item.provoke + item.disturbing + item.illegal + item.other.length
            "
          ></span>
        </div>
      </template>
      <template v-slot:[`item.action`]="{ item }">
        <div class="d-flex flex-column justify-center my-4">
          <div>
            <custom-button
              text
              x-small
              color="warning"
              @click="openDialogDelete(item.id)"
            >
              <v-icon x-small>$delete</v-icon
              ><span class="ml-1">Hapus Post</span>
            </custom-button>
          </div>
          <div>
            <custom-button text x-small>
              <v-icon color="charcoal" x-small>$thumbup</v-icon
              ><span class="charcoal--text ml-1">Lolos Pemeriksaan</span>
            </custom-button>
          </div>
        </div>
      </template>
    </v-data-table>

    <Dialog-Reason
      :dialog="dialogReason"
      @closeDialog="closeDialog"
    ></Dialog-Reason>

    <Dialog-Delete
      title="Yakin menghapus channel ini?"
      description="Channel yang kamu hapus tidak akan tampil di halaman channel lagi"
      :dialog="dialogDelete"
      @closeDialog="closeDialog"
      @handleDelete="handleDelete"
    ></Dialog-Delete>

    <v-pagination
      class="d-flex justify-end"
      prev-icon="mdi-menu-left"
      next-icon="mdi-menu-right"
      v-model="page"
      :length="totalPages"
      @input="getReportedPostByPage"
    ></v-pagination>
  </div>
</template>

<script>
import HeaderContent from "@/containers/HeaderContent";
import HeaderOption from "./header.vue";
import DialogReason from "./dialog.vue";
import DialogDelete from "@/components/material/Dialog/DialogDelete";
import { mapActions } from "vuex";

export default {
  components: {
    HeaderContent,
    HeaderOption,
    DialogReason,
    DialogDelete,
  },
  data() {
    return {
      crumbs: [
        {
          text: "Reported Post",
          disabled: true,
        },
      ],
      option: {
        sort: "Date",
      },
      dialogReason: false,
      dialogDelete: false,
      idPost: "",
      loading: false,
      page: 1,
      totalPages: 0,
      headers: [
        {
          value: "image",
          width: "150",
          class: "whitesnow",
        },
        {
          text: "Report",
          value: "report",
          // width: "150",
          class: "whitesnow",
        },
        {
          text: "Count",
          value: "count",
          // width: "150",
          class: "whitesnow",
        },
        {
          text: "Action",
          value: "action",
          class: "whitesnow",
          // align: "center",
        },
      ],
      reports: [
        {
          provoke: 30,
          disturbing: 400,
          illegal: 0,
          post: {
            media: [
              {
                small:
                  "https://www.post-it.com/wps/wcm/connect/ff9dae62-b691-41e9-a2aa-b31390905775/2670_Stories_from_Scratch_tile.jpg?MOD=AJPERES&CACHEID=ROOTWORKSPACE-ff9dae62-b691-41e9-a2aa-b31390905775-nl7a9Xt",
              },
            ],
          },
          other: [
            {
              reason: "Annoying so much",
            },
            {
              reason: "Ga suka ih, sok banget",
            },
            {
              reason: "Apaan sih gatau malu",
            },
          ],
        },
        ,
      ],
    };
  },
  mounted() {
    this.getReportedPostByPage();
  },
  methods: {
    ...mapActions({
      getListReportByType: "report/getListReportByType",
    }),
    async getReportedPostByPage() {
      const payload = {
        type: "FEED",
      };
      const response = await this.getListReportByType(payload);
      console.log(response);
    },
    openDialogReason(id) {
      this.dialogReason = true;
      this.idPost = id;
    },
    openDialogDelete(id) {
      this.dialogDelete = true;
      this.idPost = id;
    },
    closeDialog() {
      this.dialogReason = false;
      this.dialogDelete = false;
      this.idPost = "";
    },
    handleDelete() {},
  },
};
</script>

<style lang="sass" scoped>
.image
  &__box
    width: 60px
    height: 60px
    background-color: grey
    overflow: hidden
  &__container
    padding: 10px
.table
  &__data
    font-weight: 500
    line-height: 32px
  &__show-reason
    cursor: pointer
    text-decoration: underline
</style>
