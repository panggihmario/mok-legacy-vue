const updateStatusData = function ({state, commit}, payload) {
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


// const addMasterBank = function ({state, commit}, payload) {
//   console.log(payload)
//   state.params = {
//     name : 'a'
//   }
// }

export {
  updateStatusData,
  // addMasterBank
}