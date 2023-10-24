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
  },
  updateStatusReferralCode ({state, dispatch}, payload) {
    const data = {
      url : `${state.pathReferralCode}/${payload.referralCode}`,
      params : {
        status : payload.status
      }
    }
    return dispatch('patchWithToken', data , { root : true})
      .then(response => {
        console.log(response)
        const responseData = response.data.data
        return responseData
      })
      .catch(err => { throw err })
  }
}