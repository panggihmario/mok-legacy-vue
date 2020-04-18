export default {
	namespaced: true,
	state: {
		user: 'publisher',
		token: localStorage.getItem('persada_token') || '',
		accountId : ""
	},
	mutations : {
		setUser(state, payload) {
			state.user = payload
		},
		clearUser(state) {
			state.user = ""
		},
		setToken(state, payload){
			state.token = payload
		},
		clearToken (state, payload){
			state.token = payload
		},
		setAccountId(state, payload){
			state.accountId = payload
		}
	},
	actions: {
		async  login(context, payload) {
			let response;
			try {
				response = await this._vm.$http().post('auth/login', payload)
				const token =	response.data.token
				const id = response.data.accountId
				context.commit('setAccountId', id)
				localStorage.setItem("persada_token", token)
				localStorage.setItem("persada_id" , id)
				context.commit('setToken',token)
				return response
			} catch (error) {
				return error
			}
		},
		logout(context){
			context.commit('clearToken', '')
			localStorage.removeItem('persada_token')
			localStorage.removeItem('persada_id')
		}
	},
	getters : {
		isAuthentication(state){
			if(state.token  ){
				return true
			}else{
				return false
			}
		}
	},
}