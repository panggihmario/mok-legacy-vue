<template>
  <form @submit="handleSubmit">
    <div class="container grid">
      <h1>Management</h1>
      <k-input 
        placeholder="Username" 
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
        :errorMessage="errorMessages.password" />
      <div>
        <k-button color="primary" :loading="loading">
          Login
        </k-button>
      </div>
      {{ errorMessages }}
    </div>
  </form>
</template>

<script lang="ts">
import { object, string } from "yup"
import { reactive, ref } from 'vue';
export default {
  setup() {
    interface valueType {
      username: string,
      password: string
    }
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
    const handleSubmit = function (e: Event) {
      e.preventDefault()
      // loading.value = true
      // setTimeout(() => {
      //   loading.value = false
      // },2000)
      loginSchema.validate(loginValues, { abortEarly: false })
        .then((data) => {
          for (const [key] of Object.entries(data)) {
            errorMessages[key as keyof valueType] = ''
          }
          return data
        })
        .catch(err => {
          err.inner.forEach((e: {
            path: string, message: string
          }) => {
            errorMessages[e.path as keyof valueType] = e.message
          });
        })
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

    return {
      typeInput,
      loginValues,
      showPassword,
      handleSubmit,
      validation,
      errorMessages,
      loading
    }
  }
}
</script>
<style lang="scss" scoped>
.container {
  max-width: 320px;
}

.grid {
  display: grid;
  gap: 5px;
}
</style>