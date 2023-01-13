<template>
  <div>
    <k-page-title
      title="Create Management User"
      :breadCrumbs="breadcrumbs"
    >

    </k-page-title>

    <div class="mt-40"></div>
    <k-upload
      type="button"
      @getResponse="handleResponse"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, defineProps } from "vue"
import { ResponseUpload } from "@/models"

const props = defineProps({
  type : String
})

const breadcrumbs = ref([
  { name: "Manage Account" },
  { name: "List Management" },
  { name: "Create Management User" },
]);

const handleResponse = function (data : ResponseUpload) {
  console.log(data)
}

</script>