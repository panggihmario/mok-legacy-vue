<template>
  <div class="flex">
    <div
      v-for="n in 5"
      class="flex justify-center align-center page pointer mx-4"
    >
      {{ n }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    page: {
      type: String || Number,
      default: 1,
    },
    totalPage: {
      type: String || Number,
      default: 1,
    },
  },
});
</script>

<style lang="scss" scoped>
.page {
  height: 32px;
  width: 32px;
  background-color: var(--primary-color);
  color: white;
  border-radius: 4px;
}
</style>
