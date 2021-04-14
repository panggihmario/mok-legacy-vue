<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="newsAgregrator"
      item-key="idNewsExternal"
      class="my-table"
      show-select
      disable-pagination
      v-model="selected"
      hide-default-footer
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
            :class="key === selectedRow ? 'row__highlight' : 'row__nonhighlight'"
          >
            <td>
              <v-checkbox :value="item" color="secondary" v-model="selected" />
            </td>
            <td>{{ formatingDate(item.postNewsDto.createAt) }}</td>
            <td>{{ item.postNewsDto.siteReference }}</td>
            <td style="cursor: pointer" @click="openSideViewNews(key)">
              {{ item.postNewsDto.title }}
            </td>
            <td>
              <custom-button
                color="primary"
                v-if="!viewNews"
                size="medium"
                class="my-3"
                width="101"
                @click="handlePublish(item)"
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
  data() {
    return {
      singleSelect: false,
      selectedRow: null,
      statusLoading : true,
      isLoading : true,
      selected: [],
      newsAgregrator : [],
      headers: [
        {
          text: "Tanggal",
          value: "createAt",
          width: "100",
        },
        {
          text: "Sumber",
          value: "siteReference",
          width: "150",
        },
        {
          text: "Headline",
          value: "title",
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
  computed: {
    ...mapState({
      viewNews: "viewNews",
    }),
  },
  mounted() {
    this.handleNewsAgregator()
  },
  methods: {
    handlePublish(payload) {
      const params = { ...payload}
      return this.publishNewsAgregator(params)
        .then(resp => {
          console.log(response)
        })
        .catch(err => {
          console.log(err)
        })
    },
    isEnabled(slot) {
      return this.enabled === slot;
    },
    formatingDate(rawDate) {
      const newDt = new Date(rawDate);
      const day = newDt.getDate();
      const month = newDt.getMonth() + 1;
      const year = newDt.getFullYear();
      const newFormat = `${day}/${month}/${year}`;
      return newFormat;
    },
    ...mapActions({
      changeStatusViewNews: "changeStatusViewNews",
      getAllNewsAgregrator : 'news/getAllNewsAgregrator',
      publishNewsAgregator: 'news/publishNewsAgregator'
    }),
    handleNewsAgregator () {
      this.isLoading = true
      return this.getAllNewsAgregrator()
        .then(response => {
          this.newsAgregrator = response
          this.isLoading = false
        })
        .catch(err => {
          // this.statusLoading = false
        })
    },
    openSideViewNews(idx) {
      this.selectedRow = idx;
      return this.changeStatusViewNews(true);
    },
    selectAllNews(items, value) {
      console.log({items})
    }
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