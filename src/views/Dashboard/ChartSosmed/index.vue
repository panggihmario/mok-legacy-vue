<template>
  <div>
    <Header-Content label="Dashboard" :list="items" />
    <Filters/>
  </div>
</template>

<script>
import HeaderContent from "@/containers/HeaderContent";
import Filters from "./Header/index.vue"
export default {
  components : {
    HeaderContent,
    Filters
  },
  data () {
    return {
      keyword : '',
      payloadFilter: {
        username: "",
        timeline: "HOUR",
      },
      itemsList : [],
      items: [
        {
          text: "Dashboard Sosmed",
          disabled: true,
        },
      ],
    }
  },
  methods : {
    handleSearchUser () {

    }
  }
}
</script>

<style lang="scss" module="k" src="../style.scss">

</style>