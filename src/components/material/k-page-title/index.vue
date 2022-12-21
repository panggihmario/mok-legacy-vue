<template>
  <div>
    <span class="text-title font-weight-500">{{ title }}</span>
    <k-breadcrumbs
      v-if="isBreadcrumbs"
      :list="listBreadCrumbs"
      class="mt-10"
    ></k-breadcrumbs>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue-demi";

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
  font-size: 18px;
}
.mt {
  &-10 {
    margin-top: 10px;
  }
}
.font {
  &-weight {
    &-500 {
      font-weight: 500;
    }
  }
}
</style>
