export default {
  namespaced: true,
  state: {
    pathProducts: "admin/products",
    detail : false
  },
  mutations : {
    setDetailView(state, payload) {
      state.detail = payload
    }
  },
  actions: {
    async getListProduct({ state }, payload) {
      let response;
      try {
        response = await this._vm.$httpWithToken().get(state.pathProducts,{
          params : {
            ...payload
          }
        });
        return response;
      } catch (error) {
        return error;
      }
    },
    async getProductById({ state }, payload) {
      let response;
      try {
        response = await this._vm
          .$httpWithToken()
          .get(`${state.pathProducts}/${payload}`);
        return response;
      } catch (error) {
        return error;
      }
    },
  },
};
