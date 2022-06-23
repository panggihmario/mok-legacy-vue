const pathUser = [
  {
    path: "/user/create",
    name: "UserCreate",
    component: () => import("../../views/AccountManage/User/UserCreate") ,
  },
  {
    path: "/user/feed/:id/:name",
    name: "feedUser",
    component: () => import("../../views/AccountManage/User/Feeds/index.vue"),
  },
  {
    path: "/user/:page",
    name: "User",
    component: () => import('../../views/AccountManage/User/List/index.vue') ,
    props : route => ({ query : route.query.search })
  },
  {
    path: "/user/:id/:page",
    name: "userEdit",
    component: () => import("../../views/AccountManage/User/UserEdit") ,
  },
]

export default pathUser