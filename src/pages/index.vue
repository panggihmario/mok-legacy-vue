

<template>
  <div>
    <Navigation></Navigation>
    <main class="main-container">
      <router-view></router-view>
    </main>
  </div>
</template>



<script lang="ts" >
import { defineComponent  } from 'vue';
import Navigation from "../components/core/navigation/index.vue"
export default defineComponent({
  components : {
    Navigation
  }
})
</script>

<style lang="scss">
.main-container {
  padding: 40px 40px 40px calc(toRem(40) + var(--width-aside));
}
</style>

