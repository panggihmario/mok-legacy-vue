const updateStatusData = function ({state, commit, dispatch}, payload) {
  const tempData = state.data
  const tempEnablePayments = tempData.enablePayments
  const updatedTempEnablePayments = tempEnablePayments.map((item, i) => {
    if(payload.index === i) {
      return {
        ...item,
        isActive : payload.value
      }
    }else{
      return {
        ...item,
      }
    }
  })
  const updatedData = {
    ...tempData,
    enablePayments : updatedTempEnablePayments
  }
  commit('setData', updatedData)
}

const getMasterBank = function ({state, dispatch, commit} ) {
  const params = {
    url : state.pathMasterBank
  }
  return dispatch('getWithToken', params , {root: true})
    .then(response => {
      const responseData = response.data.data
      const expireCustomData = responseData.customExpire
      commit('setData', responseData)
      commit('setTempExpireCustomData', expireCustomData )
    })
}

const  addMasterBank = function ({state, dispatch}, payload) {
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
}



export {
  updateStatusData,
  getMasterBank,
  addMasterBank
}