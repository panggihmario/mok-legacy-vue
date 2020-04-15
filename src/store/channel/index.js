export default {
	namespaced : true,
	state : {
		pathChannel : 'admin/channel'
	},
	actions : {
		async getListChannel({state}) {
			const path = state
			let response;
			try {
				response = await this._vm.$httpWithToken().get(state.pathChannel)
				return response
			} catch (error) {
				return error
			}
		},
		async createChannel({state}, payload) {
			let response;
			try {
				response = await this._vm.$httpWithToken().post(state.pathChannel, payload)
				return response
			} catch (error) {
				return error
			}
		},
		async deleteChannel({state}, payload){
			let response;
			try {
				response = await this._vm.$httpWithToken().delete(`${state.pathChannel}/${payload}`)
				return response
			} catch (error) {
				return error
			}	
		}
	}
}