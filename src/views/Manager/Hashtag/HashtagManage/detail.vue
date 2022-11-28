<template>
  <div>
    <HeaderContent label="Manage Hashtag" :list="crumbs"></HeaderContent>

    <div class="d-flex font-12">
      <div class="pt-4" style="width:285px">
        <div>
          <span class="font-weight-medium">Jumlah data yang ingin ditampilkan</span>
          <div class="d-flex align-center whitesnow mt-2 px-4" style="height: 35px; border-radius: 4px">
            <span class="font-12 font-weight-medium grey--text">{{
                dataItem.item.totalQty
            }}</span>
          </div>
        </div>
        <div class="mt-5">
          <span class="font-weight-medium">Waktu proses</span>
          <div class="d-flex align-center whitesnow mt-2 px-4" style="height: 35px; border-radius: 4px">
            <span class="font-12 font-weight-medium grey--text">{{ formatDate(dataItem.item.createAt) }}
              {{ formatDate(dataItem.item.createAt, true) }}</span>
          </div>
        </div>
        <div class="mt-5">
          <span class="font-weight-medium">Channel</span>
          <div class="d-flex align-center whitesnow mt-2 px-4" style="height: 35px; border-radius: 4px">
            <span class="font-12 font-weight-medium grey--text">{{
                dataDetailHashtag.feedChannelCode &&
                  dataDetailHashtag.feedChannelCode.toLowerCase() == "chinatiktok"
                  ? "China"
                  : "Indonesia"
            }}</span>
          </div>
        </div>
      </div>

      <v-card width="353" outlined flat class="ml-5" style="border-radius: 8px; overflow: auto ;position: relative;">
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

      <v-card width="488" outlined flat class="ml-5" style="border-radius: 8px; overflow: scroll; height: 600px;"
      @scroll="onScroll"
        >
        <div class="d-flex font-weight-medium whitesnow sticky">
          <div class="col-6">Time </div>
          <div class="col-6">Activity</div>
        </div>

        <div>
          <div v-if="loadingDataLogHashtag" class="mt-8 text-center">
            <v-progress-circular indeterminate color="primary"></v-progress-circular>

          </div>
          <div v-else>
            <div v-if="dataLogHashtag.length > 0">
              <div v-for="(i, idx) in dataLogHashtag" :key="idx">
                <div class="d-flex font-12 font-weight-medium grey--text">
                  <div class="col-6">
                    {{ formatDate(i.createAt) }}
                    {{ formatDate(i.createAt, true) }}
                  </div>
                  <div class="col-6" :class="`text--${i.status && i.status.toLowerCase()}`">
                    {{ i.activity }}
                  </div>
                </div>
              </div>
              <div class="text-center">
                <v-progress-circular indeterminate :color="isLoadingInfinite ? 'primary' : 'transparent'"
                  class="text-center"></v-progress-circular>
              </div>

              <div class="loading text-center " id="loading">
                virtual footer
              </div>

            </div>
            <div v-else class="text-center mt-2">
              <span class="grey--text font-weight-medium">Tidak Ada Data Activity</span>
            </div>
          </div>
        </div>


      </v-card>

    </div>
  </div>
</template>

<script>
import HeaderContent from "@/containers/HeaderContent";
import { mapActions, mapGetters } from "vuex";

export default {
  components: {
    HeaderContent,
  },
  data() {
    return {
      isBottom: false,
      isLoadingInfinite: false,
      totalElements: 0,
      page: 1,
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
      dataDetailHashtag: {},
      dataLogHashtag: [],
      sortedHashtags: [],
      loadingDataLogHashtag: false,
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
    this.handleGetLogsHashtagFormation();
    document.addEventListener('scroll', this.onScroll)
  },
  destroyed() {
    document.addEventListener('scroll', this.onScroll)
  },
  computed: {
    ...mapGetters({
      pathManage: "manageHashtag/pathManage",
      filterCountry: "manageHashtag/filterCountry",
    }),
    channel: {
      get() {
        const channel = this.$route.query.channel;
        return channel;
      },
    },
    dataItem: {
      get() {
        const item = this.dataDetailHashtag;
        return { item };
      },
    },
  },
  methods: {
    ...mapActions({
      getAvailabilitySubHashtag: "manageHashtag/getAvailabilitySubHashtag",
      getLogsHashtagFormation: "manageHashtag/getLogsHashtagFormation",
    }),
    onScroll(event) {
      const { scrollTop, offsetHeight, scrollHeight } = event.target
      const virtualHeight = scrollHeight
      const unionHeight = scrollTop + offsetHeight
      const idLoading = document.getElementById('loading')
      if (unionHeight >= virtualHeight  && !this.isLoadingInfinite) {
        let payload = {
          id: this.dataDetailHashtag.id,
          params: {
            size: 10,
            page: this.page,
            totalElements: this.totalElements
          },
        };
        idLoading.classList.add('active')
        idLoading.classList.remove('pasif')
        this.isLoadingInfinite = true
        return this.getLogsHashtagFormation(payload)
          .then((response) => {
            this.page++
            const content = response.data.content
            setTimeout(() => {
              content.forEach((data) => {
                this.dataLogHashtag.push(data)
              })
              idLoading.classList.add('pasif')
              idLoading.classList.remove('active')
              this.isLoadingInfinite = false
            }, 1500)

          })
          .catch((err) => {
            this.isLoadingInfinite = false
            idLoading.classList.add('pasif')
            idLoading.classList.remove('active')
          });
      }
    },
    handleGetAvailabilitySubHashtag(v, idx) {
      let payload = {
        params: {
          value: v.value,
          code: this.dataDetailHashtag.feedChannelCode,
        },
      };
      return this.getAvailabilitySubHashtag(payload)
        .then((response) => {
          this.sortedHashtags[idx].available = response.data.available;
        })
        .catch((err) => { });
    },
    handleGetLogsHashtagFormation() {
      let payload = {
        id: this.dataDetailHashtag.id,
        params: {
          // direction: "DESC",
          size: 10,
          page: 0,
        },
      };
      this.loadingDataLogHashtag = true;
      return this.getLogsHashtagFormation(payload)
        .then((response) => {
          this.loadingDataLogHashtag = false;
          const content = response.data.content
          const totalElements = response.data.totalElements
          this.totalElements = totalElements
          this.dataLogHashtag = content
        })
        .catch((err) => {
          this.loadingDataLogHashtag = false;
        });
    },
    formatDate(v, isHour) {
      let d = new Date(v);
      let date = d.getDate();
      let month = d.getMonth();
      let year = d.getFullYear();
      let hour = d.getHours();
      let minute = d.getMinutes();
      return isHour
        ? `${hour < 10 ? `0${hour}` : hour}:${minute < 10 ? `0${minute}` : minute
        }`
        : `${date}/${month + 1}/${year}`;
    },
    sortingPreviewData() {
      const dataOnStorage = localStorage.getItem("detailHashtag");
      const dataParse = JSON.parse(dataOnStorage);
      this.dataDetailHashtag = dataParse;
      let hashtags = dataParse.hashtags;
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

.loading {
  position: sticky;
  bottom: 0;
  color: transparent;
}

.active {
  color: 'red'
}

.pasif {
  color: transparent;
}
</style>
