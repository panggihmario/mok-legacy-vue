import methods from "./actions"
export default {
  namespaced: true,
  state: {
    data: {
      enablePayments: [],
      customExpire: null
    },
    pathMasterBank : 'admin/enable/payments',
    tempExpireCustomData : null,
    isReadySubmit : false

  },
  mutations: {
    setData(state, payload) {
      state.data = payload
    },
    setTempExpireCustomData (state, payload) {
      state.tempExpireCustomData = payload
    },
    setReadySubmit (state, payload) {
      state.isReadySubmit = payload
    }
  },
  actions: {
    ...methods,
   
    
  }
}