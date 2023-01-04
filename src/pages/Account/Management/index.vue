<template>
  <div>
    <k-page-title 
      title="List Management Account" 
      :listBreadCrumbs="listBreadCrumbs"
    >
    </k-page-title>
    <div style="margin-top: 32px"></div>
    <k-select
      :items="items"
      labelText="title"
    />
  </div>
</template>

<script lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";

export default {
  setup() {
    const route = useRoute();

    const listBreadCrumbs = ref([
      { name: "Manage Account" },
      { name: "List Management" },
    ]);

    const items = [
      {
        title : 'Foo',
        value : 'foo'
      },
      {
        title : 'Bar',
        value : 'bar'
      }
    ]

    return {
      listBreadCrumbs,
      items
    };
  },
};
</script>
