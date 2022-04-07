<template>
  <div>
    <HeaderContent label="Tiktok Mirroring" :list="crumbs" />

    <div class="d-flex mb-4">
      <div class="d-flex flex-wrap">
        <div
          v-for="(item, idx) in tabLabel"
          :key="idx"
          class="d-flex justify-center align-center font-12 box-tab mb-2 mr-3 py-2 px-4"
          :class="{ 'primary white--text': tab == idx + 1 }"
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

      <div v-else v-show="!loading">
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
      </div>
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
          :loadingSubmit="loadingSubmit"
          :focusIndex="focusIndex"
          :selectedItem="selectedItem"
          :payload="payload"
          @selectFocus="selectFocus"
          @actionGetTiktokVideoNoWatermark="actionGetTiktokVideoNoWatermark"
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
          :loadingSubmit="loadingSubmit"
          :focusIndex="focusIndex"
          :selectedItem="selectedItem"
          :payload="payload"
          @selectFocus="selectFocus"
          @actionGetTiktokVideoNoWatermark="actionGetTiktokVideoNoWatermark"
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
          :loadingSubmit="loadingSubmit"
          :focusIndex="focusIndex"
          :selectedItem="selectedItem"
          :payload="payload"
          @selectFocus="selectFocus"
          @actionGetTiktokVideoNoWatermark="actionGetTiktokVideoNoWatermark"
        ></List-Item>
      </div>
    </div>

    <v-snackbar v-model="alertSuccess" top right color="success">
      <div class="d-flex justify-space-between align-center">
        Success Post
        <v-btn outlined @click="movePageDraft">See Draft</v-btn>
      </div>
    </v-snackbar>
    <v-snackbar v-model="alertFailed" top right color="error">
      Error: {{ payloadError.message }}
    </v-snackbar>
    <v-snackbar v-model="alertRules" top right color="error">
      Harap isi Channel
    </v-snackbar>
  </div>
</template>

<script>
import HeaderContent from "@/containers/HeaderContent";
import { mapActions } from "vuex";
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
      loadingSubmit: false,
      alertSuccess: false,
      alertFailed: false,
      alertRules: false,
      keywordUsername: "",
      keywordHashtag: "",
      channels: null,
      userInfo: null,
      userFeed: null,
      userFeedUsername: null,
      userFeedHashtag: null,
      selectedItem: null,
      payload: {
        medias: [],
        description: "",
        channel: null,
        product: null,
        type: "social",
      },
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
        this.actionGetUserFeed();
      }
    },
  },
  mounted() {
    this.actionGetFeedExplore();
    this.getResponseChannel();
  },
  methods: {
    ...mapActions({
      getUserDetail: "tiktok/getUserDetail",
      getUserFeed: "tiktok/getUserFeed",
      getFeedExplore: "tiktok/getFeedExplore",
      getFeedByHashtag: "tiktok/getFeedByHashtag",
      getTiktokVideo: "tiktok/getTiktokVideo",
      getTiktokVideoNoWatermark: "tiktok/getTiktokVideoNoWatermark",
      getAllChannel: "channel/getAllChannel",
      postFeed: "post/postFeed",
    }),
    moveTab(i) {
      this.tab = i;
    },
    movePageDraft() {
      this.$router.push({
        name: "draft",
        params: {
          page: 1,
        },
      });
    },
    selectFocus(data) {
      if (this.focusIndex == data.idx) {
        this.focusIndex = null;
        this.payload.channel = null;
      } else {
        this.focusIndex = data.idx;
        this.payload.channel = null;
        this.selectedItem = data.item;
        this.payload.description = data.item.desc;
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
    actionGetUserFeed() {
      const payload = {
        count: 20,
        secUid: this.userInfo.secUid,
      };
      this.loadingUsername = true;
      this.focusIndex = null;
      this.selectedItem = null;
      return this.getUserFeed(payload)
        .then((response) => {
          this.loadingUsername = false;
          this.userFeedUsername = response.data.itemList;
        })
        .catch((err) => {
          this.loadingUsername = false;
        });
    },
    actionGetFeedExplore() {
      const payload = {
        country: "id",
      };
      this.loading = true;
      this.userFeed = [];
      this.focusIndex = null;
      this.selectedItem = null;
      return this.getFeedExplore(payload)
        .then((response) => {
          this.loading = false;
          console.log({ response });
          this.userFeed = response.data.itemList;
        })
        .catch((err) => {
          this.loading = false;
          console.log({ err });
        });
    },
    actionGetFeedByHashtag() {
      const payload = {
        count: 20,
        keyword: this.keywordHashtag,
      };
      this.loadingHashtag = true;
      this.focusIndex = null;
      this.selectedItem = null;
      return this.getFeedByHashtag(payload)
        .then((response) => {
          this.loadingHashtag = false;
          console.log({ response });
          this.userFeedHashtag = response.data;
        })
        .catch((err) => {
          this.loadingHashtag = false;
        });
    },
    async actionGetTiktokVideoNoWatermark() {
      const url = `https://www.tiktok.com/@${this.selectedItem.author.uniqueId}/video/${this.selectedItem.video.id}`;
      if (this.payload.channel == null) {
        this.alertRules = true;
        setTimeout(() => {
          this.alertRules = false;
        }, 3000);
      } else {
        this.loadingSubmit = true;
        return await this.getTiktokVideoNoWatermark(url)
          .then((response) => {
            let url = response.data.data.data.video_link_nwm;
            this.actionGetTiktokVideoToPostDraft(url);
          })
          .catch((err) => {
            this.loadingSubmit = false;
          });
      }
    },
    async actionGetTiktokVideoToPostDraft(url) {
      if (this.payload.channel == null) {
        this.alertRules = true;
        setTimeout(() => {
          this.alertRules = false;
        }, 3000);
      } else {
        this.loadingSubmit = true;
        return await this.getTiktokVideo(url)
          .then((res) => {
            let file = new File([res.data], "video.mp4", { type: "video/mp4" });
            let form = new FormData();
            form.append("file", file);
            this.uploadTikVideoToKipas(form);
          })
          .catch((err) => {
            this.loadingSubmit = false;
          });
      }
    },
    uploadTikVideoToKipas(formUpload) {
      return this.$httpUpload()
        .post(`medias`, formUpload)
        .then((response) => {
          this.payload.medias.push(response.data);
          this.actionPostToDraft();
        })
        .catch((err) => {
          console.log(err);
          this.loadingSubmit = false;
        });
    },
    actionPostToDraft() {
      this.focusIndex = null;
      return this.postFeed(this.payload)
        .then((response) => {
          this.loadingSubmit = false;
          this.alertSuccess = true;
          setTimeout(() => {
            this.alertSuccess = false;
          }, 3000);
        })
        .catch((err) => {
          this.loadingSubmit = false;
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
