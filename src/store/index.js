import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
		user : "publisher"
  },
  mutations: {
		setUser (state, payload) {
			state.user = payload
		},
		clearUser (state){
			state.user = ""
		}
  },
  actions: {
  },
  modules: {
  }
})
