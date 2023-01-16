<template>
  <div class="flex justify-end">
   

    <k-input 
      placeholder="Search" 
      v-model="searchValue" 
      v-on:keyup.enter="onEnter"
    />
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  const searchValue = ref('')
  const emit = defineEmits<{
   ( e : 'onEnter' , value : string) : void
  }>()
  const onEnter = function () {
    emit('onEnter', searchValue.value)
  }
  


</script>

<style lang="scss" module="filter">
.label {
  font-size: $text-lg;
  font-weight: $font-medium;
  color: var(--grey-color);
}
</style>