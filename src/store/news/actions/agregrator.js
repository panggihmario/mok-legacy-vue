function getListAgregratorSite({state}) {
  const data = {
    url : `admin/news/aggregators`
  }
  return this._vm.$httpWithToken().get(`${state.pathNews}/aggregators`)
    .then(response => {
      const responseData = response.data.data
      return responseData
    })
    .catch(err => { throw err })
}

function  getAllNewsAgregrator({state, commit}, payload) {
  commit('setNewsAgregator', [])
  return this._vm.$httpWithToken().get(`${state.pathNews}/aggregator/${payload}/preview`,{
  })
    .then(response => {
      const responseData = response.data.data
      commit('setNewsAgregator', responseData)
      return responseData
    })
    .catch(error => {
      commit('setNewsAgregator', [])
      throw error
    })
}

function  publishNewsAgregator({state}, payload) {
  return this._vm.$httpWithToken().post(`${state.pathNews}/aggregator/publish`, payload)
    .then(response => {
      return response
    })
    .catch(err => {throw err})
}

function  publishAllNewsAgregator({state}, payload) {
  return this._vm.$httpWithToken().post(`${state.pathNews}/aggregator/publishall`, payload)
    .then(response => {return response})
    .catch(err => { throw err })
}

export { 
  getListAgregratorSite, 
  getAllNewsAgregrator, 
  publishNewsAgregator,
  publishAllNewsAgregator
}