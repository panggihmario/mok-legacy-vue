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
        v-model="name"
      />
      <k-input 
        placeholder="Password" 
        label="Password" 
        size="md" 
        :type="typeInput"
        @validate="validation('password')" 
        @onClickEvent="showPassword" 
        icon
        data-test="password" 
      />
      <k-input 
        placeholder="Konfirmasi Password" 
        label="Konfirmasi Password" 
        size="md" 
        :type="typeInput"
        @validate="validation('password')" 
        @onClickEvent="showPassword" 
        icon
        data-test="password" 
      />
      <k-input 
        placeholder="Email" 
        label="Email" 
        size="md" 
        :type="typeInput"
      />
      <k-input 
        placeholder="Nomor Telepon" 
        label="Email" 
        size="md" 
        :type="typeInput"
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
const name = ref('')
const typeInput = ref('password')
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

const showPassword = function (value : boolean) {
  if (value) {
    typeInput.value = 'password'
  } else {
    typeInput.value = 'text'
  }
}

const validation = function (field: string) {
  // loginSchema.validateAt(field, loginValues)
  //   .then(() => {
  //     errorMessages[field as keyof valueType] = "";
  //   })
  //   .catch(err => {
  //     errorMessages[field as keyof valueType] = err.message;
  //   });
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