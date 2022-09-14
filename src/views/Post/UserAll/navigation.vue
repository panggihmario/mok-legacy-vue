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
            v-model="filterPayload.keyword"
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
            v-model="filterPayload.usernames"
            :items="itemsUser"
            :search-input.sync="searchUser"
            item-text="username"
            label="User"
            solo
            dense
            clearable
            hide-details
            flat
            color="white"
            background-color="white"
          ></v-autocomplete>
        </div>
        <div class="ml-2" style="width: 200px">
          <v-autocomplete
            class="font-12"
            v-model="filterPayload.channelCodes"
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
        usernames: "",
        channelCodes: "",
        startAt: "",
        endAt: "",
        keyword: "",
      },
    };
  },
  watch: {
    tab() {
      this.$emit("changeTab", this.tab);
      this.filterPayload.usernames = "";
      this.filterPayload.channelCodes = "";
      this.filterPayload.startAt = "";
      this.filterPayload.endAt = "";
      this.filterPayload.keyword = "";
    },
    isResetFilter() {
      if (this.isResetFilter) {
        setTimeout(() => {
          this.isResetFilter = false;
          this.showFilter = false;
        }, 100);
      }
    },
    "filterPayload.keyword"() {
      if (
        this.filterPayload.keyword == "" ||
        this.filterPayload.keyword == null
      ) {
        this.actionFilter();
      }
    },
    showFilter() {
      this.searchUser = "";
      this.searchChannel = "";
      this.filterPayload.usernames = "";
      this.filterPayload.channelCodes = "";
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
  methods: {
    getRoute() {
      if (this.$route.params.tab == "candidates") {
        this.tab = 0;
      } else {
        this.tab = 1;
      }
    },
    onSetDate(v) {
      this.filterPayload.startAt = this.convertEpoch(v.start, 0, 0);
      this.filterPayload.endAt = this.convertEpoch(v.end, 23, 59);
    },
    convertEpoch(d, h, m) {
      const epochDate = moment(`${d} ${h}:${m}`, "DD/MM/YYYY HH:mm")
        .add(7, "hours")
        .unix();
      const miliEpoch = epochDate * 1000;
      return miliEpoch;
    },
    actionFilter() {
      this.$emit("onActionFilter", this.filterPayload);
    },
  },
};
</script>
