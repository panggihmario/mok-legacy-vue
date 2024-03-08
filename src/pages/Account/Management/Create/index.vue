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
      <k-select 
        placeholder="Pilih jenis Akun" 
        mode="outline"
        data-test="role"
        label="Role" 
        size="md" 
        :items="items"
        labelText="label"
        v-model="item"
      />
      <k-select 
        placeholder="Pilih salah satu" 
        mode="outline"
        data-test="username"
        label="Jenis Kelamin" 
        size="md" 
        :items="genders"
        labelText="name"
        v-model=gender
      />
      <k-input
        placeholder="Nama user"
        label="Nama User"
        size="md"
        :counter="100"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue"
import { ResponseUpload } from "@/models"
import { useAccountStore } from "../../../../stores/account"
const props = defineProps({
  type : String
})
const store = useAccountStore()
const breadcrumbs = ref([
  { 
    name: "Manage Account",
    id : 0
  },
  { 
    name: "List Management",
    id : 1
  },
  { 
    name: "Create Management User" ,
    id : 2
  },
]);

const genders = ref([
  {
    name : 'Laki-laki',
    value : 'MALE',
    id : 0
  },
  {
    name : 'Wanita',
    value : 'FEMALE',
    id : 1
  }
])



const item = ref({})
const items = ref([])
const gender = ref({})
const handleResponse = function (data : ResponseUpload) {
  console.log(data)
}

const getRoles = function () {
  return store.fetchRoles('MANAGEMENT')
    .then(response => {
      const newResponse = response.map((r : string, idx : number) => {
        return {
          id : idx,
          label : r,
        }
      })
      console.log(newResponse)
      items.value = newResponse
    })
    .catch(err => {
      console.log(err)
    })

}

onMounted(getRoles)

</script>

<style lang="scss">
.avatar {
  width: 60px;
  height: 60px;
  background-color: var(--grey-color);
  border-radius: 50%;
}
</style>