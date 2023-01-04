<template>
  <div class="select__wrapper" ref="root">
    <div class="select__component pointer" @click="openOptions">
      <input class="select__input" />
      <i class="fa-solid fa-caret-down"></i>
    </div>
    <k-view>
      <div v-if="isOpen" class="select__options">
        <ul>
          <li 
            v-for="(item, index) in items" 
            :key="index" 
          >  
            {{ item[labelText as keyof LooseObject]   }} 
          </li>
        </ul>
      </div>
    </k-view>
  </div>
</template>


<script lang="ts">
import { defineComponent, ref, PropType, onMounted } from 'vue';
interface LooseObject {
    [key: string]: any
}
export default defineComponent({
  name: 'k-select',
  props : {
    labelText : {
      type : String 
    },
    items : {
      type : Array as PropType <LooseObject[] > ,
    }
  },
  setup() {
    const root = ref(null)
    const isOpen = ref(false)
    const openOptions = function () {
      isOpen.value = !isOpen.value
    }

    const handleOutside = function (event : Event) {
      if(!event.composedPath().includes(root.value!)) {
        isOpen.value = false
      }
    }

    onMounted(() => {
      window.addEventListener('click', handleOutside)
    })

    return {
      openOptions,
      isOpen,
      root
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
    display: block;
    width: 100%;
    outline: none;
    border: none;
    background-color: inherit;

    &:focus {
      outline: none;
    }
  }

  &__component {
    display: flex;
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
    border-radius: 8px;
    padding: 20px;
    left: 0;
    top: 40px;
    width: 100%;
  }
}

</style>