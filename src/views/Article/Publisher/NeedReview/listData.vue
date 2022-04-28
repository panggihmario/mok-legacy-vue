<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="dataReview"
      hide-default-footer
      disable-filtering
      disable-sort
    >
      <template v-slot:[`item.date`]="{ item }">
        <div class="review__date">{{ formatingDate(item.createAt) }}</div>
      </template>
      <template v-slot:[`item.status`]="{ item }">
        <div class="review__status">{{ item.status }}</div>
      </template>
      <template v-slot:[`item.headline`]="{ item }">
        <div class="review__headline">{{ item.headline }}</div>
      </template>
      <template v-slot:[`item.action`]="{ item }">
        <custom-button
          color="primary"
          size="medium"
          width="101"
          class="my-3"
          @click="moveToReview(item.id)"
        >
          Review
        </custom-button>
      </template>
    </v-data-table>
    <v-pagination
      :length="totalPages"
      prev-icon="mdi-menu-left"
      next-icon="mdi-menu-right"
      v-model="page"
      :total-visible="6"
      @input="getNewsBaseOnPage"
    >
    </v-pagination>
  </div>
</template>

<script>
export default {
  props: ["dataReview", "totalPages"],
  methods: {
    formatingDate(rawDate) {
      const newDt = new Date(rawDate);
      const day = newDt.getDate();
      const month = newDt.getMonth() + 1;
      const year = newDt.getFullYear();
      const newFormat = `${day}/${month}/${year}`;
      return newFormat;
    },
    moveToReview(id) {
      this.$router.push({
        name: "reviewPublisher",
        params: {
          id,
        },
      });
    },
    getNewsBaseOnPage(p) {
      const params = {
<<<<<<< HEAD
        page : p,
=======
        page : p - 1,
>>>>>>> 9eb366908d21879a739b972f0bbb8b8111b8be08
        tab : 'review'
      }
      this.$emit('getNewsBaseOnPage', params)
    }
  },
  data() {
    return {
      page: 1,
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
};
</script>

<style lang="scss" scoped>
.review {
  &__status {
    color: #bbbbbb;
    font-size: 12px;
    font-weight: 500;
  }
  &__date {
    color: #777777;
    font-size: 12px;
    font-weight: 500;
  }
  &__headline {
    color: #4a4a4a;
    font-size: 12px;
    font-weight: 500;
  }
}
</style>