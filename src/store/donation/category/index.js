export default {
  namespaced: true,
  state: {
    pathMaster: "admin",
    pathDonation: "donation-categories",
  },
  actions: {
    getListCategory({ state }, payload) {
      return this._vm
        .$httpWithToken()
        .get(
          `${state.pathMaster}/${state.pathDonation}?page=${payload.page}&size=${payload.size}`
        )
        .then((response) => {
          return response.data;
        })
        .catch((err) => {
          throw err;
        });
    },
    createCategory({ state }, payload) {
      return this._vm
        .$httpWithToken()
        .post(`${state.pathMaster}/${state.pathDonation}`, {
          ...payload,
        })
        .then((response) => {
          return response.data;
        })
        .catch((err) => {
          throw err;
        });
    },
    editCategory({ state }, payload) {
      return this._vm
        .$httpWithToken()
        .put(`${state.pathMaster}/${state.pathDonation}/${payload.id}`, {
          ...payload.params,
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
