import methods from "./actions"
export default {
  namespaced: true,
  state: {
    data: {
      enablePayments: [],
      customExpire: null
    },
    pathMasterBank : 'admin/enable/payments'

  },
  mutations: {
    setData(state, payload) {
      console.log("===", payload)
      state.data = payload
    }
  },
  actions: {
    ...methods,
    addMasterBank  ({state, dispatch}, payload) {
      const params = {
        url : state.pathMasterBank,
        data : {
          ...payload
        }
      }
      return dispatch('postWithToken', params , {root : true})
        .then(response => { return dispatch('getMasterBank')})
        .catch(err => {
          console.log(err)
        })
    },
    getMasterBank ({state, dispatch, commit} ) {
      const params = {
        url : state.pathMasterBank
      }
      return dispatch('getWithToken', params , {root: true})
        .then(response => {
          const responseData = response.data.data
          commit('setData', responseData)
        })
    }
  }
}