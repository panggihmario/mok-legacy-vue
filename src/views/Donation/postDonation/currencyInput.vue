<template>
  <div :class="cur.container">
    <label :class="cur.label">{{ label }}</label>
    <div :class="cur.input">
      <span>Rp</span>
      <input
        ref="inputRef"
        type="text"
        :value="value"
      />
    </div>
  </div>
  
</template>

<script>
import { useCurrencyInput } from 'vue-currency-input'

export default {
  name: 'CurrencyInput',
  props: {
    value: Number, // Vue 2: value
    options: Object,
    label :String
  },
  setup(props) {
    const { inputRef } = useCurrencyInput(props.options)
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
  font-weight: 600;
  color: $charcoal;
  letter-spacing: 0.01em;
}
.container {
  display: grid;
  gap: 8px;
}
</style>