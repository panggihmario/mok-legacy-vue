<template>
  <div>
    <v-data-table hide-default-footer :headers="headers" :items="drafts.content">
      <template v-slot:item.status="{ item }">
        <span :class="getColor(item.status)">{{ item.status }}</span>
      </template>
      <template v-slot:item.date="{item}">
        {{formatingDate(item.createAt)}}
      </template>
      <template v-slot:item.action="{ item }">
        <custom-button color="whitesnot" class="grey--text" @click="moveEdit(item.id)">Lihat</custom-button>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  props: ["drafts"],
  methods: {
    moveEdit(id) {
      this.$router.push({
        name: "editPublisher",
        params: {
          id: id
        }
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
    }
  },
  data() {
    return {
      headers: [
        {
          text: "Tanggal",
          value: "date",
          class: "whitesnow",
          sortable: false,
          filterable: false,
          width: "100"
        },
        {
          text: "Editor",
          value: "editor",
          class: "whitesnow",
          sortable: false,
          filterable: false,
          width: "200"
        },
        {
          text: "Headline",
          value: "headline",
          class: "whitesnow",
          sortable: false,
          filterable: false,
          width: "600"
        },
        {
          text: "",
          value: "action",
          class: "whitesnow",
          sortable: false,
          filterable: false
        }
      ],
      articles: [
        {
          date: "02/02/2020",
          editor: "Annisa Dewi",
          headline:
            "1 WNI Pasien Isolasi di RSPI Sulianti Saroso Meninggal Dunia "
        },
        {
          date: "02/02/2020",
          editor: "Natalia",
          headline:
            "1 WNI Pasien Isolasi di RSPI Sulianti Saroso Meninggal Dunia "
        },
        {
          date: "02/02/2020",
          editor: "Annisa Dewi",
          headline:
            "1 WNI Pasien Isolasi di RSPI Sulianti Saroso Meninggal Dunia "
        }
      ]
    };
  }
};
</script>
