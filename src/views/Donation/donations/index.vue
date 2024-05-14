<template>
  <div>
    <HeaderContent
      label="List Penggalangan Dana"
      :list="crumbs"
    ></HeaderContent>

    <section class="d-flex justify-space-between align-center">
      <div>
        <v-tabs v-model="tab">
          <v-tab
            v-for="item in listTab"
            :key="item"
            class="text-capitalize"
            style="letter-spacing: 0"
            >{{ item }}</v-tab
          >
        </v-tabs>
      </div>
      <div :class="d.header">
        <custom-button
          size="x-medium"
          v-if="!isExpand && tab != 1"
          @click="openExpand"
        >
          Filter Data
        </custom-button>
        <k-input
          v-if="tab != 1"
          @keyup.enter="onEnter"
          placeholder="Cari donasi.."
          v-model="keyword"
        />
        <custom-button
          size="x-medium"
          color="primary"
          @click="openFormDonation"
        >
          Buat Penggalangan Dana Baru
        </custom-button>
      </div>
    </section>

    <section>
      <Expand
        v-if="isExpand"
        @onCancel="onCloseExpand"
        @onFilter="onFilter"
        style="margin-top: 8px"
      />
      <div :class="d.info" style="margin: 8px 0">
        <div class="d-flex align-center">
          <v-icon small color="secondary">info</v-icon>
          <div style="margin-left: 4px">
            Penggalangan dana pada list ini hanya bisa di trendingkan dalam
            waktu 48 jam setelah dibuat
          </div>
        </div>
      </div>
    </section>

    <v-tabs-items v-model="tab">
      <v-tab-item>
        <Tabledonation
          :items="donations"
          @refreshData="refreshData"
          :statusFind="statusFind"
          :isLoading="isLoading"
        />
        <div class="d-flex justify-end mt-2">
          <v-pagination
            v-if="totalPages > 1"
            v-model="page"
            :length="totalPages"
            @input="onInput"
            :total-visible="7"
          ></v-pagination>
        </div>
      </v-tab-item>
      <v-tab-item>
        <Notification :tab="tab"></Notification>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
import HeaderContent from "@/containers/HeaderContent";
import Tabledonation from "./table.vue";
import Expand from "./expand.vue";
import Notification from "./notification/index.vue";
import { mapActions } from "vuex";

export default {
  components: {
    HeaderContent,
    Tabledonation,
    Expand,
    Notification,
  },
  data() {
    return {
      tab: 0,
      listTab: ["Penggalangan Dana", "List Notif"],
      page: 1,
      totalPages: 0,
      statusFind: "",
      params: {},
      keyword: "",
      isLoading: false,
      isExpand: false,
      crumbs: [
        {
          text: "Penggalangan Dana",
          disabled: true,
        },
      ],
      donations: [],
    };
  },
  watch: {
    tab() {
      this.isExpand = false;
      if (this.tab == 0 && this.keyword == "") {
        this.handleDonations();
      }
    },
  },
  mounted() {
    this.handleDonations();
  },
  methods: {
    ...mapActions({
      getListDonation: "donation/getListDonation",
      deleteDonation: "donation/deleteDonation",
      fetchDonations: "donation/fetchDonations",
    }),
    refreshData() {
      this.handleDonations();
    },
    handleData(payload) {
      return this.fetchDonations(payload)
        .then((response) => {
          this.page = 1;
          this.isLoading = false;
          const content = response.content;
          const totalPages = response.totalPages;
          this.totalPages = totalPages;
          this.donations = content;
        })
        .catch((err) => {
          this.isLoading = false;
        });
    },
    onFilter(params) {
      this.statusFind = "filter";
      this.params = { ...params };
      const payload = {
        ...params,
        page: 0,
        search: this.keyword,
      };
      this.isLoading = true;
      return this.handleData(payload);
    },
    openExpand() {
      this.isExpand = true;
    },
    onCloseExpand(item) {
      this.isExpand = false;
      this.statusFind = "";
      const payload = {
        ...item,
        search: this.keyword,
        page: 0,
      };
      this.isLoading = true;
      this.params = item;
      return this.handleData(payload);
    },
    onEnter() {
      this.statusFind = this.keyword.length > 0 ? "search" : "";
      const payload = {
        ...this.params,
        search: this.keyword,
        page: 0,
      };
      this.isLoading = true;
      return this.handleData(payload);
    },
    onInput(e) {
      this.page = e;
      const payload = {
        ...this.params,
        page: e - 1,
        search: this.keyword,
      };
      this.isLoading = true;
      return this.fetchDonations(payload)
        .then((response) => {
          this.isLoading = false;
          const content = response.content;
          const totalPages = response.totalPages;
          this.totalPages = totalPages;
          this.donations = content;
        })
        .catch(() => {
          this.isLoading = false;
        });
    },
    openFormDonation() {
      this.$router.push({
        name: "createDonation",
      });
    },
    handleDonations() {
      const payload = {
        page: this.page - 1,
      };
      this.isLoading = true;
      return this.fetchDonations(payload)
        .then((response) => {
          this.isLoading = false;
          const content = response.content;
          const totalPages = response.totalPages;
          this.totalPages = totalPages;
          this.donations = content;
        })
        .catch(() => {
          this.isLoading = false;
        });
    },
  },
};
</script>

<style lang="scss" src="../donation.scss" module="d"></style>
