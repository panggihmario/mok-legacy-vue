<template>
  <div>
    <HeaderContent :list="crumbs" label="List Post"></HeaderContent>
    <div class="d-flex align-center">
      <v-btn @click="backRoute" elevation="0" color="secondarylowtint" small>
        <div class="text-capitalize secondary--text feed__label-button">
          Back
        </div>
      </v-btn>
      <div class="feed__totalPost">Total Post : {{ totalPost }}</div>
    </div>
    <div>
      <v-row>
        <v-col
          v-for="(c, idx) in contents"
          :key="idx"
          class="d-flex child-flex"
          cols="3"
        >
          <div @click="openDetail(idx)">
            <Media :content="c" :index="idx" />
          </div>
        </v-col>
        <v-card
          v-if="contents.length != totalPost"
          v-intersect="handleNextDataFeeds"
        ></v-card>
      </v-row>
    </div>
    <div class="text-center">
      <v-progress-circular
        v-if="isLoading"
        indeterminate
        color="primary"
      ></v-progress-circular>
    </div>

    <v-dialog v-model="dialogDetail" max-width="800">
      <v-btn
        rounded
        icon
        x-large
        elevation="2"
        color="white"
        class="nav__btn-left mx-2"
        @click="changeDialogDetailIdx(-1)"
      >
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      <Dialog-Detail
        :idx="dialogDetailIdx"
        :dialogProps="dialogDetail"
        :content="contents[dialogDetailIdx]"
        @deletePost="deletePost"
        @closeDialog="dialogDetail = false"
      ></Dialog-Detail>
      <v-btn
        rounded
        icon
        x-large
        elevation="2"
        color="white"
        class="nav__btn-right mx-2"
        @click="changeDialogDetailIdx(1)"
      >
        <v-icon>mdi-chevron-right</v-icon>
      </v-btn>
    </v-dialog>

    <v-snackbar
      top
      right
      v-model="alertSuccess"
      color="success"
      :timeout="3000"
    >
      Success
    </v-snackbar>
    <v-snackbar top right v-model="alertFailed" color="primary" :timeout="3000">
      {{ errorMessage }}
    </v-snackbar>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import Media from "./media.vue";
import HeaderContent from "@/containers/HeaderContent/index.vue";
import DialogDetail from "./dialogDetailMedia.vue";

export default {
  components: {
    HeaderContent,
    Media,
    DialogDetail,
  },
  data() {
    return {
      totalPost: 0,
      currentPage: 1,
      isLoading: false,
      contents: [],
      dialogDetail: false,
      dialogDetailIdx: null,
      alertSuccess: false,
      alertFailed: false,
      errorMessage: "",
      crumbs: [
        {
          text: "Manage Account",
          disabled: false,
          href: "/user",
        },
        {
          text: "List User",
          disabled: false,
          href: "/user",
        },
      ],
    };
  },
  watch: {
    dialogDetailIdx() {
      if (this.dialogDetailIdx < 0) {
        this.dialogDetailIdx = this.contents.length - 1;
      } else if (this.dialogDetailIdx > this.contents.length - 1) {
        this.dialogDetailIdx = 0;
      }
    },
  },
  beforeMount() {
    this.handleFetchDataFeeds();
  },
  mounted() {
    const name = this.$route.params.name;
    const tempCrumbs = [...this.crumbs];
    const newObj = {
      text: name,
      disabled: true,
    };
    tempCrumbs.push(newObj);
    this.crumbs = tempCrumbs;
  },
  methods: {
    ...mapActions({
      fetchFeedByUserId: "account/fetchFeedByUserId",
      deleteFeed: "account/deleteFeed",
    }),
    deletePost(payload) {
      return this.deleteFeed(payload.id)
        .then(() => {
          this.totalPost--;
          this.dialogDetail = false;
          this.alertSuccess = true;
          this.contents.splice(payload.idx, 1);
        })
        .catch((err) => {
          this.alertFailed = true;
          this.errorMessage = err.response.data.message || "Failed";
        });
    },
    backRoute() {
      this.$router.go(-1);
    },
    openDetail(idx) {
      this.dialogDetail = true;
      this.dialogDetailIdx = idx;
    },
    changeDialogDetailIdx(v) {
      this.dialogDetailIdx += v;
    },
    handleFetchDataFeeds() {
      const id = this.$route.params.id;
      const data = {
        id,
        params: {
          page: 0,
          size: 12,
        },
      };
      return this.fetchFeedByUserId(data).then((response) => {
        this.totalPost = response.totalElements;
        this.contents = response.content;
      });
    },
    handleNextDataFeeds() {
      if (this.isLoading == false) {
        const id = this.$route.params.id;
        const data = {
          id,
          params: {
            page: this.currentPage,
            size: 12,
          },
        };
        this.isLoading = true;
        setTimeout(() => {
          return this.fetchFeedByUserId(data)
            .then((response) => {
              this.currentPage++;
              const responseContents = response.content;
              const tempContents = [...this.contents];
              responseContents.forEach((temp) => {
                tempContents.push(temp);
              });
              this.contents = tempContents;
              this.isLoading = false;
            })
            .catch(() => {
              this.isLoading = false;
            });
        }, 500);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.feed {
  &__label-button {
    font-size: 10px;
    font-weight: 500;
    letter-spacing: 0.01em;
  }
  &__totalPost {
    font-weight: 500;
    font-size: 12px;
    margin-left: 50px;
  }
}
.nav {
  &__btn-left {
    position: absolute;
    z-index: 1;
    top: 50%;
    left: 10em;
    background: rgba($color: #000000, $alpha: 0.5);
  }
  &__btn-right {
    position: absolute;
    z-index: 1;
    top: 50%;
    right: 10em;
    background: rgba($color: #000000, $alpha: 0.5);
  }
}
</style>
