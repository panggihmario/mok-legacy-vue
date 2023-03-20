<template>
  <div
    class="d-flex flex-column align-center card font-12 pa-2 cursor-pointer"
    style="width: 212px"
    @click="openDrawerPreview(index, data)"
  >
    <div class="d-flex justify-center align-center black" style="height: 302px">
      <img :src="data.item_cover" alt="" style="width: 100%" />
    </div>
    <div
      class="d-flex flex-column justify-space-between mt-3"
      style="height: 80px; width: 100%"
    >
      <div class="ellipsis-second-line">
        <span>{{ data.title }}</span>
      </div>
      <div class="d-flex align-center mt-2">
        <span class="text-break font-10">{{ data.author }}</span>
        <v-spacer></v-spacer>
        <v-icon x-small color="red" class="mr-1">fa-heart</v-icon>
        <span class="font-10">{{ formatThousandToKMB(data.digg_count) }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import mixins from "@/mixins/global.js";
import moment from "moment";

export default {
  mixins: [mixins],
  props: {
    index: {
      type: Number,
    },
    data: {
      type: Object,
    },
  },
  methods: {
    formatDate(rawDate) {
      const secondRawDate = rawDate;
      const newDate = moment.unix(secondRawDate).format("DD-MM-YYYY");
      return newDate;
    },
    openDrawerPreview(index, item) {
      this.$emit("openDrawerPreview", { index, item });
    },
  },
};
</script>

<style lang="scss">
.card {
  width: 206px;
}

.ellipsis-second-line {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.cursor-pointer {
  cursor: pointer;
}
</style>
