<template>
  <div>
    <HeaderContent label="Buat Trending Baru"></HeaderContent>

    <div>
      <span class="font-12">Jumlah data yang ingin ditampilkan</span>
      <div class="d-flex align-center">
        <div style="width: 303px">
          <v-text-field
            v-model="totalData"
            placeholder="ex: 500"
            outlined
            dense
            hide-details
            class="font-12 my-2"
            :class="{ 'border-alert': alertData }"
            style="width: 303px"
          ></v-text-field>
        </div>
        <v-tooltip v-if="alertData" bottom color="red">
          <template v-slot:activator="{ on, attrs }">
            <v-icon color="red" dark v-bind="attrs" v-on="on" class="ml-2">
              fas fa-exclamation-circle
            </v-icon>
          </template>
          <span>Harap isi Jumlah Data yang ingin ditampilkan</span>
        </v-tooltip>
      </div>
      <p class="font-10" style="width: 303px">
        Jumlah ini adalah batas maksimal konten yang ditampilkan dalam satu
        linimasa.
      </p>
    </div>

    <div class="d-flex mt-6">
      <Box-List-Hashtag
        :listMasterCategory="listMasterCategory"
        :listMasterCategorySearch="listMasterCategorySearch"
        :availablePercentage="availablePercentage"
        :page="page"
        :totalPage="totalPage"
        :alertFailedSearch="alertFailedSearch"
        @actionSearchListHashtagFormationSubs="
          actionSearchListHashtagFormationSubs
        "
        @onChooseCategory="openDialogPreviewCategory"
        @onScrollSubCategory="onScrollListCategory"
      ></Box-List-Hashtag>

      <Box-List-Preview
        :listPreviewCategory="listPreviewCategory"
        :availablePercentage="availablePercentage"
        :totalData="totalData"
        :totalQtyGreater="totalQtyGreater"
        :loadingSubmit="loadingSubmit"
        class="ml-4"
        @changeAvailablePercentage="changeAvailablePercentage"
        @editPreviewCategory="openDialogEditPreviewCategory"
        @removePreviewCategory="removePreviewCategory"
        @submitData="actionCreateDetailSubsHashtag"
      ></Box-List-Preview>

      <div
        class="d-flex primarylowtint box-exclamation ml-4 py-3"
        style="height: 100%; width: 284px; padding-left: 9.5px; padding-right: 18px"
      >
        <div class="mt-2" style="height: 100%">
          <icon-info-outline class="primary--text"></icon-info-outline>
        </div>
        <span class="font-12 ml-2">
          Urutan hashtag akan digunakan sebagai dasar pengurutan konten didalam
          feed (dari atas kebawah) dan dengan porsi yang sudah diatur. Urutan
          yang ditampilkan akan berulang sampai dengan jumlah data yang sudah
          diatur.
        </span>
      </div>
    </div>

    <v-dialog v-model="dialogAddPreview" width="343">
      <v-card>
        <div class="px-5 pt-5 pb-3">
          <span class="font-24 font-weight-medium"
            >#{{ dataPreview.value }}</span
          >
          <br />
          <span class="grey--text font-12 font-weight-medium">
            {{ dataPreview.available }} konten
          </span>
        </div>

        <v-divider></v-divider>

        <div class="px-5 pt-3">
          <span class="font-10 secondary--text"
            >Total konten yang akan ditampilkan adalah
            <span class="font-weight-medium">{{ totalData }}</span></span
          >

          <div class="mt-4">
            <span class="font-12 font-weight-medium">Persentase</span>
            <div class="d-flex mt-1">
              <div style="width: 155px">
                <v-select
                  v-model="filterPercentage"
                  :items="listPercentage"
                  value="value"
                  outlined
                  dense
                  hide-details
                  background-color="whitesnow"
                  class="font-12"
                ></v-select>
              </div>
              <div
                v-if="filterPercentage == 'tulis_persentase'"
                class="ml-2"
                style="width: 80px"
              >
                <v-text-field
                  v-model="dataPreview.percentage"
                  suffix="%"
                  outlined
                  dense
                  hide-details
                  background-color="whitesnow"
                  class="font-12"
                  type="number"
                ></v-text-field>
              </div>
            </div>
            <p class="font-10 font-weight-medium mt-2">
              Persentase digunakan untuk menentukan proporsional kuantitas data
              dari total data yang akan ditampilkan.
            </p>
            <p
              v-if="
                dataPreview.percentage &&
                  dataPreview.percentage <= 100 &&
                  dataPreview.percentage > 0
              "
              class="font-12"
            >
              Konten <b>#{{ dataPreview.value }}</b> yang akan ditampilkan
              adalah
              <b class="secondary--text">{{
                (dataPreview.percentage / 100) * totalData
              }}</b>
            </p>
            <p
              v-else-if="dataPreview.percentage > 100"
              class="red--text font-12"
            >
              Melebihi total presentase, kurangi presentase!
            </p>
          </div>
        </div>

        <v-divider></v-divider>

        <div class="d-flex justify-space-between align-center pt-3 px-5 pb-5">
          <v-btn
            depressed
            height="38px"
            width="145px"
            class="text-capitalize whitesnow"
            @click="dialogAddPreview = false"
            >Batal</v-btn
          >
          <v-btn
            depressed
            height="38px"
            width="145px"
            class="text-capitalize secondary"
            @click="addPreviewCategory"
            :disabled="
              dataPreview.percentage == null ||
                dataPreview.percentage > 100 ||
                dataPreview.percentage < 1
            "
            >Simpan</v-btn
          >
        </div>
      </v-card>
    </v-dialog>

    <v-snackbar
      v-model="alertSuccess"
      top
      right
      color="success"
      :timeout="3000"
    >
      Success
    </v-snackbar>
    <v-snackbar v-model="alertFailed" top right color="primary" :timeout="3000">
      Error: {{ dataFailed.message }}
    </v-snackbar>
  </div>
