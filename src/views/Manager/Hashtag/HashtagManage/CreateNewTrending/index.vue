<template>
  <div>
    <HeaderContent label="Buat Trending Baru"></HeaderContent>

    <div class="d-flex">
      <div>
        <span class="font-12">Channel</span>
        <div class="d-flex align-center">
          <div style="width: 303px">
            <div class="d-flex align-center imitate-btn font-12 my-2 px-3">
              <span class="text-capitalize font-weight-medium">{{
                $route.query.item
              }}</span>
            </div>
          </div>
        </div>
        <p class="font-10" style="width: 303px">
          Formasi akan diterapkan pada cleeps
          <span class="text-capitalize">{{ $route.query.item }}</span>
        </p>
      </div>
      <div class="ml-3">
        <span class="font-12">Jumlah data</span>
        <div class="d-flex align-center">
          <div style="width: 303px">
            <v-text-field
              v-model="totalData"
              placeholder="ex: 500"
              outlined
              dense
              hide-details
              type="number"
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
          Merupakan batas muat konten yang ditampilkan dalam satu linimasa. Jika
          sudah mencapai batas maksimal, maka konten akan dimuat dari awal
          dengan jumlah dan formasi yang sama.
        </p>
      </div>
    </div>

    <div class="d-flex mt-6">
      <Box-List-Hashtag
        :listMasterCategory="listMasterCategory"
        :listMasterCategorySearch="listMasterCategorySearch"
        :listPreviewCategory="listPreviewCategory"
        :availablePercentage="availablePercentage"
        :page="page"
        :totalPages="totalPages"
        :alertFailedSearch="alertFailedSearch"
        :isSearchData="isSearchData"
        :loadingListMasterCategory="loadingListMasterCategory"
        :loadingSearch="loadingSearch"
        @actionSearchListHashtagFormationSubs="actionFilterCategoryByName"
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
            <v-row no-gutters>
              <v-col class="pr-1">
                <span class="font-12 font-weight-medium">Persentase</span>
                <div class="d-flex mt-1">
                  <div>
                    <v-text-field
                      v-model="dataPreview.percentage"
                      suffix="%"
                      outlined
                      dense
                      hide-details
                      background-color="whitesnow"
                      class="font-12"
                      type="number"
                      @focus="isInputPercentage = true"
                      @blur="isInputPercentage = false"
                    ></v-text-field>
                  </div>
                </div>
              </v-col>
              <v-col class="pl-1">
                <span class="font-12 font-weight-medium">Qty</span>
                <div class="mt-1">
                  <v-text-field
                    v-model="dataPreview.qty"
                    outlined
                    dense
                    hide-details
                    background-color="whitesnow"
                    class="font-12"
                    type="number"
                    @focus="isInputQty = true"
                    @blur="isInputQty = false"
                  ></v-text-field>
                </div>
              </v-col>
            </v-row>

            <p class="font-10 font-weight-medium mt-2">
              Persentase digunakan untuk menentukan proporsional kuantitas data
              dari total data yang akan ditampilkan.
            </p>
            <div v-if="editId == null">
              <p
                v-if="
                  dataPreview.percentage &&
                    dataPreview.percentage <= availablePercentage &&
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
                v-else-if="dataPreview.percentage < 1"
                class="red--text font-12"
              >
                Kurang dari total presentase, tambah presentase!
              </p>
              <p
                v-else-if="dataPreview.percentage > availablePercentage"
                class="red--text font-12"
              >
                Melebihi total presentase, kurangi presentase!
              </p>
              <p
                v-else-if="dataPreview.qty > dataPreview.available"
                class="red--text font-12"
              >
                Melebihi total presentase, kurangi presentase!
              </p>
            </div>
            <div v-else>
              <p class="font-12">
                Konten <b>#{{ dataPreview.value }}</b> yang akan ditampilkan
                adalah
                <b class="secondary--text">{{
                  (dataPreview.percentage / 100) * totalData
                }}</b>
              </p>
            </div>
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
                dataPreview.percentage == 0 ||
                (editId == null &&
                  dataPreview.percentage > availablePercentage) ||
                dataPreview.percentage < 0
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
      page: 1,
      totalPages: 0,
      totalElements: 0,
      totalData: null,
      dialogAddPreview: false,
      dataPreview: {
        id: 0,
        value: "",
        available: 0,
        qty: null,
        percentage: null,
        index: 0,
        indexBeforeSearch: 0,
      },
      listPercentage: [],
      filterPercentage: null,
      availablePercentage: 100,
      loadingSubmit: false,
      loadingSearch: false,
      loadingListMasterCategory: false,
      isSearchData: false,
      isInputPercentage: false,
      isInputQty: false,
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
    "dataPreview.percentage"() {
      let percent = parseFloat(this.dataPreview.percentage || 0);
      if (this.isInputPercentage) {
        if (percent != "" || percent != 0 || percent != null) {
          this.dataPreview.qty = (percent / 100) * this.totalData;
        } else {
          this.dataPreview.percentage = "";
        }
      }
    },
    "dataPreview.qty"() {
      let qty = parseFloat(this.dataPreview.qty || 0);
      if (this.isInputQty) {
        if (qty != "" || qty != 0 || qty != null) {
          this.dataPreview.percentage = (qty / this.totalData) * 100;
        } else {
          this.dataPreview.qty = "";
        }
      }
    },
    totalData() {
      this.alertData = false;
      this.countQtyFromPercent(this.listPreviewCategory);
    },
    dialogAddPreview() {
      if (!this.dialogAddPreview) {
        this.editId = null;
        this.dataPreview.percentage = null;
        this.dataPreview.qty = null;
      }
    },
    totalPages() {
      for (let i = 1; i < this.totalPages; i++) {
        this.page = i;
        this.onScrollListCategory();
      }
    },
    listMasterCategory() {
      if (this.listMasterCategory.length > 0) {
        if (this.listMasterCategory.length == this.totalElements) {
          for (let i = 0; i < this.listMasterCategory.length; i++) {
            const e = this.listMasterCategory[i];
            this.handleGetAvailabilitySubHashtag(e, i);
          }
        }
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
      let payload = {
        params: {
          size: 50,
          page: 0,
        },
      };
      this.loadingListMasterCategory = true;
      this.listMasterCategory = [];
      this.listMasterCategorySearch = [];
      this.isSearchData = false;
      return this.getListHashtagFormationSubs(payload)
        .then((response) => {
          this.totalPages = response.data.totalPages;
          this.totalElements = response.data.totalElements;
          let content = response.data.content;
          for (let i = 0; i < content.length; i++) {
            const e = content[i];
            this.listMasterCategory.push({
              ...e,
              available: 0,
              indexBeforeSearch: i,
            });
          }
        })
        .catch((err) => {
          this.alertFailed = true;
          this.loadingListMasterCategory = false;
          this.dataFailed = err.response.data;
        });
    },
    onScrollListCategory(entries, observer) {
      if (this.page <= this.totalPages) {
        let payload = {
          params: {
            size: 50,
            page: this.page,
          },
        };
        this.loadingListMasterCategory = true;
        this.listMasterCategorySearch = [];
        this.isSearchData = false;
        return this.getListHashtagFormationSubs(payload)
          .then((response) => {
            this.page++;
            let content = response.data.content;
            for (let i = 0; i < content.length; i++) {
              const e = content[i];
              this.listMasterCategory.push({ ...e, available: 0 });
            }
          })
          .catch((err) => {
            this.alertFailed = true;
            this.dataFailed = err.response.data;
          });
      } else {
        return;
      }
    },
    handleGetAvailabilitySubHashtag(content, idx, isSearch) {
      return this.getAvailabilitySubHashtag(content.value)
        .then((response) => {
          let avail = response.data ? response.data.available : "no data";
          if (this.isSearchData) {
            this.listMasterCategorySearch[idx].available = avail;
          } else {
            this.listMasterCategory[idx].available = avail;
          }
        })
        .catch((err) => {
          this.loadingListMasterCategory = false;
          this.loadingSearch = false;
        });
    },
    // actionSearchListHashtagFormationSubs(v) {
    //   this.listMasterCategorySearch = [];
    //   let payload = {
    //     search: v,
    //   };
    //   this.listMasterCategory = [];
    //   this.listMasterCategorySearch = [];
    //   this.loadingSearch = true;
    //   this.totalElements = 0;
    //   this.isSearchData = true;
    //   return this.searchListHashtagFormationSubs(payload)
    //     .then((response) => {
    //       if (response.data.length > 0) {
    //         this.alertFailedSearch = false;
    //         this.totalElements = response.data.length;
    //         this.loadingSearch = false;
    //         let content = response.data;
    //         for (let i = 0; i < content.length; i++) {
    //           const e = content[i];
    //           this.listMasterCategorySearch.push({ ...e, available: 0 });
    //           // this.listMasterCategory.push({ ...e, available: 0 });
    //         }
    //       } else {
    //         this.alertFailedSearch = true;
    //       }
    //     })
    //     .catch((err) => {
    //       this.alertFailed = true;
    //       this.alertFailedSearch = false;
    //       this.loadingSearch = false;
    //       this.dataFailed = err.response.data;
    //     });
    // },
    actionFilterCategoryByName(v) {
      if (v == "" || v == null) {
        this.isSearchData = false;
      } else {
        this.isSearchData = true;
      }
      let filteredData = this.listMasterCategory.filter((e, idx) => {
        if (e.value.toLowerCase().includes(v.toLowerCase())) {
          return { ...e };
        }
      });
      this.listMasterCategorySearch = filteredData;
    },
    actionCreateDetailSubsHashtag() {
      let payload = {
        totalQty: this.totalData,
        hashtags: [],
      };

      this.sortingPreviewData(this.listPreviewCategory);
      this.countQtyFromPercent(this.listPreviewCategory);
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
          // this.loadingSubmit = false;
          setTimeout(() => {
            this.$router.push("/manage/hashtag");
          }, 3000);
        })
        .catch((err) => {
          this.loadingSubmit = false;
        });
    },
    openDialogPreviewCategory(i, idx) {
      if (
        this.totalData > 0 &&
        this.totalData !== null &&
        this.totalData !== ""
      ) {
        this.dialogAddPreview = true;
        this.dataPreview = {
          ...i,
          percentage: i.percentage || null,
          qty: i.qty || null,
        };
        this.dataPreview.index = idx;
      } else {
        this.alertData = true;
      }
    },
    addPreviewCategory() {
      if (this.editId == null) {
        this.listPreviewCategory.push({
          ...this.dataPreview,
          percentage: this.dataPreview.percentage,
          totalData: this.totalData,
        });
        if (this.isSearchData) {
          this.listMasterCategorySearch.splice(this.dataPreview.index, 1);
          this.listMasterCategory.splice(this.dataPreview.indexBeforeSearch, 1);
          for (let idx = 0; idx < this.listMasterCategory.length; idx++) {
            const e = this.listMasterCategory[idx];
            if (e.indexBeforeSearch > this.dataPreview.indexBeforeSearch) {
              e.indexBeforeSearch--;
            }
          }
        } else {
          this.listMasterCategory.splice(this.dataPreview.index, 1);
        }
      } else {
        this.listPreviewCategory[this.editId] = {
          ...this.dataPreview,
          percentage: this.dataPreview.percentage,
          totalData: this.totalData,
        };
      }
      this.sortingPreviewData(this.listPreviewCategory);
      this.countQtyFromPercent(this.listPreviewCategory);
      this.dialogAddPreview = false;
    },
    openDialogEditPreviewCategory(i, idx) {
      this.editId = idx;
      this.openDialogPreviewCategory(i);
    },
    removePreviewCategory(i, idx) {
      this.listPreviewCategory.splice(idx, 1);
      if (this.isSearchData) {
        this.listMasterCategorySearch.splice(i.index, 0, i);
      } else {
        this.listMasterCategory.splice(i.index, 0, i);
      }
    },
    addListPercentage() {
      let i = 0;
      this.listPercentage = [];
      do {
        i += 5;
        let reqQty = (i / 100) * this.totalData;
        this.listPercentage.push({
          text: `${i}%`,
          value: i,
          disabled: this.editId != null ? false : i > this.availablePercentage,
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
.imitate-btn {
  height: 40px;
  width: 303px;
  background-color: $whitesmoke;
  border-radius: 4px;
}
</style>
