<template>
  <div>
    <HeaderContent
      label="Kategori Produk"
      :list="crumbs"
      labelAction="Create Categori"
    />
    <div :class="cat.header">
      <div class="d-flex align-center" style="gap : 20px">
        <div :class="cat.label">Search</div>
        <k-input v-model="search" size="sm" model="flat" />
        <custom-button
          size="x-small"
          color="secondary"
          @click="movePage('category/create')"
					:disabled="isChanged"
        >
          <v-icon left dark size="12px">
            fa-solid fa-plus
          </v-icon>
          Tambah Categori
        </custom-button>
      </div>
      <div v-if="isChanged" class="d-flex align-center" style="gap : 6px">
        <div :class="cat.alert">
          Ada perubahan urutan kategori yang belum kamu simpan!
        </div>
        <custom-button @click="onCancel" size="x-small" color="whitesnow">
          Batalkan Perubahan
        </custom-button>
        <custom-button @click="onSave" size="x-small" color="secondary">
          Simpan Perubahan Urutan Kategori
        </custom-button>
      </div>
    </div>

    <div style="max-height: 600px; overflow: auto;">
      <Table
        :data="search != '' ? dataTableSearch : dataTable"
        @onChangeData="onChangeData"
      />
    </div>
    <span :class="cat.total"
      >Total Kategori:
      <span style="color: black;">
        {{ dataTable.length }}
      </span>
    </span>
  </div>
</template>

<script>
import HeaderContent from "@/containers/HeaderContent";
import { mapActions } from "vuex";
import Table from "./table.vue";

export default {
  components: {
    HeaderContent,
    Table,
  },
  data() {
    return {
      dialogCategory: false,
      isChanged: false,
      crumbs: [
        {
          text: "Kategori",
          disabled: true,
        },
      ],
      search: "",
      dataTable: [],
      dataTableSearch: [],
      payloadReorder: [],
      sequenceBeforeChange: [],
    };
  },
  watch: {
    search() {
      if (this.search != "") {
        this.searchDataTable(this.search);
      } else {
        this.dataTableSearch = [];
      }
    },
  },
  mounted() {
    this.handleGetListCategory();
  },
  methods: {
    ...mapActions({
      getListCategory: "productCategory/getListCategory",
      reorderCategory: "productCategory/reorderCategory",
    }),
    onSave() {
      this.dataTable = [];
      return this.reorderCategory(this.payloadReorder)
        .then((res) => {
          this.isChanged = false;
          return this.handleGetListCategory();
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
    onCancel() {
      this.dataTable = [];
      this.isChanged = false;
      this.handleGetListCategory();
    },
    onChangeData(updatedData) {
      this.isChanged = true;
      const payload = updatedData.map((d, idx) => {
        return {
          id: d.id,
          sequence: this.sequenceBeforeChange[idx],
        };
      });
      this.payloadReorder = payload;
    },
    handleGetListCategory() {
      localStorage.removeItem("detail-category");
      return this.getListCategory()
        .then((res) => {
          const data = res.data;
          this.dataTable = data;
          data.map((item) => {
            this.sequenceBeforeChange.push(item.sequence);
          });
        })
        .catch((err) => {
          console.log({ err });
        });
    },
    searchDataTable(v) {
      this.dataTableSearch = [];
      this.dataTable.map((item) => {
        if (item.name.toLowerCase().includes(v)) {
          this.dataTableSearch.push(item);
        }
      });
    },
    movePage(v) {
      this.$router.push(v);
    },
  },
};
</script>

<style lang="scss" module="cat">
.header {
  height: 34px;
  background-color: #eeeeee;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 6px 0 16px;
}
.label {
  font-size: 12px;
  font-weight: 400;
  color: $charcoal;
}
.alert {
  font-size: 11px;
  font-weight: 500;
  color: $primary;
}

.total {
  font-size: 12px;
  font-weight: 500;
  color: $silver;
}
</style>
