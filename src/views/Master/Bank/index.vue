<template>
  <div>
    <HeaderContent :list="list" label="Bank">
      <custom-button
        color="secondary"
        class="white--text"
        size="small"
      >
        Tambah Bank
      </custom-button>
    </HeaderContent>
    <TableData/>
  </div>
</template>

<script>
import HeaderContent from "@/containers/HeaderContent";
import TableData from "./table.vue"
export default {
  components : {
    HeaderContent,
    TableData
  },
  data () {
    return {
      list: [
        {
          text: "Master",
          disabled: false,
        },
        {
          text: "BCA",
          disabled: true,
        },
      ],
    }
  }
}
</script>