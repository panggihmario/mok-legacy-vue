import Auth from "../views/Auth";
import Article from "../views/Article";
import CreateArticle from "../views/Article/Editor/create.vue";
import EditArticle from "../views/Article/Editor/edit.vue";
import Profile from "../views/Profile";
import AccountManage from "../views/AccountManage";
import Channel from "../views/Manager/Channel";
import DefaultChannel from "../views/Manager/DefaultChannel";
import ChannelCreate from "../views/Manager/Channel/create.vue";
import ChannelEdit from "../views/Manager/Channel/edit.vue";
import ReportedPost from "../views/Manager/Reported/Post";
import ReportedComment from "../views/Manager/Reported/Comment";
import ReportedStory from "../views/Manager/Reported/Story";
import ReportedAccount from "../views/Manager/Reported/Account";
import Editor from "../views/Article/Editor";
import EditorArticle from "../views/Article/Editor/Article";
import CategoryNews from "../views/Article/Category";
import CategoryNewsEdit from "../views/Article/Category/edit.vue";
import Category from "../views/Shop/Category";
import CategoryCreate from "../views/Shop/Category/create";
import Seller from "../views/Shop/Seller";
import ReportedSeller from "../views/Shop/ReportedSeller";
import DetailReportedSeller from "../views/Shop/ReportedSeller/detail.vue";
import AdminCreate from "../views/AccountManage/AdminCreate";
import AdminEdit from "../views/AccountManage/AdminEdit";
import AdminDelete from "../views/AccountManage/AdminDelete";
import PostProduct from "../views/Post/product.vue";
import Complaint from "../views/Shop/Complaint";
import ComplaintDetail from "../views/Shop/Complaint/detail";
import CancelOrder from "../views/Order/cancelOrder.vue";
import Ads from "../views/Article/Advertisement";
import Order from "../views/Shop/Order";
import OrderDetail from "../views/Shop/Order/detail";
import Finance from "../views/Shop/Finance";
import allpath from "./pathFolder/index.js";
import RnD from "../views/RnD/index.vue";
import DashboardSosmed from "../views/Dashboard/ChartSosmed";

const routes = [
  {
    path: "/",
    component: () => import("../layouts/MainLayout"),
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
        path: "/",
        name: "channel",
        component: Channel,
      },
      {
        path: "/default-channel",
        name: "defaultChannel",
        component: DefaultChannel,
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
        path: "/product",
        component: () => import("../views/Shop/Product"),
        name: "products",
        meta: {
          page: "product",
        },
      },
      {
        path: "/banned",
        component: () => import("../views/Shop/Banned"),
        name: "bannedProduct",
        meta: {
          page: "product",
        },
      },
      {
        path: "search",
        component: () => import("../views/Shop/Product/search.vue"),
        name: "searchProduct",
        meta: {
          page: "product",
        },
      },
      {
        path: "dashboard",
        component: () => import("../views/Dashboard"),
        name: "dashboard",
      },
      {
        path: "/category",
        name: "category",
        component: Category,
      },
      {
        path: "/category/create",
        name: "createCategory",
        component: CategoryCreate,
      },
      {
        path: "/category/:id",
        name: "editCategory",
        component: CategoryCreate,
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
      ...allpath,
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
      {
        path: "/rnd",
        name: "rnd",
        component: RnD,
      },
      {
        path: "/dashboard-sosmed",
        name: "dashboardSosmed",
        component: DashboardSosmed,
      },
      {
        path: "/master/category",
        name: "masterCategory",
        component: () => import("../views/Master/Category"),
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
