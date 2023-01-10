<template>
  <div class="flex">
    <div
      class="flex justify-center align-center page pointer mx-4"
      @click="changePage(1)"
    >
      1
    </div>
    <!-- <div
      v-if="page < 5"
      class="flex justify-center align-center page pointer mx-4"
    >
      ...
    </div> -->
    <div
      v-for="n in 3"
      class="flex justify-center align-center page pointer mx-4"
      @click="changePage(n + page)"
    >
      {{ n + page }}
    </div>
    <div class="flex justify-center align-center page pointer mx-4">...</div>
    <div
      v-if="totalPage > 1"
      class="flex justify-center align-center page pointer mx-4"
      @click="changePage(totalPage)"
    >
      {{ totalPage }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  props: {
    modelValue: Number,
    page: {
      type: Number,
      default: 1,
    },
    totalPage: {
      type: Number,
      default: 10,
    },
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const changePage = (e: number) => {
      emit("update:modelValue", e);
    };

    return {
      changePage,
    };
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
