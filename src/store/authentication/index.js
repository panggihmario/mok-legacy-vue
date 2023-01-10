import router from "../../router"
export default {
	namespaced: true,
	state: {
		user: '',
		token: '',
		accountId: "",
		role: {},
		dataProfile : null
	},
	mutations: {
		setDataProfile(state,  payload) {
			state.dataProfile = payload
		},
		setInitialiseData(state) {
			const dataOnStorage = localStorage.getItem('adminKoanba')
			if (dataOnStorage) {
				const dataParse = JSON.parse(dataOnStorage)
				state.user = dataParse.username
				state.accountId = dataParse.accountId
				state.token = dataParse.token,
					state.role = dataParse.role
			}
		},
		setInitialiseDataFromLogin(state, payload) {
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
		setToken(state, payload) {
			state.token = payload
		},
		clearToken(state, payload) {
			state.token = payload
		},
		setAccountId(state, payload) {
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
				const initialiseData = {
					token,
					accountId : id,
					username,
					role
				}
				localStorage.setItem('adminKoanba', JSON.stringify(initialiseData))
				context.commit('setInitialiseDataFromLogin', initialiseData)
				return response
			} catch (error) {
				throw error
			}
		},
		logout(context) {
			context.commit('clearToken', '')
			localStorage.removeItem('adminKoanba')
		},
		getProfile({ state, dispatch, commit }) {
			const id = state.accountId
			return this._vm.$httpWithToken().get(`profile/${id}`)
				.then(response => {
					const data = response.data.data
					commit("setDataProfile", data)
				})
				.catch(err => {
					const codeResponse = err.response.status
					if (codeResponse === 401) {
						dispatch('logout')
						router.push({
							name: 'Authentication'
						})
					}
				})
		}
	},
	getters: {
		isAuthentication(state) {
			if (state.token) {
				return true
			} else {
				return false
			}
		},
	},
}