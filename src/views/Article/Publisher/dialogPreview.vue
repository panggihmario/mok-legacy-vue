<template>
  <v-dialog :value="dialogPreview" max-width="700" @click:outside="closeDialog">
    <v-card class="px-4 pb-4 pt-3">
      <div class="preview__title">
        {{ payloadNews.title }}
      </div>
      <div class="my-3">
        <v-icon class="mr-5" size="14">$heart</v-icon>
        <v-icon class="mr-5" size="14">$comment</v-icon>
        <v-icon size="14">$share</v-icon>
      </div>
      <div class="preview__media-container">
        <v-img
          contain
          max-width="100%"
          max-height="100%"
          class="whitesmoke"
          :src="payloadNews.medias && payloadNews.medias[0].thumbnail.large"
        />
      </div>
      <div class="preview__caption mt-3">
        <span>{{ newDate }}</span>
        <span class="ml-4">Sumber - {{ payloadNews.linkReference }}</span>
      </div>
      <div class="my-2">
        <v-row no-gutters class="preview__subtitle">
          <v-col sm="2" class="d-flex flex-column">
            <b class="d-flex justify-space-between"
              >Penyunting <span>:</span></b
            >
            <b class="d-flex justify-space-between">Penulis <span>:</span></b>
          </v-col>
          <v-col sm="10" class="d-flex flex-column pl-2">
            <span>{{ payloadNews.editor }}</span>
            <span>{{ payloadNews.author }}</span>
          </v-col>
        </v-row>
      </div>
      <div
        class="charcoal--text preview__content"
        v-html="payloadNews.content"
      ></div>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ["dialogPreview", "payloadNews"],
  computed: {
    newDate() {
      var today = new Date();
      var day;
      switch (today.getDay()) {
        case 0:
          day = "Minggu";
          break;
        case 1:
          day = "Senin";
          break;
        case 2:
          day = "Selasa";
          break;
        case 3:
          day = "Rabu";
          break;
        case 4:
          day = "Kamis";
          break;
        case 5:
          day = "Jum'at";
          break;
        case 6:
          day = "Sabtu";
          break;
        default:
          break;
      }
      var date =
        day +
        ", " +
        today.getDate() +
        "/" +
        (today.getMonth() + 1) +
        "/" +
        today.getFullYear();
      var time = today.getHours() + ":" + today.getMinutes();
      return date + " " + time;
    },
  },
  methods: {
    closeDialog() {
      this.$emit("closeDialogPreview", false);
    },
  },
};
</script>

<style lang="sass" scoped>
.preview
  &__title
    color: #000000
    font-size: 24px
    font-weight: 900
  &__subtitle
    color: #000000
    font-size: 12px
  &__caption
    font-size: 10px
  &__media-container
    height: 318px
  &__content
    font-size: 14px
</style>
