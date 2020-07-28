<template>
  <div>
    <v-data-table hide-default-footer :headers="headers" :items="articles">
      <template v-slot:item.status="{item}">
        <span :class="getColor(item.status)">{{item.status}}</span>
      </template>
      <template v-slot:item.action="{item}">
        <custom-button
          class="carmine--text"
          v-if="item.status === 'Need Review'"
          @click="moveToReview(item.id)"
        >Review</custom-button>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  props: ["articles"],
  methods: {
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
    moveToReview(id) {
      this.$router.push({
        name: "reviewPublisher",
        params: {
          id
        }
      });
      console.log(id);
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
          width: "700"
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