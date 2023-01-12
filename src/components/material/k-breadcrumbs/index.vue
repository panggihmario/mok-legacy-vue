<template>
  <div class="breadcrumbs flex">
    <span v-for="(item, idx) in items" :key="idx">
      <span
        :class="[idx < items.length - 1 && 'text-color-primary pointer']"
        class="text-capitalize text-color-grey"
      >
        {{ item.name }}
      </span>
      <span v-if="idx < items.length - 1" class="px-12 text-color-grey">/</span>
    </span>
  </div>
</template>



<script lang="ts">
import { defineComponent, PropType } from "vue";

type Items = { name: String };

export default defineComponent({
  name: "k-breadcrumbs",
  props: {
    items: {
      type: Array as PropType<Items[]>,
      default: [{ name: "Foo" }, { name: "Bar" }],
    },
  },
});
</script>

<style lang="scss" scoped>
.breadcrumbs {
  font-size: $text-xl;
  font-weight: $font-medium;
}
</style>
