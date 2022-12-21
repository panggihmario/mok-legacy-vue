<template>
  <div class="breadcrumbs flex">
    <span v-for="(item, idx) in list" :key="idx">
      <span
        :class="[idx < list.length - 1 && 'text-color-primary cursor-pointer']"
        class="text-capitalize font-weight-500 text-color-grey"
      >
        {{ item.name }}
      </span>
      <span v-if="idx < list.length - 1" class="px-sm text-color-grey">/</span>
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "k-breadcrumbs",
  props: {
    list: {
      type: Array,
      default: [{ name: "Foo" }, { name: "Bar" }],
    },
  },
});
</script>

<style lang="scss" scoped>
.flex {
  display: flex;
}
.text {
  &-color {
    &-primary {
      color: var(--primary-color) !important;
    }
    &-grey {
      color: var(--grey-color);
    }
  }
}
.px {
  &-sm {
    padding-left: 12px;
    padding-right: 12px;
  }
}
.breadcrumbs {
  font-size: 14px;
}
.text-capitalize {
  text-transform: capitalize;
}
.font {
  &-weight {
    &-500 {
      font-weight: 500;
    }
  }
}
.cursor-pointer {
  cursor: pointer;
}
</style>
