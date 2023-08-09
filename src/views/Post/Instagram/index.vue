<template>
  <div>
    <HeaderContent label="Instagram Mirroring" :list="crumbs" />

    <section class="d-flex">
      <div class="d-flex flex-wrap">
        <div
          v-for="(item, idx) in tabLabel"
          :key="idx"
          class="d-flex justify-center align-center text-capitalize font-12 box-tab mb-2 mr-3 py-2 px-4"
          :class="{ 'primary white--text font-weight-bold': tab == item }"
          @click="moveTab(item)"
        >
          {{ item }}
        </div>
      </div>

      <div>
        <v-text-field
          v-if="tab == 'username'"
          rounded
          outlined
          dense
          clearable
          hide-details="auto"
          append-icon="search"
          v-model="keywordUsername"
          :label="`Search ${tab}`"
          @keypress.enter="actionGetUserInfo()"
        ></v-text-field>
        <v-text-field
          v-if="tab == 'hashtag'"
          rounded
          outlined
          dense
          clearable
          hide-details="auto"
          append-icon="search"
          v-model="keywordHashtag"
          :label="`Search ${tab}`"
          @keypress.enter="actionGetHashtag()"
        ></v-text-field>
      </div>
    </section>

    <section v-if="isLoadingListUsername">
      <v-row class="fill-height ma-5" align="center" justify="center">
        <v-progress-circular
          indeterminate
          color="primary"
        ></v-progress-circular>
      </v-row>
    </section>

    <section
      v-if="!isLoadingListUsername && dataListUsername.length > 0"
      class="whitesmoke pa-4"
    >
      <router-view :items="dataListUsername"></router-view>

      <div class="d-flex justify-center align-center" style="height: 80px">
        <v-row
          v-if="isLoadingLoadMoreUsername"
          class="fill-height ma-5"
          align="center"
          justify="center"
        >
          <v-progress-circular
            indeterminate
            color="primary"
          ></v-progress-circular>
        </v-row>
        <v-btn
          v-else
          depressed
          rounded
          color="text-capitalize primary font-12"
          @click="actionLoadMoreUsername"
          :disabled="!pageInfoUsername.has_next_page"
          >Load More</v-btn
        >
      </div>
    </section>

    <section>
      <v-snackbar
        v-model="alertSuccess"
        top
        right
        color="success"
        timeout="3000"
      >
        <div class="d-flex justify-space-between align-center">
          <span>Success Post</span>
          <v-btn outlined text @click="movePageDraft">See Draft</v-btn>
        </div>
      </v-snackbar>
      <v-snackbar
        v-model="alertFailed"
        top
        right
        color="primary"
        timeout="3000"
      >
        <span>Error</span>
        <span v-if="payloadError.message !== ''"
          >: {{ payloadError.message }}</span
        >
      </v-snackbar>
    </section>
  </div>
</template>

<script>
import HeaderContent from "@/containers/HeaderContent";
import { mapActions, mapMutations, mapState } from "vuex";

