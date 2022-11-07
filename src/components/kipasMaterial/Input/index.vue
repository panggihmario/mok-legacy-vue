<template>
  <div class="kipas__input-container">
    <label v-if="label" class="kipas__input-label" > {{label}} </label>
    <input 
      :type="type" 
      :class="[`kipas__input-${size}`]"
      class="kipas__input"
      v-bind="$attrs"
      :value="value"
      v-on="inputListener"
    >
  </div>
</template>

<script>
export default {
  props : {
    type : {
      type : String,
      default : 'text'
    },
    label : {
      type : String
    },
    value: {
      type: [String, Number, Object]
    },
    rules: {
      type: String
    },
    size : {
      type : String,
      default : 'md'
    },
    value: {
      type: [String, Number, Object]
    },
  },
  computed : {
    inputListener () {
      const vm = this
      return Object.assign({}, this.$listeners, {
        input : function(event) {
          vm.$emit('input', event.target.value)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.kipas {
  &__input {
    outline: none;
    font-size: 12px;
    font-weight: 500;
    background: #FFFFFF;
    border: 1px solid rgba(0, 0, 0, 0.15);
    border-radius: 4px;
  }
  &__input-label {
    font-size: 10px;
    font-weight: 500;
    color: #4A4A4A;
    letter-spacing: 0.01em;
  }
  &__input-container {
    display: grid;
    gap: 8px;
  }
  &__input-lg {
    height: 40px;
    padding: 13px 16px;
  }
  &__input-md {
    height: 32px;
    padding: 9px;
  }
}
</style>