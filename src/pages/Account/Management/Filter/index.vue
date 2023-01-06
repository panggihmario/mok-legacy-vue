<template>
  <div class="flex justify-between">
    <div class="flex">
      <div>Sort</div>
      <div>
        <k-select
          :items="items"
          labelText="title"
          v-model="select"
          placeholder="Role"
        />
      </div>
    </div>
    <div class="flex">
      <div>Filter</div>
      <div>
        <k-select
          :items="items"
          labelText="title"
          v-model="select"
          placeholder="Role"
        />
      </div>
    </div>
    <k-input
      placeholder="Search" 
      v-model="searchValue"
      size="lg"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const select = ref({})  
const searchValue = ref('')
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
</script>