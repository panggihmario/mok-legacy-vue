export default {
  namespaced: true,
  state: {
    pathMaster: "admin",
  },
  actions: {
    getListCategory({ state }) {
      return this._vm
        .$httpWithToken()
        .get(`${state.pathMaster}/product-categories`)
        .then((response) => {
          return response.data;
        })
        .catch((err) => {
          throw err;
        });
    },
    reorderCategory({state}, payload) {
      console.log({payload})
      return this._vm
        .$httpWithToken()
        .post(`${state.pathMaster}/product-categories/reordered`, payload)
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
        .post(`${state.pathMaster}/product-categories`, {
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
        .put(`${state.pathMaster}/product-categories/${payload.id}`, {
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
