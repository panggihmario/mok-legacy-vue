export default {
  namespaced: true,
  state: {
    pathProducts: "admin/products",
  },
  actions: {
    async getListProduct({ state }, payload) {
      let response;
      try {
        response = await this._vm.$httpWithToken().get(state.pathProducts);
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
