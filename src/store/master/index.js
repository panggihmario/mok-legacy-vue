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
    isReadySubmit : false,
    heightContent : 500
  },
  mutations: {
    setHeightContent (state, payload) {
      state.heightContent = payload
    },
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
    handleResizeContentHeight ({commit}, payload) {
      const pages = document.documentElement.getBoundingClientRect()
      const footer = document.getElementById('footerBank').getBoundingClientRect()
      const header = document.getElementById('headerBank').getBoundingClientRect()
      const contentHeight = pages.height - (footer.height + header.height + payload.differentHeight )
      commit('setReadySubmit', payload.isOpen)
      commit('setHeightContent', contentHeight)
    }
    
  }
}