<template>
  <div>
    <HeaderContent
      :list="list"
      label="List News"
    />
  </div>
</template>

<script>
import HeaderContent from "@/containers/HeaderContent"
export default {
  components : {
    HeaderContent
  },
  data () {
    return {
      list: [
        {
          text: "News",
          disabled: false,
          href: "publisher",
        },
      ],
    }
  }
}
</script>