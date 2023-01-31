export default {
  namespaced : true,
  state : {

  },
  actions : {
    getProvince ({dispatch}, payload) {
      const data = {
        url : 'areas/province',
        params : {
          ...payload
        }
      }
      return dispatch("getWithToken", data, { root: true })
        .then(response => {
          const responseData = response.data.data
          return responseData
        })
        .catch(err => {throw err})
    }
  }
}