<template>
  <div>
    <k-page-title
      title="List User"
      :listBreadCrumbs="listBreadCrumbs"
    ></k-page-title>
    <div class="mt-40">
      <k-table :headerList="headerList" :itemList="itemList"></k-table>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";

export default {
  setup() {
    const route = useRoute();

    const listBreadCrumbs = ref([
      { name: "Management Account" },
      { name: route.name },
    ]);

    const headerList = ref(["Foo", "Bar", "status", "action"]);

    const itemList = ref([
      { id: 1, name: "Foo", status: "active", action: "" },
      { id: 2, name: "Bar", status: "active", action: "" },
      { id: 3, name: "Foo", status: "active", action: "" },
      { id: 4, name: "Bar", status: "active", action: "" },
    ]);

    return {
      listBreadCrumbs,
      headerList,
      itemList,
    };
  },
};
</script>
