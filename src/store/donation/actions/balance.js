export default {
  fetchBalanceHistory({dispatch}, payload) {
    const data = {
      url : `balance/donations/${payload.id}/history`,
      params : {
        ...payload.params
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