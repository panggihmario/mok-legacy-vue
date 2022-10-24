export default {
  namespaced: true,
  state: {
    pathManage: "admin",
    filterCountry: {
      label: "Indonesia",
      value: "indonesia",
      feedChannelCode: "tiktok",
    },
  },
  mutations: {
    setFilterCountry(state, payload) {
      state.filterCountry = payload;
    },
  },
  getters: {
    filterCountry: (state) => {
      return state.filterCountry;
    },
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
    getLogsHashtagFormation({ state }, payload) {
      return this._vm
        .$httpWithToken()
        .get(`${state.pathManage}/hashtag-formations/${payload.id}/logs`, {
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
