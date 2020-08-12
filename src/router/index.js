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
	let isAuthenticated = ''
	const data = localStorage.getItem('adminKoanba')
	const parseData = JSON.parse(data)
	if(parseData){
		isAuthenticated = parseData.token
	}
	if(to.name !== 'Authentication' && !isAuthenticated ){
		next({name : 'Authentication'})
	}
	else{
		if(to.name === 'Authentication' && isAuthenticated ){
			next({
				name : 'AccountManage'
			})
		}else{
			next()
		}
	}


})

export default router
