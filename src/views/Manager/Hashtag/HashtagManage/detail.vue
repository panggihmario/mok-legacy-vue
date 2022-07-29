<template>
  <div>
    <HeaderContent label="Manage Hashtag" :list="crumbs"></HeaderContent>

    <div class="d-flex font-12">
      <div class="pt-4" style="width:285px">
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
            <span class="font-12 font-weight-medium grey--text">{{
              $route.query.item.feedChannelCode.toLowerCase() == "chinatiktok"
                ? "China"
                : "Indonesia"
            }}</span>
          </div>
        </div>
      </div>

      <v-card
        width="353"
        height="835"
        outlined
        flat
        class="ml-5"
        style="border-radius: 8px; overflow: auto"
      >
        <div class="d-flex font-weight-medium whitesnow sticky">
          <div class="col-4">Hashtag</div>
          <div class="col-2">%</div>
          <div class="col-2">Qty</div>
          <div class="col-4">Available</div>
        </div>
        <div v-for="(i, idx) in sortedHashtags" :key="idx">
          <div class="d-flex font-12 font-weight-medium grey--text">
            <div class="col-4">{{ i.value }}</div>
            <div class="col-2">{{ i.percent }}%</div>
            <div class="col-2">{{ i.qty }}</div>
            <div class="col-4">{{ i.available }}</div>
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
        <div class="d-flex font-weight-medium whitesnow sticky">
          <div class="col-6">Time</div>
          <div class="col-6">Activity</div>
        </div>

        <div v-if="dataItem.item.logs">
          <div v-for="(i, idx) in dataItem.item.logs" :key="idx">
            <div class="d-flex font-12 font-weight-medium grey--text">
              <div class="col-6">
                {{ formatDate(i.createAt) }} {{ formatDate(i.createAt, true) }}
              </div>
              <div
                class="col-6"
                :class="`text--${i.status && i.status.toLowerCase()}`"
              >
                {{ i.activity }}
              </div>
            </div>
          </div>
        </div>
        <div v-else class="text-center mt-2">
          <span class="font-12 font-weight-medium grey--text"
            >Tidak ada activity</span
          >
        </div>
      </v-card>
    </div>
  </div>
</template>

<script>
import HeaderContent from "@/containers/HeaderContent";
import { mapActions } from "vuex";

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
  watch: {
    sortedHashtags() {
      for (let i = 0; i < this.sortedHashtags.length; i++) {
        const e = this.sortedHashtags[i];
        this.handleGetAvailabilitySubHashtag(e, i);
      }
    },
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
    ...mapActions({
      getAvailabilitySubHashtag: "manageHashtag/getAvailabilitySubHashtag",
    }),
    handleGetAvailabilitySubHashtag(v, idx) {
      let payload = {
        params: {
          value: v.value,
          code: this.$route.query.item.feedChannelCode,
        },
      };
      return this.getAvailabilitySubHashtag(payload)
        .then((response) => {
          this.sortedHashtags[idx].available = response.data.available;
        })
        .catch((err) => {});
    },
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
      for (let i = 0; i < hashtags.length; i++) {
        const e = hashtags[i];
        this.sortedHashtags.push({ ...e, available: 0 });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.sticky {
  top: 0;
  position: -webkit-sticky;
  position: sticky;
}
.text--failed {
  color: $warning;
}
.text--success {
  color: $success;
}
</style>
