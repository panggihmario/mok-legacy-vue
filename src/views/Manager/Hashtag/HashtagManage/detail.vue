<template>
  <div>
    <HeaderContent label="Manage Hashtag" :list="crumbs"></HeaderContent>

    <div class="d-flex">
      <v-card
        width="286"
        min-height="266"
        max-height="600"
        outlined
        flat
        style="border-radius: 8px; overflow: auto"
      >
        <div class="d-flex font-weight-medium whitesnow">
          <div class="col-6">Hashtag</div>
          <div class="col-2">%</div>
          <div class="col-4">Qty</div>
        </div>
        <div v-for="(i, idx) in dataItem.item.hashtags" :key="idx">
          <div class="d-flex font-12 font-weight-medium grey--text">
            <div class="col-6">{{ i.value }}</div>
            <div class="col-2">{{ i.percent }}%</div>
            <div class="col-4">{{ i.qty }}</div>
          </div>
        </div>
      </v-card>
      <div class="ml-8 pt-4">
        <div>
          <span class="font-weight-medium"
            >Jumlah data yang ingin ditampilkan</span
          >
          <div
            class="d-flex align-center whitesnow mt-2 px-4"
            style="height: 35px; border-radius: 4px"
          >
            <span class="font-12 font-weight-medium grey--text">{{
              dataItem.item.totalQty
            }}</span>
          </div>
        </div>
        <div class="mt-5">
          <span class="font-weight-medium">Waktu proses</span>
          <div
            class="d-flex align-center whitesnow mt-2 px-4"
            style="height: 35px; border-radius: 4px"
          >
            <span class="font-12 font-weight-medium grey--text"
              >{{ formatDate(dataItem.item.createAt) }}
              {{ formatDate(dataItem.item.createAt, true) }}</span
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderContent from "@/containers/HeaderContent";

export default {
  components: {
    HeaderContent,
  },
  data() {
    return {
      crumbs: [
        {
          text: "Manage Hashtag",
          disabled: false,
          href: "/manage/hashtag",
        },
        {
          text: "Buat Trending",
          disabled: true,
        },
      ],
    };
  },
  computed: {
    dataItem: {
      get() {
        const item = this.$route.query.item;
        return { item };
      },
    },
  },
  methods: {
    formatDate(v, isHour) {
      let d = new Date(v);
      let date = d.getDate();
      let month = d.getMonth();
      let year = d.getFullYear();
      let hour = d.getHours();
      let minute = d.getMinutes();
      return isHour
        ? `${hour < 10 ? `0${hour}` : hour}:${
            minute < 10 ? `0${minute}` : minute
          }`
        : `${date}/${month}/${year}`;
    },
  },
};
</script>
