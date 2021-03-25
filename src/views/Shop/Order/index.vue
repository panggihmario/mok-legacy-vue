<template>
  <div>
    <HeaderContent label="Order List" :list="crumbs" />
    <div class="d-flex justify-space-between mb-6">
      <div class="d-flex flex-wrap">
        <div
          v-for="(item, idx) in tabLabel"
          :key="idx"
          class="d-flex justify-center align-center font-12 box-tab mb-2 mr-3 py-2 px-4"
          :class="{ 'primarylowtint primary--text': tab == idx + 1 }"
          @click="moveTab(idx + 1)"
        >
          {{ item }}
          <span
            class="ml-1"
            :class="{
              'primary--text': tab == idx + 1,
              'grey--text': tab != idx + 1,
            }"
            >{{ tabCount[listCount[idx]] }}</span
          >
        </div>
      </div>
      <div class="ml-4" style="width: 200px;">
        <v-text-field
          v-model="searchValue"
          placeholder="Search"
          outlined
          dense
          @keypress.enter="handleGetOrderSearch"
        ></v-text-field>
      </div>
    </div>

    <div v-if="isSearch">
      <Table-Search
        :items="searchItems"
        :loading="searchLoading"
      ></Table-Search>
    </div>
    <div v-else>
      <Table-All v-if="tab == 1"></Table-All>
      <Table-Unpaid v-if="tab == 2"></Table-Unpaid>
      <Table-Witing v-if="tab == 3"></Table-Witing>
      <Table-Process v-if="tab == 4"></Table-Process>
      <Table-Shipping v-if="tab == 5"></Table-Shipping>
      <Table-Complete v-if="tab == 6"></Table-Complete>
      <Table-Cancel v-if="tab == 7"></Table-Cancel>
    </div>
  </div>
</template>

<script>
import HeaderContent from "@/containers/HeaderContent";
import TableSearch from "./search.vue";
import TableAll from "./all.vue";
import TableUnpaid from "./unpaid.vue";
import TableWiting from "./waiting.vue";
import TableProcess from "./process.vue";
import TableShipping from "./shipping.vue";
import TableComplete from "./complete.vue";
import TableCancel from "./cancel.vue";
import { mapActions } from "vuex";

export default {
  components: {
    HeaderContent,
    TableSearch,
    TableAll,
    TableUnpaid,
    TableWiting,
    TableProcess,
    TableShipping,
    TableComplete,
    TableCancel,
  },
  data() {
    return {
      crumbs: [
        {
          text: "Order",
        },
        {
          text: "List Order",
          disabled: true,
        },
      ],
      tabLabel: [
        "Semua",
        "Belum Bayar",
        "Menunggu",
        "Diproses",
        "Dikirim",
        "Selesai",
        "Batal",
      ],
      listCount: [
        "all",
        "unpaid",
        "waiting",
        "process",
        "shipping",
        "complete",
        "cancel",
      ],
      tab: 1,
      tabCount: {},
      isSearch: false,
      searchValue: "",
      searchItems: [],
      searchLoading: false,
    };
  },
  watch: {
    searchPage: function() {
      this.handleGetOrderSearch();
    },
  },
  mounted() {
    this.handleGetOrderCount();
  },
  methods: {
    ...mapActions({
      getOrderCount: "order/getOrderCount",
      getOrderSearch: "order/getOrderSearch",
    }),
    handleGetOrderCount() {
      return this.getOrderCount()
        .then((response) => {
          this.tabCount = response.data.data;
        })
        .catch();
    },
    handleGetOrderSearch() {
      this.isSearch = true;
      this.searchLoading = true;
      return this.getOrderSearch(this.searchValue)
        .then((response) => {
          this.searchLoading = false;
          this.searchItems = response.data.data;
        })
        .catch((err) => {
          console.error(err);
          this.isSearch = false;
          this.searchLoading = false;
        });
    },
    moveTab(i) {
      this.isSearch = false;
      this.searchValue = "";
      this.searchItems = [];
      this.tab = i;
      this.handleGetOrderCount();
    },
  },
};
</script>

<style lang="sass" scoped>
.font-12
	font-size: 12px
.dialog
	&__container
		padding: 32px
	&__label
		font-size: 20px
		font-weight: 500
		margin-bottom: 20px
.item
	&__data
		font-size: 12px
		color: #767676
.box-tab
	cursor: pointer
	background-color: #FAFAFA
	border-radius: 32px
	height: 40px
	min-width: 90px
</style>
