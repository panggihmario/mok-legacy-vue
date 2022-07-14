<template>
  <div>
    <HeaderContent label="Manage Hashtag" :list="crumbs"></HeaderContent>

    <div class="d-flex">
      <div class="pt-4">
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
        <div class="mt-5">
          <span class="font-weight-medium">Channel</span>
          <div
            class="d-flex align-center whitesnow mt-2 px-4"
            style="height: 35px; border-radius: 4px"
          >
            <span
              class="font-12 font-weight-medium text-capitalize grey--text"
              >{{ channel }}</span
            >
          </div>
        </div>
      </div>

      <v-card
        width="286"
        height="835"
        outlined
        flat
        class="ml-5"
        style="border-radius: 8px; overflow: auto"
      >
        <div class="d-flex font-weight-medium whitesnow">
          <div class="col-6">Hashtag</div>
          <div class="col-3">%</div>
          <div class="col-3">Qty</div>
        </div>
        <div v-for="(i, idx) in sortedHashtags" :key="idx">
          <div class="d-flex font-12 font-weight-medium grey--text">
            <div class="col-6">{{ i.value }}</div>
            <div class="col-3">{{ i.percent }}%</div>
            <div class="col-3">{{ i.qty }}</div>
          </div>
        </div>
      </v-card>

      <v-card
        width="488"
        height="835"
        outlined
        flat
        class="ml-5"
        style="border-radius: 8px; overflow: auto"
      >
        <div class="d-flex font-weight-medium whitesnow">
          <div class="col-6">Time</div>
          <div class="col-6">Activity</div>
        </div>
        <div v-if="dataItem.logs">
          <div v-for="(i, idx) in dataItem.item.logs" :key="idx">
            <div class="d-flex font-12 font-weight-medium grey--text">
              <div class="col-6">{{ i }}</div>
              <div class="col-6">{{ i }}</div>
            </div>
          </div>
        </div>
        <div v-else class="text-center mt-2">
          <span class="font-12 font-weight-medium grey--text">Tidak ada activity</span>
        </div>
      </v-card>
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
          text: "Detail Trending",
          disabled: true,
        },
      ],
      sortedHashtags: [],
    };
  },
  mounted() {
    this.sortingPreviewData();
  },
  computed: {
    channel: {
      get() {
        const channel = this.$route.query.channel;
        return channel;
      },
    },
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
        : `${date}/${month + 1}/${year}`;
    },
    sortingPreviewData() {
      let hashtags = this.$route.query.item.hashtags;
      hashtags.sort((a, b) => {
        let fa = a.value.toLowerCase();
        let fb = b.value.toLowerCase();
        return b.percent - a.percent || fa.localeCompare(fb);
      });
      this.sortedHashtags = hashtags;
    },
  },
};
</script>
