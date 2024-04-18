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
        @onSearchSort="(v) => (sortBy = v)"
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
          @resetData="resetData"
          @updatePriority="handleGetListUserPost"
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
          @refreshPriority="refreshPriority"
        ></Post-All-Trending>
      </div>
      <div v-else-if="tab == 2">
        <Post-Notification
          :tableItems="tableItemsNotification"
          :loadingList="loadingListNotification"
          :totalPages="totalPagesNotification"
          :totalElements="totalElementsNotification"
          @onChangePage="changePage"
          @actionPushNotif="actionPushNotif"
        ></Post-Notification>
      </div>
      <div v-else-if="tab == 3">
        <Priority-Level
          :tableItems="tableItemsPriorityLevel"
          :loadingList="loadingListPriorityLevel"
          :totalPages="totalPagesPriorityLevel"
          :totalElements="totalElementsPriorityLevel"
          @onChangePage="changePage"
          @updatePriority="handleGetListPriorityLevel"
        ></Priority-Level>
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
    <v-snackbar
      v-model="snackbar"
      :timeout="timeout"
      outlined
      top
      color="warning"
    >
      <div v-if="errorObject">
        <div v-if="errorObject.response.status === 401">
          <div>{{ errorObject.response.data.error }}</div>
          <div>{{ errorObject.response.data.error_description }}</div>
        </div>
        <div v-else>
          <div>{{ errorObject.response.data.message }}</div>
          <div>{{ errorObject.response.data.data }}</div>
        </div>
      </div>
    </v-snackbar>

    <v-overlay absolute :value="isOverlay">
      <v-btn color="success"> Loading ..... </v-btn>
    </v-overlay>
  </div>
</template>

<script>
import HeaderContent from "@/containers/HeaderContent";
import NavigationTab from "./Navigation/index.vue";
import PostAll from "./PostAll/index.vue";
import PostAllTrending from "./PostTrending/index.vue";
import PostNotification from "./Notification/index.vue";
import PriorityLevel from "./PriorityLevel/index.vue";
import { mapActions } from "vuex";

