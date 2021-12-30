export default {
  namespaced: true,
  state: {
    pathPost: "feeds/post",
    pathFeed : 'admin/social',
    feeds : [],
    channelCode : null,
    totalPages : 0,
    keywordSearch : '',
    page : 1
  },
  mutations : {
    setPage (state, payload) {
      state.page = payload
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
      // commit('setFeeds', [])
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
    }
    // async getListFeed({ state, dispatch }, payload) {
    //   let response;
    //   const data = {
    //     url : `member/${state.pathPost}/profile?page=${payload.page}`
    //   }
    //   return dispatch('getWithToken', data, {root : true})
    //     .then(response => {
    //       return response
    //     })
    //     .catch(err => {
    //       throw err
    //     })
      
    // },
    // async postProduct({ state }, payload) {
    //   let response;
    //   try {
    //     response = await this._vm
    //       .$httpWithToken()
    //       .post(`${state.pathPost}/product`, payload);
    //     return response;
    //   } catch (error) {
    //     return error;
    //   }
    // },
    // async deletePost({ state }, payload) {
    //   let response;
    //   try {
    //     response = await this._vm
    //       .$httpWithToken()
    //       .delete(`/feeds/${payload}`);
    //     return response;
    //   } catch (error) {
    //     return error;
    //   }
    // },
  },
};
