<template>
  <div>
    <section class="d-flex flex-wrap" style="gap: 16px">
      <div
        v-for="(item, idx) in items"
        :key="item.node.id"
        :class="{
          'card-opacity-5': focusId != null ? focusId != item.node.id : '',
        }"
        @click="actionChangePreviewStatus(item)"
      >
        <Card-Item :item="item" @cardFocus="cardFocus"></Card-Item>
      </div>
    </section>

    <v-snackbar v-model="alertFailed" top right color="primary" timeout="3000">
      <span>Error Upload 500</span>
    </v-snackbar>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
import CardItem from "../card/index.vue";

export default {
  props: ["items"],
  components: {
    CardItem,
  },
  data() {
    return {
      focusId: null,
      alertFailed: false,
    };
  },
  computed: {
    ...mapState({
      previewTiktok: "previewTiktok",
      previewTiktokSuccess: "previewTiktokSuccess",
      previewTiktokFailed: "previewTiktokFailed",
    }),
  },
  watch: {
    previewTiktok() {
      if (!this.previewTiktok) {
        this.actionChangePreviewStatus({ node: { id: this.focusId } });
      }
    },
    previewTiktokFailed() {
      this.alertFailed = this.previewTiktokFailed;
    },
    alertFailed() {
      if (!this.alertFailed) {
        this.changeStatusPreviewTiktokFailed(false);
      }
    },
  },
  methods: {
    ...mapActions({
      changeStatusPreviewTiktok: "changeStatusPreviewTiktok",
      changeStatusPreviewTiktokFailed: "changeStatusPreviewTiktokFailed",
    }),
    ...mapMutations({
      setPreviewData: "instagram/setPreviewData",
    }),
    cardFocus(v) {
      this.focusId = v;
    },
    actionChangePreviewStatus(item) {
      if (this.focusId === item.node.id) {
        this.focusId = null;
        this.changeStatusPreviewTiktok(false);
        this.setPreviewData({});
      } else {
        this.focusId = item.node.id;
        this.changeStatusPreviewTiktok(true);
        this.setPreviewData(item);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.card-opacity-5 {
  opacity: 0.5 !important;
}
</style>
