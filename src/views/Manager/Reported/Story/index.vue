<template>
  <div>
    <Header-Content label="Reported Post" :list="crumbs"></Header-Content>
    <!-- <Header-Option :option="option"></Header-Option> -->

    <v-data-table
      :headers="headers"
      :items="reports"
      hide-default-footer
      disable-sort
      disable-filtering
      class="grey--text table__data"
    >
      <template v-slot:[`item.image`]="{ item }">
        <div class="d-flex justify-center image__container">
          <div class="d-flex justify-center image__box whitesnow">
            <!-- <v-img max-width="100%" height="100%" :src="item.photo" /> -->
            <video :src="item.photo" :poster="item.photo" height="100%"></video>
          </div>
        </div>
      </template>
      <template v-slot:[`item.username`]="{ item }">
        <span>{{ item.username }} </span>
      </template>
      <template v-slot:[`item.report`]="{ item }">
        <div class="d-flex flex-column my-4">
          <div
            v-for="list in item.reason"
            :key="list.id"
            :class="{ 'silver--text': list.count == 0 }"
          >
            <span v-if="list.value !== ''">{{ list.value }}</span>
            <span v-else
              >Others -
              <span
                class="table__show-reason"
                :class="{ 'secondary--text': list.count !== 0 }"
                @click="openDialogReason(item, list.id)"
                >Lihat Alasan</span
              ></span
            >
          </div>

          <span>TOTAL</span>
        </div>
      </template>
      <template v-slot:[`item.count`]="{ item }">
        <div class="d-flex flex-column">
          <span
            v-for="list in item.reason"
            :key="list.id"
            :class="{ 'silver--text': list.count == 0 }"
            >{{ list.count }}</span
          >
          <span>{{ item.totalReason }}</span>
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
            <custom-button text x-small @click="openDialogPass(item.id)">
              <v-icon color="charcoal" x-small>$thumbup</v-icon
              ><span class="charcoal--text ml-1">Lolos Pemeriksaan</span>
            </custom-button>
          </div>
        </div>
      </template>
    </v-data-table>

    <Dialog-Delete
      title="Apakah anda yakin report ini lolos pemeriksaan?"
      :dialog="dialogPass"
      :loading="loading"
      @closeDialog="closeDialog"
      @handleDelete="handlePassInspect"
    ></Dialog-Delete>

    <Dialog-Reason
      :dialog="dialogReason"
      :list="reasonOthers"
      :photo="dialogImage"
      @closeDialog="closeDialog"
    ></Dialog-Reason>

    <Dialog-Select
      :dialog="dialogDelete"
      :loading="loadingDelete"
      rules="required"
      title="Postingan ini harus dihapus karena.."
      name="Report"
      :items="items"
      @handleClick="handleDeleteReport"
      @closeDialog="closeDialog"
    ></Dialog-Select>

    <v-pagination
      class="d-flex justify-end"
      prev-icon="mdi-menu-left"
      next-icon="mdi-menu-right"
      v-model="page"
      :length="totalPages"
      @input="handleGetReportedList"
      :total-visible="6"
    ></v-pagination>

    <v-snackbar top right v-model="alertSuccess" color="success">
      Pass Success
    </v-snackbar>
    <v-snackbar top right v-model="alertFailed" color="error">
      Pass Error
    </v-snackbar>
    <v-snackbar top right v-model="alertSuccessDelete" color="success">
      Delete Success
    </v-snackbar>
    <v-snackbar top right v-model="alertFailedDelete" color="error">
      Delete Error
    </v-snackbar>
  </div>
</template>

<script>
import HeaderContent from "@/containers/HeaderContent";
import HeaderOption from "./header.vue";
import DialogReason from "./dialog.vue";
import DialogDelete from "@/components/material/Dialog/DialogDelete";
import DialogSelect from "@/components/material/Dialog/DialogSelect";
import { mapActions } from "vuex";

