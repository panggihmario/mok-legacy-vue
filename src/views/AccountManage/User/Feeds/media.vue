<template>
  <div>
    <MediaImage
      :url="content.post.medias[0].thumbnail.medium"
      :class="$style['card__image']"
      aspect-ratio="1"
    />
  </div>
</template>

<script>
import MediaImage from "./image.vue";

export default {
  props: ["content", "index"],
  components: {
    MediaImage,
  },
};
</script>

<style lang="scss" module>
//$
.card {
  &__container {
    background: #ffffff;
    box-shadow: 0px 4px 24px rgba(253, 82, 154, 0.06);
    border-radius: 16px;
    height: 100%;
  }
  &__image {
    border-radius: 8px;
    cursor: pointer;
  }
  &__left {
    padding: 28px 24px 32px 30px !important;
  }
  &__video {
    width: 100% !important;
    height: 100% !important;
    display: block;
    object-fit: fill;
  }
  &__right {
    padding: 12px 12px 12px 0 !important;
  }
}
</style>
