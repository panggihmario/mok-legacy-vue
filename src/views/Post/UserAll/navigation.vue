<template>
  <div>
    <div class="d-flex justify-space-between mb-4">
      <v-tabs v-model="tab">
        <v-tabs-slider></v-tabs-slider>

        <v-tab v-for="item in items" :key="item" class="text-capitalize">
          {{ item }}
        </v-tab>
      </v-tabs>

      <div class="d-flex align-center">
        <v-btn
          v-if="!showFilter"
          depressed
          class="text-capitalize"
          @click="showFilter = true"
          height="40px"
          >Filter Data</v-btn
        >
        <div class="ml-2" style="width: 200px">
          <v-text-field
            v-model="keywordTrending"
            placeholder="Search"
            clearable
            dense
            outlined
            full-width
            hide-details
            @keypress.enter="actionFilter"
          ></v-text-field>
        </div>
      </div>
    </div>

    <div v-if="showFilter" class="row no-gutters whitesmoke py-2 px-4">
      <div class="col-7 d-flex align-center">
        <span class="font-12">Filter</span>
        <div class="ml-2" style="width: 200px">
          <v-autocomplete
            class="font-12"
            v-model="usernameFilter"
            :items="itemsUser"
            :search-input.sync="searchUser"
            item-text="username"
            item-value="username"
            label="User"
            solo
            dense
            clearable
            hide-details
            flat
            background-color="white"
          ></v-autocomplete>
        </div>
        <div class="ml-2" style="width: 200px">
          <v-autocomplete
            class="font-12"
            v-model="channelCodesFilter"
            :items="itemsChannel"
            :search-input.sync="searchChannel"
            item-text="name"
            item-value="code"
            label="Channel"
            solo
            dense
            clearable
            hide-details
            flat
            background-color="white"
          ></v-autocomplete>
        </div>
        <div class="ml-2" style="width: 200px">
          <Select-Date
            :reset="isResetFilter"
            @onSetDate="onSetDate"
            @onResetDate="onSetDate"
          ></Select-Date>
        </div>
      </div>

      <div class="col d-flex justify-end align-center">
        <v-btn
          depressed
          color="success"
          class="text-capitalize"
          @click="actionFilter"
          >Terapkan Filter</v-btn
        >
        <v-btn
          depressed
          class="ml-2 text-capitalize"
          @click="isResetFilter = true"
          >Batalkan</v-btn
        >
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import SelectDate from "./selectDate.vue";
import { mapMutations, mapState } from "vuex";

export default {
  components: {
    SelectDate,
  },
  props: ["itemsUser", "itemsChannel"],
  data() {
    return {
      tab: 0,
      items: ["Semua Postingan", "Trending"],
      search: "",
      searchUser: "",
      searchChannel: "",
      showFilter: false,
      isResetFilter: false,
      filterUser: null,
      filterChannel: null,
      filterPayload: {
        startAt: "",
        endAt: "",
      },
    };
  },
  watch: {
    tab() {
      this.$emit("changeTab", this.tab);
      this.keywordTrending = "";
      this.usernameFilter = "";
      this.channelCodesFilter = "";
      this.filterPayload.startAt = "";
      this.filterPayload.endAt = "";
      this.filterPayload = {
        startAt: "",
        endAt: "",
      };
    },
    isResetFilter() {
      if (this.isResetFilter) {
        this.keywordTrending = "";
        this.usernameFilter = "";
        this.channelCodesFilter = "";
        this.filterPayload.startAt = "";
        this.filterPayload.endAt = "";
        setTimeout(() => {
          this.isResetFilter = false;
          this.showFilter = false;
        }, 100);
      }
    },
    keywordSearchTrending() {
      if (
        this.keywordSearchTrending == "" ||
        this.keywordSearchTrending == null
      ) {
        this.actionFilter();
      }
    },
    showFilter() {
      this.searchUser = "";
      this.searchChannel = "";
      this.filterPayload.startAt = "";
      this.filterPayload.endAt = "";
      this.$emit("onSearchUser", "a");
      this.$emit("onSearchChannel", "a");
      if (!this.showFilter) {
        this.$emit("onCancelFilter");
      }
    },
    searchUser() {
      if (this.searchUser != null && this.searchUser.length > 0) {
        this.$emit("onSearchUser", this.searchUser);
      }
    },
    searchChannel() {
      if (this.searchChannel != null && this.searchChannel.length > 0) {
        this.$emit("onSearchChannel", this.searchChannel);
      }
    },
  },
  mounted() {
    this.getRoute();
  },
  computed: {
    ...mapState({
      keywordSearchTrending: (state) => state.post.keywordSearchTrending,
      paramsUsersTrending: (state) => state.post.paramsUsersTrending,
      channelCodeTrending: (state) => state.post.channelCodeTrending,
      paramsDateTrending: (state) => state.post.paramsDateTrending,
      displayDateTrending: (state) => state.post.displayDateTrending,
    }),
    keywordTrending: {
      get() {
        return this.keywordSearchTrending;
      },
      set(value) {
        this.setKeywordSearchTrending(value);
      },
    },
    usernameFilter: {
      get() {
        return this.paramsUsersTrending;
      },
      set(value) {
        this.setParamsUsersTrending(value);
      },
    },
    channelCodesFilter: {
      get() {
        return this.channelCodeTrending;
      },
      set(value) {
        this.setChannelCodeTrending(value);
      },
    },
  },
  methods: {
    ...mapMutations({
      setKeywordSearchTrending: "post/setKeywordSearchTrending",
      setParamsUsersTrending: "post/setParamsUsersTrending",
      setDisplayDateTrending: "post/setDisplayDateTrending",
      setChannelCodeTrending: "post/setChannelCodeTrending",
      setParamsDateTrending: "post/setParamsDateTrending",
    }),
    getRoute() {
      if (this.$route.params.tab == "candidates") {
        this.tab = 0;
      } else {
        this.tab = 1;
      }
    },
    onSetDate(v) {
      this.setParamsDateTrending(v ? [v.start, v.end] : []);
      this.filterPayload.startAt = v ? this.convertEpoch(v.start, 0, 0) : "";
      this.filterPayload.endAt = v ? this.convertEpoch(v.end, 23, 59) : "";
    },
    convertEpoch(d, h, m) {
      const epochDate = moment(`${d} ${h}:${m}`, "DD/MM/YYYY HH:mm")
        .add(7, "hours")
        .unix();
      const miliEpoch = epochDate * 1000;
      return miliEpoch;
    },
    actionFilter() {
      let filterPayload = {
        usernames: this.paramsUsersTrending,
        channelCodes: this.channelCodeTrending,
        startAt: this.filterPayload.startAt,
        endAt: this.filterPayload.endAt,
        keyword: this.keywordSearchTrending,
      };
      this.$emit("onActionFilter", filterPayload);
    },
  },
};
</script>
