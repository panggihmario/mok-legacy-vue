<template>
  <div>
    <v-data-table :headers="headers" hide-default-footer :items="data">
      <template v-slot:item="{ item }">
        <tr>
          <td class="item__data">{{ item.date }}</td>
          <td class="item__data">{{ item.name }}</td>
          <td class="item__data secondary--text">{{ item.inv }}</td>
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
      data: [
        {
          id: "ff8080817569087d0175690b22700000",
          name: "Budi",
          date: "02/02/2020",
          inv: "INV/KK/YYYYMMDDXXX",
          reason: "Barang cacat",
        },
      ],
    };
  },
  mounted() {
    this.handleGetListComplaint();
  },
  methods: {
    ...mapActions({
      getListComplaint: "complaint/getListComplaint",
    }),
    async handleGetListComplaint() {
      const payload = {
        type: "new",
      };
      const response = await this.getListComplaint(payload);
      if (response.status === 204) {
        console.log("success new", response);
      } else {
        console.error(error);
      }
    },
    goToDetail(item) {
      const data = {
        id: item.id,
        inv: item.inv,
      };
      this.$emit("goToDetail", data);
    },
  },
};
</script>
