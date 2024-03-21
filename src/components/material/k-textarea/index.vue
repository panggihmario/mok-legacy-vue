<template>
  <div
    class="input__container"
    :class="label &&  'input__gap' "
  >
    <div class="input__label">{{ label }}</div>
    <div class="input__box input__outline textarea__border" id="input">
      <textarea
        v-bind="$attrs"
      />
    </div>
    
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  label : String
})
</script>