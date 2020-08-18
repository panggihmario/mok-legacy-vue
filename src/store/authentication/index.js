export default {
	namespaced: true,
	state: {
		user: '',
		token:  '',
		accountId : "",
		role :  {},
	},
	mutations : {
		setInitialiseData(state) {
			const dataOnStorage = localStorage.getItem('adminKoanba')
			if(dataOnStorage) {
				const dataParse = JSON.parse(dataOnStorage)
				state.user = dataParse.username
				state.accountId = dataParse.accountId
				state.token = dataParse.token,
				state.role = dataParse.role
			}
		},
		setInitialiseDataFromLogin (state, payload) {
			state.user = payload.username
			state.accountId = payload.accountId
			state.token = payload.token,
			state.role = payload.role
		},
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
		},
		setRole(state, payload) {
			state.role = payload
		}
	},
	actions: {
		async  login(context, payload) {
			let response;
			try {
				response = await this._vm.$http().post('auth/login', payload)
				const token =	response.data.token
				const id = response.data.accountId
				const username = response.data.userName
				const role = response.data.role
				// context.commit('setUser', username)
				// context.commit('setAccountId', id)
				// localStorage.setItem("persada_token", token)
				// localStorage.setItem("persada_id" , id)
				// localStorage.setItem("persada_username", username)
				// localStorage.setItem("persada_role", role)
				const initialiseData = {
					token,
					accountId : id,
					username,
					role
				}
				localStorage.setItem('adminKoanba', JSON.stringify(initialiseData))
				context.commit('setInitialiseDataFromLogin', initialiseData)
				// context.commit('setRole',role)
				// context.commit('setToken',token)
				return response
			} catch (error) {
				return error
			}
		},
		logout(context){
			context.commit('clearToken', '')
			localStorage.removeItem('adminKoanba')
		}
	},
	getters : {
		isAuthentication(state){
			if(state.token){
				return true
			}else{
				return false
			}
		},
	},
}