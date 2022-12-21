import { defineStore  } from "pinia";
type Params = {[key : string ] : string }
export const useAuthStore = defineStore('auth' , {
  state : () => ({
    token : '',
    profile : {
      username : '',
      role : ''
    }
  }),
  actions : {
    saveAuthData (response : Params) {
      localStorage.setItem('adminKoanba', JSON.stringify(response.token))
      this.$patch((state) => {
        state.token = response.token
        state.profile.username = response.username
        state.profile.role = response.role
      })
    },
    removeAuthData() {
      this.$reset()
      localStorage.removeItem('adminKoanba')
    }
  },
  getters : {
    
  }
})