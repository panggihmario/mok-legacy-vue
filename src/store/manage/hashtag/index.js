export default {
  namespaced: true,
  state: {
    pathManage: "admin",
  },
  actions: {
    getListHashtagFormation({ state }, payload) {
      return this._vm
        .$httpWithToken()
        .get(`${state.pathManage}/hashtag-formations`, {
          params: payload.params,
        })
        .then((response) => {
          return response.data;
        })
        .catch((err) => {
          throw err;
        });
    },
    getListHashtagFormationSubs({ state }, payload) {
      return this._vm
        .$httpWithToken()
        .get(`${state.pathManage}/hashtag-formations/subs`, {
          params: payload.params,
        })
        .then((response) => {
          return response.data;
        })
        .catch((err) => {
          throw err;
        });
    },
    searchListHashtagFormationSubs({ state }, payload) {
      return this._vm
        .$httpWithToken()
        .get(
          `${state.pathManage}/hashtag-formations/subs/search?value=${payload.search}`
        )
        .then((response) => {
          return response.data;
        })
        .catch((err) => {
          throw err;
        });
    },
    getAvailabilitySubHashtag({ state }, payload) {
      return this._vm
        .$httpWithToken()
        .get(`${state.pathManage}/hashtag-formations/subs/count`, {
          params: payload.params,
        })
        .then((response) => {
          return response.data;
        })
        .catch((err) => {
          throw err;
        });
    },
    createListTrendingHashtag({ state }, payload) {
      return this._vm
        .$httpWithToken()
        .post(`${state.pathManage}/hashtag-formations`, {
          ...payload,
        })
        .then((response) => {
          return response.data;
        })
        .catch((err) => {
          throw err;
        });
    },
  },
};
