export default {
  postReferralCode ({dispatch, state}, payload) {
    const params = {
      url : `${state.pathReferralCode}`,
      data : {
        ...payload
      }
    }
    return dispatch('postWithToken', params , { root : true })
      .then(response => { return response })
      .catch(err => { throw err })
  },
  searchReferralCode ({state, dispatch}, payload) {
    console.log('search', payload)
    const data = {
      url : `${state.pathReferralCode}`,
      params : {
        ...payload
      }
    }
    return dispatch('getWithToken', data , { root : true})
      .then(response => {
        const responseData = response.data.data
        return responseData
      })
      .catch(err => { throw err })
  }
}