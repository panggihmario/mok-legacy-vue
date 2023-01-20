<template>
  <div>
    <HeaderContent
      label="Kategori Produk"
      :list="crumbs"
      labelAction="Create Categori"
    />
    <div>
      <div class="d-flex gap-14">
        <div v-if="dataPayload.icon == ''" class="category-box-no-img"></div>
        <div v-else class="category-box-img">
          <div class="d-flex justify-end">
            <div
              class="d-flex justify-center align-center clear-icon"
              @click="dataPayload.icon = ''"
            >
              <span class="fa fa-times"></span>
            </div>
          </div>
          <img :src="dataPayload.icon" alt="" width="100%" height="100%" />
        </div>
        <div>
          <custom-upload
            id="create"
            color="secondary"
            @response="getResponseUpload"
          ></custom-upload>
          <ul class="mt-4">
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
        </div>
      </div>
    </div>

    <div class="category-box-input mt-6">
      <custom-input
        v-model="dataPayload.categoryName"
        label="Nama Kategori"
        outlined
        colorbg="white"
        height="29px"
      ></custom-input>
      <custom-textarea
        v-model="dataPayload.categoryDetail"
        label="Detail Kategori"
        outlined
        color="white"
        height="97px"
      ></custom-textarea>
    </div>

    <div class="d-flex" style="gap: 8px;">
      <custom-button>Batalkan</custom-button>
      <custom-button
        color="secondary"
        :disabled="
          dataPayload.icon == '' ||
            dataPayload.categoryName == '' ||
            dataPayload.categoryDetail == ''
        "
        >Simpan ke Daftar Kategori</custom-button
      >
    </div>
  </div>
</template>

<script>
import HeaderContent from "@/containers/HeaderContent";

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
        icon: "",
        categoryName: "",
        categoryDetail: "",
      },
    };
  },
  methods: {
    getResponseUpload(data) {
      this.dataPayload.icon = data.response.url;
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
  margin: 4px;
  position: fixed;
  z-index: 100;
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
</style>
