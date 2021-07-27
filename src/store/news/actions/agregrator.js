function getListAgregratorSite({state, commit}) {
  const data = {
    url : `admin/news/aggregators`
  }
  return this._vm.$httpWithToken().get(`${state.pathNews}/aggregators`)
    .then(response => {
      const responseData = response.data.data
      commit('setListSites', responseData)
      return responseData
    })
    .catch(err => { throw err })
}

function  getAllNewsAgregrator({state, commit}) {
  commit('setNewsAgregator', [])
  const site = state.site
  return this._vm.$httpWithToken().get(`${state.pathNews}/aggregator/${site}/preview`,{
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

function searchNewsAgregrator({state, commit}, payload) {
  return this._vm.$httpWithToken().get(`${state.pathNews}/aggregator/${payload.params}/preview`, {
    params : {
      ...payload.data,
      site : 'cumicumi.com'
    }
  })
    .then(response => {
      const responseData = response.data.data
      console.log(responseData)
      commit('setNewsAgregator', responseData)
      return responseData
    })
    .catch(err => { throw err })
}

export { 
  getListAgregratorSite, 
  getAllNewsAgregrator, 
  publishNewsAgregator,
  publishAllNewsAgregator,
  searchNewsAgregrator
}