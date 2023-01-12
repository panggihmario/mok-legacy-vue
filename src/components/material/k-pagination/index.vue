<template>
  <div class="flex">
    <div
      v-for="n in rangePage"
      class="flex justify-center align-center page pointer mx-4"
      :class="{ active: n == cPage }"
      @click="n != '...' ? changePage(n) : null"
    >
      {{ n }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onBeforeMount, ref } from "vue";

export default defineComponent({
  props: {
    modelValue: Number,
    page: {
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
    const cPage = ref(props.page);
    const rangePage = ref([]);
    const loading = ref(false);

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
      cPage.value = e;
      pagination(e, props.maxLength);
      emit("update:modelValue", e);
    };

    onMounted(() => {
      loading.value = true;
      pagination(1, props.maxLength);
      setTimeout(() => {
        loading.value = false;
      }, 1000);
    });

    return {
      cPage,
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
</style>
