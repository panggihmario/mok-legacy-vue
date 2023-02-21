<template>
  <v-navigation-drawer
    floating
    color="whitesmoke"
    app
    width="328"
    permanent
    right
    style="padding: 24px"
  >
    <div class="d-flex flex-column">
      <div>
        <img :src="previewTiktokData.item_cover" alt="">
      </div>
      <div class="d-flex flex-column pt-4" style="gap: 12px">
        <span>{{ previewTiktokData.title }}</span>
        <span>{{ previewTiktokData.hot_words }}</span>
      </div>
    </div>
  </v-navigation-drawer>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState({
      previewTiktokData: (state) => state.tiktok.previewTiktokData,
      previewTiktokPayload: (state) => state.tiktok.previewTiktokPayload,
    }),
  },
};
</script>
