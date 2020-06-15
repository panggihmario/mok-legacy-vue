export default {
	namespaced: true,
	state: {
		pathNews: 'admin/news'
	},
	actions: {
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
				response = await this._vm.$httpWithToken().post(`${state.pathNews}/submit`, payload)
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
				response = await this._vm.$httpWithToken().put(`${state.pathNews}/${payload.id}/publish`, payload.data)
				return response
			} catch (error) {
				return error
			}
		},
		async rejectNews({state}, payload){
			let response;
			try {
				response = await this._vm.$httpWithToken().put(`${state.pathNews}/${payload.id}/reject`, payload.data)
				return response
			} catch (error) {
				return error
			}
		}
	}
}