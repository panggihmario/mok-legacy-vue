export default {
  namespaced: true,
  state: {
    pathProducts: "admin/products",
    detail : false,
    detailProduct : {},
    products : [],
    bannedProducts : []
  },
  mutations : {
    setDetailView(state, payload) {
      state.detail = payload
    },
    setDetailProduct(state, payload) {
      state.detailProduct = payload
    },
    setProducts(state, payload) {
      state.products = payload
    },
    setBannedProducts(state, payload) {
      state.bannedProducts = payload
    }
  },
  actions: {
    banProduct({state}, payload) {
      return this._vm.$httpWithToken().post(`${state.pathProducts}/banned`, payload)
        .then(response => {
          return response
        })
        .catch(err => { throw err })
    },
    getListProduct ({state, commit}, payload) {
      return this._vm.$httpWithToken().get(state.pathProducts,{
        params : {
          ...payload
        }
      })
      .then(response => {
        const dataProduct = response.data.data.content
        commit('setProducts', dataProduct)
        return response
      })
      .catch(err => { throw err })
    },
    getListProductBanned({state, commit}) {
      return this._vm.$httpWithToken().get(`${state.pathProducts}/banned`)
        .then(response => {
          const responseData = response.data.data.content
          commit('setBannedProducts', responseData)
          return response
        })
        .catch(err => { throw err })
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
