<template>
  <div>
    <v-data-table hide-default-footer :headers="headers" :items="listNews.content">
      <template v-slot:item.publish="{item}">
        {{formatingDate(item.scheduledTime)}}
        <!-- {{item.scheduledTime}} -->
      </template>
    </v-data-table>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  props: ["listNews"],
  methods : {
    formatingDate(rawDate) {
      const second = rawDate/1000
      const newD = moment.unix(second).format("D/M/YYYY HH:mm");
      return newD;
    },
  },
  data() {
    return {
      headers: [
        {
          text: "Penyunting",
          value: "publisher",
          class: "whitesnow",
          sortable: false,
          filterable: false,
          width: "120"
        },
        {
          text: "Headline",
          value: "headline",
          class: "whitesnow",
          sortable: false,
          filterable: false,
        },
        {
          text: "Publish Time",
          value: "publish",
          class: "whitesnow",
          sortable: false,
          filterable: false,
          width : '200'
        }
      ]
    };
  }
};
</script>
