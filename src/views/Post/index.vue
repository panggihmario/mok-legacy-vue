<template>
  <div>
    <HeaderContent :list="list" label="Post Feed">
      <custom-button
        color="kellygreen"
        class="white--text"
        size="small"
        @click="moveToCreatePost"
      >
        Buat Post
      </custom-button>
    </HeaderContent>
    <div class="d-flex">
      <v-tabs color="primary" left class="mb-4">
        <v-tab
          v-for="(tab, idx) in tabs"
          :key="idx"
          :to="{ name: tab.name, params: { page: 1 } }"
          exact
          @click="resetFeeds"
        >
          <div style="letter-spacing : 0" class="text-capitalize">{{ tab.label }}</div>
        </v-tab>
      </v-tabs>
      <div>
        <div class="d-flex align-center">
          <custom-select
            :items="channels"
            dense
            placeholder="Channel"
            return-object
            item-text="name"
            @change="changeChannel"
            v-model="channel"
            style="width: 190px"
            :class="!channel && 'mr-6'"
          />
          <v-btn
            v-if="channel"
            small
            icon
            class="mr-6 mb-6 ml-2"
            size="20px"
            @click="removeChannel"
          >
            <v-icon small> fas fa-times </v-icon>
          </v-btn>

          <custom-input
            dense
            placeholder="Search"
            style="width: 200px"
            v-model="keyword"
            @keyup.enter="handleSearch"
          />
        </div>
      </div>
    </div>

    <router-view />
    <div  class="d-flex justify-end mt-4">
      <v-pagination
        :length="totalPages"
        prev-icon="mdi-menu-left"
        next-icon="mdi-menu-right"
        total-visible="10"
        color="primary"
        v-model="currentPage"
      />
    </div>
    <v-alert :class="p.alert" :value="alertError" type="error">
      {{ errorMessage }}
    </v-alert>
  </div>
</template>

<script>
import HeaderContent from "@/containers/HeaderContent";
import { mapActions, mapMutations, mapState } from "vuex";
export default {
  components: {
    HeaderContent,
  },
  mounted() {
    this.fetchDataChannel();
  },
  computed : {
    ...mapState({
      totalPages : (state) => state.post.totalPages,
      channelCode : (state) => state.post.channelCode
    }),
    currentPage : {
      get() {
        const page = this.$route.params.page
        const current = Number(page)
        return current
      },
      set(value) {
        const name = this.$route.name
        this.$router.push({
          name,
          params : {
            page : value
          }
        })
        if(this.keyword) {
          return this.fetchSearchApi(name)
        }else{
          return this.handleFetchApiFeeds()
        }
      }
    }
  },
  methods: {
    ...mapActions({
      getListChannel: "channel/getAllChannel",
      fetchFeeds: "post/fetchFeeds",
      searchFeed: "post/searchFeed",
    }),
    resetFeeds() {
      this.channel = null;
      this.keyword = ''
      this.setFeeds([]);
      this.setKeyWord('')
    },
    resetFields(routerName) {
      this.setKeyWord('')
      this.setChannelCode(null)
      this.$router.push({
        name : routerName,
        params : {
          page : 1
        }
      })
    },
    fetchSearchApi (routerName) {
      const keyword = this.keyword
      const page = this.$route.params.page
      const payload = {
        keyword: keyword,
        tab: routerName,
        page : page - 1
      };
      this.setKeyWord(keyword)
      return this.searchFeed(payload);
    },
    handleSearch() {
      const routerName = this.$route.name;
      const keyword = this.keyword
      if (keyword) {
        this.$router.push({
          name : routerName,
          params : {
            page : 1
          }
        })
        return this.fetchSearchApi(routerName)
      } else {
        this.setKeyWord('')
        this.resetFields(routerName)
        return this.handleFetchApiFeeds();
      }
    },
    ...mapMutations({
      setChannelCode: "post/setChannelCode",
      setFeeds: "post/setFeeds",
      setKeyWord : 'post/setKeyWord',
      setPage : 'post/setPage'
    }),
    moveToCreatePost() {
      this.$router.push({
        name: "createFeed",
      });
    },
    changeChannel(c) {
      const routerName = this.$route.name;
      const code = c.code;
      this.$router.push({
        name: routerName,
        params: {
          page: 1,
        },
      });
      this.setChannelCode(code);
      this.handleFetchApiFeeds()
    },
    removeChannel() {
      const routerName = this.$route.name;
      this.$router.push({
        name: routerName,
        params: {
          page: 1,
        },
      });
      this.setChannelCode(null);
      this.channel = null;
      this.handleFetchApiFeeds();
    },
    getParams() {
      const routerName = this.$route.name;
      const sort = this.typeOfSort(routerName);
      const page = this.$route.params.page;
      const code = this.channelCode
      // const page = this.currentPage
      const tempPayload = {
        tab : routerName,
        size : 10,
        page : page -1
      }
      const payload = {
        ...tempPayload,
        ...(code  && { channelCode: code }),
        ...(sort &&  {sort : sort} )
      }
      return payload
    },
    handleFetchApiFeeds() {
      const params = this.getParams()
      return this.fetchFeeds(params);
    },
    typeOfSort(tab) {
      if (tab === "draft") {
        return "createAt,DESC";
      } else if (tab === 'schedule') {
        return "scheduledTime,ASC";
      } else {
        return null;
      }
    },
    fetchDataChannel() {
      return this.getListChannel().then((response) => {
        const responseData = response.data.data;
        this.channels = responseData;
      });
    },
  },
  data() {
    return {
      channels: [],
      keyword: "",
      channel: null,
      alertError: false,
      errorMessage: "",
      list: [
        {
          text: "Konten Feed",
          disabled: true,
        },
      ],
      page: 1,
      tabs: [
        {
          name: "draft",
          label: "List Post Feed",
        },
        {
          name: "schedule",
          label: "Terjadwal",
        },
        {
          name: "list",
          label: "List Kontent",
        },
        {
          name: "reject",
          label: "Dihapus",
        },
      ],
    };
  },
};
</script>

<style lang="scss" module="p">
.alert {
  position: absolute;
  top: 20px;
  right: 20px;
}
</style>