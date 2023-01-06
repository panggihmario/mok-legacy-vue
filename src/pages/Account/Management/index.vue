<template>
  <div>
    <k-page-title 
      title="List Management Account" 
      :listBreadCrumbs="listBreadCrumbs"
    >
    </k-page-title>
    <div style="margin-top: 32px"></div>

    <Filter/>

    <div class="container">
      <k-select
        :items="items"
        labelText="title"
        v-model="select"
        placeholder="hello"
    />
    <k-select
      :items="items"
      outlined
      labelText="title"
      size="lg"
      v-model="select"
      mode="outline"
    />

    <k-input 
      placeholder="Username" 
      data-test="username"
      size="lg" 
      v-model="name"
    />
    </div>
    {{ select }}
    
  </div>
</template>

<script lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";
import Filter from "./Filter/index.vue"
export default {
  components : {
    Filter
  },
  setup() {
    const route = useRoute();
    const name = ref('')
    const select = ref({})
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
      items,
      name,
      select
    };
  },
};
</script>

<style>
.container {
  display: grid;
  grid-template-columns: 200px 200px 200px;
  gap: 20px;
}
</style>
