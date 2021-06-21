<template>
  <v-row dense>
    <v-col cols="auto"  v-for="(media, idx) in product.medias" :key="idx">
      <div class="image__container">
        <v-img  :src="media.url" height="100" width="100" />
      </div>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: ["product"],
};
</script>

<style lang="sass" scoped>
.image
  &__container
    border-radius: 8px
</style>