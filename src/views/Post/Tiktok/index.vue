<template>
  <div>
    <HeaderContent label="Tiktok Mirroring" :list="crumbs" />
    <div class="d-flex mb-4">
      <div class="d-flex flex-wrap">
        <div
          v-for="(item, idx) in tabLabel"
          :key="idx"
          class="d-flex justify-center align-center font-12 box-tab mb-2 mr-3 py-2 px-4"
          :class="{ 'primary white--text font-weight-bold': tab == idx + 1 }"
          @click="moveTab(idx + 1)"
        >
          {{ item }}
        </div>
      </div>

      <div v-if="tab == 1 || tab == 2">
        <v-text-field
          v-if="tabSearch == 'Username'"
          rounded
          outlined
          dense
          clearable
          hide-details="auto"
          append-icon="search"
          v-model="keywordUsername"
          :label="`Search ${tabSearch}`"
          @keypress.enter="actionGetUserDetail()"
        ></v-text-field>
        <v-text-field
          v-if="tabSearch == 'Hashtag'"
          rounded
          outlined
          dense
          clearable
          hide-details="auto"
          append-icon="search"
          v-model="keywordHashtag"
          :label="`Search ${tabSearch}`"
          @keypress.enter="actionGetFeedByHashtag()"
        ></v-text-field>
      </div>
    </div>

    <div v-if="tab == 3">
      <div v-if="loading" class="d-flex justify-center py-12">
        <v-progress-circular
          indeterminate
          color="primary"
        ></v-progress-circular>
      </div>

      <div v-else>
        <List-Item
          :userFeed="userFeed"
          :channels="channels"
          :loadingLoadmore="loadingLoadmore"
          :loadingSubmit="loadingSubmit"
          :focusIndex="focusIndex"
          :selectedItem="selectedItem"
          :payload="payload"
          @selectFocus="selectFocus"
          @actionLoadMoreFeed="actionGetFeedExplore"
        ></List-Item>
      </div>
    </div>

    <div v-else-if="tab == 1">
      <div v-if="loadingUsername" class="d-flex justify-center py-12">
        <v-progress-circular
          indeterminate
          color="primary"
        ></v-progress-circular>
      </div>

      <div v-else>
        <List-Item
          :userFeed="userFeedUsername"
          :channels="channels"
          :loadingLoadmore="loadingLoadmoreUsername"
          :loadingSubmit="loadingSubmit"
          :focusIndex="focusIndex"
          :selectedItem="selectedItem"
          :payload="payload"
          @selectFocus="selectFocus"
          @actionLoadMoreFeed="actionGetFeedByUsername(true)"
        ></List-Item>
      </div>
    </div>

    <div v-else-if="tab == 2">
      <div v-if="loadingHashtag" class="d-flex justify-center py-12">
        <v-progress-circular
          indeterminate
          color="primary"
        ></v-progress-circular>
      </div>

      <div v-else>
        <List-Item
          :userFeed="userFeedHashtag"
          :channels="channels"
          :loadingLoadmore="loadingLoadmoreHashtag"
          :loadingSubmit="loadingSubmit"
          :focusIndex="focusIndex"
          :selectedItem="selectedItem"
          :payload="payload"
          @selectFocus="selectFocus"
          @actionLoadMoreFeed="actionGetHashtagPost"
        ></List-Item>
      </div>
    </div>

    <v-snackbar
      v-model="previewTiktokSuccess"
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
    <v-snackbar v-model="alertFailed" top right color="primary" timeout="3000">
      <span>Error</span>
      <span v-if="payloadError.message !== ''"
        >: {{ payloadError.message }}</span
      >
    </v-snackbar>
  </div>
</template>

<script>
import HeaderContent from "@/containers/HeaderContent";
import { mapActions, mapMutations, mapState } from "vuex";
import ListItem from "./list.vue";

