function fetchFeedByUserId ({state, dispatch}, payload) {
  const data = {
    url : `${state.pathFeed}/${payload.id}`,
    params : {
      ...payload.params,
    }
  }
  return dispatch('getWithToken', data , {root : true})
    .then(response => dispatch('printSuccess', response))
    .catch(err => {
      throw err
    })
}

function deleteFeed ({dispatch}, payload) {
  const data = {
    url : `feeds/${payload}`
  }
  return dispatch('deleteWithToken', data, {root : true})
    .then(response => dispatch('printSuccess', response))
    .catch(err => { throw err })

}

const getUsersbyRole = function ({state, dispatch}, payload) {
  const data = {
    url : `${state.pathAccount}/users-roles`,
    params : {
      ...payload
    }
  }
  return dispatch('getWithToken', data , {root : true})
    .then(response => dispatch('printSuccess', response))
    .catch(err => { throw err })
}

export {
  fetchFeedByUserId,
  deleteFeed,
  getUsersbyRole
}