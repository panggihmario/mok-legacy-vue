<template>
  <div>
    <HeaderContent label="Manage Hashtag" marginBottom="16"> </HeaderContent>

    <div>
      <div class="d-flex justify-space-between">
        <div style="width: 145px">
          <v-select
            v-model="filterCountryLocal"
            :items="listCountry"
            item-text="label"
            item-value="value"
            solo
            dense
            hide-details
            return-object
            dark
            background-color="success"
            class="font-12"
          ></v-select>
        </div>

        <custom-button
          dark
          color="secondary"
          @click="dialogCreateTrending = true"
        >
          Buat Trending Baru
        </custom-button>
      </div>

      <div class="d-flex align-center font-14 mt-5" style="width: 145px">
        <span style="color: #9b9b9b">Sort</span>
        <div>
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
          :loading="loadingTableItems"
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
                  @click="moveTo('/manage/hashtag/detail', item, true)"
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

      <v-dialog v-model="dialogCreateTrending" width="343">
        <v-card>
          <div class="pt-5 px-5 pb-3">
            <div>
              <span class="font-24 font-weight-medium">Buat Trending Baru</span>
              <br />
              <span class="font-10 font-weight-medium mt-3">
                Pilih channel untuk menentukan dimana formasi diterapkan
              </span>
            </div>

            <div class="d-flex justify-space-between align-center mt-6">
              <div
                v-for="(item, idx) in itemsTrendingCountry"
                :key="idx"
                class="d-flex justify-center align-center box-country"
                :class="{
                  'box-country-selected':
                    createTrendingCountry &&
                    createTrendingCountry.value == item.value,
                }"
                @click="createTrendingCountry = item"
              >
                <div
                  class="d-flex flex-column justify-center align-center text-center"
                >
                  <v-img
                    v-if="item.value == 'indonesia'"
                    src="@/assets/flag_id.png"
                    width="32px"
                  ></v-img>
                  <v-img
                    v-else-if="item.value == 'china'"
                    src="@/assets/flag_cn.png"
                    width="32px"
                  ></v-img>
                  <span class="font-10 font-weight-medium">{{
                    item.label
                  }}</span>
                </div>
              </div>
            </div>
          </div>

          <v-divider></v-divider>

          <div class="d-flex justify-space-between pt-3 px-5 pb-5">
            <custom-button
              style="width: 145px; border-radius: 8px"
              @click="dialogCreateTrending = false"
            >
              Cancel
            </custom-button>
            <custom-button
              color="secondary"
              style="width: 145px; border-radius: 8px"
              @click="handleCreateTrending"
              :disabled="createTrendingCountry == null"
            >
              Buat
            </custom-button>
          </div>
        </v-card>
      </v-dialog>
    </div>

    <v-snackbar v-model="alertFailed" top right color="primary" :timeout="3000">
      Error: {{ dataFailed.message }}
    </v-snackbar>
  </div>
</template>

<script>
import HeaderContent from "@/containers/HeaderContent";
import { mapActions, mapGetters, mapMutations, mapState } from "vuex";

export default {
  components: {
    HeaderContent,
  },
  data() {
    return {
      createTrendingCountry: null,
      itemsTrendingCountry: [
        {
          label: "Indonesia",
          value: "indonesia",
          href: "/manage/hashtag/create-new-trending",
        },
        {
          label: "China",
          value: "china",
          href: "/manage/hashtag/create-new-trending",
        },
      ],
      filterCountryLocal: {
        label: "Indonesia",
        value: "indonesia",
        feedChannelCode: "tiktok",
      },
      listCountry: [
        {
          label: "Indonesia",
          value: "indonesia",
          feedChannelCode: "tiktok",
        },
        {
          label: "China",
          value: "china",
          feedChannelCode: "chinatiktok",
        },
      ],
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
      loadingTableItems: false,
      alertFailed: false,
      dataFailed: {
        message: "",
      },
      dialogCreateTrending: false,
    };
  },
  watch: {
    sort() {
      this.page = 0;
      this.handleGetListManageHashtag();
    },
    dialogCreateTrending() {
      if (!this.dialogCreateTrending) {
        this.createTrendingCountry = null;
      }
    },
    filterCountryLocal() {
      this.setFilterCountry(this.filterCountryLocal);
    },
    filterCountry() {
      this.page = 0;
      this.handleGetListManageHashtag();
    },
  },
  mounted() {
    this.filterCountryLocal = this.filterCountry;
    console.log(this.filterCountry);
    this.handleGetListManageHashtag();
  },
  computed: {
    ...mapGetters({
      filterCountry: "manageHashtag/filterCountry",
      detailHashtag: "manageHashtag/detailHashtag",
    }),
  },
  methods: {
    ...mapActions({
      getListHashtagFormation: "manageHashtag/getListHashtagFormation",
    }),
    ...mapMutations({
      setFilterCountry: "manageHashtag/setFilterCountry",
    }),
    moveTo(val, item, isQueryObject) {
      console.log(item)
      let query = {};
      // if (isQueryObject) {
        localStorage.setItem("detailHashtag", JSON.stringify(item));
      // } 
      // else {
      //   query = {
      //     channel: item,
      //   };
      // }
      this.$router.push({
        path: val,
        name : 'createHashtag' ,
        query: {
          channel : item.channel
        },
      });
    },
    async handleCreateTrending() {
      let payload = {
        params: {
          sort: "createdAt",
          direction: this.sort == "Newest" ? "DESC" : "ASC",
          size: 10,
          page: 0,
          code:
            this.createTrendingCountry.value == "china"
              ? "chinatiktok"
              : "tiktok",
        },
      };
      let dataTrending = {
        channel: this.createTrendingCountry.value,
        data: null,
      };
      dataTrending.data = await this.getListHashtagFormation(payload)
        .then((response) => {
          return response.data.content[0];
        })
        .catch((err) => {
          this.alertFailed = true;
          this.dataFailed = err;
        });
      if (dataTrending.data != null) {
        this.moveTo(this.createTrendingCountry.href, dataTrending);
      }
    },
    handleGetListManageHashtag() {
      let payload = {
        params: {
          sort: "createdAt",
          direction: this.sort == "Newest" ? "DESC" : "ASC",
          size: 10,
          page: this.page,
          code: this.filterCountry.feedChannelCode,
        },
      };
      this.loadingTableItems = true;
      return this.getListHashtagFormation(payload)
        .then((response) => {
          this.tableItems = response.data.content;
          this.page++;
          this.pageCount = response.data.totalPages;
          this.loadingTableItems = false;
        })
        .catch((err) => {
          this.alertFailed = true;
          this.loadingTableItems = false;
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
.font-10 {
  font-size: 10px;
}
.font-14 {
  font-size: 14px;
}
.font-24 {
  font-size: 24px;
}
.box-country {
  height: 78px;
  width: 142px;
  border: 1px solid $whitesmoke;
  border-radius: 8px;
}
.box-country-selected {
  border: 1px solid $secondary !important;
}
</style>
