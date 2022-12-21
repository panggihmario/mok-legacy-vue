<template>
  <button 
    :class="['button', `button__${size}`, `bg-${color}`]"
    :disabled="loading"
  >
    <Transition name="slide-fade">
      <div v-if="loading" class="button__loading">
        <div>Loading</div>
        <i class="fa fa-spinner fa-spin"></i>
      </div>
      <div v-else>
        <slot></slot>
      </div>
    </Transition>
  </button>
</template>

<script lang="ts" setup>
defineProps({
  size: {
    type: String,
    default: 'md'
  },
  color: {
    type: String,
    default: 'primary'
  },
  loading: {
    type: Boolean
  }
})
</script>

<style lang="scss"  scoped >
.flex {
  display: grid;
  grid-template-columns: max-content max-content;
}

.button {
  border: none;
  box-shadow: 0px 2px 4px rgba(56, 231, 255, 0.24);
  border-radius: 8px;
  cursor: pointer;
  position: relative;
  min-width: 70px;

  &__md {
    font-size: 11px;
    font-weight: 500;
    padding: 0 22px;
    height: 32px;
  }

  &__loading {
    display: grid;
    grid-template-columns: 1fr max-content;
    gap: 5px;
    pointer-events: none;
  }
}

.slide-fade-enter-active {
  transition: all 0.9s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-leave-active {
  transition: all  cubic-bezier(1, 0.5, 0.8, 1);
}

// .slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}

.slide-fade-enter-from {
  opacity: 1;
  transform: translateX(-20px);
}

$colorList : (
  'primary' var(--primary-color) var(--white-color),
  'secondary' var(--secondary-color) var(--white-color),
  'kellygreen' var(--kellygreen-color) var(--white-color),
  'whitesnow' var(--whitensnow-color) var(--charcoal-color)
);

@each $name in $colorList {
  .bg-#{nth($name,1)} {
    background-color: nth($name, 2);
    color: nth($name, 3)
  }
}
</style>