<template>
  <div class="cursor-pointer" style="width: 180px">
    <div
      class="d-flex justify-center align-center black"
      style="height: 302px; overflow: hidden;"
    >
      <img
        :src="item.node.display_url"
        crossorigin="anonymous"
        alt=""
        style="width: 100%"
      />
    </div>

    <div
      class="mt-2 font-12 text-break ellipsis-second-line"
      style="height: 34px; overflow: hidden; text-overflow: ellipsis"
    >
      {{ item.node.edge_media_to_caption.edges[0].node.text }}
    </div>
    <div>
      <span class="font-10 grey--text font-weight-medium">{{
        formatDate(item.node.taken_at_timestamp)
      }}</span>
    </div>

    <div class="d-flex align-center mt-1">
      <!-- <v-avatar size="20px" class="mr-2">
        <v-img :src="item.node.hd_profile_pic_versions[0].url"></v-img>
      </v-avatar> -->
      <span class="text-break font-10">{{ item.node.owner.username }}</span>
      <v-spacer></v-spacer>
      <v-icon x-small color="red" class="mr-1">fa-heart</v-icon>
      <span class="font-10">{{
        formatThousandToKMB(item.node.edge_media_preview_like.count)
      }}</span>
    </div>
  </div>
</template>

<script>
import mixins from "@/mixins/global.js";
import moment from "moment";

export default {
  mixins: [mixins],
  props: ["item"],
  methods: {
    formatDate(rawDate) {
      const secondRawDate = rawDate;
      const newDate = moment.unix(secondRawDate).format("DD MMM YYYY");
      return newDate;
    },
  },
};
</script>

<style lang="scss" scoped>
.font-10 {
  font-size: 10px;
}
.font-12 {
  font-size: 12px;
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
