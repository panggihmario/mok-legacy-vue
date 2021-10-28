export default {
  namespaced: true,
  state: {
    pathDashboard: "dashboard/statistics"
  },
  mutations: {

  },
  actions: {
    fetchStatisticsUser({ state }, payload) {
      const params = {
        url: `${state.pathDashboard}/user-registers/${payload.type}`,
        params: {
          ...payload.params
        }
      }
      return this._vm.$fetchWithToken(params)
        .then(response => {
          const responseData = response.data.data
          return responseData
        })
        .catch(err => { throw err })
    },
    fetchStatisticsData ({state}, payload) {
      const params = {
        url: `${state.pathDashboard}/${payload.data}/${payload.type}`,
        params: {
          ...payload.params
        }
      }
      return this._vm.$fetchWithToken(params)
        .then(response => {
          const responseData = response.data.data
          return responseData
        })
        .catch(err => { throw err })
    }
  }
}