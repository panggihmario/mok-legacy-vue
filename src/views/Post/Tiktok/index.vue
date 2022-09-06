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
      <div v-if="tab == 2 || tab == 3">
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

      <!-- <div v-else v-show="!loading">
        <v-tooltip bottom color="green">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              icon
              color="green"
              v-bind="attrs"
              v-on="on"
              @click="actionGetFeedExplore"
            >
              <v-icon>mdi-cached</v-icon>
            </v-btn>
          </template>
          <span class="font-10">Refresh FYP</span>
        </v-tooltip>
      </div> -->
    </div>

    <div v-if="tab == 1">
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
          @actionGetTiktokVideoNoWatermark="actionGetTiktokVideoNoWatermark"
          @actionLoadMoreFeed="actionGetFeedExplore"
        ></List-Item>
      </div>
    </div>

    <div v-else-if="tab == 2">
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
          @actionGetTiktokVideoNoWatermark="actionGetTiktokVideoNoWatermark"
          @actionLoadMoreFeed="loadMoreGetFeedByUsername"
        ></List-Item>
      </div>
    </div>

    <div v-else-if="tab == 3">
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
          @actionGetTiktokVideoNoWatermark="actionGetTiktokVideoNoWatermark"
          @actionLoadMoreFeed="loadMoreGetFeedByHashtag"
        ></List-Item>
      </div>
    </div>

    <v-snackbar v-model="previewTiktokSuccess" top right color="success">
      <span>Success Post</span>
      <v-btn outlined text @click="movePageDraft">See Draft</v-btn>
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
      tabLabel: ["FYP", "Username", "Hashtag"],
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
      userFeedHashtag: [],
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
        this.tabSearch = "";
      } else if (this.tab == 2) {
        this.tabSearch = "Username";
      } else if (this.tab == 3) {
        this.tabSearch = "Hashtag";
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
    this.actionGetFeedExplore();
    this.getResponseChannel();
    this.getCursorFirst();
    this.setPreviewTiktokData({});
    this.changeStatusPreviewTiktok(false);
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
      this.loadingUsername = true;
      this.focusIndex = null;
      this.selectedItem = null;
      return this.getUserDetail(this.keywordUsername)
        .then((response) => {
          this.loadingUsername = false;
          this.userInfo = response.data.userInfo.user;
        })
        .catch((err) => {
          this.loadingUsername = false;
          this.payloadError = err.response.data;
          this.alertFailed = true;
          setTimeout(() => {
            this.alertFailed = false;
          }, 3000);
        });
    },
    actionGetFeedByUsername() {
      const payload = {
        count: 30,
        secUid: this.userInfo.secUid,
        cursor: 0,
      };
      if (this.userFeedUsername.length == 0) {
        this.loadingUsername = true;
      } else {
        this.loadingLoadmoreUsername = true;
      }
      this.userFeedUsername = [];
      this.focusIndex = null;
      this.selectedItem = null;
      this.loadingUsername = true;
      return this.getUserFeed(payload)
        .then((response) => {
          this.loadingUsername = false;
          this.loadingLoadmoreUsername = false;
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
        count: 10,
        keyword: this.keywordHashtag,
        cursor: 0,
      };
      if (this.userFeedHashtag.length == 0) {
        this.loadingHashtag = true;
      } else {
        this.loadingLoadmoreHashtag = true;
      }
      this.userFeedHashtag = [];
      this.loadingHashtag = true;
      this.focusIndex = null;
      this.selectedItem = null;
      return this.getFeedByHashtag(payload)
        .then((response) => {
          this.loadingHashtag = false;
          this.loadingLoadmoreHashtag = false;
          for (let i = 0; i < response.data.length; i++) {
            const element = response.data[i];
            this.userFeedHashtag.push(element);
          }
        })
        .catch((err) => {
          this.loadingHashtag = false;
          this.loadingLoadmoreHashtag = false;
        });
    },
    actionGetFeedExplore() {
      const payload = {
        country: "id",
      };
      if (this.userFeed.length == 0) {
        this.loading = true;
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
          console.log({ err });
        });
    },
    loadMoreGetFeedByUsername() {
      let cursor =
        this.userFeedUsername.length != 0
          ? `${
              this.userFeedUsername[this.userFeedUsername.length - 1].createTime
            }000`
          : 0;
      const payload = {
        count: 30,
        secUid: this.userInfo.secUid,
        cursor: cursor,
      };
      if (this.userFeedUsername.length == 0) {
        this.loadingUsername = true;
      } else {
        this.loadingLoadmoreUsername = true;
      }
      return this.getUserFeed(payload)
        .then((response) => {
          this.loadingUsername = false;
          this.loadingLoadmoreUsername = false;
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
    loadMoreGetFeedByHashtag() {
      let cursor =
        this.userFeedHashtag.length != 0
          ? `${
              this.userFeedHashtag[this.userFeedHashtag.length - 1].createTime
            }000`
          : 0;
      const payload = {
        count: 10,
        keyword: this.keywordHashtag,
        cursor: cursor,
      };
      if (this.userFeedHashtag.length == 0) {
        this.loadingHashtag = true;
      } else {
        this.loadingLoadmoreHashtag = true;
      }
      // this.focusIndex = null;
      // this.selectedItem = null;
      return this.getFeedByHashtag(payload)
        .then((response) => {
          this.loadingHashtag = false;
          this.loadingLoadmoreHashtag = false;
          // this.userFeedHashtag = response.data;
          for (let i = 0; i < response.data.length; i++) {
            const element = response.data[i];
            this.userFeedHashtag.push(element);
          }
        })
        .catch((err) => {
          this.loadingHashtag = false;
          this.loadingLoadmoreHashtag = false;
        });
    },
    actionGetTiktokVideoNoWatermark() {
      // const url = `https://www.tiktok.com/@${this.selectedItem.author.uniqueId}/video/${this.selectedItem.video.id}`;
      // if (this.payload.channel == null) {
      //   this.alertRules = true;
      //   setTimeout(() => {
      //     this.alertRules = false;
      //   }, 3000);
      // } else {
      //   this.loadingSubmit = true;
      //   return this.getTiktokVideoNoWatermark(url)
      //     .then((response) => {
      //       this.newPayload = response.data;
      //       console.log(response.data);
      //       // this.payload.medias.push(response.data.data);
      //       // this.actionPostToDraft();
      //     })
      //     .catch((err) => {
      //       this.loadingSubmit = false;
      //     });
      // }
    },
    actionPostToDraft() {
      console.log("lol new", this.newPayload);
      // return this.drawImageOnCanvas();
      // this.focusIndex = null;
      // return this.postFeed(this.payload)
      //   .then((response) => {
      //     this.payload = {
      //       medias: [],
      //       description: "",
      //       channel: null,
      //       product: null,
      //       type: "social",
      //     };
      //     this.loadingSubmit = false;
      //     this.alertSuccess = true;
      //     setTimeout(() => {
      //       this.alertSuccess = false;
      //     }, 3000);
      //   })
      //   .catch((err) => {
      //     this.loadingSubmit = false;
      //   });
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
                reader.onloadend = function() {
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
