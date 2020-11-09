<template>
  <div>
    <v-data-table :headers="headers" hide-default-footer :items="data">
      <template v-slot:item="{ item }">
        <tr>
          <td class="item__data">{{ item.date }}</td>
          <td class="item__data">{{ item.name }}</td>
          <td class="item__data tertiary--text">{{ item.inv }}</td>
          <td class="item__data">{{ item.admin }}</td>
          <td class="py-4">
            <custom-button class="grey--text" @click="goToDetail(item.id)"
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
          text: "Admin Terkait",
          value: "admin",
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
          name: "Fashion Pria",
          date: "02/02/2020",
          inv: "INV/KK/YYYYMMDDXXX",
          admin: "Agus Santoso",
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
        type: "process",
      };
      const response = await this.getListComplaint(payload);
      if (response.status === 204) {
        console.log("success process", response);
      } else {
        console.error(error);
      }
    },
    goToDetail(id) {
      this.$emit("goToDetail", id);
    },
  },
};
</script>
