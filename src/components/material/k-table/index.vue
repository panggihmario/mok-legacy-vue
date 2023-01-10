<template>
  <div class="overflow-auto">
    <table :style="`width: ${width}`">
      <thead>
        <tr v-if="headers.length > 0" :class="`bg-${headerColor}`">
          <th
            v-for="(list, idx) in headers"
            :key="idx"
            class="text-capitalize"
            :style="`width: ${list.width}; text-align: ${list.align}`"
          >
            <slot :name="`header-${list.label}`" :item="list">
              {{ list.label }}
            </slot>
          </th>
        </tr>
      </thead>
      <tbody v-if="items.length > 0">
        <tr v-for="(ulist, idx) in items" :key="idx">
          <td
            v-if="ulist"
            v-for="(hlist, idy) in headers"
            :key="hlist.value"
            :style="`text-align: ${hlist.align}`"
          >
            <slot
              :name="`${headers[idy] ? headers[idy].value : 'default'}`"
              :item="hlist ? ulist[hlist.value] : 0"
            >
              {{ ulist[hlist.value] }}
            </slot>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-if="items.length < 1" class="text-center mt-4">
      <span class="table-no-data">Tidak ada data</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

type ListData = {
  [key: string]: string | number;
};

export default defineComponent({
  name: "k-table",
  props: {
    headerColor: {
      type: String,
      default: "whitesnow",
    },
    width: {
      type: String,
      default: "100%",
    },
    headers: {
      type: Array as PropType<ListData[]>,
      default: [{ label: "foo", name: "foo", align: "left" }],
    },
    items: {
      type: Array as PropType<ListData[]>,
      default: [
        { id: 1, name: "Foo" },
        { id: 2, name: "Bar" },
      ],
    },
  },
  setup() {},
});
</script>

<style lang="scss" scoped>
div {
  color: var(--charcoal-color);
}

table {
  border-collapse: collapse;
  min-width: 800px;
  font-size: 12px;
}

td,
th {
  text-align: left;
  padding: 12px 16px;
}

th {
  height: 48px;
}

tbody tr:hover {
  background-color: var(--whitesmoke-color);
}

tr:not(:last-child) {
  border-bottom: 1px solid var(--whitesmoke-color);
}

.overflow-auto {
  max-width: 100%;
  overflow: auto;
}

.table {
  &-no-data {
    font-size: $text-lg;
    font-weight: $font-medium;
  }
}
</style>
