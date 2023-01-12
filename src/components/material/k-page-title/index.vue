<template>
  <div>
    <span class="text-title font-weight-medium">{{ title }}</span>
    <div class="flex justify-between align-center mt-10">
      <k-breadcrumbs
        v-if="isBreadcrumbs"
        :items="breadCrumbs"
      ></k-breadcrumbs>
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "k-page-title",
  props: {
    title: {
      type: String,
      default: "Title",
    },
    isBreadcrumbs: {
      type: Boolean,
      default: true,
    },
    breadCrumbs: {
      type: Array,
    },
  },
});
</script>

<style lang="scss" scoped>
.text-title {
  font-size: $text-2xl;
}
.font-weight-medium {
  font-weight: $font-medium;
}
</style>
