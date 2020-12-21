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
  </div>
</template>

<script>
import { mapActions } from "vuex";

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
    };
  },
  mounted() {
    this.handleGetListComplaint();
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
      const payload = {
        type: "new",
      };
      const response = await this.getListComplaint(payload);
      if (response.status === 200) {
        console.log("success new", response);
        this.items = response.data.data.content;
        this.$emit("getTotalList", this.items.length);
      } else if (response.status === 204) {
        console.log("success new", response);
      } else {
        console.error(error);
      }
    },
    goToDetail(item) {
      const params = {
        id: item.id,
        inv: item.order.noInvoice,
      };
      this.$emit("goToDetail", params);
    },
  },
};
</script>
