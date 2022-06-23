<template>
  <div>
    <HeaderContent label="Master Kategori" />

    <div class="d-flex">
      <div>
        <v-card outlined width="488px" style="border-radius: 8px">
          <div>
            <div class="d-flex justify-space-between align-center ma-4">
              <v-text-field
                v-model="searchMasterCategory"
                placeholder="Search kategori"
                dense
                outlined
                full-width
                hide-details
                class="font-12"
                clearable
                @keyup.enter="actionSearchListMasterCategory"
              ></v-text-field>
              <div>
                <v-btn
                  depressed
                  text
                  color="secondary"
                  class="text-capitalize"
                  @click="dialogAddCategory = true"
                >
                  <v-icon left dense small>fas fa-plus</v-icon>
                  Kategori Baru
                </v-btn>
              </div>
            </div>

            <div
              class="d-flex justify-space-between align-center whitesmoke grey--text font-12 font-weight-medium px-2"
              style="height: 24px"
            >
              <span>Total Kategori</span>
              <span>{{ totalCategory }}</span>
            </div>

            <div style="height: 700px; overflow: auto">
              <div
                v-if="alertFailedSearchMasterCategory"
                class="d-flex align-start pa-3"
              >
                <v-icon small color="red" class="mr-1"
                  >fas fa-exclamation-circle</v-icon
                >
                <span class="font-12 font-weight-medium red--text"
                  >Tidak menemukan keyword yang sesuai dengan yang kamu cari
                  silahkan gunakan keyword lain</span
                >
              </div>
              <div v-else>
                <div v-if="listMasterCategorySearch.length > 0" class="py-2">
                  <div
                    v-for="i in listMasterCategorySearch"
                    :key="i.id"
                    class="d-flex align-center grey--text font-weight-medium mx-2 px-3"
                    :class="{
                      'selected-category': i.value == selectedCategory.value,
                    }"
                    style="height: 32px"
                    @click="selectCategory(i)"
                  >
                    <span class="font-12">{{ i.value }}</span>
                  </div>
                </div>
                <div v-else>
                  <div
                    v-if="listMasterCategory.length == 0"
                    class="d-flex justify-center mt-4"
                  >
                    <span class="font-12">Tidak ada kategori</span>
                  </div>
                  <div v-else class="py-2">
                    <div
                      v-for="i in listMasterCategory"
                      :key="i.id"
                      class="d-flex align-center grey--text font-weight-medium mx-2 px-3"
                      :class="{
                        'selected-category': i.value == selectedCategory.value,
                      }"
                      style="height: 32px"
                      @click="selectCategory(i)"
                    >
                      <span class="font-12">{{ i.value }}</span>
                    </div>
                    <div v-if="pageCategory < totalPageCategory">
                      <v-card v-intersect="onScrollCategory">
                        <v-progress-circular
                          indeterminate
                          color="secondary"
                        ></v-progress-circular>
                      </v-card>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </v-card>
      </div>

      <div class="mt-12 ml-5">
        <v-card outlined width="488px" style="border-radius: 8px">
          <div class="d-flex justify-space-between align-center">
            <div
              class="d-flex align-center font-12 font-weight-medium py-4 px-3"
            >
              <span v-if="selectedCategory != null"
                >{{ `${selectedCategory.value} /` }}
              </span>
              <span class="silver--text ml-1">Sub Kategori</span>
            </div>

            <v-btn
              depressed
              text
              color="secondary"
              class="text-capitalize"
              @click="dialogAddSubCategory = true"
            >
              <v-icon left dense small>fas fa-plus</v-icon>
              Sub Kategori Baru
            </v-btn>
          </div>

          <v-divider></v-divider>

          <div>
            <div class="ma-4">
              <v-text-field
                v-model="searchSubCategory"
                placeholder="Search Sub kategori"
                dense
                outlined
                full-width
                hide-details
                class="font-12"
                clearable
                @keyup.enter="actionSearchListSubCategory"
              ></v-text-field>
            </div>

            <div
              class="d-flex justify-space-between align-center whitesmoke grey--text font-12 font-weight-medium px-2"
              style="height: 24px"
            >
              <span>Total Sub Kategori</span>
              <span>{{ totalSubCategory }}</span>
            </div>

            <div style="height: 601px; overflow: auto">
              <div
                v-if="alertFailedSearchSubCategory"
                class="d-flex align-start pa-3"
              >
                <v-icon small color="red" class="mr-1"
                  >fas fa-exclamation-circle</v-icon
                >
                <span class="font-12 font-weight-medium red--text"
                  >Tidak menemukan keyword yang sesuai dengan yang kamu cari
                  silahkan gunakan keyword lain</span
                >
              </div>
              <div v-else >
                <div v-if="listSubCategorySearch.length > 0" class="py-2">
                  <div
                    v-for="i in listSubCategorySearch"
                    :key="i.id"
                    class="grey--text font-weight-medium mx-2"
                    style="height: 32px"
                  >
                    <span class="font-12">{{ i.value }}</span>
                  </div>
                </div>
                <div v-else>
                  <div
                    v-if="listSubCategory.length == 0"
                    class="d-flex justify-center mt-4"
                  >
                    <span class="font-12">Tidak ada Sub kategori</span>
                  </div>
                  <div v-else class="py-2">
                    <div
                      v-for="i in listSubCategory"
                      :key="i.id"
                      class="grey--text font-weight-medium mx-2"
                      style="height: 32px"
                    >
                      <span class="font-12">{{ i.value }}</span>
                    </div>
                    <v-card v-intersect="onScrollSubCategory"></v-card>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </v-card>
      </div>
    </div>

    <v-dialog v-model="dialogAddCategory" width="343">
      <v-card>
        <div>
          <div class="pt-5 px-5 pb-3">
            <b>Tambah Kategori</b>
          </div>

          <v-divider></v-divider>

          <div class="py-3 px-5">
            <span class="font-12">Nama Category</span>
            <v-text-field
              v-model="newMasterCategory"
              placeholder="Ex: Olahraga"
              dense
              outlined
              hide-details
              class="font-12 mt-2"
            ></v-text-field>
          </div>

          <v-divider></v-divider>

          <div class="d-flex justify-space-between py-3 px-5">
            <v-btn
              depressed
              color="whitesnow"
              class="text-capitalize"
              width="145"
              @click="dialogAddCategory = false"
            >
              Batal
            </v-btn>
            <v-btn
              depressed
              width="145"
              color="secondary"
              class="text-capitalize"
              @click="actionAddNewMasterCategory"
              :disabled="newMasterCategory == ''"
            >
              Simpan
            </v-btn>
          </div>
        </div>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogAddSubCategory" width="343">
      <v-card>
        <div>
          <div class="pt-5 px-5 pb-3">
            <b>Tambah Sub Kategori</b>
          </div>

          <v-divider></v-divider>

          <div class="py-3 px-5">
            <div class="mb-4">
              <span class="font-12 font-weight-medium grey--text"
                >Nama Kategori</span
              ><br />
              <span class="font-12 font-weight-medium">{{
                selectedCategory.value
              }}</span>
            </div>
            <span class="font-12">Nama Sub Category</span>
            <v-text-field
              v-model="newSubCategory"
              placeholder="Ex: Olahraga"
              dense
              outlined
              hide-details
              class="font-12 mt-2"
            ></v-text-field>
          </div>

          <v-divider></v-divider>

          <div class="d-flex justify-space-between py-3 px-5">
            <v-btn
              depressed
              color="whitesnow"
              class="text-capitalize"
              width="145"
              @click="dialogAddSubCategory = false"
            >
              Batal
            </v-btn>
            <v-btn
              depressed
              width="145"
              color="secondary"
              class="text-capitalize"
              @click="actionAddNewSubCategory"
              :disabled="newSubCategory == ''"
            >
              Simpan
            </v-btn>
          </div>
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
import { mapActions } from "vuex";

