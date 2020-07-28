import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import './plugins'
import vuetify from './plugins/vuetify/index'
import i18n from './plugins/localization'

Vue.config.productionTip = false

new Vue({
  router,
	store,
	vuetify,
	i18n,
  render: h => h(App)
}).$mount('#app')
