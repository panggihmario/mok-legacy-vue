<template>
  <div>
    <HeaderContent
      label="Kategori"
      :list="crumbs"
      labelAction="Create Categori"
    />
    <div>
      <Table></Table>
    </div>
  </div>
</template>

<script>
import HeaderContent from "@/containers/HeaderContent";
import Table from "./table.vue"

export default {
  components: {
    HeaderContent,
    Table
  },
  data() {
    return {
      crumbs: [
        {
          text: "Penggalangan Dana",
          disabled: true,
        },
      ],
    };
  },
};
</script>
