

<template>
  <div>
    <Navigation></Navigation>
    <main class="main-container">
      <router-view v-slot="{ Component }">
        <Transition name="fade" mode="out-in">
          <component :is="Component" />
        </Transition>
      </router-view>
    </main>
  </div>
</template>

<script lang="ts" >
import { defineComponent } from 'vue';
import components from '../components';
import Navigation from "../components/core/navigation/index.vue"
export default defineComponent({
  components: {
    Navigation,
    components
  }
})
</script>

<style lang="scss">
.main-container {
  padding: 40px 40px 40px calc(toRem(40) + var(--width-aside));
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