</template>

<script>
import HeaderContent from "@/containers/HeaderContent";
import BoxListHashtag from "./boxListHashtag.vue";
import BoxListPreview from "./boxListPreview.vue";
import { mapActions } from "vuex";

export default {
  components: {
    HeaderContent,
    BoxListHashtag,
    BoxListPreview,
  },
  data() {
    return {
      editId: null,
      totalQtyGreater: 0,
      listMasterCategory: [],
      listPreviewCategory: [],
      listMasterCategorySearch: [],
      page: 0,
      totalPage: 0,
      totalData: 0,
      dialogAddPreview: false,
      dataPreview: {
        value: "",
        available: 0,
        qty: 0,
        percentage: null,
      },
      listPercentage: [],
      filterPercentage: null,
      availablePercentage: 100,
      loadingSubmit: false,
      loadingSearch: false,
      alertData: false,
      alertSuccess: false,
      alertFailed: false,
      alertFailedSearch: false,
      dataFailed: {
        message: "",
      },
    };
  },
  watch: {
    filterPercentage() {
      if (this.filterPercentage != "tulis_persentase") {
        this.dataPreview.percentage = this.filterPercentage;
      }
    },
    totalData() {
      this.alertData = false;
      this.countQtyFromPercent(this.listPreviewCategory);
    },
    dialogAddPreview() {
      if (!this.dialogAddPreview) {
        this.editId = null;
        this.filterPercentage = null;
        this.dataPreview.percentage = null;
      }
    },
  },
  mounted() {
    this.handleGetListMasterCategory();
  },
  methods: {
    ...mapActions({
      getListHashtagFormationSubs: "manageHashtag/getListHashtagFormationSubs",
      getAvailabilitySubHashtag: "manageHashtag/getAvailabilitySubHashtag",
      searchListHashtagFormationSubs:
        "manageHashtag/searchListHashtagFormationSubs",
      createDetailSubsHashtag: "manageHashtag/createDetailSubsHashtag",
    }),
    handleGetListMasterCategory() {
      this.listMasterCategory = [];
      this.page = 1;
      let payload = {
        params: {
          size: 10,
          page: 0,
        },
      };
      return this.getListHashtagFormationSubs(payload)
        .then((response) => {
          this.totalPage = response.data.totalPages;
          let content = response.data.content;
          for (let i = 0; i < content.length; i++) {
            const e = content[i];
            this.handleGetAvailabilitySubHashtag(e, i);
          }
        })
        .catch((err) => {
          this.alertFailed = true;
          this.dataFailed = err.response.data;
        });
    },
    onScrollListCategory() {
      let payload = {
        params: {
          size: 10,
          page: this.page,
        },
      };
      return this.getListHashtagFormationSubs(payload)
        .then((response) => {
          this.page++;
          let content = response.data.content;
          for (let i = 0; i < content.length; i++) {
            const e = content[i];
            this.handleGetAvailabilitySubHashtag(e, i);
          }
        })
        .catch((err) => {
          this.alertFailed = true;
          this.dataFailed = err.response.data;
        });
    },
    handleGetAvailabilitySubHashtag(content, idx) {
      return this.getAvailabilitySubHashtag(content.value)
        .then((response) => {
          let dataList = {
            ...content,
            available: response.data.available,
          };
          this.listMasterCategory.push(dataList);
        })
        .catch((err) => {
          console.log({ err });
        });
    },
    actionSearchListHashtagFormationSubs(v) {
      let payload = {
        search: v,
      };
      return this.searchListHashtagFormationSubs(payload)
        .then((response) => {
          if (response.data.length > 0) {
            this.alertFailedSearch = false;
            this.listMasterCategorySearch = response.data;
          } else {
            this.alertFailedSearch = true;
          }
        })
        .catch((err) => {
          this.alertFailed = true;
          this.alertFailedSearch = false;
          this.dataFailed = err.response.data;
        });
    },
    actionCreateDetailSubsHashtag() {
      let payload = {
        totalQty: this.totalData,
        hashtags: [],
      };
      for (let i = 0; i < this.listPreviewCategory.length; i++) {
        const e = this.listPreviewCategory[i];
        payload.hashtags.push({
          value: e.value,
          percent: e.percentage,
          qty: e.qty,
        });
      }
      this.loadingSubmit = true;
      return this.createDetailSubsHashtag(payload)
        .then(() => {
          this.alertSuccess = true;
          this.loadingSubmit = false;
          setTimeout(() => {
            this.$router.push("/manage/hashtag");
          }, 3000);
        })
        .catch((err) => {
          console.log({ err });
          this.loadingSubmit = false;
        });
    },
    openDialogPreviewCategory(i) {
      if (
        this.totalData > 0 &&
        this.totalData !== null &&
        this.totalData !== ""
      ) {
        this.dialogAddPreview = true;
        this.dataPreview.value = i.value;
        this.dataPreview.available = i.available;

        let found;
        for (let y = 0; y < this.listPercentage.length; y++) {
          const e = this.listPercentage[y];
          if (i.percentage > 0 && e.value == i.percentage) {
            found = true;
          }
        }
        if (found) {
          this.filterPercentage = i.percentage || null;
        } else {
          this.filterPercentage = "tulis_persentase";
          this.dataPreview.percentage = i.percentage;
        }

        this.addListPercentage();
      } else {
        this.alertData = true;
      }
    },
    addPreviewCategory() {
      if (this.editId == null) {
        this.listPreviewCategory.push({
          ...this.dataPreview,
          percentage: parseInt(this.dataPreview.percentage),
          totalData: this.totalData,
        });
      } else {
        this.listPreviewCategory[this.editId] = {
          ...this.dataPreview,
          percentage: parseInt(this.dataPreview.percentage),
          totalData: this.totalData,
        };
      }
      this.sortingPreviewData(this.listPreviewCategory);
      this.countQtyFromPercent(this.listPreviewCategory);
      this.dialogAddPreview = false;
    },
    openDialogEditPreviewCategory(i, idx) {
      this.editId = idx;
      this.openDialogPreviewCategory(this.listPreviewCategory[idx]);
    },
    removePreviewCategory(i, idx) {
      this.listPreviewCategory.splice(idx, 1);
    },
    addListPercentage() {
      let i = 0;
      this.listPercentage = [];
      this.listPercentage.push({
        text: "Tulis Persentase",
        value: "tulis_persentase",
      });
      do {
        i += 5;
        let reqQty = (i / 100) * this.totalData;
        this.listPercentage.push({
          text: `${i}%`,
          value: i,
          disabled:
            this.editId != null
              ? false
              : this.dataPreview.available < reqQty ||
                i > this.availablePercentage,
        });
      } while (i < 100);
    },
    countQtyFromPercent(data) {
      this.totalQtyGreater = 0;
      for (let i = 0; i < data.length; i++) {
        const e = data[i];
        e.qty = (e.percentage / 100) * this.totalData;
        if (e.qty > e.available) {
          this.totalQtyGreater++;
        }
      }
    },
    sortingPreviewData(data) {
      data.sort((a, b) => {
        let fa = a.value.toLowerCase();
        let fb = b.value.toLowerCase();
        return b.percentage - a.percentage || fa.localeCompare(fb);
      });
    },
    changeAvailablePercentage(v) {
      this.availablePercentage = 100;
      this.availablePercentage -= v;
    },
  },
};
</script>

<style lang="scss" scoped>
.font-10 {
  font-size: 10px;
}
.font-24 {
  font-size: 24px;
}
.border-alert {
  border: 1px solid red !important;
}
.box-exclamation {
  border-radius: 8px;
}
</style>
