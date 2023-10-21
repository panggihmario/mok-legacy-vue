export default {
  namespaced: true,
  state: {
    pathPost: "feeds/post",
    pathFeedSocial: "admin/social",
    pathFeed: "feeds",
    pathTrendingFeeds: "admin/trending-feeds",
    feeds: [],
    channelCode: null,
    totalPages: 0,
    totalElements: 0,
    keywordSearch: "",
    paramsUsers: [],
    paramsChannel: [],
    paramsDate: [],
    paramsProcess: [],
    displayDate: "",
    displayProcessDate: "",
    keywordSearchTrending: "",
    paramsUsersTrending: [],
    paramsChannelTrending: [],
    channelCodeTrending: null,
    paramsDateTrending: [],
    displayDateTrending: "",
    isStatusProcess: "all",
    statusLabel: "Status Proses",
  },
  mutations: {
    setStatusLabel(state, payload) {
      state.statusLabel = payload;
    },
    setIsStatusProcess(state, payload) {
      state.isStatusProcess = payload;
    },
    setKeywordSearchTrending(state, payload) {
      state.keywordSearchTrending = payload;
    },
    setParamsUsersTrending(state, payload) {
      state.paramsUsersTrending = payload;
    },
    setDisplayDateTrending(state, payload) {
      state.displayDateTrending = payload;
    },
    setParamsChannelTrending(state, payload) {
      state.paramsChannelTrending = payload;
    },
    setChannelCodeTrending(state, payload) {
      state.channelCodeTrending = payload;
    },
    setParamsDateTrending(state, payload) {
      state.paramsDateTrending = payload;
    },
    setParamsUsers(state, payload) {
      state.paramsUsers = payload;
    },
    setDisplayDate(state, payload) {
      state.displayDate = payload;
    },
    setDisplayProcessDate(state, payload) {
      state.displayProcessDate = payload;
    },
    setParamsChannel(state, payload) {
      state.paramsChannel = payload;
    },
    setParamsDate(state, payload) {
      state.paramsDate = payload;
    },
    setProcessDate(state, payload) {
      state.paramsProcess = payload;
    },
    setKeyWord(state, payload) {
      state.keywordSearch = payload;
    },
    setFeeds(state, payload) {
      state.feeds = payload;
    },
    setChannelCode(state, payload) {
      state.channelCode = payload;
    },
    setTotalPages(state, payload) {
      state.totalPages = payload;
    },
    setTotalElements(state, payload) {
      state.totalElements = payload;
    },
    setEpochFeed(state, params) {
      state.feeds[params.index].scheduledTime = params.time;
    },
  },
  actions: {
    fetchVodUrl ({state, dispatch}, payload) {
      const data = {
        url : `${state.pathFeedSocial}/vod/info/${payload}`,
      }
      return dispatch("getWithToken", data, { root: true })
        .then((response) => {
          const responseData = response.data.data;
          return responseData;
        })
        .catch((err) => {
          throw err;
        });
    },
    fetchFeedById({ state, dispatch }, payload) {
      const data = {
        url: `${state.pathFeedSocial}/${payload}`,
      };
      return dispatch("getWithToken", data, { root: true })
        .then((response) => {
          const responseData = response.data.data;
          return responseData;
        })
        .catch((err) => {
          throw err;
        });
    },
    fetchFeeds({ state, dispatch, commit }, payload) {
      const data = {
        url: `${state.pathFeedSocial}`,
        params: {
          ...payload,
        },
      };
      return dispatch("getWithToken", data, { root: true })
        .then((response) => {
          const responseData = response.data.data;
          const content = responseData.content;
          const totalPages = responseData.totalPages;
          const totalData = responseData.totalElements;
          const contentWithIndex = content.map((c, idx) => {
            return {
              ...c,
              index: idx,
            };
          });
          commit("setFeeds", contentWithIndex);
          commit("setTotalPages", totalPages);
          commit("setTotalElements", totalData);
          return responseData;
        })
        .catch((err) => {
          commit("setFeeds", []);
          commit("setTotalPages", 0);
          commit("setTotalElements", 0);
          throw err;
        });
    },
    postFeed({ state, dispatch }, payload) {
      const params = {
        url: `${state.pathFeedSocial}`,
        data: {
          ...payload,
        },
      };
      return dispatch("postWithToken", params, { root: true })
        .then((response) => {
          return response;
        })
        .catch((err) => {
          throw err;
        });
    },
    updatePostFeed({ state, dispatch }, payload) {
      const params = {
        url: `${state.pathFeedSocial}/${payload.id}/publisher/${payload.type}`,
        data: {
          ...payload.params,
        },
      };
      return dispatch("putWithToken", params, { root: true })
        .then((response) => {
          return response;
        })
        .catch((err) => {
          throw err;
        });
    },
    deleteFeed({ state, dispatch }, payload) {
      const params = {
        url: `${state.pathFeedSocial}/${payload}`,
      };
      return dispatch("deleteWithToken", params, { root: true })
        .then((response) => {
          return response;
        })
        .catch((err) => {
          throw err;
        });
    },
    multipleDelete ({state, dispatch}, payload) {
      const params = {
        url : `${state.pathFeedSocial}/multiple-delete`,
        data : payload
      }
      return dispatch("postWithToken", params, { root: true })
        .then((response) => {
          return response;
        })
        .catch((err) => {
          throw err;
        });
    },
    multipleReject ({state, dispatch}, payload) {
      const params = {
        url : `${state.pathFeedSocial}/multiple-reject`,
        data : payload
      }
      return dispatch("postWithToken", params, { root: true })
        .then((response) => {
          return response;
        })
        .catch((err) => {
          throw err;
        })
    },
    searchFeed({ state, dispatch, commit }, payload) {
      const data = {
        url: `${state.pathFeedSocial}/search`,
        params: {
          ...payload,
        },
      };
      return dispatch("getWithToken", data, { root: true })
        .then((response) => {
          const responseData = response.data.data;
          const content = responseData.content;
          const totalPages = responseData.totalPages;
          const contentWithIndex = content.map((c, idx) => {
            return {
              ...c,
              index: idx,
            };
          });
          commit("setFeeds", contentWithIndex);
          commit("setTotalPages", totalPages);
          return responseData;
        })
        .catch((err) => {
          throw err;
        });
    },
    filterFeed({ state, dispatch, commit }, payload) {
      const data = {
        url: `${state.pathFeedSocial}/filter`,
        params: {
          ...payload,
          size: 10,
        },
      };
      return dispatch("getWithToken", data, { root: true }).then((response) => {
        const responseData = response.data.data;
        const content = responseData.content;
        const totalElements = responseData.totalElements;
        const totalPages = responseData.totalPages;
        const contentWithIndex = content.map((c, idx) => {
          return {
            ...c,
            index: idx,
          };
        });
        commit("setFeeds", contentWithIndex);
        commit("setTotalPages", totalPages);
        commit("setTotalElements", totalElements);
      });
    },
    fetchListAccounts({ state, dispatch }, payload) {
      const data = {
        url: `${state.pathFeedSocial}/accounts`,
        params: {
          ...payload,
          sort: "createAt",
          direction: "ASC",
          size: 10,
        },
      };
      return dispatch("getWithToken", data, { root: true }).then((response) => {
        const responseData = response.data.data;
        return responseData;
      });
    },
    searchAccounts({ state, dispatch }, payload) {
      const data = {
        url: `${state.pathFeedSocial}/account/username`,
        params: {
          sort: "createAt",
          direction: "ASC",
          ...payload,
        },
      };
      return dispatch("getWithToken", data, { root: true })
        .then((response) => {
          const responseData = response.data.data;
          return responseData;
        })
        .catch((err) => {
          throw err;
        });
    },
    fetchPostAllUser({ state, dispatch, commit }, payload) {
      const data = {
        url: `${state.pathTrendingFeeds}/candidates`,
        params: payload,
      };
      return dispatch("getWithToken", data, { root: true })
        .then((response) => {
          return response;
        })
        .catch((err) => {
          throw err;
        });
    },
    fetchPostAllUserFilter({ state, dispatch, commit }, payload) {
      const data = {
        url: `${state.pathTrendingFeeds}/candidates/filter`,
        params: payload,
      };
      return dispatch("getWithToken", data, { root: true })
        .then((response) => {
          return response;
        })
        .catch((err) => {
          throw err;
        });
    },
    fetchPostAllUserDetailById({ state, dispatch, commit }, payload) {
      const data = {
        url: `${state.pathTrendingFeeds}/candidates/${payload.id}`,
      };
      return dispatch("getWithToken", data, { root: true })
        .then((response) => {
          return response;
        })
        .catch((err) => {
          throw err;
        });
    },
    fetchPostAllUserTrending({ state, dispatch, commit }, payload) {
      const data = {
        url: `${state.pathTrendingFeeds}/actives`,
        params: payload,
      };
      return dispatch("getWithToken", data, { root: true })
        .then((response) => {
          return response;
        })
        .catch((err) => {
          throw err;
        });
    },
    fetchPostAllUserTrendingFilter({ state, dispatch, commit }, payload) {
      const data = {
        url: `${state.pathTrendingFeeds}/actives/filter`,
        params: payload,
      };
      return dispatch("getWithToken", data, { root: true })
        .then((response) => {
          return response;
        })
        .catch((err) => {
          throw err;
        });
    },
    fetchPostAllUserTrendingDetailById({ state, dispatch, commit }, payload) {
      const data = {
        url: `${state.pathTrendingFeeds}/actives/${payload.id}`,
      };
      return dispatch("getWithToken", data, { root: true })
        .then((response) => {
          return response;
        })
        .catch((err) => {
          throw err;
        });
    },
    fetchHistoryNotification({ state, dispatch, commit }, payload) {
      const data = {
        url: `${state.pathTrendingFeeds}/push-notif/history`,
        params: payload,
      };
      return dispatch("getWithToken", data, { root: true })
        .then((response) => {
          return response;
        })
        .catch((err) => {
          throw err;
        });
    },
    fetchPostAllUserNotificationDetailById({ state, dispatch, commit }, payload) {
      const data = {
        url: `${state.pathFeed}/${payload}`,
      };
      return dispatch("getWithToken", data, { root: true })
        .then((response) => {
          return response;
        })
        .catch((err) => {
          throw err;
        });
    },
    postFeedAsTrendingById({ state, dispatch, commit }, payload) {
      const data = {
        url: `${state.pathTrendingFeeds}/actives`,
        data: {
          ...payload
        },
      };
      return dispatch("postWithToken", data, { root: true })
        .then((response) => {
          return response;
        })
        .catch((err) => {
          throw err;
        });
    },
    postPushNotifTrendingById({ state, dispatch, commit }, payload) {
      const data = {
        url: `${state.pathTrendingFeeds}/push-notif/${payload.id}`,
      };
      return dispatch("postWithToken", data, { root: true })
        .then((response) => {
          return response;
        })
        .catch((err) => {
          throw err;
        });
    },
    postPriority({dispatch}, payload) {
      const data = {
        url : `admin/trending-feeds/actives/priority/${payload}`
      }
      return dispatch("putWithToken", data, {root : true})
        .then(response => {return response})
        .catch(err => { throw err })
    }
  },
};