export default {
  components: {
    HeaderContent,
    ListItem,
  },
  data() {
    return {
      crumbs: [
        {
          text: "Tiktok Mirroring",
        },
      ],
      tab: 1,
      tabSearch: "",
      tabLabel: ["Username", "Hashtag", "FYP"],
      focusIndex: null,
      loading: false,
      loadingUsername: false,
      loadingHashtag: false,
      loadingLoadmore: false,
      loadingLoadmoreUsername: false,
      loadingLoadmoreHashtag: false,
      loadingSubmit: false,
      alertSuccess: false,
      alertFailed: false,
      alertRules: false,
      keywordUsername: "",
      keywordHashtag: "",
      channels: null,
      userInfo: null,
      userFeed: [],
      userFeedUsername: [],
      userFeedUsernameCursor: "0",
      userFeedHashtag: [],
      hashtagId: "",
      hashtagCursor: 0,
      selectedItem: null,
      cursorFirst: null,
      payload: {
        medias: [],
        description: "",
        channel: null,
        product: null,
        type: "social",
      },
      newPayload: {},
      payloadError: {
        message: "Server Error",
      },
    };
  },
  watch: {
    tab() {
      if (this.tab == 1) {
        this.tabSearch = "Username";
      } else if (this.tab == 2) {
        this.tabSearch = "Hashtag";
      } else if (this.tab == 3) {
        this.tabSearch = "";
        this.actionGetFeedExplore();
      }
      this.focusIndex = null;
      this.selectedItem = null;
    },
    userInfo() {
      if (this.userInfo.secUid) {
        this.actionGetFeedByUsername();
      }
    },
    previewTiktok() {
      if (this.previewTiktok == false) {
        this.focusIndex = null;
        this.payload.channel = null;
        this.setPreviewTiktokData({});
      }
    },
  },
  mounted() {
    this.getResponseChannel();
    this.getCursorFirst();
    this.setPreviewTiktokData({});
    this.changeStatusPreviewTiktok(false);
    this.tabSearch = "Username";
  },
  computed: {
    ...mapState({
      previewTiktok: "previewTiktok",
      previewTiktokSuccess: "previewTiktokSuccess",
    }),
  },
  methods: {
    ...mapActions({
      changeStatusPreviewTiktok: "changeStatusPreviewTiktok",
      getUserDetail: "tiktok/getUserDetail",
      getUserFeed: "tiktok/getUserFeed",
      getFeedExplore: "tiktok/getFeedExplore",
      getFeedByHashtag: "tiktok/getFeedByHashtag",
      getHashtagPost: "tiktok/getHashtagPost",
      getTiktokVideo: "tiktok/getTiktokVideo",
      getTiktokVideoNoWatermark: "tiktok/getTiktokVideoNoWatermark",
      getAllChannel: "channel/getAllChannel",
      postFeed: "post/postFeed",
    }),
    ...mapMutations({
      setPreviewTiktokData: "tiktok/setPreviewTiktokData",
    }),
    moveTab(i) {
      this.tab = i;
      this.setPreviewTiktokData({});
      this.changeStatusPreviewTiktok(false);
    },
    movePageDraft() {
      this.$router.push({
        name: "draft",
        params: {
          page: 1,
        },
      });
      this.setPreviewTiktokData({});
      this.changeStatusPreviewTiktok(false);
    },
    selectFocus(data) {
      if (this.focusIndex == data.idx) {
        this.focusIndex = null;
        this.payload.channel = null;
        this.setPreviewTiktokData({});
        this.changeStatusPreviewTiktok(false);
      } else {
        this.focusIndex = data.idx;
        this.payload.channel = null;
        this.selectedItem = data.item;
        this.payload.description = data.item.desc;
        this.setPreviewTiktokData(data.item);
        this.changeStatusPreviewTiktok(true);
      }
    },
    actionGetUserDetail() {
      let payload = {
        url: "/public/check",
        username: this.keywordUsername,
      };
      this.loadingUsername = true;
      this.focusIndex = null;
      this.selectedItem = null;
      this.changeStatusPreviewTiktok(false);
      return this.getUserDetail(payload)
        .then((response) => {
          this.loadingUsername = false;
          this.userInfo = response.data.userInfo.user;
        })
        .catch((err) => {
          this.loadingUsername = false;
          this.alertFailed = true;
          this.payloadError = err.response.data.data;
        });
    },
    actionGetFeedByUsername(isLoadmore = false) {
      if (isLoadmore) {
        this.loadingLoadmoreUsername = true;
      } else {
        this.userFeedUsername = [];
        this.userFeedUsernameCursor = 0;
        this.loadingUsername = true;
      }
      const payload = {
        url: "/public/posts",
        count: 20,
        secUid: this.userInfo.secUid,
        cursor: this.userFeedUsernameCursor,
      };
      return this.getUserFeed(payload)
        .then((response) => {
          this.loadingUsername = false;
          this.loadingLoadmoreUsername = false;
          this.userFeedUsernameCursor = response.data.cursor;
          for (let i = 0; i < response.data.itemList.length; i++) {
            const element = response.data.itemList[i];
            this.userFeedUsername.push(element);
          }
        })
        .catch((err) => {
          this.loadingUsername = false;
          this.loadingLoadmoreUsername = false;
        });
    },
    actionGetFeedByHashtag() {
      const payload = {
        url: "public/discover/keyword",
        keyword: this.keywordHashtag,
        count: 20,
        cursor: this.userFeedHashtag.length,
      };
      this.loadingHashtag = true;
      this.userFeedHashtag = [];
      this.hashtagId = "";
      this.hashtagCursor = 0;
      this.changeStatusPreviewTiktok(false);
      return this.getFeedByHashtag(payload)
        .then((response) => {
          let data = response.data;
          this.hashtagId = data.hashtags.challengeInfoList[0].challenge.id;
          this.actionGetHashtagPost();
        })
        .catch((err) => {
          this.loadingHashtag = false;
          this.loadingLoadmoreHashtag = false;
          this.alertFailed = true;
          this.payloadError = err.response.data.data;
        });
    },
    actionGetHashtagPost() {
      let response = {
        url: "public/hashtag",
        cursor: this.hashtagCursor,
        count: 20,
        challengeId: this.hashtagId,
      };
      this.loadingLoadmoreHashtag = true;
      return this.getHashtagPost(response)
        .then((response) => {
          let data = response.data;
          this.loadingHashtag = false;
          this.loadingLoadmoreHashtag = false;
          this.hashtagCursor = data.cursor;
          data.itemList.map((list) => {
            this.userFeedHashtag.push(list);
          });
        })
        .catch((err) => {
          this.loadingHashtag = false;
          this.loadingLoadmoreHashtag = false;
        });
    },
    actionGetFeedExplore() {
      const payload = {
        url: "/public/explore",
        country: "id",
      };
      if (this.userFeed.length == 0) {
        this.loading = true;
        this.changeStatusPreviewTiktok(false);
      } else {
        this.loadingLoadmore = true;
      }
      return this.getFeedExplore(payload)
        .then((response) => {
          this.loading = false;
          this.loadingLoadmore = false;
          for (let i = 0; i < response.data.itemList.length; i++) {
            const element = response.data.itemList[i];
            this.userFeed.push(element);
          }
        })
        .catch((err) => {
          this.loading = false;
          this.loadingLoadmore = false;
        });
    },
    drawImageOnCanvas(file, seekTo) {
      return new Promise((resolve, reject) => {
        const videoPlayer = document.createElement("video");
        videoPlayer.setAttribute("src", URL.createObjectURL(file));
        videoPlayer.load();
        videoPlayer.addEventListener("error", (ex) => {
          reject("error when loading video file", ex);
        });

        videoPlayer.addEventListener("loadedmetadata", () => {
          if (videoPlayer.duration < seekTo) {
            reject("video is too short.");
            return;
          }
          setTimeout(() => {
            videoPlayer.currentTime = seekTo;
          }, 200);
          videoPlayer.addEventListener("seeked", () => {
            const canvas = document.createElement("canvas");
            canvas.width = videoPlayer.videoWidth;
            canvas.height = videoPlayer.videoHeight;
            const ctx = canvas.getContext("2d");
            ctx.drawImage(videoPlayer, 0, 0, canvas.width, canvas.height);
            ctx.canvas.toBlob(
              (blob) => {
                var reader = new FileReader();
                reader.readAsDataURL(blob);
                reader.onloadend = function () {
                  var base64data = reader.result;
                  resolve(base64data);
                };
              },
              "image/jpeg",
              0.75 /* quality */
            );
          });
        });
      });
    },
    async getResponseChannel() {
      const response = await this.getAllChannel();
      if (response.status === 200) {
        const responseData = response.data.data;
        const formatResponse = responseData.map((d) => {
          return {
            name: d.name,
            id: d.id,
          };
        });
        this.channels = formatResponse;
      } else {
        return response;
      }
    },
    getCursorFirst() {
      var d = new Date();
      var m = d.getMonth();
      d.setMonth(d.getMonth());
      if (d.getMonth() == m) d.setDate(0);
      d.setHours(0, 0, 0, 0);
      this.cursorFirst = `0`;
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
