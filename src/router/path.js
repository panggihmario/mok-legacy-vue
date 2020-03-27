import Home from '../views/Home.vue'
import Auth from '../views/Auth'
import Dashboard from '../views/Dashboard'
import Article from '../views/Article'
import CreateArticle from '../views/Article/Editor/create.vue'
import Profile from '../views/Profile';
import AccountManage from '../views/AccountManage'
import Channel from '../views/Manager/Channel';
import ChannelCreate from '../views/Manager/Channel/create.vue';
import Donation from '../views/Manager/Donation';
import DonationCreate from '../views/Manager/Donation/create.vue';
import ReportedAccount from '../views/Manager/ReportedAccount';
import DetailReport from '../views/Manager/ReportedAccount/detail.vue';
import Publisher from '../views/Article/Publisher';
import Editor from '../views/Article/Editor';
import User from '../views/AccountManage/User';
import AdminEdit from '../views/AccountManage/AdminEdit';
import UserEdit from '../views/AccountManage/User/UserEdit';

const routes = [
	{
		path: '/',
		name: 'Home',
		component: Home,
		children: [
			{
				path: '/',
				name: 'Dashboard',
				component: Dashboard
			},
			{
				path: '/article',
				name: 'Article',
				component: Article
			},
			{
				path: '/article/create',
				name: 'CreateArticle',
				component: CreateArticle,
			},
			{
				path: '/profile',
				name: 'Profile',
				component: Profile
			},
			{
				path: '/admin',
				name: 'AccountManage',
				component: AccountManage
			},
			{
				path: '/user',
				name: 'User',
				component: User
			},
			{
				path: '/admin/edit',
				name: 'AdminEdit',
				component: AdminEdit
			},
			{
				path: '/user/edit',
				name: 'UserEdit',
				component: UserEdit
			},
			{
				path: '/channel',
				name: 'channel',
				component: Channel
			},
			{
				path: '/channel/create',
				name: 'channelCreate',
				component: ChannelCreate
			},
			{
				path: '/donation',
				name: 'donation',
				component: Donation
			},
			{
				path: '/donation/create',
				name: 'donationCreate',
				component: DonationCreate
			},
			{
				path: '/report',
				name: 'report',
				component: ReportedAccount
			},
			{
				path: '/report/detail',
				name: 'reportDetail',
				component: DetailReport
			},
			{
				path: '/publisher',
				name: 'publisher',
				component: Publisher
			},
			{
				path: '/editor',
				name: 'editor',
				component: Editor
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
		path: '/auth',
		name: 'Authentication',
		component: Auth
	}
]

export default routes