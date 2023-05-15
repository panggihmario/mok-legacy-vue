<template>
  <div>
    <Header-Content label="Dashboard" :list="items" />
    <div :class="k['dash__container']">
      div
    </div>
  </div>
</template>

<script>
import HeaderContent from "@/containers/HeaderContent";
export default {
  components : {
    HeaderContent
  },
  data () {
    return {
      items: [
        {
          text: "Dashboard Sosmed",
          disabled: true,
        },
      ],
    }
  }
}
</script>

<style lang="scss" module="k" src="../style.scss">

</style>