export default {
	namespaced : true,
	state : {
		pathPost : 'feeds/post'
	},
	actions : {
		async postFeed ({state}, payload) {
			let response;
			try {
				response = await this._vm.$httpWithToken().post(`${state.pathPost}/social`, payload)
				return response
			} catch (error) {
				return error
			}
		},
		async postProduct({state}, payload) {
			let response;
			try {
				response = await this._vm.$httpWithToken().post(`${state.pathPost}/product`, payload)
				return response
			} catch (error) {
				return error
			}
		}
	}
}