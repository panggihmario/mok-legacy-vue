<template>
  <v-data-table
    :headers="headers"
    hide-default-footer
    :items="data"
    class="grey--text font-12"
    :items-per-page="-1"
  >
    <template v-slot:header.icon="{ header }" class="d-flex">
      <div>
        {{ header.text }}
        <v-tooltip max-width="300" nudge-bottom="50" right>
          <template v-slot:activator="{ on, attrs }">
            <v-icon v-bind="attrs" v-on="on" size="10px" color="secondary">
              fas fa-info-circle
            </v-icon>
          </template>
          <div style="font-size : 11px">
            <div>
              Hanya kategori urutan pertama sampai urutan ke sebelas yang akan
              ditampilkan di menu shop aplikasi Kipaskipas.
            </div>
            <div>
              Gunakan drag & drop dengan tanda ini grip-vertical untuk mengatur
              urutan kategori produk.
            </div>
          </div>
        </v-tooltip>
      </div>
    </template>

    <template v-slot:item.icon="{ item }">
      <v-img :src="item.icon" height="30px" width="30px"></v-img>
    </template>
    <template v-slot:item.description="{ item }">
      <div class="ellipsis" style="max-width: 510px;">
        <span>
          {{ item.description }}
        </span>
      </div>
    </template>
    <template v-slot:item.action="{ item }">
      <div class="d-flex" style="gap : 10px">
        <custom-button
          color="whitesnow"
          size="x-small"
          @click="moveEditPage(item)"
          >Edit Kategori</custom-button
        >
        <v-icon class="my-handle" size="10px">fa-solid fa-grip-vertical</v-icon>
      </div>
    </template>
  </v-data-table>
</template>

<script>
import Sortable from "sortablejs";

export default {
  props: ["data"],
  data() {
    return {
      headers: [
        {
          text: "Icon",
          value: "icon",
          class: "whitesnow",
          sortable: false,
        },
        {
          text: "Nama Kategori",
          value: "name",
          class: "whitesnow",
          sortable: false,
        },
        {
          text: "Tgl Dibuat",
          value: "date",
          class: "whitesnow",
          sortable: false,
        },
        {
          text: "Detail Kategori",
          value: "description",
          class: "whitesnow",
          sortable: false,
        },
        {
          text: "Action",
          value: "action",
          class: "whitesnow",
          sortable: false,
        },
      ],
      dragNdrop: [],
    };
  },
  watch: {
    data() {
      this.initSortable();
    }
  },
  methods: {
    initSortable() {
      let table = document.querySelector("tbody");
      const _self = this;
      _self.dragNdrop = JSON.parse(JSON.stringify(_self.data));
      Sortable.create(table, {
        handle: ".my-handle",
        easing: "cubic-bezier(1, 0, 0, 1)",
        onEnd({ newIndex, oldIndex }) {
          _self.dragNdrop.splice(
            newIndex,
            0,
            ..._self.dragNdrop.splice(oldIndex, 1)
          );
          _self.$emit("onChangeData", _self.dragNdrop)
        },
      });
    },
    moveEditPage(item) {
      localStorage.setItem("detail-category", JSON.stringify(item));
      this.$router.push(`category/${item.id}`);
    },
  },
};
</script>

<style lang="scss">
.my-handle {
  // cursor: url(../../../assets/hand.png), auto;
  /* cursor: grab; */
}
/* .my-handle:active{
  cursor: url(../../../assets/hand.png), auto;
} */

.font {
  &-12 {
    font-size: 12px;
  }
}

.ellipsis {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
