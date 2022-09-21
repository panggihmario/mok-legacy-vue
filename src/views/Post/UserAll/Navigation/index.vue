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
          <Autocomplete-Username
            :itemsFilter="itemsUser"
            @onSearchFilter="(v) => actionSearchFilter(v, 'User')"
          ></Autocomplete-Username>
        </div>
        <div class="ml-2" style="width: 200px">
          <Autocomplete-Channel
            :itemsFilter="itemsChannel"
            @onSearchFilter="(v) => actionSearchFilter(v, 'Channel')"
          ></Autocomplete-Channel>
        </div>
        <div class="ml-2" style="width: 200px">
          <Select-Date
            :tab="tab"
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
import SelectDate from "../selectDate.vue";
import { mapMutations, mapState } from "vuex";
import AutocompleteUsername from "./autocompleteUsername.vue";
import AutocompleteChannel from "./autocompleteChannel.vue";

export default {
  components: {
    SelectDate,
    AutocompleteUsername,
    AutocompleteChannel,
  },
  props: ["itemsUser", "itemsChannel"],
  data() {
    return {
      tab: 0,
      items: ["Semua Postingan", "Trending"],
      search: "",
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
      this.usernameFilter = [];
      this.channelFilter = [];
      this.filterPayload.startAt = "";
      this.filterPayload.endAt = "";
    },
    isResetFilter() {
      if (this.isResetFilter) {
        this.keywordTrending = "";
        this.usernameFilter = [];
        this.channelFilter = [];
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
      this.searchChannel = "";
      this.filterPayload.startAt = "";
      this.filterPayload.endAt = "";
      this.$emit("onSearchUser", "a");
      this.$emit("onSearchChannel", "a");
      if (!this.showFilter) {
        this.$emit("onCancelFilter");
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
      paramsChannelTrending: (state) => state.post.paramsChannelTrending,
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
    channelFilter: {
      get() {
        return this.paramsChannelTrending;
      },
      set(value) {
        this.setParamsChannelTrending(value);
      },
    },
  },
  methods: {
    ...mapMutations({
      setKeywordSearchTrending: "post/setKeywordSearchTrending",
      setParamsUsersTrending: "post/setParamsUsersTrending",
      setParamsChannelTrending: "post/setParamsChannelTrending",
      setDisplayDateTrending: "post/setDisplayDateTrending",
      setParamsDateTrending: "post/setParamsDateTrending",
    }),
    getRoute() {
      this.isResetFilter = true;
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
    actionSearchFilter(v, type) {
      if (v != null && v.length > 0) {
        this.$emit(`onSearch${type}`, v);
      }
    },
    actionFilter() {
      let filterPayload = {
        usernames: this.paramsUsersTrending.join(","),
        channelCodes: this.paramsChannelTrending.join(","),
        startAt: this.filterPayload.startAt,
        endAt: this.filterPayload.endAt,
        keyword: this.keywordSearchTrending,
      };
      this.$emit("onActionFilter", filterPayload);
    },
  },
};
</script>