export default {
  components: {
    HeaderContent,
    NavigationTab,
    PostAll,
    PostAllTrending,
    PostNotification,
    PriorityLevel,
  },
  data() {
    return {
      tab: 0,
      itemsUser: [],
      itemsChannel: [],
      alertSearchFailed: false,
      searchFailedData: {},
      errorObject: null,
      snackbar: false,
      timeout: 3000,
      pageCandidate: 1,
      pageActive: 1,
      pageNotification: 1,
      pagePriorityLevel: 1,
      totalPagesCandidate: 0,
      totalPagesActive: 0,
      totalPagesNotification: 0,
      totalPagesPriorityLevel: 1,
      tableItemsCandidate: [],
      tableItemsActive: [],
      tableItemsNotification: [],
      tableItemsPriorityLevel: [],
      loadingListCandidate: false,
      loadingListActive: false,
      loadingListNotification: false,
      loadingListPriorityLevel: false,
      totalElementsCandidate: 0,
      totalElementsActive: 0,
      totalElementsNotification: 0,
      totalElementsPriorityLevel: 0,
      isFilter: false,
      sortBy: "",
      dataFilter: {
        usernames: "",
        channelCodes: "",
        startAt: "",
        endAt: "",
        keyword: "",
        search: "",
      },
      alertFailed: false,
      alertPushNotifSuccess: false,
      alertPushNotifFailed: false,
      alertNoData: false,
      pushNotifFailedData: "",
      isOverlay: false,
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
    sortBy() {},
    "dataFilter.keyword"() {
      if (this.dataFilter.keyword == "" || this.dataFilter.keyword == null) {
        if (this.tab == 0) {
          this.getListPostByFilter("candidates");
        } else if (this.tab == 1) {
          this.getListPostByFilter("notification");
        } else if (this.tab == 2) {
          this.getListPostByFilter("priority-level");
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
      fetchHistoryNotification: "post/fetchHistoryNotification",
      postPushNotifTrendingById: "post/postPushNotifTrendingById",
      searchAccount: "post/searchAccounts",
      searchChannel: "channel/searchChannel",
      getListPriority: "post/getListPriority",
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
      } else if (this.$route.params.tab == "trending") {
        if (this.$route.query.filter) {
          this.isFilter = true;
        }
        this.pageActive = this.$route.params.page;
        this.tab = 1;
        if (this.itemsUser.length == 0 && this.itemsChannel.length == 0) {
          this.handleSearchAccount("a");
          this.handleSearchChannel("a");
        }
        this.getListPostByFilter("trending");
      } else if (this.$route.params.tab == "notification") {
        if (this.$route.query.filter) {
          this.isFilter = true;
        }
        this.pageNotification = this.$route.params.page;
        this.tab = 2;
        if (this.itemsUser.length == 0 && this.itemsChannel.length == 0) {
          this.handleSearchAccount("a");
          this.handleSearchChannel("a");
        }
        this.getListPostByFilter("notification");
      } else if (this.$route.params.tab == "priority-level") {
        if (this.$route.query.filter) {
          this.isFilter = true;
        }
        this.pageNotification = this.$route.params.page;
        this.tab = 3;
        if (this.itemsUser.length == 0 && this.itemsChannel.length == 0) {
          this.handleSearchAccount("a");
          this.handleSearchChannel("a");
        }
        this.getListPostByFilter("priority-level");
      }
    },
    resetData() {
      this.getListPostByFilter("candidates");
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
          this.snackbar = true;
          this.errorObject = err;
        });
    },
    handleGetListUserPostFilter() {
      let payload = {
        sort: "levellingAt,desc",
        page: this.pageCandidate - 1,
        ...this.dataFilter,
      };
      this.loadingListCandidate = true;
      this.isFilter = true;
      this.isOverlay = true;
      return this.fetchPostAllUserFilter(payload)
        .then((response) => {
          let res = response.data.data;
          this.loadingListCandidate = false;
          this.isOverlay = false;
          this.tableItemsCandidate = res.content;
          this.totalPagesCandidate = res.totalPages;
          this.totalElementsCandidate = res.totalElements;
          if (res.totalElements == 0) {
            this.alertNoData = true;
          }
        })
        .catch((err) => {
          this.loadingListCandidate = false;
          this.isOverlay = false;
          this.snackbar = true;
          this.errorObject = err;
        });
    },
    handleGetListPriorityLevel() {
      let page = this.$route.params.page;
      let payload = {
        page: page - 1,
        size: 10,
        channelCode: "tiktok",
      };
      this.loadingListPriorityLevel = true;
      // this.isFilter = true;
      // this.isOverlay = true;
      return this.getListPriority(payload)
        .then((response) => {
          let res = response.data.data;
          this.loadingListPriorityLevel = false;
          this.isOverlay = false;
          this.tableItemsPriorityLevel = res.content;
          if (res.content.length >= 8 && this.totalPagesPriorityLevel <= page) {
            this.totalPagesPriorityLevel = parseInt(page) + 1;
          }
          this.totalElementsPriorityLevel = res.totalElements;
          if (res.totalElements == 0) {
            this.alertNoData = true;
          }
        })
        .catch((err) => {
          this.loadingListPriorityLevel = false;
          this.isOverlay = false;
          this.snackbar = true;
          this.errorObject = err;
        });
    },
    refreshPriority() {
      this.handleGetListUserPostTrending();
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
          this.snackbar = true;
          this.errorObject = err;
        });
    },
    handleGetListUserPostTrendingFilter() {
      let payload = {
        page: this.pageActive - 1,
        ...this.dataFilter,
      };
      this.loadingListActive = true;
      this.isFilter = true;
      this.isOverlay = true;
      return this.fetchPostAllUserTrendingFilter(payload)
        .then((response) => {
          let res = response.data.data;
          this.loadingListActive = false;
          this.isOverlay = false;
          this.tableItemsActive = res.content;
          this.totalPagesActive = res.totalPages;
          this.totalElementsActive = res.totalElements;
          if (res.totalElements == 0) {
            this.alertNoData = true;
          }
        })
        .catch((err) => {
          this.loadingListActive = false;
          this.isOverlay = false;
          this.snackbar = true;
          this.errorObject = err;
        });
    },
    handleGetListUserPostNotificationFilter() {
      let payload = {
        page: this.pageNotification - 1,
        size: 10,
        sort: "createAt,desc",
        ...this.dataFilter,
      };
      this.loadingListNotification = true;
      this.isFilter = true;
      this.isOverlay = true;
      return this.fetchHistoryNotification(payload)
        .then((response) => {
          let res = response.data.data;
          this.loadingListNotification = false;
          this.isOverlay = false;
          this.tableItemsNotification = res.content;
          this.totalPagesNotification = res.totalPages;
          this.totalElementsNotification = res.totalElements;
          if (res.totalElements == 0) {
            this.alertNoData = true;
          }
        })
        .catch((err) => {
          this.loadingListNotification = false;
          this.isOverlay = false;
          this.snackbar = true;
          this.errorObject = err;
        });
    },
    handleGetListUserPostNotification() {
      let payload = {
        page: this.pageNotification - 1,
        size: 10,
        sort: "createAt,desc",
      };
      this.loadingListNotification = true;
      this.isFilter = false;
      return this.fetchHistoryNotification(payload)
        .then((response) => {
          let res = response.data.data;
          this.loadingListNotification = false;
          this.tableItemsNotification = res.content;
          this.totalPagesNotification = res.totalPages;
          this.totalElementsNotification = res.totalElements;
          if (res.totalElements == 0) {
            this.alertNoData = true;
          }
        })
        .catch((err) => {
          this.loadingListNotification = false;
          this.snackbar = true;
          this.errorObject = err;
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
      }
      else if (this.tab == 1) {
        if (type == "filter") {
          this.isFilter = true;
          if (this.tab == 0 && this.pageCandidate == 1) {
            this.routerPushGetRoute("trending", 1, { filter: true }, true);
          } else {
            this.routerPushGetRoute("trending", 1, { filter: true }, true);
          }
        } else {
          this.routerPushGetRoute("trending", 1, {}, false);
        }
      }
      else if (this.tab == 2) {
        if (type == "filter") {
          this.isFilter = true;
          if (this.tab == 0 && this.pageCandidate == 1) {
            this.routerPushGetRoute("notification", 1, { filter: true }, true);
          } else {
            this.routerPushGetRoute("notification", 1, { filter: true }, true);
          }
        } else {
          this.routerPushGetRoute("notification", 1, {}, false);
        }
      } else if (this.tab == 3) {
        if (type == "filter") {
          this.isFilter = true;
          if (this.tab == 0 && this.pageCandidate == 1) {
            this.routerPushGetRoute(
              "priority-level",
              1,
              { filter: true },
              true
            );
          } else {
            this.routerPushGetRoute(
              "priority-level",
              1,
              { filter: true },
              true
            );
          }
        } else {
          this.routerPushGetRoute("priority-level", 1, {}, false);
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
      } else if (type == "trending") {
        if (this.isFilter) {
          this.handleGetListUserPostTrendingFilter();
        } else {
          this.handleGetListUserPostTrending();
        }
      } else if (type == "notification") {
        if (this.isFilter) {
          this.handleGetListUserPostNotificationFilter();
        } else {
          this.handleGetListUserPostNotification();
        }
      } else if (type == "priority-level") {
        this.handleGetListPriorityLevel();
      }
    },
    handleSearchSort(v) {
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
      const payload = {
        page: 0,
        search: v,
        size: 20,
      };
      return this.searchChannel(payload)
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
    handleErrorPostTrending(err) {
      // this.alertFailed = true;
      this.snackbar = true;
      this.errorObject = err;
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
      const listTab = ["candidates", "trending", "notification"];
      // this.$router.push(`/post/user/${listTab[v]}/1`);
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
      }
      else if (this.tab == 1) {
        if (this.isFilter) {
          this.routerPushGetRoute("trending", v, { filter: this.isFilter });
        } else {
          this.routerPushGetRoute("trending", v);
        }
        this.pageActive = v;
      }
      else if (this.tab == 2) {
        if (this.isFilter) {
          this.routerPushGetRoute("notification", v, { filter: this.isFilter });
        } else {
          this.routerPushGetRoute("notification", v);
        }
        this.pageNotification = v;
      } else if (this.tab == 3) {
        if (this.isFilter) {
          this.routerPushGetRoute("priority-level", v, {
            filter: this.isFilter,
          });
        } else {
          this.routerPushGetRoute("priority-level", v);
        }
        this.pagePriorityLevel = v;
      }
    },
  },
};
</script>
