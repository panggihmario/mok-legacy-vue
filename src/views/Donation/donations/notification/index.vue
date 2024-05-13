<template>
  <div>
    <v-data-table
      dense
      :headers="headers"
      hide-default-footer
      disable-sort
      disable-filtering
      style="color: #767676; font-size: 12px !important; font-weight: 500"
      :items-per-page="10"
      :items="items"
      :loading="isLoading"
    >
      <template v-slot:item.donationOriginalTitle="{ item }">
        <div :class="[table.list]">
          {{ item.donationOriginalTitle }}
        </div>
      </template>
      <template v-slot:item.initiatorName="{ item }">
        <div :class="[table.list]">
          {{ item.initiatorName }}
        </div>
      </template>
      <template v-slot:item.title="{ item }">
        <div :class="[table.list, table.ellipsis]">{{ item.title }}</div>
      </template>
      <template v-slot:item.description="{ item }">
        <div :class="[table.list, table.ellipsis]">{{ item.description }}</div>
      </template>
      <template v-slot:item.createdBy="{ item }">
        <div :class="[table.list]">{{ item.createdBy }}</div>
      </template>
      <template v-slot:item.createAt="{ item }">
        <div :class="[table.list]">{{ convertToHumanDate(item.createAt) }}</div>
      </template>
    </v-data-table>

    <section v-if="totalPages > 1" class="d-flex justify-end">
      <v-pagination
        v-model="page"
        :length="totalPages"
        :total-visible="7"
      ></v-pagination>
    </section>
  </div>
</template>

<script>
import moment from "moment";
import { mapActions } from "vuex";

export default {
  props: ["tab"],
  data() {
    return {
      headers: [
        {
          text: "Judul Penggalangan Dana",
          value: "donationOriginalTitle",
          class: "whitesnow",
          width: "220",
        },
        {
          text: "Initiator",
          value: "initiatorName",
          class: "whitesnow",
          width: "220",
        },
        {
          text: "Headline Notifikasi",
          value: "title",
          class: "whitesnow",
          width: "220",
        },
        {
          text: "Isi Notifikasi",
          value: "description",
          class: "whitesnow",
          width: "220",
        },
        {
          text: "Push Notif Oleh",
          value: "createdBy",
          class: "whitesnow",
          width: "160",
        },
        {
          text: "Waktu Push",
          value: "createAt",
          class: "whitesnow",
          width: "160",
        },
      ],
      items: [],
      isLoading: false,
      page: 1,
      totalPages: 1,
    };
  },
  watch: {
    tab() {
      if (this.tab == 1) {
        this.handleGetDonationHistoryNotif();
      }
    },
    page() {
      this.handleGetDonationHistoryNotif();
    },
  },
  mounted() {
    this.handleGetDonationHistoryNotif();
  },
  methods: {
    ...mapActions({
      getDonationHistoryNotif: "donation/getDonationHistoryNotif",
    }),
    handleGetDonationHistoryNotif() {
      const params = {
        page: this.page - 1,
        size: 10,
        sort: "createAt,desc",
      };
      this.isLoading = true;
      return this.getDonationHistoryNotif(params)
        .then((res) => {
          const data = res.data;
          this.items = data.data.content;
          this.totalPages = data.data.totalPages;
          this.isLoading = false;
        })
        .catch((err) => {
          console.log({ err });
          this.isLoading = false;
        });
    },
    convertToHumanDate(payload) {
      if (payload) {
        const cek = moment(payload).format("DD/MM/YYYY HH:mm");
        return cek;
      } else {
        return "-";
      }
    },
  },
};
</script>

<style src="../../donation.scss" lang="scss" module="table"></style>
