<template>
  <div 
    :class="[
      cur.container,
      
    ]">
    <label :class="cur.label">{{ label }}</label>
    <div :class="[
        cur.input, 
        { 
          'input-disable' : isDisable}]">
      <span>Rp</span>
      <input
        ref="inputRef"
        type="text"
        :value="value"
        :disabled="isDisable"
      />
    </div>
  </div>
  
</template>

<script>
import { useCurrencyInput } from 'vue-currency-input'
import { watchDebounced } from "@vueuse/core";
export default {
  name: 'CurrencyInput',
  props: {
    value: Number, // Vue 2: value
    options: Object,
    label :String,
    isDisable : Boolean
  },
  setup(props, {emit}) {
    const { inputRef, numberValue } = useCurrencyInput(props.options, false)

    watchDebounced(numberValue, (value) => emit("input", value), {
      debounce: 1000,
    });
    return { inputRef }
  }
}
</script>

<style lang="scss" module="cur">
input:focus {
  outline: none;
  width: 100%;
}
.input {
  font-size: 12px;
  font-weight: 500;
  background: #FFFFFF;
  border: 1px solid #BBBBBB;
  height: 32px;
  padding: 9px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  gap: 4px;
  color: $charcoal;
}

.label {
  font-size: 12px;
  font-weight: 500;
  color: $black;
  letter-spacing: 0.01em;
}
.container {
  display: grid;
  gap: 8px;
}
// .input input[type=text]:disabled  {
//   background: #dddddd;
// }
</style>

<style lang="scss">
.input-disable {
  background-color: $gainsboro;
}
</style>