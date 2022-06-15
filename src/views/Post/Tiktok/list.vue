<template>
  <div>
    <div v-if="userFeed.length == 0" class="text-center font-12 mt-8">
      Tidak Ada Video
    </div>
    <div v-else class="d-flex justify-space-between">
      <div class="d-flex flex-wrap whitesmoke" no-gutters style="width: 100%">
        <div
          v-for="(item, idx) in userFeed"
          :key="idx"
          class="d-flex justify-center pa-2"
          :style="
            focusIndex == null
              ? 'width: 20%'
              : idx == focusIndex
              ? 'width: 33.33%'
              : 'width: 33.33%; opacity: .6'
          "
          @click="selectFocus(idx, item)"
        >
          <div style="max-width: 100% !important">
            <v-img :src="item.video.cover" height="260px" width="100%"></v-img>

            <div class="mt-2 font-12 text-break ellipsis-second-line">
              {{ item.desc }}
            </div>
            <div>
              <span class="font-10 grey--text font-weight-medium">{{
                formatDate(item.createTime)
              }}</span>
            </div>

            <div class="d-flex align-center mt-2">
              <v-avatar size="20px" class="mr-2">
                <v-img :src="item.author.avatarThumb"></v-img>
              </v-avatar>
              <span class="text-break font-10">{{ item.author.nickname }}</span>
              <v-spacer></v-spacer>
              <v-icon x-small color="red" class="mr-1">fa-heart</v-icon>
              <span class="font-10">{{
                formatThousandToKMB(item.stats.diggCount)
              }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="userFeed.length != 0" class="whitesmoke">
      <div v-if="loadingLoadmore" class="d-flex justify-center py-12">
        <v-progress-circular
          indeterminate
          color="primary"
        ></v-progress-circular>
      </div>
      <div
        v-else
        class="d-flex justify-center align-center"
        style="height: 80px"
      >
        <v-btn
          depressed
          rounded
          color="text-capitalize primary font-12"
          @click="actionLoadMoreFeed"
          >Load More</v-btn
        >
      </div>
    </div>
  </div>
</template>

<script>
import mixins from "@/mixins/global.js";
import moment from "moment";

export default {
  mixins: [mixins],
  props: [
    "userFeed",
    "channels",
    "loadingLoadmore",
    "loadingSubmit",
    "focusIndex",
    "selectedItem",
    "payload",
  ],
  methods: {
    formatDate(rawDate) {
      const secondRawDate = rawDate;
      const newDate = moment.unix(secondRawDate).format("DD-MM-YYYY");
      return newDate;
    },
    selectFocus(idx, item) {
      let data = { idx, item };
      this.$emit("selectFocus", data);
    },
    actionLoadMoreFeed() {
      this.$emit("actionLoadMoreFeed");
    },
  },
};
</script>

<style lang="sass" scoped>
.font-9
	font-size: 9px
.font-10
	font-size: 10px
.font-12
	font-size: 12px
.sticky-div
	position: -webkit-sticky !important
	position: sticky !important
	top: 0
	height: 100vh
	overflow: auto
.ellipsis-second-line
	overflow: hidden
	text-overflow: ellipsis
	display: -webkit-box
	-webkit-line-clamp: 2
	-webkit-box-orient: vertical
</style>
