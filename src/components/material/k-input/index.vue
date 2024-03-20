<template>
  <div>
    <div 
      class="input__container"
      :class="label &&  'input__gap' "
    >
      <div class="input__label" :class="!!errorMessage && 'has-error'">{{ label }}</div>
      <div 
        class="input__box" :class="[`input__outline-${size}`, !!errorMessage && 'has-error']"
        id="input"
      >
        <input 
          :type="type" 
          v-model="value" 
          :name="name" 
          @blur="$emit('validate')" 
          @input="$emit('validate')"
          v-bind="$attrs"
          :maxlength="counter ? counter  : ''"
        />
        <div @click="showPassword" v-if="icon" class="input__icon">
          <i v-if="isOpen" class="fa-regular fa-eye has-error"></i>
          <i v-else class="fa-regular fa-eye-slash"></i>
        </div>
      </div>
      <Transition name="slide-fade">
        <div v-if="errorMessage" class="input__message"> {{ errorMessage }} </div>
      </Transition>
    </div>
    <div v-if="counter" class="input__counter">{{value?.length}}/100</div>
  </div>

</template>

<script lang="ts">
type Size = 'md' | 'lg' | 'sm';
import { defineComponent, PropType, computed, ref } from 'vue'
export default defineComponent({
  inheritAttrs: false,
  props: {
    label: {
      type: String
    },
    type: {
      type: String,
      default: 'text'
    },
    modelValue: {
      type: String
    },
    size: {
      type: String as PropType<Size>,
      default : 'md'
    },
    name: {
      type: String
    },
    rules: {
      type: String
    },
    icon: {
      type: Boolean,
    },
    errorMessage: {
      type: String
    },
    counter : {
      type : Number
    }

  },
  setup(props, { emit }) {
    const isOpen = ref(false)
    const value = computed({
      get() {
        return props.modelValue
      },
      set(value) {
        emit('update:modelValue', value)
      }
    })

    const showPassword = function () {
      isOpen.value = !isOpen.value
      emit('onClickEvent', !isOpen.value)
    }
    return {
      value,
      isOpen,
      showPassword,
    }
  }
})

</script>
