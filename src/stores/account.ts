import { defineStore } from "pinia"
import { useApiStore } from "./api"
interface LooseObject {
  [key: string ]: unknown,
}
interface parameter {
  url : string,
  params? : LooseObject
}

export const useAccountStore = defineStore('account', () => {
  const fetchRoles = function (payload : string){
    const store = useApiStore()
    const data :parameter = {
      url : `admin/accounts/roles/${payload}`
    }
    return store.fetchApi(data.url)
      .then(response => { return response })
      .catch(err => { throw err })
  }
  return {
    fetchRoles
  }
})