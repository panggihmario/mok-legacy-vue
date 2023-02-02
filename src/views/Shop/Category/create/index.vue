<template>
  <div>
    <HeaderContent
      label="Kategori Produk"
      :list="crumbs"
      labelAction="Create Categori"
    />
    <div>
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
            typeAllowed="png"
            :maxSize="1000000"
            isSquareRatio
            @response="getResponseUpload"
          ></upload-oss>
          <ul class="mt-2">
            <li>
              Gunakan rasio 1:1
            </li>
            <li>
              Foto tidak lebih dari 1MB
            </li>
            <li>
              Gunakan ekstensi .png
            </li>
          </ul>
          <div v-if="isErrorUpload" class="error-upload mt-2">
            <span>Gambar kategori harus memenuhi kriteria diatas</span>
          </div>
        </div>
      </div>
    </div>

    <div class="category-box-input mt-6">
      <div class="mb-4">
        <k-input
          v-model="dataPayload.params.name"
          label="Nama Kategori"
          :counter="200"
          :isError="isErrorDuplicate"
          errorMessage="Nama kategori sudah tersedia, silahkan gunakan nama lain!"
          @errorCounter="(v) => (isErrorCounterName = v)"
        ></k-input>
      </div>
      <k-textarea
        v-model="dataPayload.params.description"
        title="Detail Kategori"
        rows="6"
        :counter="200"
        :isError="isErrorEmptyDescription"
        errorMessage="Detail kategori tidak boleh kosong"
        @blur="checkDescriptionEmpty"
        @errorCounter="(v) => (isErrorCounterCategory = v)"
      ></k-textarea>
    </div>

    <div class="d-flex mt-4" style="gap: 8px;">
      <custom-button @click="changePage('/category')">Batalkan</custom-button>
      <custom-button
        color="secondary"
        :disabled="
          dataPayload.params.icon == '' ||
            dataPayload.params.name == '' ||
            dataPayload.params.description == '' ||
            isErrorCounterName ||
            isErrorCounterCategory
        "
        :loading="loading"
        @click="actionHandleClick"
        >Simpan ke Daftar Kategori</custom-button
      >
    </div>

    <v-snackbar top right v-model="alertSuccess" color="success">
      Create Success
    </v-snackbar>
    <v-snackbar top right v-model="alertError" color="error">
      {{ errorMessage }}
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
      crumbs: [
        {
          text: "shop",
        },
        {
          text: "Kategori",
          disabled: true,
        },
      ],
      dataPayload: {
        id: "",
        params: {
          icon: "",
          name: "",
          description: "",
        },
      },
      loading: false,
      alertSuccess: false,
      alertError: false,
      errorMessage: "",
      isErrorUpload: false,
      isErrorDuplicate: false,
      isErrorEmptyDescription: false,
      isErrorCounterName: false,
      isErrorCounterCategory: false,
    };
  },
  watch: {
    "dataPayload.params.name"() {
      this.isErrorDuplicate = false;
    },
    "dataPayload.params.description"() {
      this.isErrorEmptyDescription = false;
    },
  },
  mounted() {
    this.handleGetDataLocal();
  },
  methods: {
    ...mapActions({
      createCategory: "productCategory/createCategory",
      editCategory: "productCategory/editCategory",
    }),
    getResponseUpload(data) {
      if (data.status == "success") {
        this.isErrorUpload = false;
        this.dataPayload.params.icon = data.response.url;
      } else if (data.status == "failed") {
        this.isErrorUpload = true;
      }
    },
    handleGetDataLocal() {
      if (this.$route.name == "editCategory") {
        const data = JSON.parse(localStorage.getItem("detail-category"));
        this.dataPayload.id = data.id;
        this.dataPayload.params.icon = data.icon;
        this.dataPayload.params.name = data.name;
        this.dataPayload.params.description = data.description;
      }
    },
    actionCreateCategory() {
      this.loading = true;
      return this.createCategory(this.dataPayload.params)
        .then((res) => {
          this.loading = false;
          this.alertSuccess = true;
          this.changePage("/category");
        })
        .catch((err) => {
          this.errorMessage = err.response.data.data;
          this.loading = false;
          if (err.response.data.message == "Data already exists") {
            this.isErrorDuplicate = true;
          } else {
            this.alertError = true;
          }
        });
    },
    actionEditCategory() {
      this.loading = true;
      const data = JSON.parse(localStorage.getItem("detail-category"));
      this.dataPayload.params.sequence = data.sequence;
      return this.editCategory(this.dataPayload)
        .then((res) => {
          this.loading = false;
          this.alertSuccess = true;
          this.changePage("/category");
        })
        .catch((err) => {
          this.errorMessage = err.response.data.data;
          this.loading = false;
          if (err.response.data.data.includes("already exists")) {
            this.isErrorDuplicate = true;
          } else {
            this.alertError = true;
          }
        });
    },
    actionHandleClick() {
      if (this.dataPayload.id == "") {
        this.actionCreateCategory();
      } else {
        this.actionEditCategory();
      }
    },
    checkDescriptionEmpty() {
      if (this.dataPayload.params.description == "") {
        this.isErrorEmptyDescription = true;
      } else {
        this.isErrorEmptyDescription = false;
      }
    },
    changePage(v) {
      this.$router.push(v);
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
    &-input {
      width: 500px;
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

.alert-exist {
  font-size: 10px;
  color: $warning;
  font-weight: 600px;
}

.error-upload {
  background-color: $primarylowtint;
  color: $warning;
  font-size: 9px;
  padding: 4px;
  border-radius: 2px;
}
</style>
