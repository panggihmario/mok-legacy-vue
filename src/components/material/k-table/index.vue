<template>
  <div>
    <table>
      <tr>
        <th v-for="(list, idx) in headerList" :key="idx">{{ list }}</th>
      </tr>
      <tr v-for="(list, idx) in itemList" :key="idx">
        <td v-for="key in itemKey" :key="key">{{ list[key] }}</td>
      </tr>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

type ItemList = {
  [key: string]: any;
};

export default defineComponent({
  name: "k-breadcrumbs",
  props: {
    headerList: {
      type: Array,
      default: ["id", "name"],
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
    const itemKey: string[] = Object.keys(props.itemList[0]);

    return {
      itemKey,
    };
  },
});
</script>

<style lang="scss" scoped>
table {
  border-collapse: collapse;
  width: 100%;
  font-size: 12px;
}

td,
th {
  text-align: left;
  height: 48px;
  padding: 0 16px;
}

th {
  background-color: var(--whitesnow-color);
}

tr:hover {
  background-color: var(--whitesmoke-color);
}

tr:not(:first-child):not(:last-child) {
  border-bottom: 1px solid var(--whitesmoke-color);
}
</style>
