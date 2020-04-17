export default {
	namespaced : true,
	state : {
		pathPost : 'feeds/post/social'
	},
	actions : {
		async postFeed ({state}, payload) {
			let response;
			try {
				response = await this._vm.$httpWithToken().post(state.pathPost, payload)
				return response
			} catch (error) {
				return error
			}
		}
	}
}