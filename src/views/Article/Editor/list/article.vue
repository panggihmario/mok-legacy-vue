<template>
  <div>
    <v-data-table
      :headers="headers"
      hide-default-footer
      disable-sort
      disable-pagination
      :items="articles"
    >
      <template v-slot:item="{ item }">
        <tr>
          <td class="item__data">
            <span>{{ item.date }}</span>
          </td>
          <td class="item__data">
            <span :class="getColor(item.status)">{{ item.status }}</span>
          </td>
          <td class="item__data">
            <span>{{ item.headline }}</span>
          </td>
          <td class="item__data">
            <custom-button
              class="secondary--text"
              size="small"
              @click="moveToEdit(item.id)"
              v-if="item.status === 'Rejected'"
              >Edit</custom-button
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
  props: ["articles"],
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
          text: "Status",
          value: "status",
          class: "whitesnow",
          width: "150",
        },
        {
          text: "Headline",
          value: "headline",
          class: "whitesnow",
          width: "600",
        },
        {
          text: "",
          value: "action",
          class: "whitesnow",
          sortable: false,
          filterable: false,
        },
      ],
    };
  },
  methods: {
    moveToEdit(id) {
      this.$router.push({
        name: "editArticle",
        params: {
          id: id,
        },
      });
    },
    getColor(status) {
      switch (status) {
        case "Approved":
          return "kellygreen--text";
        case "Rejected":
          return "carmine--text";
        default:
          return "grey--text";
      }
    },
  },
};
</script>

<style lang="sass" scoped>
.item
  &__data
    padding-top: 15px
    padding-bottom: 15px
</style>
