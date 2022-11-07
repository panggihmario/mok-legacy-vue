<template>
  <div>
    <HeaderContent
      label="Semua Postingan User"
      :list="[
        {
          text: 'Konten Feed',
          disabled: true,
        },
      ]"
      marginBottom="16"
    ></HeaderContent>

    <div>
      <Navigation-Tab
        :itemsUser="itemsUser"
        :itemsChannel="itemsChannel"
        @changeTab="changeTab"
        @onSearchUser="handleSearchAccount"
        @onSearchChannel="handleSearchChannel"
        @onSearchKeyword="(data) => actionGetListDataByTab(data, 'filter')"
        @onActionFilter="(data) => actionGetListDataByTab(data, 'filter')"
        @onCancelFilter="(data) => actionGetListDataByTab(data)"
      ></Navigation-Tab>
    </div>

    <div>
      <div v-if="tab == 0">
        <Post-All
          :tableItems="tableItemsCandidate"
          :loadingList="loadingListCandidate"
          :totalPages="totalPagesCandidate"
          :totalElements="totalElementsCandidate"
          @onChangePage="changePage"
          @actionPushNotif="actionPushNotif"
          @successPostTrending="handleSuccessPostTrending"
          @errorPostTrending="handleErrorPostTrending"
        ></Post-All>
      </div>
      <div v-else-if="tab == 1">
        <Post-All-Trending
          :tableItems="tableItemsActive"
          :loadingList="loadingListActive"
          :totalPages="totalPagesActive"
          :totalElements="totalElementsActive"
          @onChangePage="changePage"
          @actionPushNotif="actionPushNotif"
        ></Post-All-Trending>
      </div>
    </div>

    <v-snackbar
      :timeout="3000"
      top
      right
      v-model="alertPushNotifSuccess"
      color="success"
    >
      Success
    </v-snackbar>
    <v-snackbar
      :timeout="3000"
      top
      right
      v-model="alertPushNotifFailed"
      color="error"
    >
      {{ pushNotifFailedData }}
    </v-snackbar>
    <v-snackbar :timeout="3000" top right v-model="alertFailed" color="error">
      Failed
    </v-snackbar>
    <v-snackbar :timeout="3000" top right v-model="alertNoData" color="error">
      Data Tidak Ditemukan
    </v-snackbar>
  </div>
</template>

<script>
import HeaderContent from "@/containers/HeaderContent";
import NavigationTab from "./Navigation/index.vue";
import PostAll from "./PostAll/index.vue";
import PostAllTrending from "./PostTrending/index.vue";
import { mapActions, mapState } from "vuex";

