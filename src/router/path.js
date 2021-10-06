import Auth from "../views/Auth";
import Article from "../views/Article";
import CreateArticle from "../views/Article/Editor/create.vue";
import EditArticle from "../views/Article/Editor/edit.vue";
import Profile from "../views/Profile";
import AccountManage from "../views/AccountManage";
import Channel from "../views/Manager/Channel";
import ChannelCreate from "../views/Manager/Channel/create.vue";
import ChannelEdit from "../views/Manager/Channel/edit.vue";
import Donation from "../views/Manager/Donation";
import DonationCreate from "../views/Manager/Donation/create.vue";
import DonationEdit from "../views/Manager/Donation/edit.vue";
import ReportedPost from "../views/Manager/Reported/Post";
import ReportedComment from "../views/Manager/Reported/Comment";
import ReportedStory from "../views/Manager/Reported/Story";
import ReportedAccount from "../views/Manager/Reported/Account";
import Publisher from "../views/Article/Publisher";
import ReviewPublisher from "../views/Article/Publisher/review.vue";
import EditPublisher from "../views/Article/Publisher/edit.vue";
import Editor from "../views/Article/Editor";
import EditorArticle from "../views/Article/Editor/Article";
import CategoryNews from "../views/Article/Category";
import CategoryNewsEdit from "../views/Article/Category/edit.vue";
import CreateProduct from "../views/Shop/Product/create/index.vue";
import Category from "../views/Shop/Category";
import Seller from "../views/Shop/Seller";
import ReportedSeller from "../views/Shop/ReportedSeller";
import DetailReportedSeller from "../views/Shop/ReportedSeller/detail.vue";
import AdminCreate from "../views/AccountManage/AdminCreate";
import AdminEdit from "../views/AccountManage/AdminEdit";
import AdminDelete from "../views/AccountManage/AdminDelete";
import User from "../views/AccountManage/User";
import UserCreate from "../views/AccountManage/User/UserCreate";
import UserEdit from "../views/AccountManage/User/UserEdit";
import PostFeed from "../views/Post/feed.vue";
import PostProduct from "../views/Post/product.vue";
import CreateFeed from "../views/Post/createFeed.vue";
import Complaint from "../views/Shop/Complaint";
import ComplaintDetail from "../views/Shop/Complaint/detail";
import CancelOrder from "../views/Order/cancelOrder.vue";
import Ads from "../views/Article/Advertisement";
import Order from "../views/Shop/Order";
import OrderDetail from "../views/Shop/Order/detail";
import Finance from "../views/Shop/Finance";

