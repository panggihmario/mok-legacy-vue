export default [
  {
    action: "fas fa-desktop",
    title: "Dashboard",
    items: [
      {
        title: "Dashboard",
        path: "/dashboard",
        role: ["ROLE_ADMIN"],
      },
      {
        title: "Dashboard Sosmed",
        path: "/dashboard-sosmed",
        role: ["ROLE_ADMIN"],
      },
    ],
  },
  {
    action: "fas fa-sliders-h",
    title: "Manage Account",
    items: [
      {
        title: "List Management",
        path: "/admin",
        role: ["ROLE_ADMIN"],
      },
      {
        title: "List User",
        path: "/user/1?search=",
        role: ["ROLE_ADMIN", "ROLE_ADMIN_SOCIAL"],
      },
    ],
  },
  {
    action: "fas fa-folder",
    title: "Master",
    items: [
      // {
      //   title: "Dashboard",
      //   path: "/dashboard",
      //   role: ["ROLE_ADMIN"],
      // },
      {
        title: "Category",
        path: "/master/category",
        role: ["ROLE_ADMIN"],
      },
    ],
  },
  {
    action: "fas fa-user-cog",
    title: "Manager Socmed",
    items: [
      {
        title: "Trending Hashtag",
        path: "/hashtag",
        role: ["ROLE_ADMIN", "ROLE_ADMIN_SOCIAL"],
      },
      {
        title: "Manage Hashtag",
        path: "/manage/hashtag",
        role: ["ROLE_ADMIN", "ROLE_ADMIN_SOCIAL"],
      },
      {
        title: "List Channel",
        path: "/",
        role: ["ROLE_ADMIN"],
      },
      {
        title: "Reported",
        items: [
          {
            title: "Post",
            path: "/report/post",
            role: ["ROLE_ADMIN", "ROLE_ADMIN_SOCIAL"],
          },
          {
            title: "Comment",
            path: "/report/comment",
            role: ["ROLE_ADMIN", "ROLE_ADMIN_SOCIAL"],
          },
          {
            title: "Story",
            path: "/report/story",
            role: ["ROLE_ADMIN", "ROLE_ADMIN_SOCIAL"],
          },
          {
            title: "Akun",
            path: "/report/account",
            role: ["ROLE_ADMIN", "ROLE_ADMIN_SOCIAL"],
          },
        ],
      },
      {
        title: "List Donation",
        path: "/donation",
        role: ["ROLE_ADMIN", "ROLE_ADMIN_SOCIAL"],
      },
    ],
  },
  {
    title: "Kontent Feed",
    action: "fas fa-pen",
    items: [
      {
        title: "Post Feed",
        path: "/post/1",
        role: ["ROLE_SELEB", "ROLE_ADMIN", "ROLE_ADMIN_SOCIAL"],
      },
      {
        title: "Post Tiktok",
        path: "/post/tiktok",
        role: ["ROLE_SELEB", "ROLE_ADMIN", "ROLE_ADMIN_SOCIAL"],
      },
    ],
  },
  {
    action: "fa-newspaper",
    title: "Publikasi",
    path: "/publisher",
    items: [
      {
        title: "Penyunting",
        path: "/publisher/list/1",
        role: ["ROLE_EDITOR", "ROLE_ADMIN"],
      },
      {
        title: "Penulis",
        path: "/editor",
        role: ["ROLE_AUTHOR", "ROLE_ADMIN", "ROLE_EDITOR"],
      },
      {
        title: "Category",
        path: "/categorynews",
        role: ["ROLE_ADMIN", "ROLE_EDITOR"],
      },
      {
        title: "Iklan",
        path: "/ads",
        role: ["ROLE_ADMIN", "ROLE_EDITOR"],
      },
    ],
  },
  // {
  // 	action: 'edit',
  // 	title: 'Editor Space',
  // 	items: [
  // 		{
  // 			title: 'Editor',
  // 			path: '/editor'
  // 		},
  // 		{
  // 			title: 'Article',
  // 			path: '/editor-article'
  // 		},
  // 	]
  // },
  {
    action: "fas fa-shopping-basket",
    title: "Shop",
    items: [
      {
        title: "Order",
        path: "/order",
        role: ["ROLE_ADMIN", "ROLE_SPV_COMPLAINT"],
      },
      {
        title: "Product",
        path: "/product",
        role: ["ROLE_ADMIN"],
      },
      {
        title: "Banned Product",
        path: "/banned",
        role: ["ROLE_ADMIN"],
      },
      {
        title: "Category",
        path: "/category",
        role: ["ROLE_ADMIN"],
      },
      {
        title: "Seller",
        path: "/seller",
        role: ["ROLE_ADMIN"],
      },
      {
        title: "Report",
        path: "/reported-seller",
        role: ["ROLE_ADMIN"],
      },
      {
        title: "Komplain",
        path: "/complaint",
        role: ["ROLE_ADMIN", "ROLE_CS_COMPLAINT", "ROLE_SPV_COMPLAINT"],
      },
      {
        title: "Finance",
        path: "/finance",
        role: ["ROLE_ADMIN", "ROLE_ADMIN_FINANCE"],
      },
    ],
  },
  // {
  //   title : 'RnD new feature',
  //   action: "post_add",
  //   items : [
  //     {
  //       title : 'RnD',
  //       path : '/rnd',
  //       role : ["ROLE_ADMIN"],
  //     }
  //   ]
  // }
  // {
  //   title: "Order",
  //   action: "post_add",
  //   items: [
  //     {
  //       title: "Order",
  //       path: "/order/cancel",
  //       role: ["ROLE_ADMIN"],
  //     },
  //   ],
  // },
];
