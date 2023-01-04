<template>
  <Transition :name="name" v-bind="$attrs">
    <slot></slot>
  </Transition>
</template>

<script lang="ts">
import { defineComponent  } from 'vue';
export default defineComponent({
  name : 'k-view',
  props : {
    name : {
      type : String,
      default : 'fade'
    },
    mode : {
      type : String,
      default : 'in-out'
    }
  }
})
</script>

<style lang="scss">
fade-enter-active,
.fade-leave-active {
  transition: opacity 0.9s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>