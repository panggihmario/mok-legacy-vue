<template>
  <div class="flex justify-between">
    <div class="flex" style="gap : 30px">
      <div class="flex align-center" style="gap : 8px">
        <div :class="filter.label">Sort</div>
        <div>
          <k-select :items="items" labelText="title" v-model="select" placeholder="Role" />
        </div>
      </div>
      <div class="flex align-center" style="gap : 8px">
        <div :class="filter.label" >Filter</div>
        <div>
          <k-select :items="items" labelText="title" v-model="select" placeholder="Role" />
        </div>
      </div>
    </div>

    <k-input placeholder="Search" v-model="searchValue" />
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  const select = ref({})
  const searchValue = ref('')
  const items = [
    {
      title: 'Foo',
      value: 'foo'
    },
    {
      title: 'Bar',
      value: 'bar'
    }
  ]
</script>

<style lang="scss" module="filter">
.label {
  font-size: $text-lg;
  font-weight: $font-medium;
  color: var(--grey-color);
}
</style>