export default {
  components: {
    HeaderContent,
    HeaderOption,
    DialogReason,
    DialogDelete,
    DialogSelect,
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
      dialogPass: false,
      dialogDelete: false,
      dialogImage: "",
      idReport: "",
      loading: false,
      loadingDelete: false,
      page: 1,
      totalPages: 0,
      alertSuccess: false,
      alertFailed: false,
      alertSuccessDelete: false,
      alertFailedDelete: false,
      headers: [
        {
          value: "image",
          width: "150",
          class: "whitesnow",
        },
        {
          text: "Username",
          value: "username",
          // width: "150",
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
      items: [],
      reports: [],
      reasonOthers: [],
    };
  },
  mounted() {
    this.handleGetReportedList();
  },
  methods: {
    ...mapActions({
      getListReasonByType: "report/getListReasonByType",
      getListReportByType: "report/getListReportByType",
      getDetailReasonOther: "report/getDetailReasonOther",
      reportPassed: "report/reportPassed",
      reportDelete: "report/reportDelete",
    }),
    async handleGetReportedList(p) {
      const payload = {
        type: "STORY",
        username: "",
        filter: "",
        size: 3,
        page: p - 1 || 0,
      };
      const response = await this.getListReportByType(payload);
      if (response.status == 200) {
        console.log(response);
        this.reports = response.data.data.content;
        this.totalPages = response.data.data.totalPages;
      }
    },
    async handleGetListReason() {
      const payload = {
        type: "STORY",
      };
      const response = await this.getListReasonByType(payload);
      console.log(response);
      if (response.status === 200) {
        const responseData = response.data.data;
        const formatResponse = responseData.map((data) => {
          return {
            name: data.value,
            id: data.id,
          };
        });
        this.items = formatResponse;
      } else {
        return response;
      }
    },
    async openDialogReason(report, reasonId) {
      const payload = {
        reportId: report.id,
        reasonId,
        size: 10,
        page: 0,
        sort: "createAt,desc",
      };
      this.dialogReason = true;
      this.dialogImage = report.photo;
      const response = await this.getDetailReasonOther(payload);
      console.log({ response });
      if (response.status == 200) {
        this.reasonOthers = response.data.data.content;
      }
    },
    openDialogPass(id) {
      this.dialogPass = true;
      this.idReport = id;
    },
    openDialogDelete(id) {
      this.handleGetListReason();
      this.dialogDelete = true;
      this.idReport = id;
    },
    closeDialog() {
      this.dialogReason = false;
      this.dialogPass = false;
      this.dialogDelete = false;
      this.reasonOthers = [];
      this.idReport = "";
    },
    async handleDeleteReport(item) {
      console.log(item);
      const payload = {
        reportId: this.idReport,
        params: {
          id: item.id,
          type: "story",
          value: item.name,
        },
      };
      console.log(payload);
      this.loadingDelete = true;
      const response = await this.reportDelete(payload);
      console.log("delete", response);
      if (response.status == 200) {
        this.loadingDelete = false;
        this.dialogDelete = false;
        this.alertSuccessDelete = true;
        setTimeout(() => {
          this.alertSuccessDelete = false;
        }, 2000);
        this.handleGetReportedList();
      } else {
        this.loadingDelete = false;
        this.alertFailedDelete = true;
        setTimeout(() => {
          this.alertFailedDelete = false;
        }, 2000);
      }
    },
    async handlePassInspect() {
      const payload = {
        reportId: this.idReport,
      };
      console.log(payload);
      this.loading = true;
      const response = await this.reportPassed(payload);
      console.log("pass", response);
      if (response.status == 200) {
        this.loading = false;
        this.dialogPass = false;
        this.alertSuccess = true;
        setTimeout(() => {
          this.alertSuccess = false;
        }, 2000);
        this.getListReportByType();
      } else {
        this.loading = false;
        this.dialogPass = false;
        this.alertFailed = true;
        setTimeout(() => {
          this.alertFailed = false;
        }, 2000);
      }
    },
  },
};
</script>

<style lang="sass" scoped>
.image
  &__box
    width: 60px
    height: 60px
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
