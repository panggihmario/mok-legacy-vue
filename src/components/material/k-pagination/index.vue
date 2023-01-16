<template>
  <div class="flex gap-10">
    <div
      class="flex justify-center align-center fa-solid fa-caret-left page pointer"
      :class="{ disable: page == 1 }"
      @click="page == 1 ? null : changePage(page - 1)"
    ></div>
    <div
      v-for="(n, idx) in rangePage"
      class="flex justify-center align-center page pointer"
      :class="{ active: n == page }"
      @click="
        n != '...'
          ? changePage(n)
          : changePage(idx == 1 ? page - 1 : page + 1)
      "
    >
      {{ n }}
    </div>
    <div
      class="flex justify-center align-center fa-solid fa-caret-right page pointer"
      :class="{ disable: page == maxLength }"
      @click="page == maxLength ? null : changePage(page + 1)"
    ></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, toRef, watch } from "vue";

export default defineComponent({
  props: {
    modelValue: {
      type: Number,
      default: 1,
    },
    maxLength: {
      type: Number,
      default: 10,
    },
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const page = ref(1);
    const rangePage = ref([]);
    const loading = ref(false);

    watch(
      () => props.maxLength,
      () => pagination(1, props.maxLength)
    );

    const getRange = (start: number, end: number) => {
      return Array(end - start + 1)
        .fill(0)
        .map((v, i) => i + start);
    };
    const pagination = (currentPage: number, pageCount: number) => {
      let delta: number;
      if (pageCount <= 7) {
        // delta === 7: [1 2 3 4 5 6 7]
        delta = 7;
      } else {
        // delta === 2: [1 ... 4 5 6 ... 10]
        // delta === 4: [1 2 3 4 5 ... 10]
        delta = currentPage > 4 && currentPage < pageCount - 3 ? 2 : 4;
      }

      const range = {
        start: Math.round(currentPage - delta / 2),
        end: Math.round(currentPage + delta / 2),
      };

      if (range.start - 1 === 1 || range.end + 1 === pageCount) {
        range.start += 1;
        range.end += 1;
      }

      let pages: any =
        currentPage > delta
          ? getRange(
              Math.min(range.start, pageCount - delta),
              Math.min(range.end, pageCount)
            )
          : getRange(1, Math.min(pageCount, delta + 1));

      const withDots = (value: number, pair: any) =>
        pages.length + 1 !== pageCount ? pair : [value];

      if (pages[0] !== 1) {
        pages = withDots(1, [1, "..."]).concat(pages);
      }

      if (pages[pages.length - 1] < pageCount) {
        pages = pages.concat(withDots(pageCount, ["...", pageCount]));
      }

      rangePage.value = pages;
      // return pages;
    };

    const changePage = (e: number) => {
      page.value = e;
      pagination(e, props.maxLength);
      emit("update:modelValue", e);
    };

    return {
      page,
      rangePage,
      loading,
      changePage,
      pagination,
    };
  },
});
</script>

<style lang="scss" scoped>
.page {
  height: 32px;
  width: 32px;
  background-color: var(--whitesmoke-color);
  color: var(--charcoal-color);
  border-radius: 4px;
}
.active {
  background-color: var(--primary-color);
  color: var(--white-color);
}
.disable {
  background-color: var(--whitesmoke-color);
  color: var(--silver-color);
  cursor: default;
}
</style>
