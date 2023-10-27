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
    path: "/referral-code",
    name: "referralCode",
    component: () => import("../../views/Manager/ReferalCode/index.vue"),
  },
  {
    path : "/referral-code/:code",
    name : 'detailReferralCode' ,
    component : () => import("../../views/Manager/ReferalCode/detail.vue")
  },
  {
    path : '/feedback/:page',
    name : 'feedback',
    component : () => import("../../views/Manager/FeedBack/index.vue")
  }
]

export default socmedRoute