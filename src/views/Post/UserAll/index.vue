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
        @onCancelFilter="(data) => actionGetListDataByTab(data, 'filter')"
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
import NavigationTab from "./navigation.vue";
import PostAll from "./PostAll/index.vue";
import PostAllTrending from "./PostTrending/index.vue";
import { mapActions } from "vuex";

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
      if (this.tab == 0) {
        this.pageCandidate = this.$route.params.page;
        this.handleGetListUserPost();
      } else {
        this.pageActive = this.$route.params.page;
        this.handleGetListUserPostTrending();
      }
    },
    "dataFilter.keyword"() {
      if (this.dataFilter.keyword == "" || this.dataFilter.keyword == null) {
        if (this.tab == 0) {
          this.handleGetListUserPost();
        } else {
          this.handleGetListUserPostTrending();
        }
      }
    },
    pageCandidate() {
      if (this.isFilter) {
        this.handleGetListUserPostFilter();
      } else {
        this.handleGetListUserPost();
      }
    },
    pageActive() {
      if (this.isFilter) {
        this.handleGetListUserPostTrendingFilter();
      } else {
        this.handleGetListUserPostTrending();
      }
    },
  },
  mounted() {
    this.getRoute();
    // this.handleGetListUserPost();
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
        this.tab = 0;
        this.pageCandidate = this.$route.params.page;
        this.handleSearchAccount("a");
        this.handleGetListUserPost();
      } else {
        this.tab = 1;
        this.pageActive = this.$route.params.page;
        this.handleSearchChannel("a");
        this.handleGetListUserPostTrending();
      }
    },
    handleGetListUserPost() {
      let payload = {
        page: this.pageCandidate - 1,
      };
      this.loadingList = true;
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
          this.loadingList = false;
        });
    },
    handleGetListUserPostFilter() {
      let payload = {
        page: this.pageCandidate - 1,
        ...this.dataFilter,
      };
      this.loadingList = true;
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
          this.loadingList = false;
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
          this.handleGetListUserPostFilter();
        } else {
          this.handleGetListUserPost();
        }
      } else {
        if (type == "filter") {
          this.$route.query.filter = true;
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
      if (this.$route.params.tab == "candidates") {
        this.handleGetListUserPost();
      } else {
        this.handleGetListUserPostTrending();
      }
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
        this.$router.push(`/post/user/candidates/${v}`);
        this.pageCandidate = v;
      } else {
        this.$router.push(`/post/user/trending/${v}`);
        this.pageActive = v;
      }
    },
  },
};
</script>
