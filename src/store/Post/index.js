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
		async getListFeed ({state}, payload){
			let response;
			try {
				response = await this._vm.$httpWithToken().get(`${state.pathPost}/profile/${payload}`)
				// ?size=10&page=0&direction=DESC&sort=createAt
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
		},
		async deletePost({state}, payload) {
			let response;
			try {
				response = await this._vm.$httpWithToken().delete(`${state.pathPost}/profile/${payload}`)
				return response
			} catch (error) {	
				return error
			}
		}
	}
}