import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import './plugins'
import vuetify from './plugins/vuetify/index'
import i18n from './plugins/localization'
import VueVideoPlayer from 'vue-video-player'
import 'video.js/dist/video-js.css'
import 'vue-video-player/src/custom-theme.css'
import 'videojs-flash'
import 'videojs-contrib-hls/dist/videojs-contrib-hls'
Vue.use(VueVideoPlayer)
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