export default {
  components: {
    HeaderContent,
    NavigationTab,
    PostAll,
    PostAllTrending,
  },
  data() {
    return {
      tab: 0,
      itemsUser: [],
      itemsChannel: [],
      alertSearchFailed: false,
      searchFailedData: {},
      tableItemsCandidate: [],
      loadingListCandidate: false,
      totalElementsCandidate: 0,
      pageCandidate: 1,
      totalPagesCandidate: 0,
      tableItemsActive: [],
      loadingListActive: false,
      totalElementsActive: 0,
      pageActive: 1,
      totalPagesActive: 0,
      isFilter: false,
      dataFilter: {
        usernames: "",
        channelCodes: "",
        startAt: "",
        endAt: "",
        keyword: "",
      },
      alertFailed: false,
      alertPushNotifSuccess: false,
      alertPushNotifFailed: false,
      alertNoData: false,
      pushNotifFailedData: "",
    };
  },
  watch: {
    tab() {
      this.dataFilter = {
        usernames: "",
        channelCodes: "",
        startAt: "",
        endAt: "",
        keyword: "",
      };
      this.actionGetListDataByTab();
    },
    "dataFilter.keyword"() {
      if (this.dataFilter.keyword == "" || this.dataFilter.keyword == null) {
        if (this.tab == 0) {
          this.getListPostByFilter("candidates");
        } else {
          this.getListPostByFilter("trending");
        }
      }
    },
  },
  mounted() {
    this.getRoute();
  },
  methods: {
    ...mapActions({
      fetchPostAllUser: "post/fetchPostAllUser",
      fetchPostAllUserTrending: "post/fetchPostAllUserTrending",
      fetchPostAllUserFilter: "post/fetchPostAllUserFilter",
      fetchPostAllUserTrendingFilter: "post/fetchPostAllUserTrendingFilter",
      postPushNotifTrendingById: "post/postPushNotifTrendingById",
      searchAccount: "post/searchAccounts",
      searchChannel: "channel/searchChannel",
    }),
    getRoute() {
      if (this.$route.params.tab == "candidates") {
        if (this.$route.query.filter) {
          this.isFilter = true;
        }
        this.pageCandidate = this.$route.params.page;
        this.tab = 0;
        if (this.itemsUser.length == 0 && this.itemsChannel.length == 0) {
          this.handleSearchAccount("a");
          this.handleSearchChannel("a");
        }
        this.getListPostByFilter("candidates");
      } else {
        if (this.$route.query.filter) {
          this.isFilter = true;
        }
        this.pageActive = this.$route.params.page;
        this.tab = 1;
        if (this.itemsUser.length == 0 && this.itemsChannel.length == 0) {
          this.handleSearchAccount("a");
          this.handleSearchChannel("a");
        }
        this.getListPostByFilter("active");
      }
    },
    handleGetListUserPost() {
      let payload = {
        page: this.pageCandidate - 1,
      };
      this.loadingListCandidate = true;
      this.isFilter = false;
      return this.fetchPostAllUser(payload)
        .then((response) => {
          let res = response.data.data;
          console.log({res})
          this.loadingListCandidate = false;
          this.tableItemsCandidate = res.content;
          this.totalPagesCandidate = res.totalPages;
          this.totalElementsCandidate = res.totalElements;
          if (res.totalElements == 0) {
            this.alertNoData = true;
          }
        })
        .catch((err) => {
          this.loadingListCandidate = false;
        });
    },
    handleGetListUserPostFilter() {
      let payload = {
        page: this.pageCandidate - 1,
        ...this.dataFilter,
      };
      this.loadingListCandidate = true;
      this.isFilter = true;
      return this.fetchPostAllUserFilter(payload)
        .then((response) => {
          let res = response.data.data;
          this.loadingListCandidate = false;
          this.tableItemsCandidate = res.content;
          this.totalPagesCandidate = res.totalPages;
          this.totalElementsCandidate = res.totalElements;
          if (res.totalElements == 0) {
            this.alertNoData = true;
          }
        })
        .catch((err) => {
          this.loadingListCandidate = false;
        });
    },
    handleGetListUserPostTrending() {
      let payload = {
        page: this.pageActive - 1,
      };
      this.loadingListActive = true;
      this.isFilter = false;
      return this.fetchPostAllUserTrending(payload)
        .then((response) => {
          let res = response.data.data;
          this.loadingListActive = false;
          this.tableItemsActive = res.content;
          this.totalPagesActive = res.totalPages;
          this.totalElementsActive = res.totalElements;
          if (res.totalElements == 0) {
            this.alertNoData = true;
          }
        })
        .catch((err) => {
          this.loadingListActive = false;
        });
    },
    handleGetListUserPostTrendingFilter() {
      let payload = {
        page: this.pageActive - 1,
        ...this.dataFilter,
      };
      this.loadingListActive = true;
      this.isFilter = true;
      return this.fetchPostAllUserTrendingFilter(payload)
        .then((response) => {
          let res = response.data.data;
          this.loadingListActive = false;
          this.tableItemsActive = res.content;
          this.totalPagesActive = res.totalPages;
          this.totalElementsActive = res.totalElements;
          if (res.totalElements == 0) {
            this.alertNoData = true;
          }
        })
        .catch((err) => {
          this.loadingListActive = false;
        });
    },
    actionGetListDataByTab(data, type) {
      this.dataFilter = {
        ...data,
      };
      if (this.tab == 0) {
        if (type == "filter") {
          this.isFilter = true;
          if (this.tab == 0 && this.pageCandidate == 1) {
            this.routerPushGetRoute("candidates", 1, { filter: true }, true);
          } else {
            this.routerPushGetRoute("candidates", 1, { filter: true }, true);
          }
        } else {
          this.routerPushGetRoute("candidates", 1, {}, false);
        }
      } else {
        if (type == "filter") {
          this.isFilter = true;
          if (this.tab == 0 && this.pageCandidate == 1) {
            this.routerPushGetRoute("active", 1, { filter: true }, true);
          } else {
            this.routerPushGetRoute("active", 1, { filter: true }, true);
          }
        } else {
          this.routerPushGetRoute("active", 1, {}, false);
        }
      }
    },
    routerPushGetRoute(status, page, query = {}, isFilter) {
      this.isFilter = isFilter;
      this.$router.push({
        path: `/post/user/${status}/${page}`,
        query: {
          ...query,
        },
      });
      this.getRoute();
    },
    getListPostByFilter(type) {
      if (type == "candidates") {
        if (this.isFilter) {
          this.handleGetListUserPostFilter();
        } else {
          this.handleGetListUserPost();
        }
      } else {
        if (this.isFilter) {
          this.handleGetListUserPostTrendingFilter();
        } else {
          this.handleGetListUserPostTrending();
        }
      }
    },
    handleSearchAccount(v) {
      let payload = {
        value: v,
      };
      return this.searchAccount(payload)
        .then((response) => {
          this.itemsUser = response;
        })
        .catch((err) => {
          this.alertSearchFailed = true;
          this.searchFailedData = err.response;
        });
    },
    handleSearchChannel(v) {
      return this.searchChannel(v)
        .then((response) => {
          this.itemsChannel = response.data.data.content;
        })
        .catch((err) => {
          this.alertSearchFailed = true;
          this.searchFailedData = err.response;
        });
    },
    handleSuccessPostTrending() {
      this.alertPushNotifSuccess = true;
      this.actionGetListDataByTab(this.dataFilter, "filter");
    },
    handleErrorPostTrending() {
      this.alertFailed = true;
    },
    actionPushNotif(id) {
      let payload = {
        id,
      };
      return this.postPushNotifTrendingById(payload)
        .then((response) => {
          this.alertPushNotifSuccess = true;
        })
        .catch((err) => {
          this.alertPushNotifFailed = true;
          this.pushNotifFailedData = err.response.data.data;
        });
    },
    changeTab(v) {
      this.$router.push(`/post/user/${v == 0 ? "candidates" : "trending"}/1`);
      this.tab = v;
    },
    changePage(v) {
      if (this.tab == 0) {
        if (this.isFilter) {
          this.routerPushGetRoute("candidates", v, { filter: this.isFilter });
        } else {
          this.routerPushGetRoute("candidates", v);
        }
        this.pageCandidate = v;
      } else {
        if (this.isFilter) {
          this.routerPushGetRoute("active", v, { filter: this.isFilter });
        } else {
          this.routerPushGetRoute("active", v);
        }
        this.pageActive = v;
      }
    },
  },
};
</script>
