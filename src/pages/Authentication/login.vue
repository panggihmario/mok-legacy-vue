<template>
  <div class="container">
    <div class="auth__card">
      <form @submit.prevent="handleSubmit">
        <div class="auth__label">
          <div>
            LOGIN
          </div>
          <div class="auth__line"></div>
        </div>
        <div class="grid">
          <k-input 
            placeholder="Username" 
            data-test="username"
            label="Username" size="lg" 
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
            <k-button  
              color="primary" 
              :loading="loading"
              type="submit"
              data-test="submit"
            >
              Login
            </k-button>
          </div>
        </div>
      </form>
    </div>

  </div>
</template>

<script lang="ts">
import { object, string } from "yup"
import { reactive, ref } from 'vue';
import { useApiStore } from "../../stores/api";
import { useAuthStore } from "../../stores/authentication";
import { useRouter  } from "vue-router";
export default {
  setup() {
    interface valueType {
      username: string,
      password: string
    }
    const router = useRouter()
    const store = useApiStore()
    const storeAuth = useAuthStore()
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
            name : 'management'
          })
        })
        .catch(err => {
          loading.value = false
          if (err.response) {
            errorMessages.username = "invalid username"
            errorMessages.password = "invalid password"
          } else {
            err.inner.forEach((e: {
              path: string, message: string
            }) => {
              errorMessages[e.path as keyof valueType] = e.message
            });
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
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  
  background: var(--white-color);
}
.auth {
  &__line {
    background: -webkit-linear-gradient(right, #c1c5bf, var(--primary-color));
    height: 2px;
    width: 89px;
    margin: 1rem auto;
  }
  &__card {
    border-radius: 10px;
    min-width: toRem(360);
    box-shadow: 0px 1px 18px var(--primary-color);
    padding: 24px;
  }
  &__label {
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 24px;
    text-align: center;
    letter-spacing: 4px;
  }
}
.grid {
  display: grid;
  gap: 5px;
}
</style>