export default {
	namespaced : true,
	state : {
		pathAccount : "admin/accounts"
	},
	actions : {
		async getListRespone({state}, payload ){
			let response;
			try {
				response = await this._vm.$httpWithToken().get(`${state.pathAccount}/${payload.type}`, {
					// params : {
					// 	page : payload.page || 0
					// },
					params : {...payload.param}
				})
				return response
			} catch (error) {
				return error
			}
		},
		async createAdmin({state}, payload) {
			let response;
			try {
				response = await this._vm.$httpWithToken().post(`${state.pathAccount}/management`, payload)
				return response
			} catch (error) {
				return error
			}
		},
		async createUser({state}, payload) {
			let response;
			try {
				response = await this._vm.$httpWithToken().post(`${state.pathAccount}/users`, payload)
				return response
			} catch (error) {
				return error
			}
		},
		async searchAccount({state}, payload) {
			let response;
			try {
				response = await this._vm.$httpWithToken().get(`${state.pathAccount}/${payload.type}/search?value=${payload.params}`)
				return response
			} catch (error) {
				return error
			}
		},
		async getAccountById({state}, payload) {
			let response;
			try {
				response = await this._vm.$httpWithToken().get(`${state.pathAccount}/${payload.type}/${payload.id}`)
				return response
			}catch(error) {
				return error
			}
		},
		async updateAccount({state},payload) {
			let response;
			try {
				response = await this._vm.$httpWithToken().put(`${state.pathAccount}/${payload.id}`, payload.data)
				return response
			} catch (error) {
				return error
			}	
		},
		async deleteAccount ({state}, payload) {
			let response;
			try {
				response = await this._vm.$httpWithToken().delete(`${state.pathAccount}/${payload}`)
				return response
			} catch (error) {
				return error
			}
		}
	}
}