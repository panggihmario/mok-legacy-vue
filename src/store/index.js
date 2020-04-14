import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		user: "publisher",
		token : ''
	},
	mutations: {
		setUser(state, payload) {
			state.user = payload
		},
		clearUser(state) {
			state.user = ""
		},
		setToken(state, payload){
			state.token = payload
		}
	},
	actions: {
		async login(context, payload) {
			const params = {
				url : 'auth/login',
				method : 'post',
				data : payload
			}
			let response
			try {
				response = await this._vm.$http(params)
				const token = response.data.access_token
				context.commit('setToken', token)
				localStorage.setItem('persada_token', token)
				return response
			} catch (error) {
				return error
			}

		}
	},
	modules: {
	}
})
