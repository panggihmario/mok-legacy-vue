<template>
  <div>
    <v-data-table
      :headers="headers"
      hide-default-footer
      :items="items"
      no-data-text="Tidak Ada Komplain"
    >
      <template v-slot:item="{ item }">
        <tr>
          <td class="item__data">{{ formatingDate(item.createAt) }}</td>
          <td class="item__data">{{ item.accountBuyer.username }}</td>
          <td class="item__data tertiary--text">
            {{ item.accountAdmin.username }}
          </td>
          <td class="item__data">
            {{
              item.finalDecision == "RETURN_TO_BUYER"
                ? "Kembalikan dana ke pembeli"
                : "Teruskan dana ke penjual"
            }}
          </td>
          <td class="py-4">
            <custom-button class="grey--text" @click="goToDetail(item)"
              >Lihat Detail</custom-button
            >
          </td>
        </tr>
      </template>
    </v-data-table>
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
          text: "Nama Penjual",
          value: "sellerName",
          class: "whitesnow",
          sortable: false,
          filterable: false,
          width: "120",
        },
        {
          text: "Mediasi Akhir",
          value: "mediation",
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
    };
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
        status: "finish",
      };
      const response = await this.getListComplaint(payload);
      if (response.status === 200) {
        this.items = response.data.data.content;
        this.$emit("getTotalList", this.items.length);
      } else {
        console.error(error);
      }
    },
    async handleGetAdminSpv() {
      const payload = {
        type: "spv",
        status: "finish",
      };
      const response = await this.getListComplaint(payload);
      if (response.status === 200) {
        this.items = response.data.data.content;
        this.$emit("getTotalList", this.items.length);
      } else {
        console.error(error);
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
