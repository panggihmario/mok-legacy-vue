<template>
  <div>
    <Header/>
    <Tabs
      :isList="true"
      position="list"
    />
     <v-data-table
      :headers="headers"
      :items="contents"
      hide-default-footer
      disable-filtering
      disable-sort
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
        <div
          v-if="item.status === 'Approved'"
          class="d-flex justify-space-between align-center my-3"
        >
          <v-btn icon @click="openDialog(item.id)">
            <v-icon x-small color="grey">$delete</v-icon>
          </v-btn>
          <custom-button
            color="whitesnow"
            class="grey--text"
            width="54"
            @click="moveToEdit(item)"
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
      :length="totalPages"
      prev-icon="mdi-menu-left"
      next-icon="mdi-menu-right"
      v-model="pageNews"
      @input="getNewsBaseOnPage"
      :total-visible="6"
    />
     <DialogDelete
      title="Yakin menghapus news ini"
      description="News yang kamu hapus tidak akan tampil di halaman news"
      :dialog="dialogDelete"
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
          <custom-button :loading="loadingPush" color="primary" @click="handlePushNotificationById"
            >Push News</custom-button
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
import Header from "./containers/header.vue"
import Tabs from "./containers/tabs.vue"
import { mapActions } from "vuex";
import moment from 'moment';
import DialogDelete from "@/components/material/Dialog/DialogDelete";
export default {
  components : {
    Header,
    Tabs,
    DialogDelete
  },
  computed: {
    news() {
      const list = this.listNews.content;
      if (list) {
        return filterSchedule;
      }
    },
  },
  
  data () {
    return {
      contents : [],
      pageNews :1,
      idNews : '',
      totalPages : 0,
      loadingPush : false,
      dialogDelete : false,
      dialogPush : false,
      alertSuccess : false,
      alertFailed : false,
      alertSuccessPush : false,
      alertFailedPush : false,
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
    }
  },
  mounted () {
    this.fetchListNews()
    const params = this.$route.params
    this.pageNews = Number(params.page)
  },
  watch : {
    '$route' : function ()  {
      const params = this.$route.params
      const nextPage = Number(params.page)
      this.pageNews = nextPage
      const payload = {
        page : nextPage - 1,
        tab : 'list'
      }
      return this.handleGetNews(payload)
    }
  },
  methods : {
    ...mapActions({
      getNews: "news/getListNews",
      deleteNews: "news/deleteDraft",
      pushNotificationById: "news/pushNotificationById",
    }),
    getNewsBaseOnPage(p) {
      const nextPage = p
      this.$router.push({
        name : 'listNewsPublisher',
        params : {
          page : nextPage
        }
      })
    },
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
    openDialogPush (id) {
      this.idNews = id;
      this.dialogPush = true;
    },
    moveToEdit (item) {
      const page = this.pageNews
      this.$router.push({
        name: "editPublisher",
        params: {
          id : item.id,
          page
        },
      });
    },
    openDialog(id) {
      this.idNews = id;
      this.dialogDelete = true;
    },
    closeDialog() {
      this.dialogDelete = false;
      this.dialogPush = false;
      this.idNews = "";
    },
    handleDelete () {
      const idNews = this.idNews
      return this.deleteNews(idNews)
        .then( () => {
          this.dialogDelete = false
          this.alertSuccess = true
          this.fetchListNews()
          setTimeout(() => {
            this.alertSuccess = false
          },2000)   
        })
        .catch(() => {
          this.dialogDelete = false
          this.alertFailed = true;
          setTimeout(() => {
          this.alertFailed = false;
        }, 2000);
        })

    },
    moveToReview (id) {
      const page = this.pageNews
      this.$router.push({
        name: "reviewPublisher",
        params: {
          id,
          page
        },
      });
    },
    formatingDate (rawDate) {
      const humanDate = moment(rawDate).format('DD/MM/YYY')
      return humanDate
    },
    handleGetNews(payload) {
      return this.getNews(payload)
        .then(response => {
          const responseData = response.data.data
          this.totalPages = responseData.totalPages
          const content = responseData.content
          this.contents = content
        })
    },
    fetchListNews(){
      const page = this.$route.params.page
      const payload = {
        page : page - 1,
        tab : 'list'
      }
      return this.handleGetNews(payload)
    },
    handlePushNotificationById() {
      this.loadingPush = true
      const idNews = this.idNews
      return this.pushNotificationById(idNews)
        .then(() => {
          this.dialogPush = false
          this.alertSuccessPush = true
          setTimeout(() => {
            this.alertSuccessPush = false;
            this.loadingPush = false
          }, 2000)
          this.fetchListNews()
        })
        .catch(() => {
          this.dialogPush = false;
          this.alertFailedPush = true;
          setTimeout(() => {
            this.alertFailedPush = false;
            this.loadingPush = false
          }, 2000);
        })
    },
  },
}
</script>