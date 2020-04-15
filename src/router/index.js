import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './path';
import store from '../store';

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
	console.log(store.getters)
	const isAuthenticated = store.getters['authentication/isAuthentication']
	console.log(isAuthenticated)
	if(to.name !== 'Authentication' && !isAuthenticated ){
		next({name : 'Authentication'})
	}else{
		next()
		// if(to.name === 'Authentication' && store.getters.isAuthentication ){
		// 	next ({name : 'Dashboard'})
		// }else{
		// 	next()
		// }
	}
})

export default router
