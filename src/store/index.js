import Vue from 'vue'
import Vuex from 'vuex'
import authentication from './authentication'
import channel from './channel'

Vue.use(Vuex)

export default new Vuex.Store({
	modules: {
		authentication : authentication,
		channel : channel
	}
})