export default {
  components: {
    HeaderContent,
  },
  data() {
    return {
      crumbs: [
        {
          text: "Instagram Mirroring",
        },
      ],
      tabLabel: ["username"],
      tab: "",
      keywordUsername: "",
      keywordHashtag: "",
      userId: "",
      dataListUsername: [],
      dataListHashtag: [],
      isLoadingListUsername: false,
      isLoadingLoadMoreUsername: false,
      isLoadingListHashtag: false,
      isLoadingLoadMoreHashtag: false,
      cursorUsername: "",
      hasNextPageUsername: false,
      pageInfoUsername: {
        end_cursor: "",
        has_next_page: false,
      },
      alertSuccess: false,
      alertFailed: false,
      payloadError: {
        message: "",
      },
    };
  },
  watch: {
    previewTiktokSuccess() {
      if (this.previewTiktokSuccess) {
        this.alertSuccess = true;
      }
    },
    alertSuccess() {
      if (!this.alertSuccess) {
        this.actionChangePreviewTiktokSuccess(false);
      }
    },
    previewTiktokFailed() {
      if (this.previewTiktokFailed) {
        this.alertFailed = true;
        this.payloadError.message = "Upload";
      }
    },
    alertFailed() {
      if (!this.alertFailed) {
        this.actionChangePreviewTiktokFailed(false);
      }
    },
  },
  mounted() {
    this.checkRoute();
  },
  computed: {
    ...mapState({
      previewTiktokSuccess: "previewTiktokSuccess",
      previewTiktokFailed: "previewTiktokFailed",
    }),
  },
  methods: {
    ...mapActions({
      getUserInfo: "instagram/getUserInfo",
      getUserMedias: "instagram/getUserMedias",
    }),
    ...mapActions({
      changeStatusPreviewTiktok: "changeStatusPreviewTiktok",
      changeStatusPreviewTiktokSuccess: "changeStatusPreviewTiktokSuccess",
      changeStatusPreviewTiktokFailed: "changeStatusPreviewTiktokFailed",
    }),
    ...mapMutations({
      setPreviewData: "instagram/setPreviewData",
    }),
    actionChangePreviewTiktokSuccess(v) {
      this.changeStatusPreviewTiktokSuccess(v);
    },
    actionChangePreviewTiktokFailed(v) {
      this.changeStatusPreviewTiktokFailed(v);
    },
    checkRoute() {
      this.changeStatusPreviewTiktok(false);
      if (this.$route.name.includes("username")) {
        this.tab = "username";
      } else if (this.$route.name.includes("hashtag")) {
        this.tab = "hashtag";
      }
    },
    moveTab(i) {
      if (i != this.tab) {
        this.tab = i;
        this.$router.push({ name: `instagram ${i}` });
      }
    },
    actionGetUserInfo() {
      const payload = {
        username: this.keywordUsername,
      };
      this.isLoadingListUsername = true;
      this.changeStatusPreviewTiktok(false);
      return this.getUserInfo(payload)
        .then((res) => {
          this.userId = res.data.user.id;
          this.actionGetUserMedias();
        })
        .catch((err) => {
          this.isLoadingListUsername = false;
          this.alertFailed = true;
          this.payloadError = err.response.data.data;
        });
    },
    actionGetUserMedias(isLoadMore) {
      const payload = {
        userId: this.userId,
        size: 30,
        cursor: this.pageInfoUsername.end_cursor,
      };
      return this.getUserMedias(payload)
        .then((res) => {
          if (isLoadMore) {
            res.data.user.edge_owner_to_timeline_media.edges.forEach((item) => {
              this.dataListUsername.push(item);
            });
          } else {
            this.dataListUsername =
              res.data.user.edge_owner_to_timeline_media.edges;
          }
          this.pageInfoUsername =
            res.data.user.edge_owner_to_timeline_media.page_info;
          this.isLoadingListUsername = false;
          this.isLoadingLoadMoreUsername = false;
        })
        .catch((err) => {
          this.isLoadingListUsername = false;
          this.isLoadingLoadMoreUsername = false;
          this.alertFailed = true;
          this.payloadError = err.response.data.data;
        });
    },
    actionLoadMoreUsername() {
      this.isLoadingLoadMoreUsername = true;
      this.changeStatusPreviewTiktok(false);
      this.actionGetUserMedias(true);
    },
    actionGetHashtag() {
      console.log(this.keywordHashtag);
    },
    movePageDraft() {
      this.$router.push({
        name: "draft",
        params: {
          page: 1,
        },
      });
      this.setPreviewData({});
      this.changeStatusPreviewTiktok(false);
    },
  },
};
</script>

<style lang="sass" scoped>
.font-10
	font-size: 10px
.font-12
	font-size: 12px
.box-tab
	cursor: pointer
	background-color: #FAFAFA
	border: 1px solid #EEEEEE
	border-radius: 32px
	height: 40px
	min-width: 46px
.box-tab:hover
	cursor: pointer
	background-color: $primarylowtint
</style>
