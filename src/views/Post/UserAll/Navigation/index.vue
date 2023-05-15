<template>
  <div>
    <div class="d-flex justify-space-between mb-4">
      <v-tabs v-model="tab">
        <v-tabs-slider></v-tabs-slider>

        <v-tab
          v-for="item in items"
          :key="item"
          class="text-capitalize"
          style="letter-spacing: 0"
        >
          {{ item }}
        </v-tab>
      </v-tabs>

      <div class="d-flex align-center">
        <custom-button
          v-if="!showFilter"
          size="x-medium"
          @click="showFilter = true"
          class="mr-4"
        >
          <div>Filter Data</div>
        </custom-button>
        <input
          style="width: 200px"
          placeholder="Search"
          :class="p['input-search']"
          v-model="keywordTrending"
          @keyup.enter="actionFilter"
        />
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
          <Select-Date></Select-Date>
        </div>
      </div>

      <div class="col d-flex justify-end align-center">
        <custom-button color="success" @click="actionFilter">
          Terapkan Filter
        </custom-button>
        <custom-button class="ml-2" @click="isResetFilter = true">
          Batalkan
        </custom-button>
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
      items: ["Semua Postingan", "Trending", "List Push Notif"],
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
      this.isResetFilter = true;
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
      setParamsDateTrending: "post/setParamsDateTrending",
    }),
    getRoute() {
      this.isResetFilter = true;
      if (this.$route.params.tab == "candidates") {
        this.tab = 0;
      } else if (this.$route.params.tab == "trending") {
        this.tab = 1;
      } else if (this.$route.params.tab == "notification") {
        this.tab = 2;
      }
    },
    convertEpoch(d, h, m) {
      const epochDate = moment(`${d} ${h}:${m}`, "YYYY-MM-DD HH:mm")
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
        keyword: this.keywordSearchTrending,
        search: this.keywordSearchTrending,
        usernames: this.paramsUsersTrending.join(","),
        channelCodes: this.paramsChannelTrending.join(","),
        startAt:
          this.paramsDateTrending.length > 0
            ? this.convertEpoch(this.paramsDateTrending[0], 0, 0)
            : "",
        endAt:
          this.paramsDateTrending.length > 0
            ? this.convertEpoch(this.paramsDateTrending[1], 23, 59)
            : "",
      };
      this.$emit("onActionFilter", filterPayload);
    },
  },
};
</script>

<style lang="scss" module="p">
.input-search {
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  height: 32px;
  font-size: 12px;
  padding: 9px;
  &:focus {
    outline: none;
  }
}
</style>
