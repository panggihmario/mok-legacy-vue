<template>
  <div class="grid gap-16">
    <k-page-title
      title="Create Management User"
      :breadCrumbs="breadcrumbs"
    >

    </k-page-title>
    <div class="grid gap-16"  style="width : 300px">
      <div class="flex gap-16 align-center">
        <div class="avatar">

        </div>
        <div class="grid gap-4">
          <div class="text-grey text-md font-normal">Unggah Foto Profil</div>
          <k-upload
            type="button"
            @getResponse="handleResponse"
          />
        </div>
      </div>
      <k-input 
        placeholder="Nama User" 
        data-test="username"
        label="Nama User" size="md" 
      />
      <k-select 
        placeholder="Nama User" 
        mode="outline"
        data-test="username"
        label="Nama User" size="md" 
      />
    </div>
   
    
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue"
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

<style lang="scss">
.avatar {
  width: 60px;
  height: 60px;
  background-color: var(--grey-color);
  border-radius: 50%;
}
</style>