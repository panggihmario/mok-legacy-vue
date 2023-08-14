<template>
  <div>
    <HeaderContent label="Kategori" :list="crumbs">
      <custom-button color="primary" @click="isDialog = true"
        >Create Categori</custom-button
      >
    </HeaderContent>
    <section>
      <Table :data="dataCategory" @actionEdit="actionEdit"></Table>
    </section>
    <v-dialog v-model="isDialog" width="435">
      <v-card class="pa-3">
        <div class="d-flex">
          <section class="ml-3 my-3">
            <span style="font-weight: 800; font-size: 14px"
              >Tambah Kategori</span
            >
            <div>
              <section class="mt-4 mb-5">
                <div class="d-flex gap-14">
                  <div
                    v-if="dataPayload.params.icon == ''"
                    class="category-box-no-img"
                  ></div>
                  <div v-else class="category-box-img">
                    <div class="d-flex justify-end">
                      <div
                        class="d-flex justify-center align-center clear-icon"
                        @click="dataPayload.params.icon = ''"
                      >
                        <span class="fa fa-times"></span>
                      </div>
                    </div>
                    <img
                      :src="dataPayload.params.icon"
                      alt=""
                      width="100%"
                      height="100%"
                    />
                  </div>
                  <div>
                    <upload-oss
                      id="create"
                      color="secondary"
                      :typeAllowed="['png']"
                      :maxSize="1000000"
                      isSquareRatio
                      @response="getResponseUpload"
                    ></upload-oss>
                    <ul class="mt-2">
                      <li>Gunakan rasio 1:1</li>
                      <li>Foto tidak lebih dari 1MB</li>
                      <li>Gunakan ekstensi .png</li>
                    </ul>
                    <div v-if="isErrorUpload" class="error-upload mt-2">
                      <span
                        >Gambar kategori harus memenuhi kriteria diatas</span
                      >
                    </div>
                  </div>
                </div>
              </section>
              <section class="mb-4">
                <k-input
                  label="Nama Kategori"
                  placeholder="Masukan nama kategori"
                  v-model="dataPayload.params.name"
                  :isError="isErrorSubmit"
                  :errorMessage="errorSubmitMessage"
                  rules="max:100"
                ></k-input>
              </section>
              <section class="d-flex" style="gap: 8px">
                <custom-button style="width: 114px" @click="isDialog = false"
                  >Batalkan</custom-button
                >
                <custom-button
                  color="primary"
                  style="width: 257px"
                  :disabled="isDisable"
                  @click="actionSaveCategory"
                  >Simpan Kategori</custom-button
                >
              </section>
            </div>
          </section>
          <section>
            <v-btn icon x-small @click="isDialog = false">
              <v-icon small>fa-times</v-icon>
            </v-btn>
          </section>
        </div>
      </v-card>
    </v-dialog>

    <v-snackbar top right v-model="isSuccessSubmit" color="success">
      Create Success
    </v-snackbar>
    <!-- <v-snackbar top right v-model="isErrorSubmit" color="error">
      {{ errorSubmitMessage }}
    </v-snackbar> -->
  </div>
</template>

<script>
import HeaderContent from "@/containers/HeaderContent";
import { mapActions } from "vuex";
import Table from "./table.vue";
import * as yup from 'yup';
export default {
  components: {
    HeaderContent,
    Table,
  },
  data() {
    return {
      crumbs: [
        {
          text: "Penggalangan Dana",
          disabled: true,
        },
      ],
      dataCategory: [],
      dataPayload: {
        id: "",
        params: {
          icon: "",
          name: "",
        },
      },
      page: 1,
      isDisable: true,
      totalPages: 0,
      isDialog: false,
      isSuccessSubmit: false,
      isErrorUpload: false,
      isErrorSubmit: false,
      errorSubmitMessage: "Tidak boleh lebih dari 100 karakter",
    };
  },
  computed : {
    isForm () {
      const dataForm = {
        ...this.dataPayload,
      }
      return dataForm
    }
  },
  watch: {
    dataPayload : {
      handler : function (value) {
        let schema = yup.object({
          params : yup.object().shape({
            icon : yup.string().required(),
            name : yup.string().required().max(100)
          })
        })
        schema.isValid(value)
          .then(valid => {
            if(valid) {
              this.isDisable = false
            }else{
              this.isDisable = true
            }
          })
      },
      deep : true
    },
    isDialog() {
      if (!this.isDialog) {
        this.isErrorUpload = false;
        this.dataPayload = {
          id: "",
          params: {
            icon: "",
            name: "",
          },
        };
      }
    },
  },
  mounted() {
    this.handleGetListCategory();
  },
  methods: {
    ...mapActions({
      getListCategory: "donationCategory/getListCategory",
      createCategory: "donationCategory/createCategory",
      editCategory: "donationCategory/editCategory",
    }),
    handleGetListCategory() {
      const payload = {
        page: this.page - 1,
        size: 10,
      };
      return this.getListCategory(payload)
        .then((res) => {
          const data = res.data;
          this.dataCategory = data.content;
          this.totalPages = data.totalPages;
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
    getResponseUpload(data) {
      if (data.status == "success") {
        this.isErrorUpload = false;
        this.dataPayload.params.icon = data.response.url;
      } else if (data.status == "failed") {
        this.isErrorUpload = true;
      }
    },
    actionEdit(idx) {
      const data = this.dataCategory[idx];
      this.dataPayload = {
        id: data.id,
        params: { ...data },
      };
      this.isDialog = true;
    },
    actionSaveCategory() {
      if (this.dataPayload.id == "") {
        this.actionCreateCategory();
      } else {
        this.actionEditCategory();
      }
    },
    actionCreateCategory() {
      return this.createCategory(this.dataPayload.params)
        .then((res) => {
          this.isDialog = false;
          this.isSuccessSubmit = true;
          setTimeout(() => {
            this.isSuccessSubmit = false;
          }, 3000);
          this.handleGetListCategory();
        })
        .catch((err) => {
          this.isErrorSubmit = true;
          this.errorSubmitMessage = "Sudah ada kategori dengan nama ini";
          setTimeout(() => {
            this.isErrorSubmit = false;
            this.errorSubmitMessage = ""
          }, 3000);
        });
    },
    actionEditCategory() {
      return this.editCategory(this.dataPayload)
        .then((res) => {
          this.isDialog = false;
          this.isSuccessSubmit = true;
          setTimeout(() => {
            this.isSuccessSubmit = false;
          }, 3000);
          this.handleGetListCategory();
        })
        .catch((err) => {
          console.log(err.response);
          this.isErrorSubmit = true;
          this.errorSubmitMessage = err.response.data.data;
          setTimeout(() => {
            this.isErrorSubmit = false;
          }, 3000);
        });
    },
  },
};
</script>

<style lang="scss">
.category {
  &-box {
    &-no-img {
      height: 100px;
      width: 100px;
      background-color: $whitesnow;
      border-radius: 4px;
    }
    &-img {
      position: relative;
      height: 100px;
      width: 100px;
      background-color: $black;
      border-radius: 4px;
      overflow: hidden;
    }
  }
}

.clear-icon {
  position: absolute;
  top: 4px;
  right: 4px;
  background-color: $danger;
  color: white;
  font-size: 8px;
  height: 12px;
  width: 12px;
  border-radius: 100%;
  cursor: pointer;
}

li {
  font-size: 9px;
}

.gap-14 {
  gap: 14px;
}

.error-upload {
  background-color: $primarylowtint;
  color: $warning;
  font-size: 9px;
  padding: 4px;
  border-radius: 2px;
}
</style>
