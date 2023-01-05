<template>
  <div class="select__wrapper" ref="root">
    <div 
      class="select__input select__component pointer" @click="openOptions">
      <input 
        class=" pointer"  
        readonly 
        :value="value"
      />
      <i class="fa-solid fa-caret-down"></i>
    </div>
    <k-view>
      <div v-if="isOpen" class="select__options">
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
import { defineComponent, ref, PropType, onMounted, onBeforeUnmount, computed, toRef, toRefs } from 'vue';
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
      default : 'filled'
    }

  },
  setup(props, {emit}) {
    const root = ref(null)
    const isOpen = ref(false)
    const selected = ref('')
    const openOptions = function () {
      isOpen.value = !isOpen.value
    }


    const { labelText , modelValue } = toRefs(props)
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

    const handleOutside = function (event : Event) {
      if(!event.composedPath().includes(root.value!)) {
        isOpen.value = false
      }
    }

    onMounted(() => {
      window.addEventListener('click', handleOutside)
    })
    onBeforeUnmount(() => {
      document.removeEventListener('click', handleOutside)
    })

    return {
      openOptions,
      selectItem,
      isOpen,
      root,
      value
    }
  }
})
</script>

<style lang="scss" >
.select {
  &__wrapper {
    position: relative;
    max-width: toRem(300);
  }
  &__input {
    color: var(--charcoal-color);
    display: flex;
  }

  &__component {
    
    background-color: var(--whitesnow-color);
    padding: 9px;
    border-radius: 6px;
    font-size: $text-lg;
    font-weight: $font-medium;
    height: 32px;
    
  }

  &__options {
    position: absolute;
    display: inline-block;
    background-color: var(--white-color);
    box-shadow: 0 5px 5px -3px rgb(0 0 0 / 20%), 0 8px 10px 1px rgb(0 0 0 / 14%), 0 3px 14px 2px rgb(0 0 0 / 12%);
    border-radius: 4px;
    padding: 10px;
    left: 0;
    top: 40px;
    width: 100%;
    & ul {
      display: grid;
      gap: 10px;
    }
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