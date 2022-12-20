const socmedRoute = [
  {
    path: "/hashtag",
    name: "trendingHashtag",
    component: () => import("../../views/Manager/Hashtag"),
  },
  {
    path: "/manage/hashtag",
    name: "manageHashtag",
    component: () => import("../../views/Manager/Hashtag/HashtagManage"),
  },
  {
    path: "/manage/hashtag/detail",
    name: "manageHashtagDetail",
    component: () => import("../../views/Manager/Hashtag/HashtagManage/detail.vue"),
  },
  {
    path: "/manage/hashtag/create-new-trending",
    name: "createHashtag",
    component: () => import("../../views/Manager/Hashtag/HashtagManage/CreateNewTrending"),
  },
  {
    path: "/donation",
    name: "donation",
    component: () => import("../../views/Manager/Donation/index.vue"),
  },
  {
    path: "/donation/create",
    name: "donationCreate",
    component: () => import("../../views/Manager/Donation/create.vue"),
  },
  {
    path: "/donation/:id",
    name: "donationEdit",
    component: () => import("../../views/Manager/Donation/edit.vue"),
  },
  {
    path : '/feedback/:page',
    name : 'feedback',
    component : () => import("../../views/Manager/FeedBack/index.vue")
  }
]

export default socmedRoute