export default {
  components: {
    HeaderContent,
  },
  data() {
    return {
      newMasterCategory: "",
      newSubCategory: "",
      searchMasterCategory: "",
      searchSubCategory: "",
      dialogAddCategory: false,
      dialogAddSubCategory: false,
      selectedCategory: {
        id: null,
        value: null,
      },
      listMasterCategory: [],
      listSubCategory: [],
      listMasterCategorySearch: [],
      listSubCategorySearch: [],
      totalCategory: 0,
      totalSubCategory: 0,
      pageCategory: 0,
      pageSubCategory: 0,
      totalPageCategory: 0,
      totalPageSubCategory: 0,
      dataDialogSubCategory: {},
      alertSuccess: false,
      alertFailed: false,
      alertFailedSearchMasterCategory: false,
      alertFailedSearchSubCategory: false,
      dataFailed: {
        message: "",
      },
    };
  },
  watch: {
    "selectedCategory.id"() {
      this.pageSubCategory = 0;
      this.listSubCategory = [];
      this.listSubCategorySearch = []
      this.alertFailedSearchMasterCategory = false;
      this.alertFailedSearchSubCategory = false;
      this.handleGetListSubCategory();
    },
    dialogAddCategory() {
      if (!this.dialogAddCategory) {
        this.newMasterCategory = "";
      }
    },
    dialogAddSubCategory() {
      if (!this.dialogAddSubCategory) {
        this.newSubCategory = "";
        this.dataDialogSubCategory = {};
      }
    },
    searchMasterCategory() {
      if (this.searchMasterCategory == null) {
        this.searchMasterCategory = "";
        this.actionSearchListMasterCategory();
      }
    },
  },
  mounted() {
    this.handleGetListMasterCategory();
  },
  methods: {
    ...mapActions({
      getListCategory: "masterCategory/getListCategory",
      getListSubCategory: "masterCategory/getListSubCategory",
      searchListCategory: "masterCategory/searchListCategory",
      searchListSubCategory: "masterCategory/searchListSubCategory",
      addMasterCategory: "masterCategory/addMasterCategory",
      addSubCategory: "masterCategory/addSubCategory",
    }),
    selectCategory(val) {
      this.selectedCategory = val;
    },
    handleGetListMasterCategory() {
      this.listMasterCategory = [];
      this.pageCategory = 1;
      let payload = {
        params: {
          size: 10,
          page: 0,
        },
      };
      return this.getListCategory(payload)
        .then((response) => {
          this.totalCategory = response.data.totalElements;
          this.totalPageCategory = response.data.totalPages;
          for (let i = 0; i < response.data.content.length; i++) {
            const e = response.data.content[i];
            this.listMasterCategory.push(e);
            if (this.selectedCategory.value == null && i == 0) {
              this.selectedCategory = response.data.content[0];
            }
          }
        })
        .catch((err) => {
          this.alertFailed = true;
          this.dataFailed = err.response.data;
        });
    },
    onScrollCategory() {
      let payload = {
        params: {
          size: 10,
          page: this.pageCategory,
        },
      };
      return this.getListCategory(payload)
        .then((response) => {
          this.pageCategory++;
          for (let i = 0; i < response.data.content.length; i++) {
            const e = response.data.content[i];
            this.listMasterCategory.push(e);
            if (this.selectedCategory.value == null && i == 0) {
              this.selectedCategory = response.data.content[0];
            }
          }
        })
        .catch((err) => {
          this.alertFailed = true;
          this.dataFailed = err.response.data;
        });
    },
    actionSearchListMasterCategory() {
      let payload = {
        search: this.searchMasterCategory,
      };
      return this.searchListCategory(payload)
        .then((response) => {
          if (response.data.length > 0) {
            this.alertFailedSearchMasterCategory = false;
            this.listMasterCategorySearch = response.data;
          } else {
            this.alertFailedSearchMasterCategory = true;
          }
        })
        .catch((err) => {
          this.alertFailed = true;
          this.alertFailedSearchMasterCategory = false;
          this.dataFailed = err.response.data;
        });
    },
    handleGetListSubCategory() {
      this.listSubCategory = [];
      this.pageSubCategory = 1;
      let payload = {
        id: this.selectedCategory.id,
        params: {
          size: 10,
          page: 0,
        },
      };
      return this.getListSubCategory(payload)
        .then((response) => {
          this.totalSubCategory = response.data.totalElements;
          this.totalPageSubCategory = response.data.totalPages;
          for (let i = 0; i < response.data.content.length; i++) {
            const e = response.data.content[i];
            this.listSubCategory.push(e);
          }
        })
        .catch((err) => {
          this.alertFailed = true;
          this.dataFailed = err.response.data;
        });
    },
    onScrollSubCategory() {
      let payload = {
        id: this.selectedCategory.id,
        params: {
          size: 10,
          page: this.pageSubCategory,
        },
      };
      return this.getListSubCategory(payload)
        .then((response) => {
          this.pageSubCategory++;
          for (let i = 0; i < response.data.content.length; i++) {
            const e = response.data.content[i];
            this.listSubCategory.push(e);
          }
        })
        .catch((err) => {
          this.alertFailed = true;
          this.dataFailed = err.response.data;
        });
    },
    actionSearchListSubCategory() {
      let payload = {
        id: this.selectedCategory.id,
        search: this.searchSubCategory,
      };
      return this.searchListSubCategory(payload)
        .then((response) => {
          if (response.data.length > 0) {
            this.alertFailedSearchSubCategory = false;
            this.listSubCategorySearch = response.data;
          } else {
            this.alertFailedSearchSubCategory = true;
          }
        })
        .catch((err) => {
          this.alertFailed = true;
          this.alertFailedSearchSubCategory = false;
          this.dataFailed = err.response.data;
        });
    },
    actionAddNewMasterCategory() {
      let payload = {
        value: this.newMasterCategory,
      };
      return this.addMasterCategory(payload)
        .then(() => {
          this.alertSuccess = true;
          this.handleGetListMasterCategory();
          this.dialogAddCategory = false;
        })
        .catch((err) => {
          this.alertFailed = true;
          this.dataFailed = err.response.data;
        });
    },
    actionAddNewSubCategory() {
      let payload = {
        idHashtagCategory: this.selectedCategory.id,
        value: this.newSubCategory,
      };
      return this.addSubCategory(payload)
        .then((response) => {
          this.alertSuccess = true;
          this.handleGetListSubCategory();
          this.dialogAddSubCategory = false;
        })
        .catch((err) => {
          this.alertFailed = true;
          this.dataFailed = err.response.data;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.font-24 {
  font-size: 24px;
}
.selected-category {
  color: $secondary !important;
  background: $secondarylowtint;
}
</style>
