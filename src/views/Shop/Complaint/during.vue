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
            <custom-button
              class="grey--text"
              @click="goToDetail(item.inv)"
              >Lihat Detail</custom-button
            >
          </td>
        </tr>
      </template>
    </v-data-table>
  </div>
</template>

<script>
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
          name: "Fashion Pria",
          date: "02/02/2020",
          inv: "INV/KK/YYYYMMDDXXX",
          admin: "Agus Santoso",
        },
      ],
    };
  },
  methods: {
    goToDetail(inv) {
      this.$emit("goToDetail", inv)
    }
  }
};
</script>
