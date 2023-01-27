import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import './plugins'
import vuetify from './plugins/vuetify/index'
import i18n from './plugins/localization'




new Vue({
	store,
	vuetify,
	i18n,
	beforeCreate () {
		this.$store.commit('authentication/setInitialiseData')
		this.$store.dispatch('authentication/getProfile')
	},
	render: h => h(App),
	router,
}).$mount('#app')
