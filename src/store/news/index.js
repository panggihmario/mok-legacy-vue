export default {
  namespaced: true,
  state: {
    pathNews: "admin/news",
    previewNewsAgregator : {},
    statusLoading : false,
    newsAgregrator : [],
    category : {},
    selectedMappingCategory : "",
    selectedToPublish : []
  },
  mutations : {
    setSelectedToPublish(state, payload) {
      state.selectedToPublish = payload
    },
    setPreviewNewsAgregrator (state, payload) {
      state.previewNewsAgregator = payload
      state.category = payload.postNewsDto.newsCategory
      console.log(payload)
    },
    setCategory (state, payload) {
      state.category = payload
    },
    setStatusLoading(state, payload) {
      state.statusLoading = payload
    },
    selectedMappingCategory(state, payload) {
      state.selectedMappingCategory = payload
    },
    setNewsAgregator(state, payload) {
      state.newsAgregrator = payload
    }
  },
  actions: {
    createCategoryNews({ state }, payload) {
      return this._vm
        .$httpWithToken()
        .post(`${state.pathNews}/category`, payload);
    },
    getCategoryNews({ state }) {
      const response = this._vm
        .$httpWithToken()
        .get(`${state.pathNews}/category`);
      return response;
    },
    getCategoryNewsById({ state }, payload) {
      return this._vm
        .$httpWithToken()
        .get(`${state.pathNews}/category/${payload}`);
    },
    editCategoryNews({ state }, payload) {
      return this._vm
        .$httpWithToken()
        .put(`${state.pathNews}/category`, payload);
    },
    editSequence({ state }, payload) {
      return this._vm
        .$httpWithToken()
        .put(`${state.pathNews}/category/sequence`, payload);
    },
    deleteCategoryNews({ state }, payload) {
      return this._vm
        .$httpWithToken()
        .delete(`${state.pathNews}/category/${payload}`);
    },
    async getListNews({ state }, payload) {
      let response;
      try {
        response = await this._vm.$httpWithToken().get(state.pathNews, {
          params: {
            tab: payload.tab,
            page: payload.page,
          },
        });
        return response;
      } catch (error) {
        throw error;
      }
    },
    async createNews({ state }, payload) {
      let response;
      try {
        response = await this._vm
          .$httpWithToken()
          .post(`${state.pathNews}/${payload.type}`, payload.params);
        return response;
      } catch (error) {
        return error;
      }
    },
    async createDraft({ state }, payload) {
      let response;
      try {
        response = await this._vm
          .$httpWithToken()
          .post(`${state.pathNews}/draft`, payload);
        return response;
      } catch (error) {
        return error;
      }
    },
    async getNewsById({ state }, payload) {
      let response;
      try {
        response = await this._vm
          .$httpWithToken()
          .get(`${state.pathNews}/${payload}`);
        return response;
      } catch (error) {
        return error;
      }
    },
    async editDraft({ state }, payload) {
      let response;
      try {
        response = await this._vm
          .$httpWithToken()
          .put(`${state.pathNews}/${payload.id}`, payload.data);
        return response;
      } catch (error) {
        return error;
      }
    },
    async updateNews({ state }, payload) {
      let response;
      try {
        response = await this._vm
          .$httpWithToken()
          .put(
            `${state.pathNews}/${payload.id}/editor/${payload.type}`,
            payload.params
          );
        return response;
      } catch (error) {
        return error;
      }
    },
    async deleteDraft({ state }, payload) {
      let response;
      try {
        response = await this._vm
          .$httpWithToken()
          .delete(`${state.pathNews}/${payload}`);
        return response;
      } catch (error) {
        return error;
      }
    },
    async publishNews({ state }, payload) {
      let response;
      try {
        response = await this._vm
          .$httpWithToken()
          .put(
            `${state.pathNews}/${payload.id}/publisher/publish`,
            payload.data
          );
        return response;
      } catch (error) {
        return error;
      }
    },
    async scheduleNews({ state }, payload) {
      let response;
      try {
        response = await this._vm
          .$httpWithToken()
          .put(
            `${state.pathNews}/${payload.id}/publisher/scheduled`,
            payload.data
          );
        return response;
      } catch (error) {
        return error;
      }
    },
    async rejectNews({ state }, payload) {
      let response;
      try {
        response = await this._vm
          .$httpWithToken()
          .put(
            `${state.pathNews}/${payload.id}/publisher/reject`,
            payload.data
          );
        return response;
      } catch (error) {
        return error;
      }
    },
    async searchNews({ state }, payload) {
      let response;
      try {
        response = await this._vm
          .$httpWithToken()
          .get(`${state.pathNews}/search`, {
            params: {
              ...payload,
            },
          });
        return response;
      } catch (error) {
        return error;
      }
    },
    async pushNotificationById({ state }, payload) {
      let response;
      try {
        response = await this._vm
          .$httpWithToken()
          .get(`${state.pathNews}/notification/push-notif/${payload}`);
        return response;
      } catch (error) {
        return error;
      }
    },
    async getCategoryAgregrator({state}) {
      let response;
      try {
        response = await this._vm.$httpWithToken().get(`${state.pathNews}/aggregator/WEBHOSE/category`)
        const responseData = response.data.data
        return responseData
      }
      catch(error) {
        throw error
      } 
    },
    mappingCategory ({state}, payload) {
      return this._vm.$httpWithToken().post(`${state.pathNews}/aggregator/mappingcategory`, payload)
        .then(response => {
          return response
        })
        .catch(err => {
          throw err
        })
    },
    getAllNewsAgregrator({state, commit}, payload) {
      return this._vm.$httpWithToken().get(`${state.pathNews}/aggregator/WEBHOSE/preview`,{
        params : {
          ...payload
        }
      })
        .then(response => {
          const responseData = response.data.data
          commit('setNewsAgregator', responseData)
          return responseData
        })
        .catch(error => {
          throw error
        })
    },
    getNewsAgregatorByCategory({state, commit}, payload) {
      return this._vm.$httpWithToken().get(`${state.pathNews}/aggregator/WEBHOSE/preview/${payload.category}`,{
        params : {
          ...payload.keyword
        }
      })
        .then(response => {
          const responseData = response.data.data
          commit('setNewsAgregator', responseData)
          return responseData
        })
        .catch(err => {
          throw err
        })
    },
    publishNewsAgregator({state, commit}, payload) {
      return this._vm.$httpWithToken().post(`${state.pathNews}/aggregator/publish`, payload)
        .then(response => {
          return response
        })
        .catch(err => {throw err})
    },
    publishAllNewsAgregator({state}, payload) {
      return this._vm.$httpWithToken().post(`${state.pathNews}/aggregator/publishall`, payload)
        .then(response => {return response})
        .catch(err => { throw err })
    },
    getMappingCategory({state}) {
      return this._vm.$httpWithToken().get(`${state.pathNews}/aggregator/WEBHOSE/mappingcategory`)
        .then(response=> {
          const responseData = response.data.data
          return responseData
        })
        .catch(error => {
          return error
        })
    },
    saveNewsSiteAggregator({state},payload) {
      return this._vm.$httpWithToken().post(`${state.pathNews}/aggregator/sites`, payload)
      .then(response => {
        return response
      })
      .catch(err => {
        throw err
      })
    },
    getNewSiteAgregator({state}) {
      return this._vm.$httpWithToken().get(`${state.pathNews}/aggregator/WEBHOSE/sites`)
        .then(response => {
          const responseData = response.data
          return responseData
        })
        .catch(err => {throw err})
    }
  },
};
