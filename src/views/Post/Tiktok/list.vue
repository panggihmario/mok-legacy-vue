<template>
  <div>
    <div v-if="userFeed.length == 0" class="text-center font-12 mt-8">
      Tidak Ada Video
    </div>
    <div v-else class="d-flex justify-space-between">
      <div
        class="d-flex flex-wrap whitesmoke"
        no-gutters
        :style="focusIndex == null ? 'width: 100%' : 'width: 60%'"
      >
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

            <div class="mt-2 font-12 text-break">
              {{ item.desc }}
            </div>

            <div class="d-flex align-center mt-2">
              <v-avatar size="20px" class="mr-2">
                <v-img :src="item.author.avatarThumb"></v-img>
              </v-avatar>
              <span class="text-break font-10">{{ item.author.nickname }}</span>
              <v-spacer></v-spacer>
              <span class="font-10">{{
                formatThousandToKMB(item.stats.diggCount)
              }}</span>
            </div>
          </div>
        </div>
      </div>

      <v-spacer></v-spacer>

      <div
        v-if="focusIndex != null"
        class="sticky-div whitesmoke pt-4 pb-12 px-4"
        style="width: 39%"
      >
        <h5>Konten Terpilih</h5>
        <p class="font-12 mt-2">
          Konten yang terpilih hanya akan terupload setelah kamu menekan tombol
          “Submit Post”
        </p>
        <div>
          <video
            :src="selectedItem.video.playAddr"
            controls
            style="max-width: 100% !important; height: 100% !important"
          ></video>

          <div class="mt-8 font-12 text-break">
            <v-textarea
              v-model="payload.description"
              label="Description"
              outlined
              background-color="white"
              class="font-12"
            ></v-textarea>
            <custom-autocomplete
              :value="payload.channel"
              v-model="payload.channel"
              :items="channels"
              item-text="name"
              placeholder="Select Channel"
              return-object
            />
          </div>
          <div class="d-flex">
            <custom-button
              color="white"
              class="primary--text mr-4"
              @click="selectFocus(focusIndex)"
            >
              Cancel
            </custom-button>
            <custom-button
              color="primary"
              class="white--text"
              :loading="loadingSubmit"
              @click="actionGetTiktokVideoNoWatermark"
            >
              Submit Post
            </custom-button>
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
    selectFocus(idx, item) {
      let data = { idx, item };
      this.$emit("selectFocus", data);
    },
    actionGetTiktokVideoNoWatermark() {
      this.$emit("actionGetTiktokVideoNoWatermark");
    },
    actionLoadMoreFeed() {
      this.$emit("actionLoadMoreFeed");
    },
  },
};
</script>

<style lang="sass" scoped>
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
</style>
