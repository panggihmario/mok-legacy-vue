import { defineStore } from "pinia";
import axios, { AxiosInstance, AxiosResponse } from "axios"
import { useAuthStore } from "./authentication"
type Params = {[key : string | number] : string | Number }
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
      this.interceptorRequest(instance)
      // this.interceptorResponse(instance)
      return instance
    },
    interceptorRequest (instance: AxiosInstance | undefined ) {
      instance?.interceptors.request.use( (config) => {
        const token = this.getTokenFromStorage()
        if(token) {
          config.headers!.Authorization = token
        }
         return config;
     }, function (error) {
         return Promise.reject(error)
     })
    },
    interceptorResponse (instance: AxiosInstance | undefined)  {
      instance?.interceptors.response.use(
        (res) => {
          return res
        },
        (err) => {
          if(err.response.status === 401) {
            useAuthStore().removeAuthData()
            return Promise.reject(err)
          }else{
            return Promise.reject(err)
          }
        }
      )
    },
    getTokenFromStorage : () => {
      const token = JSON.parse(localStorage.getItem('adminKoanba')!)
      return `Bearer ${token}`
    },
    postApi (url : string , params : Params) {
      return this.createAxiosInstance().post(url, params)
    },
    fetchApi (url : string , params? : Params)  {
      return this.createAxiosInstance().get(url, {
        params : {...params}
      })
      .then(response => this.printSuccess(response))
      .catch(err => { throw err })
    },
    printSuccess (response: AxiosResponse<any, any>) {
      const responseData = response.data.data
      return responseData
    }
  }
})