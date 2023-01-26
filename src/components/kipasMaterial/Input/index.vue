<template>
  <ValidationProvider  v-slot="{ errors }" :name="name" :rules="rules" >
    <div class="kipas__input-container">
      <label v-if="label" class="input__label" :class="errors.length > 0 && 'input__error-label' " > {{label}} </label>
      <input 
        :type="type" 
        :class="[`kipas__input-${size}` , { 'input__error' :  errors.length > 0 }, `kipas__${model}`]"
        class="input"
        v-bind="$attrs"
        :value="value"
        v-on="inputListener"
      >
      <div  
        :style="!rules && 'display : none' "
        class="input__error-label" > {{errors[0]}} </div>
    </div>
</ValidationProvider>
</template>

<script>
export default {
  data () {
    return {
      hasError : false
    }
  },
  props : {
    type : {
      type : String,
      default : 'text'
    },
    label : {
      type : String
    },
    value: {
      type: [String, Number, Object],
      require : true
    },
    rules: {
      type: String
    },
    size : {
      type : String,
      default : 'md',
    },
    name : {
      type : String
    },
    model : {
      type : String,
      default : 'outline'
    }
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
.utils {
  font-size: 12px;
  font-weight: 600;
}



.input {
  outline: none;
  @extend .utils;
  color: $charcoal;
  background: #FFFFFF;
  border: 1px solid #BBBBBB;
  border-radius: 4px;
  &__error-label {
    color: $danger !important;
    @extend .utils;
  }
  &__label {
    @extend .utils;
    color: $charcoal;
  }
  &__error {
    border: 1px solid $danger;
  }
}
.kipas {
  &__outline {
    background: #FFFFFF;
    border: 1px solid #BBBBBB;
  }
  &__flat {
    background: #FFFFFF;
    border: none;
  }
  &__input {
    outline: none;
    font-size: 12px;
    font-weight: 500;
    // background: #FFFFFF;
    // border: 1px solid #BBBBBB;
    border-radius: 4px;
  }
  &__input-label {
    font-size: 12px;
    font-weight: 600;
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
  &__input-sm {
    height: 24px;
    padding: 6px;
  }
}
</style>