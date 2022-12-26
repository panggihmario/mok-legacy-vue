<template>
  <div>
    <span class="text-title font-weight-medium">{{ title }}</span>
    <k-breadcrumbs
      v-if="isBreadcrumbs"
      :list="listBreadCrumbs"
      class="mt-10"
    ></k-breadcrumbs>
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
    listBreadCrumbs: {
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
