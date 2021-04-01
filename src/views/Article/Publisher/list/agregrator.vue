<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="desserts"
      item-key="headline"
      class="my-table"
      show-select
      hide-default-footer
      v-model="selected"
      @toggle-select-all="selectAllNews"
    >
      <template v-slot:[`item.action`]="{ item }">
        <custom-button
          color="primary"
          v-if="!viewNews"
          size="medium"
          class="my-3"
          width="101"
        >
          Publish
        </custom-button>
      </template>
      <template v-slot:header.action>
        <custom-button
          color="primary"
          v-if="!viewNews"
          size="medium"
          class="my-3"
          width="101"
        >
          Publish All
        </custom-button>
      </template>
      <template v-slot:body="{ items }">
        <tbody>
          <tr
            v-for="(item, key) in items"
            :key="key"
            :class="
              key === selectedRow ? 'row__highlight' : 'row__nonhighlight'
            "
          >
            <td>
              <v-checkbox :value="item" v-model="selected" />
            </td>
            <td>{{ item.date }}</td>
            <td>{{ item.source }}</td>
            <td style="cursor: pointer" @click="openSideViewNews(key)">
              {{ item.headline }}
            </td>
            <td>
              <custom-button
                color="primary"
                v-if="!viewNews"
                size="medium"
                class="my-3"
                width="101"
              >
                Publish
              </custom-button>
            </td>
          </tr>
        </tbody>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  computed: {
    ...mapState({
      viewNews: "viewNews",
    }),
  },
  methods: {
    isEnabled(slot) {
      return this.enabled === slot;
    },
    ...mapActions({
      changeStatusViewNews: "changeStatusViewNews",
    }),
    openSideViewNews(idx) {
      this.selectedRow = idx;
      return this.changeStatusViewNews(true);
    },
    selectAllNews(items, value) {
      console.log({items})
    }
  },
  data() {
    return {
      singleSelect: false,
      selectedRow: null,
      selected: [],
      headers: [
        {
          text: "Tanggal",
          value: "date",
          width: "100",
        },
        {
          text: "Sumber",
          value: "source",
          width: "150",
        },
        {
          text: "Headline",
          value: "headline",
          // width: "200",
        },
        {
          text: "",
          value: "action",
          width: "250",
          align: "start",
        },
      ],
      desserts: [
        {
          date: "02/02/2020",
          source: "Kompasiana",
          headline:
            "1 WNI Pasien Isolasi di RSPI Sulianti Saroso Meninggal Dunia",
        },
        {
          date: "02/02/2020",
          source: "Kompasiana",
          headline:
            "2 WNI Pasien Isolasi di RSPI Sulianti Saroso Meninggal Dunia",
        },
      ],
    };
  },
};
</script>



<style lang="scss" >
.my-table thead th {
  background-color: #fafafa;
  // &:first-child { border-radius: 10px 0 0 0; }
  // &:last-child { border-radius: 0 10px 0 0; }
}
.header-table {
  color: black;
  font-size: 14px;
}
</style>

<style lang="sass" scoped>
.row
  &__highlight
    color: rgba(24, 144, 255, 1)
    font-size: 12px
    letter-spacing: 0.01em
  &__nonhighlight
    color: #4A4A4A
    font-size: 12px
    letter-spacing: 0.01em
</style>