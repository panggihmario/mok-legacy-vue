<template>
  <div class="grid gap-16">
    <k-page-title
      title="Create Management User"
      :breadCrumbs="breadcrumbs"
    />
    <form  @submit.prevent="handleSubmit">
    <div class="grid gap-16"  style="width : 300px">
      <div class="flex gap-16 align-center">
        <div class="avatar" :class="!avatar && 'bg-grey'" >
          <img :src="avatar" />
        </div>
        <div class="grid gap-4">
          <div class="text-grey text-md font-normal">Unggah Foto Profil</div>
          <k-upload
            type="button"
            @getResponse="handleResponse"
          />
        </div>
      </div>
      {{ userValue.accountType }}
      <k-select 
        placeholder="Pilih jenis Akun" 
        mode="outline"
        data-test="role"
        label="Role" 
        size="md" 
        :items="items"
        labelText="label"
        v-model="userValue.accountType"
      />
      <k-select 
        placeholder="Pilih salah satu" 
        mode="outline"
        data-test="username"
        label="Jenis Kelamin" 
        size="md" 
        :items="genders"
        labelText="name"
        v-model=userValue.gender
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
      />
      <k-input 
        placeholder="+62 8123 xxxx xxxx" 
        label="Nomor Telepon" 
        size="md" 
      />
      <k-textarea
        label="Note"
        rows="4"
        placeholder="Note"
      />
      <div class="grid grid-cols-2 gap-8">
        <k-button color="whitesnow">Batalkan</k-button>
        <k-button type="submit" color="kellygreen">Tambah Akun</k-button>
      </div>
    </div>
 </form>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, reactive } from "vue"
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

const items = ref([])
const name = ref('')
const avatar = ref('')
const typeInput = ref('password')
const userValue = reactive({
  username: "",
  name: "",
  photo: "",
  birthDate: "2020-04-22T14:39:59.608Z",
  gender: "",
  mobile: "",
  email: "",
  accountType: "",
  note: "",
  password: "",
  role: "",
})
const handleResponse = function (data : ResponseUpload) {
  console.log(data)
  userValue.photo = data.media.url
  avatar.value = data.media.url
}

const handleSubmit = function () {
  console.log(userValue)
}

const getRoles = function () {
  return store.fetchRoles('MANAGEMENT')
    .then(response => {
      const newResponse = response.map((r : string, idx : number) => {
        return {
          id : idx,
          label : r.replace("ROLE_", ""),
        }
      })
      console.log(response)
      items.value = response
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
  // background-color: var(--grey-color);
  border-radius: 50%;
  overflow: hidden;
}
</style>