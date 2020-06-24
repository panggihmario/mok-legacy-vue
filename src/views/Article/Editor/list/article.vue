<template>
  <div>
    <v-data-table :headers="headers" hide-default-footer :items="articles">
      <template v-slot:item.status="{item}">
        <span :class="getColor(item.status)">{{item.status}}</span>
      </template>
      <template v-slot:item.action="{item}">
        <custom-button
          class="carmine--text"
          @click="moveToEdit(item.id)"
          v-if="item.status === 'Rejected'"
        >Edit</custom-button>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  props: ["articles"],
  methods: {
    ...mapActions({
      getNews: "news/getListNews"
    }),
    moveToEdit(id) {
      this.$router.push({
        name: "editArticle",
        params: {
          id: id
        }
      });
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
          text: "Status",
          value: "status",
          class: "whitesnow",
          sortable: false,
          filterable: false,
          width: "100"
        },
        {
          text: "Headline",
          value: "headline",
          class: "whitesnow",
          sortable: false,
          filterable: false,
          width: "750"
        },
        {
          text: "",
          value: "action",
          class: "whitesnow",
          sortable: false,
          filterable: false
        }
      ]
    };
  }
};
</script>
