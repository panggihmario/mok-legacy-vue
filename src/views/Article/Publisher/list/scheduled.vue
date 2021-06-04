<template>
  <div>
    <v-data-table hide-default-footer :headers="headers" :items="listNews.content">
      <template v-slot:item.publish="{item}">
        {{formatingDate(item.scheduledTime)}}
        <!-- {{item.scheduledTime}} -->
      </template>
    </v-data-table>
    <v-pagination
      :length="listNews.totalPages"
      prev-icon="mdi-menu-left"
      next-icon="mdi-menu-right"
      v-model="pageNews"
      @input="getNewsBaseOnPage"
      :total-visible="6"
    />
  </div>
</template>

<script>
import moment from 'moment'
export default {
  props: ["listNews"],
  methods : {
    formatingDate(rawDate) {
      const second = rawDate/1000
      const newD = moment.unix(second).add(7, 'hours').format("DD/MM/YYYY HH:mm")
      return newD;
    },
    getNewsBaseOnPage(p) {
      const params = {
        page: p,
        tab: "scheduled",
      };
      this.$emit("getNewsBaseOnPage", params);
    },
  },
  data() {
    return {
      pageNews: 1,
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
