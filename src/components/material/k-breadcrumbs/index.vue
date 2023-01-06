<template>
  <div class="breadcrumbs flex">
    <span v-for="(item, idx) in list" :key="idx">
      <span
        :class="[idx < list.length - 1 && 'text-color-primary pointer']"
        class="text-capitalize text-color-grey"
      >
        {{ item.name }}
      </span>
      <span v-if="idx < list.length - 1" class="px-12 text-color-grey">/</span>
    </span>
  </div>
</template>



<script lang="ts">
import { defineComponent, PropType } from "vue";

type List = { name: String };

export default defineComponent({
  name: "k-breadcrumbs",
  props: {
    list: {
      type: Array as PropType<List[]>,
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
