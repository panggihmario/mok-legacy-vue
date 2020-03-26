import Home from '../views/Home.vue'
import Auth from '../views/Auth'
import Dashboard from '../views/Dashboard'
import Article from '../views/Article'
import CreateArticle from '../views/Article/Editor/create.vue'
import Profile from '../views/Profile';
import AccountManage from '../views/AccountManage'

const routes = [
  {
    path: '/',
    name: 'Home',
		component: Home,
		children : [
			{
				path : '/',
				name : 'Dashboard',
				component : Dashboard
			},
			{
				path : '/article',
				name : 'Article',
				component : Article
			},
			{
				path : '/article/create',
				name : 'CreateArticle',
				component : CreateArticle,
			},
			{
				path : '/profile',
				name : 'Profile',
				component : Profile
			},
			{
				path : '/admin',
				name : 'AccountManage',
				component : AccountManage
			}
		]
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
	},
	{
		path : '/auth',
		name : 'Authentication',
		component : Auth
	}
]

export default routes