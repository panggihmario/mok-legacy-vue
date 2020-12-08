<template>
  <v-dialog
    :value="dialogMedia"
    max-width="730"
    @click:outside="closeDialog"
  > 
    <v-card class="ads-media__container">
      <div class="ads-media__image">
        <v-img
          :src="imageAds"
          contain
          max-width="100%"
          max-height="100%"
        />
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props : ['dialogMedia', 'imageAds'],
  methods : {
    closeDialog () {
      this.$emit('closeDialogMedia', false)
    }
  }
}
</script>

<style lang="sass" scoped>
.ads-media
  &__container
    padding: 20px 10px 20px 10px
    display: flex
    justify-content: center
    align-items: center
  &__image
    width: 684px
    height: 90px
    border: 1px dashed #1890FF
</style>