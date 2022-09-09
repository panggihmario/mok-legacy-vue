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
        @onSearchKeyword="actionGetListDataByTab"
        @onActionFilter="actionGetListDataByTab"
        @onCancelFilter="actionGetListDataByTab"
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
      dataFilter: {
        usernames: "",
        channelCodes: "",
        direction: "ASC",
        sort: "createAt",
        startAt: "",
        endAt: "",
        keyword: "",
      },
      alertPushNotifSuccess: false,
      alertPushNotifFailed: false,
      pushNotifFailedData: "",
    };
  },
  watch: {
    tab() {
      if (this.tab == 0) {
        this.handleGetListUserPost();
      } else {
        this.handleGetListUserPostTrending();
      }
    },
    pageCandidate() {
      this.handleGetListUserPost();
    },
    pageActive() {
      this.handleGetListUserPostTrending();
    },
  },
  mounted() {
    this.handleGetListUserPost();
  },
  methods: {
    ...mapActions({
      fetchPostAllUser: "post/fetchPostAllUser",
      fetchPostAllUserTrending: "post/fetchPostAllUserTrending",
      postPushNotifTrendingById: "post/postPushNotifTrendingById",
      searchAccount: "account/searchAccount",
      searchChannel: "channel/searchChannel",
    }),
    handleGetListUserPost() {
      let payload = {
        page: this.pageCandidate - 1,
        usernames: "",
        channelCodes: "",
        direction: "ASC",
        sort: "createAt",
        startAt: "",
        endAt: "",
        keyword: "",
        ...this.dataFilter,
      };
      this.loadingList = true;
      return this.fetchPostAllUser(payload)
        .then((response) => {
          let res = response.data.data;
          this.loadingListCandidate = false;
          this.tableItemsCandidate = res.content;
          this.totalPagesCandidate = res.totalPages;
          this.totalElementsCandidate = res.totalElements;
        })
        .catch((err) => {
          this.loadingList = false;
        });
    },
    handleGetListUserPostTrending() {
      let payload = {
        page: this.pageActive - 1,
        usernames: "",
        channelCodes: "",
        direction: "ASC",
        sort: "createAt",
        startAt: "",
        endAt: "",
        keyword: "",
        ...this.dataFilter,
      };
      this.loadingListActive = true;
      return this.fetchPostAllUserTrending(payload)
        .then((response) => {
          let res = response.data.data;
          this.loadingListActive = false;
          this.tableItemsActive = res.content;
          this.totalPagesActive = res.totalPages;
          this.totalElementsActive = res.totalElements;
        })
        .catch((err) => {
          this.loadingListActive = false;
        });
    },
    actionGetListDataByTab(data) {
      this.dataFilter = {
        ...data,
      };
      if (this.tab == 0) {
        this.handleGetListUserPost();
      } else {
        this.handleGetListUserPostTrending();
      }
    },
    handleSearchAccount(v) {
      let payload = {
        type: "users",
        params: v,
      };
      return this.searchAccount(payload)
        .then((response) => {
          this.itemsUser = response.data.data.content;
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
          this.pushNotifFailedData = err.response.data;
        });
    },
    changeTab(v) {
      this.tab = v;
    },
    changePage(v) {
      if (this.tab == 0) {
        this.pageCandidate = v;
      } else {
        this.pageActive = v;
      }
    },
  },
};
</script>
