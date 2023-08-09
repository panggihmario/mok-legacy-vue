const pathPost = [
  {
    path: "/post/create",
    name: "createFeed",
    component: () => import("../../views/Post/Create/index.vue"),
  },
  {
    path: "/post/tiktok",
    name: "listTiktok",
    component: () => import("../../views/Post/Tiktok"),
    meta: {
      page: "postTiktok",
    },
  },
  {
    path: "/post/douyin",
    name: "listDouyin",
    component: () => import("../../views/Post/Tiktok/douyin"),
    meta: {
      page: "postDouyin",
    },
  },
  {
    path: "/post/douyin/create",
    name: "createListDouyin",
    component: () => import("../../views/Post/Tiktok/douyin/create"),
    meta: {
      page: "postDouyin",
    },
  },
  {
    path: "/post/user/:tab/:page",
    name: "listUser",
    component: () => import("../../views/Post/UserAll"),
    meta: {
      page: "postUserAll",
    },
  },
  {
    path: "/post/instagram",
    name: "instagramMirroring",
    component: () => import("@/views/Post/Instagram/index.vue"),
    meta: {
      page: "postInstagram",
    },
    children: [
      {
        path: "",
        name: "instagram username",
        component: () => import("@/views/Post/Instagram/username/index.vue"),
        meta: {
          page: "postInstagram",
        },
      },
      {
        path: ":page",
        name: "instagram username with page",
        component: () => import("@/views/Post/Instagram/username/index.vue"),
        meta: {
          page: "postInstagram",
        },
      },
      {
        path: "hashtag",
        name: "instagram hashtag",
        component: () => import("@/views/Post/Instagram/hashtag/index.vue"),
        meta: {
          page: "postInstagram",
        },
      },
      {
        path: "hashtag/:page",
        name: "instagram hashtag with page",
        component: () => import("@/views/Post/Instagram/hashtag/index.vue"),
        meta: {
          page: "postInstagram",
        },
      },
    ],
  },
  {
    path: "/post",
    name: "listFeed",
    component: () => import("@/views/Post/index.vue"),
    children: [
      {
        path: "schedule/:page",
        name: "schedule",
        component: () => import("@/views/Post/Schedule/index.vue"),
        props: (route) => ({ query: route.query.keyword }),
      },
      {
        path: "content/:page",
        name: "list",
        component: () => import("@/views/Post/List/index.vue"),
        props: (route) => ({ query: route.query.keyword }),
      },
      {
        path: "delete/:page",
        name: "reject",
        component: () => import("@/views/Post/Delete/index.vue"),
        props: (route) => ({ query: route.query.keyword }),
      },
      {
        path: ":page",
        name: "draft",
        component: () => import("@/views/Post/Draft/index.vue"),
        props: (route) => ({ query: route.query.keyword }),
      },
    ],
  },
];

export default pathPost;
