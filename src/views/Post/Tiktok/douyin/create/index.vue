<template>
  <div>
    <HeaderContent label="Tambah" :list="crumbs">
      <v-btn
        :disabled="
          !isDataEdited || errorData.length > 0 || dataPayload.length <= 0
        "
        :loading="isLoadingPostVideo"
        @click="actionPostDouyin"
        >Submit</v-btn
      >
    </HeaderContent>

    <section class="d-flex justify-space-between align-end">
      <div
        class="d-flex align-center secondarylowtint font-12 py-2 px-3 box-alert"
        style="max-width: 600px"
      >
        <v-icon color="secondary" size="14px" class="mr-1"
          >mdi-alert-circle</v-icon
        >
        <span class="secondary--text"
          >Salin semua teks di sheet kedalam kolom dibawah! Pastikan data sesuai
          dengan kolom agar tidak terjadi error.</span
        >
      </div>
      <div class="font-12 font-weight-medium">Max. 100 baris</div>
    </section>

    <section class="mt-5" v-if="!isLoadingPostVideo">
      <Table-Create
        :tableData="tableData"
        :tableError="tableError"
        :cellMeta="cellMeta"
        @afterChangeData="checkTableData"
        @afterValidate="afterValidate"
        @validateUsernameNumber="validateUsernameNumber"
      ></Table-Create>
    </section>

    <v-snackbar v-model="isSuccess" top right timeout="3000" color="success">
      <div class="d-flex flex-column">
        <span>Success</span>
      </div>
    </v-snackbar>
    <v-snackbar v-model="isError" top right timeout="3000" color="error">
      <div class="d-flex flex-column">
        <span>{{ errorMessage.message }}</span>
        <span class="font-12">{{ errorMessage.data }}</span>
      </div>
    </v-snackbar>
  </div>
</template>

<script>
import HeaderContent from "@/containers/HeaderContent";
import { mapActions } from "vuex";
import TableCreate from "./table.vue";

export default {
  components: {
    HeaderContent,
    TableCreate,
  },
  data() {
    return {
      crumbs: [
        {
          text: "Douyin Mirroring",
        },
        {
          text: "Tambah Konten",
        },
      ],
      tableData: [],
      errorData: [],
      cellMeta: [],
      tableError: null,
      dataPayload: [],
      isDataEdited: false,
      isLoadingPrepareVideo: false,
      isLoadingPostVideo: false,
      isSuccess: false,
      isError: false,
      errorMessage: {},
    };
  },
  methods: {
    ...mapActions({
      postDouyinVideo: "tiktok/postDouyinVideo",
    }),
    actionSubmitData() {
      let data = [];
      const result = this.tableData.filter((item) => {
        if (Object.keys(item).length > 1) {
          return item;
        }
      });
      for (let i = 0; i < result.length; i++) {
        const e = result[i];
        data.push({
          ...e,
          row: i,
          channelId: "402880e77c4ab688017c4abec7c10002",
          hashtag: e.hashtag ? e.hashtag : "",
        });
      }
      this.dataPayload = data;
    },
    actionPostDouyin() {
      this.checkTableData();
      this.isLoadingPostVideo = true;
      this.tableError = null;
      return this.postDouyinVideo(this.dataPayload)
        .then((res) => {
          this.isSuccess = true;
          this.isLoadingPostVideo = false;
          setTimeout(() => {
            this.$router.push({ name: "listDouyin" });
          }, 3000);
        })
        .catch((err) => {
          this.isError = true;
          this.errorMessage = err.response.data;
          this.isLoadingPostVideo = false;
          if (err.response.data.code == 4200) {
            this.tableError = err.response.data.data;
            this.cellMeta.push({
              row: err.response.data.data.row,
              col: 1,
              className: "red",
            });
          }
        });
    },
    afterValidate(item) {
      this.errorData = item;
      setTimeout(() => {
        this.checkTableData();
      }, 100);
    },
    checkTableData() {
      this.cellMeta = [];
      this.isDataEdited = true;
      let data = [];
      for (let i = 0; i < this.tableData.length; i++) {
        const e = this.tableData[i];
        data.push({
          ...e,
          row: i,
        });
      }
      const filtered = data.filter((item) => {
        if (Object.keys(item).length <= 2 && Object.keys(item).length > 1) {
          console.log({ item });
        }
        return Object.keys(item).length > 2;
      });
      this.dataPayload = filtered.filter((item) => {
        return (
          item.originalURL != "" &&
          item.username != "" &&
          item.originalURL != null &&
          item.username != null
        );
      });
    },
    validateUsernameNumber(d) {
      // this.tableData[d.row].username = d.value;
    },
  },
};
</script>

<style lang="scss" scoped>
.box-alert {
  border-radius: 4px;
}
.cell-error {
  background-color: rgba($color: red, $alpha: 0.3) !important;
}
</style>
