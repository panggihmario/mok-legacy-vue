<template>
  <div>
    <HeaderContent label="Manage Hashtag">
      <custom-button
        color="secondary"
        class="white--text"
        @click="moveTo('/manage/hashtag/create-new-trending')"
      >
        Buat Trending Baru
      </custom-button>
    </HeaderContent>

    <div>
      <div class="d-flex align-center font-14">
        <span style="color: #9b9b9b">Sort</span>
        <div style="width: 120px">
          <v-select
            v-model="sort"
            :items="listSort"
            outlined
            dense
            hide-details
            background-color="whitesnow"
            class="ml-2 font-12"
          ></v-select>
        </div>
      </div>

      <div class="mt-4">
        <v-data-table
          :headers="tableHeaders"
          :items="tableItems"
          hide-default-footer
        >
          <template v-slot:item="{ item }">
            <tr>
              <td class="font-12 font-weight-medium grey--text">
                {{ formatDate(item.createAt) }}
              </td>
              <td class="font-12 font-weight-medium grey--text">
                {{ formatDate(item.createAt, true) }}
              </td>
              <td class="font-12 font-weight-medium grey--text">
                {{ item.totalQty }}
              </td>
              <td class="font-12 font-weight-medium grey--text">
                {{ item.hashtags.length }}
              </td>
              <td
                class="font-12 font-weight-medium"
                :class="{
                  'green--text': item.status == 'ACTIVE',
                  'grey--text': item.status != 'ACTIVE',
                }"
              >
                <span class="text-capitalize">
                  {{ item.status.toLowerCase() }}
                </span>
              </td>
              <td class="d-flex justify-end align-center pr-4">
                <v-btn
                  small
                  depressed
                  color="whitesnow"
                  class="text-capitalize secondary--text font-weight-medium"
                  @click="moveTo('/manage/hashtag/detail', item)"
                  >Detail</v-btn
                >
              </td>
            </tr>
          </template>
        </v-data-table>

        <div class="d-flex justify-end mt-10">
          <v-pagination
            class="d-flex justify-end"
            color="secondary"
            v-model="page"
            :length="pageCount"
            total-visible="5"
            prev-icon="mdi-menu-left"
            next-icon="mdi-menu-right"
            @input="changePage"
          ></v-pagination>
        </div>
      </div>
    </div>
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
      sort: "Newest",
      listSort: ["Newest", "Oldest"],
      page: 0,
      pageCount: 0,
      tableHeaders: [
        {
          text: "Tanggal",
          sortable: false,
          class: "whitesnow",
        },
        {
          text: "Jam Proses",
          sortable: false,
          class: "whitesnow",
        },
        {
          text: "Jumlah Data",
          sortable: false,
          class: "whitesnow",
        },
        {
          text: "Jumlah Hashtag",
          sortable: false,
          class: "whitesnow",
        },
        {
          text: "Status",
          sortable: false,
          class: "whitesnow",
          width: 400,
        },
        {
          text: "",
          sortable: false,
          class: "whitesnow",
        },
      ],
      tableItems: [],
      alertFailed: false,
      dataFailed: {
        message: "",
      },
    };
  },
  watch: {
    sort() {
      this.page = 0;
      this.handleGetListManageHashtag();
    },
  },
  mounted() {
    this.handleGetListManageHashtag();
  },
  methods: {
    ...mapActions({
      getListHashtagFormation: "manageHashtag/getListHashtagFormation",
    }),
    moveTo(val, item) {
      this.$router.push({
        path: val,
        query: {
          item: item,
        },
      });
    },
    handleGetListManageHashtag() {
      let payload = {
        params: {
          sort: "createdAt",
          direction: this.sort == "Newest" ? "DESC" : "ASC",
          size: 10,
          page: this.page,
        },
      };
      return this.getListHashtagFormation(payload)
        .then((response) => {
          this.tableItems = response.data.content;
          this.page++;
          this.pageCount = response.data.totalPages;
        })
        .catch((err) => {
          this.alertFailed = true;
          this.dataFailed = err.response.data;
        });
    },
    changePage(p) {
      let payload = {
        params: {
          sort: "createdAt",
          direction: this.sort == "Newest" ? "DESC" : "ASC",
          size: 10,
          page: p - 1,
        },
      };
      return this.getListHashtagFormation(payload)
        .then((response) => {
          this.tableItems = response.data.content;
        })
        .catch((err) => {
          this.alertFailed = true;
          this.dataFailed = err.response.data;
        });
    },
    formatDate(v, isHour) {
      let d = new Date(v);
      let date = d.getDate();
      let month = d.getMonth();
      let year = d.getFullYear();
      let hour = d.getHours();
      let minute = d.getMinutes();
      return isHour
        ? `${hour < 10 ? `0${hour}` : hour}:${
            minute < 10 ? `0${minute}` : minute
          }`
        : `${date}/${month + 1}/${year}`;
    },
  },
};
</script>

<style lang="scss" scoped>
.font-14 {
  font-size: 14px;
}
</style>
