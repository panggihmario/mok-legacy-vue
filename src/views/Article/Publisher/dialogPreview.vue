<template>
  <v-dialog
    :value="dialogPreview"
    @click:outside="closeDialog"
    max-width="700"
  >
    <v-card class="pa-4">
      <div class="preview__title">
        {{payloadNews.title}}
      </div>
      <div>
        <v-icon>$heart</v-icon>
      </div>
      <div class="preview__media-container">
        <v-img
          contain
          max-width="100%"
          max-height="100%"
          style="background-color : black"
          :src="payloadNews.medias && payloadNews.medias[0].thumbnail.large"
        />
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props : ['dialogPreview', 'payloadNews'],
  methods : {
    closeDialog () {
      this.$emit("closeDialogPreview", false)
    }
  }
}
</script>

<style lang="sass" scoped>
.preview
  &__title
    color: #000000
    font-size: 24px
    font-weight: 900
  &__media-container
    height: 318px
</style>