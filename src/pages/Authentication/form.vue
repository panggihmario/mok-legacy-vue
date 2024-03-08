<template>
  <form class="form__container" @submit.prevent="handleSubmit">
    <div class="auth__label">
      <div>
        LOGIN
      </div>
      <div class="auth__line"></div>
    </div>
    <!-- <input v-model="loginValues.username" data-test="username"/> -->
    <div class="grid gap-lg">
      <k-input 
        placeholder="Username" 
        data-test="username" 
        label="Username" 
        size="lg"
        v-model="loginValues.username" 
        :errorMessage="errorMessages.username" 
        @validate="validation('username')" 
      />
      <k-input 
        placeholder="Password" 
        label="Password" 
        size="lg" 
        :type="typeInput"
        v-model="loginValues.password" 
        @validate="validation('password')" 
        @onClickEvent="showPassword" 
        icon
        data-test="password" 
        :errorMessage="errorMessages.password" 
      />
      <div>
        <k-button color="primary" :loading="loading" type="submit" data-test="submit">
          Login
        </k-button>
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
import { object, string } from "yup"
import { reactive, ref } from 'vue';
import { useRouter } from "vue-router";
import { useApiStore } from "../../stores/api";
import { useAuthStore } from "@/stores/authentication";
const storeAuth = useAuthStore()
const store = useApiStore()
interface valueType {
  username: string,
  password: string
}
const emit = defineEmits(['submitted'])
const router = useRouter()


const loginValues = reactive<valueType>({
  username: '',
  password: ''
})
const errorMessages = reactive<valueType>({
  username: '',
  password: '',
})
const loading = ref(false)
const typeInput = ref('password')
const loginSchema = object().shape({
  username: string().required(),
  password: string().required()
})

const showPassword = function (value: boolean) {
  if (value) {
    typeInput.value = 'password'
  } else {
    typeInput.value = 'text'
  }
}

const handleSubmit = function () {
  loginSchema.validate(loginValues, { abortEarly: false })
    .then((data) => {
      loading.value = true
      for (const [key] of Object.entries(data)) {
        errorMessages[key as keyof valueType] = ''
      }
      return data
    })
    .then(payload => {
      return loginApi({ ...payload })
    })
    .then(response => {
      const responseData = response.data
      setTimeout(() => {
        loading.value = false
      }, 2000)
      storeAuth.saveAuthData(responseData)
      router.push({
        name: 'management'
      })
    })
    .then(payload => {
      emit('submitted', payload)
    })
    .catch(err => {
      loading.value = false
      if (err.response) {
        errorMessages.username = "invalid username"
        errorMessages.password = "invalid password"
      } else {
        if (err.inner) {
          err.inner.forEach((e: {
            path: string, message: string
          }) => {
            errorMessages[e.path as keyof valueType] = e.message
          });
        }

      }

    })
}
const loginApi = function (data: valueType) {
  return store.postApi('/auth/login', { ...data })
}

const validation = function (field: string) {
  loginSchema.validateAt(field, loginValues)
    .then(() => {
      errorMessages[field as keyof valueType] = "";
    })
    .catch(err => {
      errorMessages[field as keyof valueType] = err.message;
    });
}

</script>

<style lang="scss">
.form {
  &__container {
    display: grid;
    gap: 10px;
  }
}
</style>