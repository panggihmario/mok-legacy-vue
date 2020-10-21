export default {
	namespaced: true,
	state: {
		pathNews: 'admin/news'
	},
	actions: {
		createCategoryNews({state}, payload) {
			return this._vm.$httpWithToken().post(`${state.pathNews}/category`, payload)
		},
		getCategoryNews ({state}) {
			const	response = this._vm.$httpWithToken().get(`${state.pathNews}/category`)
			return response
		},
		getCategoryNewsById({state}, payload) {
			return this._vm.$httpWithToken().get(`${state.pathNews}/category/${payload}`)
		},
		editCategoryNews({state}, payload) {
			return this._vm.$httpWithToken().put(`${state.pathNews}/category`, payload)
		},
		deleteCategoryNews({state}, payload) {
			return this._vm.$httpWithToken().delete(`${state.pathNews}/category/${payload}`)
		},
		async getListNews({ state }, payload) {
			let response;
			try {
				response = await this._vm.$httpWithToken().get(state.pathNews, {
					params: {
						tab: payload.tab,
						page: payload.page
					}
				})
				return response
			} catch (error) {
				return error
			}
		},
		async createNews({ state }, payload) {
			let response;
			try {
				response = await this._vm.$httpWithToken().post(`${state.pathNews}/${payload.type}`, payload.params)
				return response
			} catch (error) {
				return error
			}
		},
		async createDraft({ state }, payload) {
			let response;
			try {
				response = await this._vm.$httpWithToken().post(`${state.pathNews}/draft`, payload)
				return response
			} catch (error) {
				return error
			}
		},
		async getNewsById({ state }, payload) {
			let response;
			try {
				response = await this._vm.$httpWithToken().get(`${state.pathNews}/${payload}`)
				return response
			} catch (error) {
				return error
			}
		},
		async editDraft({state}, payload) {
			let response;
			try {
				response = await this._vm.$httpWithToken().put(`${state.pathNews}/${payload.id}`, payload.data)
				return response
			} catch (error) {
				return error
			}
		},
		async updateNews({state}, payload) {
			let response;
			try {
				response = await this._vm.$httpWithToken().put(`${state.pathNews}/${payload.id}/editor/${payload.type}`, payload.params)
				return response
			} catch (error) {
				return error
			}
		},
		async deleteDraft({state}, payload) {
			let response;
			try {
				response = await this._vm.$httpWithToken().delete(`${state.pathNews}/${payload}`)
				return response
			} catch (error) {
				return error
			}
		},
		async publishNews({state}, payload){
			let response;
			try {
				response = await this._vm.$httpWithToken().put(`${state.pathNews}/${payload.id}/publisher/publish`, payload.data)
				return response
			} catch (error) {
				return error
			}
		},
		async scheduleNews({state}, payload) {
			let response;
			try {
				response = await this._vm.$httpWithToken().put(`${state.pathNews}/${payload.id}/publisher/scheduled`, payload.data)
				return response
			} catch (error) {
				return error
			}
		},
		async rejectNews({state}, payload){
			let response;
			try {
				response = await this._vm.$httpWithToken().put(`${state.pathNews}/${payload.id}/publisher/reject`, payload.data)
				return response
			} catch (error) {
				return error
			}
		},
		async searchNews ({state}, payload) {
			let response;
			try {
				response = await this._vm.$httpWithToken().get(`${state.pathNews}/search`, {params :{
					...payload }
				})
				return response
			} catch (error) {
				return error
			}
			
		}
	}
}