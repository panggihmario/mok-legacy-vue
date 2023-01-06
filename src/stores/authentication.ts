import { defineStore  } from "pinia";
import { reactive, ref } from "vue";
import { useApiStore } from "./api"
type ResponseModel = {
  userName : string,
  role : string,
  token : string
}

const initialState  = {
  username : '',
  role : '',
  token : ''
}

export const useAuthStore = defineStore('auth', () => {
  const storeApi = useApiStore()
  const token = ref('')
  const profile = reactive({...initialState})
  
  const saveAuthData = function (response : ResponseModel) {
    localStorage.setItem('adminKoanba', JSON.stringify(response.token))
    const profileData = {
      username : response.userName,
      role : response.role
    }
    profile.username = response.userName
    profile.role = response.role
    profile.token = response.token
    localStorage.setItem('profile', JSON.stringify(profileData))
  }

  const removeAuthData = () =>  {
    localStorage.removeItem('adminKoanba')
    localStorage.removeItem('profile')
    Object.assign(profile, initialState)
  }

  const getInfo = function () {

  }

  return {
    token,
    profile,
    saveAuthData,
    removeAuthData
  }
})