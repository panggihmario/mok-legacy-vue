export default { 
  namespaced : true,
  state : {
    pathAds : 'admin/news/banner',
  },
  actions: {
    async getNewsBanner ( {state}, payload) {
      let response;
      try {
        response = await this._vm.$httpWithToken().get(state.pathAds, {
          params : {...payload}
        })
        return response
      } catch (error) {
        return error
      }
    },
    async addBannerAds ({state}, payload) {
      let response;
      try{
        response = await this._vm.$httpWithToken().post(`${state.pathAds}`, payload)
        return response
      }catch(error) {
        return error
      }
    },
    async addBannerPosition ({state}, payload) {
      let response;
      try {
        response = await this._vm.$httpWithToken().post(`${state.pathAds}/position`, payload)
        return response;
      } catch (error) {
        return error
      }
    },
    async editBannerPosition ({state}, payload) {
      let response;
      try {
        response =  await this._vm.$httpWithToken().put(`${state.pathAds}/position/${payload.id}`, payload.params)
        return response
      } catch (error) {
        return error
      }
    },
    async getBannerPosition ({state}) {
      let response;
      try {
        response = await this._vm.$httpWithToken().get(`${state.pathAds}/position`)
        return response
      } catch (error) {
        return error
      }
    }
  }
}