<template>
  <div>
    <v-data-table
      :headers="headers"
      hide-default-footer
      :items="items"
      no-data-text="Tidak Ada Komplain"
      :items-per-page="-1"
    >
      <template v-slot:item="{ item }">
        <tr>
          <td class="item__data">{{ formatingDate(item.createAt) }}</td>
          <td class="item__data">{{ item.accountBuyer.username }}</td>
          <td class="item__data secondary--text">{{ item.order.noInvoice }}</td>
          <td class="item__data">{{ item.reason }}</td>
          <td class="py-4">
            <custom-button class="grey--text" @click="goToDetail(item)"
              >Lihat Detail</custom-button
            >
          </td>
        </tr>
      </template>
    </v-data-table>

    <div class="d-flex justify-space-between align-center mt-10">
      <div>
        <span class="font-12">Total Elements : {{ totalElements }}</span>
      </div>
      <v-pagination
        class="d-flex justify-end"
        v-model="page"
        :length="totalPages"
        :total-visible="6"
        prev-icon="mdi-menu-left"
        next-icon="mdi-menu-right"
      ></v-pagination>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  data() {
    return {
      headers: [
        {
          text: "Tanggal komplain",
          value: "date",
          class: "whitesnow",
          sortable: false,
          filterable: false,
          width: "80",
        },
        {
          text: "Nama User",
          value: "name",
          class: "whitesnow",
          sortable: false,
          filterable: false,
          width: "120",
        },
        {
          text: "Invoice",
          value: "inv",
          class: "whitesnow",
          sortable: false,
          filterable: false,
          width: "120",
        },
        {
          text: "Alasan",
          value: "reason",
          class: "whitesnow",
          sortable: false,
          filterable: false,
          width: "140",
        },
        {
          text: "Action",
          value: "Action",
          class: "whitesnow",
          sortable: false,
          filterable: false,
          width: "100",
        },
      ],
      items: [],
      totalElements: 0,
      page: 1,
      totalPages: 1,
    };
  },
  watch: {
    page() {
      this.handleGetListComplaint();
    },
  },
  mounted() {
    this.handleGetListComplaint();
  },
  computed: {
    ...mapState({
      role: (state) => state.authentication.role,
    }),
  },
  methods: {
    ...mapActions({
      getListComplaint: "complaint/getListComplaint",
    }),
    formatingDate(rawDate) {
      const newDt = new Date(rawDate);
      const day = newDt.getDate();
      const month = newDt.getMonth() + 1;
      const year = newDt.getFullYear();
      const newFormat = `${day}/${month}/${year}`;
      return newFormat;
    },
    async handleGetListComplaint() {
      switch (this.role) {
        case "ROLE_SPV_COMPLAINT":
          this.handleGetAdminSpv();
          break;
        case "ROLE_CS_COMPLAINT":
          this.handleGetAdminCs();
          break;
        default:
          this.items = [];
          break;
      }
    },
    async handleGetAdminCs() {
      const payload = {
        type: "cs",
        status: "new",
        params: {
          sort: "ASC",
          page: this.page - 1,
          size: 10,
        },
      };
      const response = await this.getListComplaint(payload);
      if (response.status === 200) {
        this.items = response.data.data.content;
        this.totalPages = response.data.data.totalPages;
        this.totalElements = response.data.data.totalElements;
        this.$emit("getTotalList", this.items.length);
      } else {
        console.error(error);
      }
    },
    async handleGetAdminSpv() {
      const payload = {
        type: "spv",
        status: "new",
        params: {
          sort: "ASC",
          page: this.page - 1,
          size: 10,
        },
      };
      const response = await this.getListComplaint(payload);
      if (response.status === 200) {
        this.items = response.data.data.content;
        this.totalPages = response.data.data.totalPages;
        this.totalElements = response.data.data.totalElements;
        this.$emit("getTotalList", this.items.length);
      } else {
        console.log(error);
      }
    },
    goToDetail(item) {
      const params = {
        id: item.id,
      };
      this.$emit("goToDetail", params);
    },
  },
};
</script>
