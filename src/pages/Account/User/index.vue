<template>
  <div>
    <k-page-title title="List User" :listBreadCrumbs="listBreadCrumbs"></k-page-title>
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

    return {
      listBreadCrumbs,
    };
  },
};
</script>
