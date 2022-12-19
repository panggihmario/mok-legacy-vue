<template>
  <div>
    <div class="input__container">
      <div class="input__label" :class="!!errorMessage && 'has-error'">{{ label }}</div>
      <div class="input__box" :class="[`input__outline-${size}`, !!errorMessage && 'has-error']">
        <input 
          :type="type" 
          v-model="value" 
          :placeholder="label" 
          :name="name" 
          @blur="$emit('validate')" 
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
  </div>

</template>

<script lang="ts">
type Size = 'md' | 'lg' | 'sm';
import { storeToRefs } from 'pinia';
import { defineComponent, PropType, computed, ref } from 'vue'
import { useAuthStore } from '../../../stores/authentication';
export default defineComponent({
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
    }

  },
  setup(props, { emit }) {
    const isOpen = ref(false)
    const store = useAuthStore()

    const { token } = storeToRefs(store)

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
      store,
      token
    }
  }
})

</script>

<style lang="scss">
$sm-height : 28px;
$md-height : 32px;
$lg-height : 40px;

input {
  outline: none;
  border: none;
  width: 100%;
  display: block;
}

.input {
  &__container {
    display: grid;
    gap: 9px;
    z-index: 10;
    margin-bottom: calc(1em * 1.5);
    position: relative;
  }

  &__icon {
    font-size: 14px;
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  &__box {
    position: relative;
    display: grid;
    grid-template-columns: 1fr max-content;
  }

  &__label {
    font-size: $text-xl;
    font-weight: $font-medium;
    letter-spacing: 0.01;
    &.has-error {
      color: var(--danger-color);
    }
  }

  &__base {
    border-radius: 4px;
    width: 100%;
  }

  &__outline {
    background-color: var(--white-color);
    border: 1px solid var(--gainsboro-color);
    outline: none;

    &.has-error {
      border: 1px solid var(--danger-color);
      color: var(--danger-color);
    }
  }

  &__message {
    position: absolute;
    bottom: calc(-1.5 * 1em);
    left: 0;
    margin: 0;
    @extend .input__label;
    color: var(--danger-color);
  }

  &__large {
    height: $lg-height;
    font-size: $text-xl;
    font-weight: $font-medium;
    padding: 0 16px;
  }

  &__medium {
    height: $md-height;
    font-size: $text-xl;
    font-weight: $font-normal;
    padding-left: 10px;
  }

  &__outline-lg {
    @extend .input__base;
    @extend .input__outline;
    @extend .input__large;
  }

  &__outline-md {
    @extend .input__base;
    @extend .input__outline;
    @extend .input__medium;
  }
}

.slide-fade-enter-active {
  transition: all 0.4s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-leave-active {
  transition: all 0.4s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-leave-to {
  transform: translateX(-20px);
  opacity: 0;
}

.slide-fade-enter-from {
  opacity: 1;
  transform: translateX(-20px);
}
</style>