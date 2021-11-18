
export default {
  namespaced : true,
  state :{
    pathTrending : 'admin/trending'
  },
  actions : {
    checkHashtag({state ,dispatch}, payload) {
      const data = {
        url : `${state.pathTrending}/checkTrending`,
        params : {
          ...payload
        }
      }
      return dispatch('getWithToken', data, {root : true})
        .then(response => {
          const responseData = response.data.data
          return responseData
        })
        .catch(err => { throw err })
    },
    createHashtag ({state, dispatch}, payload) {
      const params = {
        url : `${state.pathTrending}/`,
        data : {
          ...payload
        }
      }
      return dispatch('postWithToken', params , {root : true})
        .then(response => {
          const responseData = response.data.data
          return responseData
        })
        .catch(err =>  {throw err} )
  
    }
  }
}