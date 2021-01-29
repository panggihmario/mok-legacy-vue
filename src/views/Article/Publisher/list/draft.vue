<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="drafts.content"
      hide-default-footer
      disable-filtering
      disable-sort
    >
      <template v-slot:[`item.status`]="{ item }">
        <span :class="getColor(item.status)">{{ item.status }}</span>
      </template>
      <template v-slot:[`item.date`]="{ item }">
        {{ formatingDate(item.createAt) }}
      </template>
      <template v-slot:[`item.action`]="{ item }">
        <custom-button
          color="whitesnot"
          class="grey--text"
          @click="moveEdit(item.id)"
          >Lihat</custom-button
        >
      </template>
    </v-data-table>
  </div>
</template>

<script>
import moment from "moment";
export default {
  props: ["drafts"],
  data() {
    return {
      headers: [
        {
          text: "Tanggal",
          value: "date",
          class: "whitesnow",
          width: "100",
        },
        {
          text: "Penulis",
          value: "author",
          class: "whitesnow",
          width: "150",
        },
        {
          text: "Headline",
          value: "headline",
          class: "whitesnow",
          // width: "200",
        },
        {
          text: "",
          value: "action",
          class: "whitesnow",
          width: "250",
          align: "end",
        },
      ],
    };
  },
  methods: {
    moveEdit(id) {
      this.$router.push({
        name: "editPublisher",
        params: {
          id: id,
        },
      });
    },
    formatingDate(rawDate) {
      const newDt = rawDate / 1000;
      const newD = moment.unix(newDt).format("D/M/YYYY");
      // const day = newDt.getDate();
      // const month = newDt.getMonth() + 1;
      // const year = newDt.getFullYear();
      // const newFormat = `${day}/${month}/${year}`;
      return newD;
    },
    getColor(status) {
      switch (status) {
        case "Approved":
          return "primary--text";
        case "Rejected":
          return "carmine--text";
        default:
          return "grey--text";
      }
    },
  },
};
</script>
