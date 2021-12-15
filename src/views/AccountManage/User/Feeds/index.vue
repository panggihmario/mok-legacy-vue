<template>
  <div>
    <HeaderContent :list="crumbs" label="List Post"> </HeaderContent>
    <div class="d-flex align-center mb-6">
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
          <Media
            :content="c"
            :index="idx"
            @deletePost="deletePost"
          />
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import Media from "./media.vue";
import HeaderContent from "@/containers/HeaderContent/index.vue";
export default {
  components: {
    HeaderContent,
    Media
  },
  data() {
    return {
      totalPost: 0,
      contents: [],
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
    this.handleNextDataFeeds()
  },
  methods: {
    ...mapActions({
      fetchFeedByUserId: "account/fetchFeedByUserId",
      deleteFeed : "account/deleteFeed"
    }),
    deletePost(payload) {
      return this.deleteFeed(payload.id)
        .then(() => {
          this.contents.splice(payload.idx, 1)
        })
    },
    backRoute() {
      this.$router.go(-1)
    },
    openDetail(c) {
      console.log(c)
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
      let currentPage = 1
      window.onscroll = () => {
        let bottomOfWindow =
          document.documentElement.scrollTop + window.innerHeight ===
          document.documentElement.offsetHeight;
        if (bottomOfWindow) {
          const id = this.$route.params.id;
          const data = {
            id,
            params: {
              page: currentPage,
              size: 12,
            },
          };
          return this.fetchFeedByUserId(data).then((response) => {
            currentPage++
            const responseContents = response.content
            const tempContents = [...this.contents]
            responseContents.forEach(temp => {
              tempContents.push(temp)
            })
            this.contents = tempContents
          });
        }
      };
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
</style>