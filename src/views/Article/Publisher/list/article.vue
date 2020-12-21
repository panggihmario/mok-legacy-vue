<template>
  <div>
    <v-data-table hide-default-footer :headers="headers" :items="news">
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
        <div v-else class="d-flex justify-space-between my-3">
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
            @click="handlePushNotificationById(item.id)"
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
    <v-snackbar top right v-model="alertSuccess" color="success">
      Delete Success
    </v-snackbar>
    <v-snackbar top right v-model="alertFailed" color="error">
      Delete Delete
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
  data() {
    return {
      dialog: false,
      pageNews: 1,
      alertSuccess: false,
      alertFailed: false,
      idNews: "",
      headers: [
        {
          text: "Tanggal",
          value: "date",
          class: "whitesnow",
          sortable: false,
          filterable: false,
          width: "100",
        },
        {
          text: "Status",
          value: "status",
          class: "whitesnow",
          sortable: false,
          filterable: false,
          width: "150",
        },
        {
          text: "Headline",
          value: "headline",
          class: "whitesnow",
          sortable: false,
          filterable: false,
          // width: "200",
        },
        {
          text: "",
          value: "action",
          class: "whitesnow",
          sortable: false,
          filterable: false,
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
    closeDialog() {
      this.dialog = false;
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
    async handlePushNotificationById(id) {
      const response = await this.pushNotificationById(id)
      console.log(response);
    },
  },
};
</script>