const routes = [
  // {
  //   path : "/product",
  //   component : () => import('../layouts/Product'),
  //   children : [
  //     {
  //       path : '/product',
  //       component : () => import('../views/Shop/Product'),
  //       name : 'products'
  //     },
  //     {
  //       path : 'banned',
  //       component : () => import('../views/Shop/Banned'),
  //       name : 'bannedProduct'
  //     },
  //     {
  //       path : "search",
  //       component  : () => import('../views/Shop/Product/search.vue'),
  //       name : 'searchProduct',
  //       props : route => {return route.query}
  //     }
  //   ]
  // },
  {
    path: "/",
    component: () => import('../layouts/MainLayout'),
    meta: {
      requireAuth: true,
    },
    children: [
      {
        path: "/article",
        name: "Article",
        component: Article,
      },
      {
        path: "/article/create",
        name: "CreateArticle",
        component: CreateArticle,
      },
      {
        path: "/article/:id",
        component: EditArticle,
        name: "editArticle",
      },
      {
        path: "/profile",
        name: "Profile",
        component: Profile,
      },
      {
        path: "/admin",
        name: "AccountManage",
        component: AccountManage,
      },
      {
        path: "/admin/create",
        name: "AdminCreate",
        component: AdminCreate,
      },
      {
        path: "/admin/:id",
        name: "adminEdit",
        component: AdminEdit,
      },
      {
        path: "/admin/delete",
        name: "AdminDelete",
        component: AdminDelete,
      },
      {
        path: "/user",
        name: "User",
        component: User,
      },
      {
        path: "/user/create",
        name: "UserCreate",
        component: UserCreate,
      },
      {
        path: "/user/:id",
        name: "userEdit",
        component: UserEdit,
      },
      {
        path: "/",
        name: "channel",
        component: Channel,
      },
      {
        path: "/profile",
        name: "Profile",
        component: Profile,
      },
      {
        path: "/channel",
        name: "channel",
        component: Channel,
      },
      {
        path: "/channel/create",
        name: "channelCreate",
        component: ChannelCreate,
      },
      {
        path: "/channel/:id",
        name: "channelEdit",
        component: ChannelEdit,
      },
      {
        path: "/donation",
        name: "donation",
        component: Donation,
      },
      {
        path: "/donation/create",
        name: "donationCreate",
        component: DonationCreate,
      },
      {
        path: "/donation/:id",
        name: "donationEdit",
        component: DonationEdit,
      },
      {
        path: "/report/post",
        name: "reportPost",
        component: ReportedPost,
      },
      {
        path: "/report/comment",
        name: "reportComment",
        component: ReportedComment,
      },
      {
        path: "/report/story",
        name: "reportStory",
        component: ReportedStory,
      },
      {
        path: "/report/account",
        name: "reportAccount",
        component: ReportedAccount,
      },
      {
        path: "/complaint",
        name: "complaint",
        component: Complaint,
      },
      {
        path: "/complaint/detail/:id",
        name: "complaintDetail",
        component: ComplaintDetail,
      },
      {
        path: "/order",
        name: "order",
        component: Order,
      },
      {
        path: "/order/detail/:id",
        name: "ordertDetail",
        component: OrderDetail,
      },
      {
        path: "/publisher",
        name: "publisher",
        component: Publisher,
        meta : {
          page : 'news'
        }
      },
      {
        path: "/pubisher/review/:id",
        name: "reviewPublisher",
        component: ReviewPublisher,
        meta : {
          page : 'news'
        }
      },
      {
        path: "/publisher/:id",
        name: "editPublisher",
        component: EditPublisher,
        meta : {
          page : 'news'
        }
      },
      {
        path: "/editor",
        name: "editor",
        component: Editor,
      },
      {
        path: "/editor-article",
        name: "editorArticle",
        component: EditorArticle,
      },
      {
        path: "/categorynews",
        name: "categoryNews",
        component: CategoryNews,
      },
      {
        path: "/categorynews/:id",
        name: "categoryNewsEdit",
        component: CategoryNewsEdit,
      },

      {
        path : '/product',
        component : () => import('../views/Shop/Product'),
        name : 'products',
        meta : {
          page : 'product'
        }
      },
      {
        path : '/banned',
        component : () => import('../views/Shop/Banned'),
        name : 'bannedProduct',
        meta : {
          page : 'product'
        }
      },
      {
        path : "search",
        component  : () => import('../views/Shop/Product/search.vue'),
        name : 'searchProduct',
        meta : {
          page : 'product'
        }
      },
      {
        path : "dashboard",
        component : () => import('../views/Dashboard'),
        name : 'dashboard',
      },
      {
        path: "/category",
        name: "category",
        component: Category,
      },
      {
        path: "/seller",
        name: "seller",
        component: Seller,
      },
      {
        path: "/reported-seller",
        name: "reportedSeller",
        component: ReportedSeller,
      },
      {
        path: "/reported-seller/detail",
        name: "detailReportedSeller",
        component: DetailReportedSeller,
      },
      {
        path: "/post",
        name: "listFeed",
        component: PostFeed,
      },
      {
        path: "/post/create",
        name: "createFeed",
        component: CreateFeed,
      },
      {
        path: "/post/product",
        name: "postProduct",
        component: PostProduct,
      },
      {
        path: "/order/cancel",
        name: "orderCancel",
        component: CancelOrder,
      },
      {
        path: "/ads",
        name: "ads",
        component: Ads,
      },
      {
        path: "/finance",
        name: "finance",
        component: Finance,
      },
    ],
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/auth",
    name: "Authentication",
    component: Auth,
    meta: {
      requireAuth: false,
    },
  },
];

export default routes;
