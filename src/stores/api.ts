import { defineStore } from "pinia";
import axios from "axios"

type Params = {[key : string | number] : string }
const { VITE_APP_BASE_URL } = import.meta.env;
export const useApiStore = defineStore('api', {
  state: () => ({
    url: VITE_APP_BASE_URL
  }),
  actions: {
    createInstanceWithToken() {
      const token = this.getTokenFromStorage()
      const instance = axios.create({
        baseURL: this.url,
        timeout: 60 * 4 * 1000,
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": `application/json`,
        },
      })
      return instance
    },
    createInstanceWithoutToken() {
      const instance = axios.create({
        baseURL: this.url,
        timeout: 60 * 4 * 1000,
      })
      return instance
    },
    getTokenFromStorage : () => {
      const token = JSON.parse(localStorage.getItem('token')!)
      return `Bearer ${token}`
    },
    postApi (url : string , params : Params) {
      return this.createInstanceWithoutToken().post(url, {
        data : { ...params }
    })
    },
    postApiWithoutToken (url : string , params : Params) {
      return this.createInstanceWithoutToken().post(url, params)
    },
    fetchApi (url : string, params : Params) {
      return this.createInstanceWithToken().get(url, {
        params : { ...params }
      })
    }
  }
})