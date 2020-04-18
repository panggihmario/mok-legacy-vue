import Home from '../views/Home.vue'
import Auth from '../views/Auth'
import Dashboard from '../views/Dashboard'
import Article from '../views/Article'
import CreateArticle from '../views/Article/Editor/create.vue'
import EditArticle from '../views/Article/Editor/edit.vue'
import Profile from '../views/Profile';
import AccountManage from '../views/AccountManage'
import Channel from '../views/Manager/Channel';
import ChannelCreate from '../views/Manager/Channel/create.vue';
import ChannelEdit from '../views/Manager/Channel/edit.vue';
import Donation from '../views/Manager/Donation';
import DonationCreate from '../views/Manager/Donation/create.vue';
import ReportedAccount from '../views/Manager/ReportedAccount';
import DetailReport from '../views/Manager/ReportedAccount/detail.vue';
import Publisher from '../views/Article/Publisher';
import ReviewPublisher from '../views/Article/Publisher/review.vue'
import Editor from '../views/Article/Editor';
import EditorArticle from '../views/Article/Editor/Article';
import Product from '../views/Shop/Product';
import CreateProduct from '../views/Shop/Product/create/index.vue';
import Category from '../views/Shop/Category';
import Seller from '../views/Shop/Seller';
import ReportedSeller from '../views/Shop/ReportedSeller';
import DetailReportedSeller from '../views/Shop/ReportedSeller/detail.vue';
import AdminCreate from '../views/AccountManage/AdminCreate';
import AdminEdit from '../views/AccountManage/AdminEdit';
import AdminDelete from '../views/AccountManage/AdminDelete';
import User from '../views/AccountManage/User';
import UserCreate from '../views/AccountManage/User/UserCreate';
import UserEdit from '../views/AccountManage/User/UserEdit';
import PostFeed from '../views/Post/feed.vue';
import PostProduct from '../views/Post/product.vue';
import CreateFeed from '../views/Post/createFeed.vue'

const routes = [
	{
		path: '/',
		name: 'Home',
		component: Home,
		meta: {
			requireAuth: false
		},
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
				path :'/article/:id',
				component : EditArticle,
				name : 'editArticle'
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
				path: '/admin/create',
				name: 'AdminCreate',
				component: AdminCreate
			},
			{
				path: '/admin/edit',
				name: 'AdminEdit',
				component: AdminEdit
			},
			{
				path: '/admin/delete',
				name: 'AdminDelete',
				component: AdminDelete
			},
			{
				path: '/user',
				name: 'User',
				component: User
			},
			{
				path: '/user/create',
				name: 'UserCreate',
				component: UserCreate
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
				path: '/profile',
				name: 'Profile',
				component: Profile
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
				path : '/channel/:id',
				name : 'channelEdit',
				component : ChannelEdit
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
				path :'/pubisher/review/:id',
				name : 'reviewPublisher',
				component : ReviewPublisher
			},
			{
				path: '/editor',
				name: 'editor',
				component: Editor
			},
			{
				path: '/editor-article',
				name: 'editorArticle',
				component: EditorArticle
			},
			{
				path: '/product',
				name: 'product',
				component: Product
			},
			{
				path: '/product/add',
				name: 'addProduct',
				component: CreateProduct
			},
			{
				path: '/category',
				name: 'category',
				component: Category
			},
			{
				path: '/seller',
				name: 'seller',
				component: Seller
			},
			{
				path: '/reported-seller',
				name: 'reportedSeller',
				component: ReportedSeller
			},
			{
				path: '/reported-seller/detail',
				name: 'detailReportedSeller',
				component: DetailReportedSeller
			},
			{
				path : '/post',
				name : 'listFeed',
				component : PostFeed
			},
			{
				path : '/post/create',
				name : 'createFeed',
				component : CreateFeed
			},
			{
				path : '/post/product',
				name : 'postProduct',
				component : PostProduct
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
		component: Auth,
		meta: {
			requireAuth: false
		}
	}
]

export default routes