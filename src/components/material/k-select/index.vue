<template>
  <div class="select__wrapper" ref="root">
    <div 
      class="flex pointer" 
      :class="[`select__${modeValue}-${size}`]"
      @click="openOptions"
    >
      <input 
        class="pointer"  
        readonly 
        :value="value"
        v-bind="$attrs"
      />
      <i class="fa-solid fa-caret-down flex align-center"></i>
    </div>
    <k-view>
      <div v-if="isOpen" 
        :class="`select__options-${size}`">
        <ul>
          <li 
            v-for="(item, index) in items" 
            :key="index" 
            @click="selectItem(item)"
            class="select__option pointer"
          >  
            {{ item[labelText as keyof LooseObject]   }} 
          </li>
        </ul>
      </div>
    </k-view>
  </div>
</template>


<script lang="ts">
import { defineComponent, ref, PropType, computed, toRefs } from 'vue';
import useDetectOutsideClick from "../../../composable/useDetectOutsideClick"
interface LooseObject {
  [key: string ]: unknown,
}
export default defineComponent({
  name: 'k-select',
  props : {
    labelText : {
      type : String  ,
      required : true,
      default : 'title'
    },
    modelValue : {
      type : [String ,Object ]
    },
    items : {
      type : Array as PropType <LooseObject[] > ,
    },
    size : {
      type : String,
      default : 'md'
    },
    mode : {
      type : String,
      default : 'filled',
      validator (value : string) {
        return ['filled', 'outline'].includes(value)
      }
    }

  },
  setup(props, {emit}) {
    const root = ref(null)
    const isOpen = ref(false)
    const { labelText , modelValue, mode } = toRefs(props)
    
    const openOptions = function () {
      isOpen.value = !isOpen.value
    }

    useDetectOutsideClick(root, () => {
      isOpen.value = false
    })

    const modeValue = computed(() => {
      const checkProps = ['filled', 'outline'].includes(mode.value)
      if(checkProps) {
        return mode.value
      }else{
        return "filled"
      }
    })

    const value = computed(() => {
      if(modelValue.value  ) {
        const key = labelText.value;
        const c = (modelValue.value as LooseObject)[key]
        return c
      }
    })

    const selectItem = function (item :LooseObject ) {
      emit('update:modelValue', item)
      isOpen.value = false
    }

    return {
      openOptions,
      selectItem,
      isOpen,
      root,
      value,
      modeValue
    }
  }
})
</script>

<style lang="scss" >
.select {
  &__wrapper {
    position: relative;
    max-width: toRem(300);
    color: var(--charcoal-color);
  }
  &__filled-md {
    @extend .input__base;
    @extend .input__medium;
    @extend .input__filled;
  }
  &__filled-lg {
    padding: 9px;
    @extend .input__base;
    @extend .input__large;
    @extend .input__filled;
  }
  &__outline-md {
    @extend .input__base;
    @extend .input__medium;
    @extend .input__outline;
  }
  &__outline-lg {
    @extend .input__base;
    @extend .input__large;
    @extend .input__outline;
  }
  &__options {
    position: absolute;
    display: inline-block;
    background-color: var(--white-color);
    box-shadow: 0 5px 5px -3px rgb(0 0 0 / 20%), 0 8px 10px 1px rgb(0 0 0 / 14%), 0 3px 14px 2px rgb(0 0 0 / 12%);
    border-radius: 4px;
    padding: 10px;
    z-index: 10;
    left: 0;
    width: 100%;
    & ul {
      display: grid;
      gap: 10px;
    }
  }
  &__options-lg {
    @extend .select__options;
    top: calc($lg-height + 8px);
  }
  &__options-md {
    @extend .select__options;
    top: calc($md-height + 8px);
  }
  &__option {
    font-size: $text-lg;
    font-weight: $font-medium;
    color: var(--charcoal-color);
    padding: 10px;
    &:hover {
      background-color: var(--primary-low-color);
      border-radius: 4px;
    }
  }
}

</style>