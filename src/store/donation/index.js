export default {
	namespaced: true,
	state: {
		pathDonation: 'admin/donations'
	},
	actions: {
		async getListOrganizer({ state }, payload) {
			let response;
			try {
				response = await this._vm.$httpWithToken().get(`${state.pathDonation}/organizers/search?name=${payload}`)
				return response
			} catch (error) {
				return error
			}
		},
		async getListVerifier ({state}, payload) {
			let response;
			try {
				response = await this._vm.$httpWithToken().get(`${state.pathDonation}/verifiers/search?name=${payload}`)
				return response
			} catch (error) {
				return error
			}
		},
		async createDonation({state}, payload) {
			let response;
			try {
				response = await this._vm.$httpWithToken().post(state.pathDonation, payload)
					return response
			} catch (error) {
				return error
			}
		},
		async getListDonation({state}, payload) {
			let response;
			try {
				response = await this._vm.$httpWithToken().get(`${state.pathDonation}`, {
					params : {
						page : payload.page
					}
				})
				return response
			} catch (error) {
				return error
			}
		},
		async getDonationById ({state}, payload) {
			let response;
			try {
				response = await this._vm.$httpWithToken().get(`${state.pathDonation}/${payload}`)
				return response
			} catch (error) {
				return error
			}
		},
		async editDonation ({state}, payload) {
			let response;
			try {
				response = await this._vm.$httpWithToken().put(`${state.pathDonation}/${payload.id}`, payload.params)
				return response
			} catch (error) {
				return error
			}
		},
		async deleteDonation ({state}, payload) {
			let response;
			try {
				response = await this._vm.$httpWithToken().delete(`${state.pathDonation}/${payload}`)
				return response
			} catch (error) {
				return error
			}
		},
	}
}