import { defineStore } from "pinia";
import axios from "axios"
import router from "../router"
type Params = {[key : string | number] : string }
const { VITE_APP_BASE_URL } = import.meta.env;
export const useApiStore = defineStore('api', {
  state: () => ({
    url: VITE_APP_BASE_URL
  }),
  actions: {
    createAxiosInstance () {
      const instance = axios.create({
        baseURL: this.url,
        timeout: 60 * 4 * 1000,
        headers: {
          "Content-Type": `application/json`,
        },
      })
      return instance
    },
    interceptorRequest () {
      this.createAxiosInstance().interceptors.request.use((config : any ) => {
        const token = this.getTokenFromStorage()
        if(token) {
          config.headers.Authorization = token
        }
        return config
      },(error) => {
        return Promise.reject(error)
      })
    },
    interceptorResponse () {
      this.createAxiosInstance().interceptors.response.use(
        (res) => {
          return res
        },
        (err) => {
          if(err.response.status === 401) {
            router.push({name :'login'})
          }else{
            return Promise.reject(err)
          }
        }
      )
    },
    getTokenFromStorage : () => {
      const token = JSON.parse(localStorage.getItem('token')!)
      return `Bearer ${token}`
    },
    postApi (url : string , params : Params) {
      return this.createAxiosInstance().post(url, params)
    },
    fetchApi (url : string , params : Params) {
      return this.createAxiosInstance().get(url, {
        params : {...params}
      })
    }
  }
})