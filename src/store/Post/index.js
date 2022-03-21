export default {
  namespaced: true,
  state: {
    pathPost: "feeds/post",
    pathFeed : 'admin/social',
    feeds : [],
    channelCode : null,
    totalPages : 0,
    totalElements : 0,
    keywordSearch : '',
    paramsUsers : [],
    paramsChannel : [],
    paramsDate : [],
    displayDate : ''
  },
  mutations : {
    setParamsUsers (state, payload) {
      state.paramsUsers = payload
    },
    setDisplayDate (state, payload) {
      state.displayDate = payload
    },
    setParamsChannel (state, payload) {
      state.paramsChannel = payload
    },
    setParamsDate (state, payload) {
      state.paramsDate = payload
    },
    setKeyWord (state, payload) {
      state.keywordSearch = payload
    },
    setFeeds(state, payload) {
      state.feeds = payload
    },
    setChannelCode (state, payload) {
      state.channelCode = payload
    },
    setTotalPages (state, payload) {
      state.totalPages = payload
    },
    setTotalElements (state, payload) {
      state.totalElements = payload
    },
    setEpochFeed(state, params) {
      state.feeds[params.index].scheduledTime = params.time
    }
  },
  actions: {
    fetchFeedById ({state, dispatch}, payload) {
      const data = {
        url : `${state.pathFeed}/${payload}`
      }
      return dispatch('getWithToken', data,  {root : true} )
        .then(response => {
          const responseData = response.data.data
          return responseData
        })
        .catch(err =>  { throw err })
    },
    fetchFeeds ({state, dispatch, commit}, payload) {
      const data = {
        url : `${state.pathFeed}`,
        params : {
          ...payload
        }
      }
      return dispatch('getWithToken', data , {root : true})
        .then(response => {
          const responseData = response.data.data
          const content = responseData.content
          const totalPages = responseData.totalPages
          const totalData = responseData.totalElements
          const contentWithIndex = content.map((c, idx) => {
            return {
              ...c,
              index : idx
            }
          })
          commit('setFeeds', contentWithIndex)
          commit('setTotalPages', totalPages)
          commit('setTotalElements', totalData)
          return responseData
        })
        .catch (err => { throw err })
    },
    postFeed({ state , dispatch }, payload) {
      const params = {
        url : `${state.pathFeed}`,
        data : {
          ...payload
        }
      }
      return dispatch('postWithToken', params, {root : true} )
        .then(response => { return response })
        .catch(err => { throw err })
    },
    updatePostFeed ({state, dispatch}, payload) {
      const params = {
        url : `${state.pathFeed}/${payload.id}/publisher/${payload.type}`,
        data : {
          ...payload.params
        }
      }
      return dispatch('putWithToken', params, { root : true })
        .then(response => { return response })
        .catch(err => { throw err })
      
    },
    deleteFeed ({state, dispatch}, payload) {
      const params = {
        url : `${state.pathFeed}/${payload}`
      }
      return dispatch('deleteWithToken', params , { root : true })
        .then(response => { return response })
        .catch(err => {throw err})
    },
    searchFeed({state, dispatch, commit}, payload) {
      const data = {
        url : `${state.pathFeed}/search`,
        params : {
          ...payload
        }
      }
      return dispatch('getWithToken', data , {root : true})
      .then(response => {
        const responseData = response.data.data
        const content = responseData.content
        const totalPages = responseData.totalPages
        const contentWithIndex = content.map((c, idx) => {
          return {
            ...c,
            index : idx
          }
        })
        commit('setFeeds', contentWithIndex)
        commit('setTotalPages', totalPages)
        return responseData
      })
      .catch (err => { throw err })
    },
    filterFeed({state, dispatch, commit}, payload) {
      const data = {
        url : `${state.pathFeed}/filter`,
        params : {
          ...payload,
          size : 10
        }
      }
      return dispatch('getWithToken', data , {root : true})
        .then(response => {
          const responseData = response.data.data
          const content = responseData.content
          const totalPages = responseData.totalPages
          const contentWithIndex = content.map((c, idx) => {
            return {
              ...c,
              index : idx
            }
          })
          commit('setFeeds', contentWithIndex)
          commit('setTotalPages', totalPages)
        })
    },
    fetchListAccounts ({state, dispatch}, payload) {
      const data = {
        url : `${state.pathFeed}/accounts`,
        params : {
          ...payload,
          sort : 'createAt',
          direction : 'ASC',
          size : 10
        }
      }
      return dispatch('getWithToken', data , {root : true})
        .then(response => {
          const responseData = response.data.data
          return responseData
        })
    },
    searchAccounts ({state, dispatch}, payload) {
      const data = {
        url : `${state.pathFeed}/account/username`,
        params : {
          sort : 'createAt',
          direction : 'ASC',
          ...payload
        }
      }
      return dispatch('getWithToken', data, {root : true})
        .then(response => {
          const responseData = response.data.data
          return responseData
        })
        .catch(err =>  {throw err})
    }
  },
};
