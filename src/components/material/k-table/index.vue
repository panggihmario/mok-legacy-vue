<template>
  <div class="overflow-auto">
    <table :style="`width: ${width}`">
      <thead>
        <tr v-if="headerList.length > 0" :class="`bg-${headerColor}`">
          <th
            v-for="(list, idx) in headerList"
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
      <tbody v-if="itemList.length > 0">
        <tr v-for="(list, idx) in itemList" :key="idx">
          <td
            v-if="list"
            v-for="(key, idy) in itemKey"
            :key="key"
            :style="`text-align: ${
              headerList[idy] ? headerList[idy].align : '0'
            }`"
          >
            <slot
              :name="`${headerList[idy] ? headerList[idy].label : 'default'}`"
              :item="list[key]"
            >
              {{ list[key] }}
            </slot>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-if="itemList.length < 1" class="text-center mt-4">
      <span class="table-no-data">Tidak ada data</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

type ItemList = {
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
    headerList: {
      type: Array as PropType<ItemList[]>,
      default: [{ label: "foo", align: "left" }],
    },
    itemList: {
      type: Array as PropType<ItemList[]>,
      default: [
        { id: 1, name: "Foo" },
        { id: 2, name: "Bar" },
      ],
    },
  },
  setup(props) {
    const itemKey: string[] = Object.keys(
      props.itemList.length > 0 && props.itemList[0]
    );

    return {
      itemKey,
    };
  },
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
  height: 48px;
  padding: 12px 16px;
}

// th {
//   background-color: var(--whitesnow-color);
// }

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
