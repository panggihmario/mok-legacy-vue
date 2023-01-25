<template>
  <div>
    <label>label</label>
    <div>
      <span>Rp</span>
      <input
      ref="inputRef"
      type="text"
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
    options: Object
  },
  setup(props) {
    const { inputRef } = useCurrencyInput(props.options)

    return { inputRef }
  }
}
</script>