<template>
  <div>
    <v-data-table
      hide-default-footer
      disable-filtering
      disable-sort
      :headers="headers"
      :items="news"
    >
      <template v-slot:[`item.status`]="{ item }">
        <span :class="getColor(item.status)">{{ item.status }}</span>
      </template>
      <template v-slot:[`item.date`]="{ item }">
        {{ formatingDate(item.createAt) }}
      </template>
      <template v-slot:[`item.action`]="{ item }">
        <custom-button
          v-if="item.status === 'Need Review'"
          color="primary"
          size="medium"
          class="my-3"
          width="101"
          @click="moveToReview(item.id)"
        >
          Review
        </custom-button>
        <div v-else class="d-flex justify-space-between align-center my-3">
          <v-btn icon @click="openDialog(item.id)">
            <v-icon x-small color="grey">$delete</v-icon>
          </v-btn>
          <custom-button
            color="whitesnow"
            class="grey--text"
            width="54"
            @click="moveToEdit(item.id)"
            >Lihat
          </custom-button>
          <custom-button
            color="whitesnow"
            class="primary--text"
            width="101"
            @click="openDialogPush(item.id)"
            >PUSH
          </custom-button>
        </div>
      </template>
    </v-data-table>
    <v-pagination
      :length="listNews.totalPages"
      prev-icon="mdi-menu-left"
      next-icon="mdi-menu-right"
      v-model="pageNews"
      @input="getNewsBaseOnPage"
      :total-visible="6"
    />
    <DialogDelete
      title="Yakin menghapus news ini"
      :dialog="dialog"
      description="News yang kamu hapus tidak akan tampil di halaman news"
      @closeDialog="closeDialog"
      @handleDelete="handleDelete"
    />
    <v-dialog v-model="dialogPush" width="450">
      <v-card class="pt-4 pb-6 px-2">
        <v-card-title>Push Berita ke Notifikasi</v-card-title>
        <v-card-text
          >Berita yang di push akan muncul ke dalam notifikasi. Setiap berita
          hanya dapat di push sebanyak 1 kali.</v-card-text
        >
        <v-card-actions class="px-6">
          <v-spacer></v-spacer>
          <custom-button @click="closeDialog">Batalkan</custom-button>
          <custom-button color="primary" @click="handlePushNotificationById"
            >Buat Kategori</custom-button
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-snackbar top right v-model="alertSuccess" color="success">
      Delete Success
    </v-snackbar>
    <v-snackbar top right v-model="alertFailed" color="error">
      Delete Error
    </v-snackbar>
    <v-snackbar top right v-model="alertSuccessPush" color="success">
      Push Success
    </v-snackbar>
    <v-snackbar top right v-model="alertFailedPush" color="error">
      Push Error
    </v-snackbar>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import DialogDelete from "@/components/material/Dialog/DialogDelete";

export default {
  components: {
    DialogDelete,
  },
  props: ["listNews"],
  computed: {
    news() {
      const list = this.listNews.content;
      if (list) {
        const filterSchedule = list.filter((f) => {
          if (!f.isScheduled) {
            return f;
          }
        });
        return filterSchedule;
      }
    },
  },
  data() {
    return {
      dialog: false,
      dialogPush: false,
      pageNews: 1,
      alertSuccess: false,
      alertFailed: false,
      alertSuccessPush: false,
      alertFailedPush: false,
      idNews: "",
      headers: [
        {
          text: "Tanggal",
          value: "date",
          class: "whitesnow",
          width: "100",
        },
        {
          text: "Status",
          value: "status",
          class: "whitesnow",
          width: "150",
        },
        {
          text: "Headline",
          value: "headline",
          class: "whitesnow",
          // width: "200",
        },
        {
          text: "",
          value: "action",
          class: "whitesnow",
          width: "250",
          align: "end",
        },
      ],
    };
  },
  computed: {
    news() {
      const list = this.listNews.content;
      if (list) {
        const filterSchedule = list.filter((f) => {
          if (!f.isScheduled) {
            return f;
          }
        });
        return filterSchedule;
      }
    },
  },
  methods: {
    ...mapActions({
      deleteNews: "news/deleteDraft",
      pushNotificationById: "news/pushNotificationById",
    }),
    getColor(status) {
      switch (status) {
        case "Approved":
          return "kellygreen--text";
        case "Rejected":
          return "carmine--text";
        default:
          return "grey--text";
      }
    },
    formatingDate(rawDate) {
      const newDt = new Date(rawDate);
      const day = newDt.getDate();
      const month = newDt.getMonth() + 1;
      const year = newDt.getFullYear();
      const newFormat = `${day}/${month}/${year}`;
      return newFormat;
    },
    getNewsBaseOnPage(p) {
      const params = {
        page: p,
        tab: "list",
      };
      this.$emit("getNewsBaseOnPage", params);
    },
    moveToReview(id) {
      this.$router.push({
        name: "reviewPublisher",
        params: {
          id,
        },
      });
    },
    moveToEdit(id) {
      this.$router.push({
        name: "editPublisher",
        params: {
          id,
        },
      });
    },
    openDialog(id) {
      this.idNews = id;
      this.dialog = true;
    },
    openDialogPush(id) {
      this.idNews = id;
      this.dialogPush = true;
    },
    closeDialog() {
      this.dialog = false;
      this.dialogPush = false;
      this.idNews = "";
    },
    async handleDelete() {
      const response = await this.deleteNews(this.idNews);
      if (response.status === 200) {
        this.dialog = false;
        this.alertSuccess = true;
        setTimeout(() => {
          this.alertSuccess = false;
        }, 2000);
        this.$emit("reloadDataNews");
      } else {
        this.dialog = false;
        this.alertFailed = true;
        setTimeout(() => {
          this.alertFailed = false;
        }, 2000);
      }
    },
    async handlePushNotificationById() {
      const response = await this.pushNotificationById(this.idNews);
      if (response.status === 200 || 204) {
        this.dialogPush = false;
        this.alertSuccessPush = true;
        setTimeout(() => {
          this.alertSuccessPush = false;
        }, 2000);
        this.$emit("reloadDataNews");
      } else {
        this.dialogPush = false;
        this.alertFailedPush = true;
        setTimeout(() => {
          this.alertFailedPush = false;
        }, 2000);
      }
    },
  },
};
</script>
