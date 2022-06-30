export default {
  namespaced: true,
  state: {
    pathMaster: "admin",
  },
  actions: {
    getListCategory({ state }, payload) {
      return this._vm
        .$httpWithToken()
        .get(`${state.pathMaster}/category-hashtags`, {
          params: payload.params,
        })
        .then((response) => {
          return response.data;
        })
        .catch((err) => {
          throw err;
        });
    },
    getListSubCategory({ state }, payload) {
      return this._vm
        .$httpWithToken()
        .get(`${state.pathMaster}/category-hashtags/${payload.id}/subs`, {
          params: payload.params,
        })
        .then((response) => {
          return response.data;
        })
        .catch((err) => {
          throw err;
        });
    },
    searchListCategory({ state }, payload) {
      return this._vm
        .$httpWithToken()
        .get(
          `${state.pathMaster}/category-hashtags/search?value=${payload.search}`
        )
        .then((response) => {
          return response.data;
        })
        .catch((err) => {
          throw err;
        });
    },
    searchListSubCategory({ state }, payload) {
      return this._vm
        .$httpWithToken()
        .get(
          `${state.pathMaster}/category-hashtags/${payload.id}/subs/search?value=${payload.search}`
        )
        .then((response) => {
          return response.data;
        })
        .catch((err) => {
          throw err;
        });
    },
    addMasterCategory({ state }, payload) {
      return this._vm
        .$httpWithToken()
        .post(`${state.pathMaster}/category-hashtags`, {
          ...payload,
        })
        .then((response) => {
          return response.data;
        })
        .catch((err) => {
          throw err;
        });
    },
    addSubCategory({ state }, payload) {
      return this._vm
        .$httpWithToken()
        .post(`${state.pathMaster}/category-hashtags/subs`, {
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
