<template>
  <div>
    <Header-Content label="Reported Comment" :list="crumbs" />

    <v-data-table
      :headers="headers"
      :items="reports"
      disable-filtering
      disable-sort
      hide-default-footer
    >
      <template v-slot:[`item.comment`]="{ item }">
        <div class="d-flex justify-center image__container">
          <span v-text="item.post.comment"></span>
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

  </div>
</template>

<script>
import HeaderContent from "@/containers/HeaderContent";
// import HeaderOption from "./header.vue";
import DialogReason from "./dialog.vue";
import DialogDelete from "@/components/material/Dialog/DialogDelete";

export default {
  components: {
    HeaderContent,
    // HeaderOption,
    DialogReason,
    DialogDelete,
  },
  data() {
    return {
      crumbs: [
        {
          text: "Reported Comment",
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
          value: "comment",
          width: "320",
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
          provoke: 300,
          disturbing: 0,
          illegal: 0,
          post: {
            comment: "Sok cantik banget, dasar wanita murahan",
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
  methods: {
    getReportedPostByPage() {},
    openDialogReason(id) {
      this.dialogReason = true;
      this.idPost = id;
      console.log(id);
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
