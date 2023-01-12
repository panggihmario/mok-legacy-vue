<template>
  <div>
    <k-page-title
      title="Create Management User"
      :listBreadCrumbs="breadcrumbs"
    >

    </k-page-title>

    <div class="mt-40"></div>
    <k-upload
      type="button"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, defineProps } from "vue"

const props = defineProps({
  type : String
})

const breadcrumbs = ref([
  { name: "Manage Account" },
  { name: "List Management" },
  { name: "Create Management User" },
]);
</script>