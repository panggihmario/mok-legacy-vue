export default [
  {
    action: "fas fa-desktop",
    title: "Dashboard",
    items: [
      {
        title: "Dashboard",
        path: "/dashboard",
        role: ["ROLE_ADMIN"],
        active : false
      },
      {
        title: "Dashboard Sosmed",
        path: "/dashboard-sosmed",
        role: ["ROLE_ADMIN" ,"ROLE_ADMIN_SOCIAL"],
        active : false
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
        active : false
      },
      {
        title: "List User",
        path: "/user/1?search=",
        role: ["ROLE_ADMIN", "ROLE_ADMIN_SOCIAL"],
        active : false
      },
      {
        title : 'Verifikasi ID',
        path :'/verification',
        role : ['ROLE_ADMIN'],
        active : false
      }
    ],
  },
  {
    action: "fas fa-user-cog",
    title: "Manager Socmed",
    items: [
      {
        title: "Trending Hashtag",
        path: "/hashtag",
        role: ["ROLE_ADMIN"],
        active : false
      },
      {
        title: "Manage Hashtag",
        path: "/manage/hashtag",
        role: ["ROLE_ADMIN", "ROLE_ADMIN_SOCIAL"],
        active : false
      },
      {
        title: "List Channel",
        path: "/",
        role: ["ROLE_ADMIN"],
        active : false
      },
      {
        title: "Default Channel - HOME",
        path: "/default-channel",
        role: ["ROLE_ADMIN"],
        active : false
      },
      {
        title: "Reported",
        items: [
          {
            title: "Post",
            path: "/report/post",
            role: ["ROLE_ADMIN", "ROLE_ADMIN_SOCIAL"],
            active : false
          },
          {
            title: "Comment",
            path: "/report/comment",
            role: ["ROLE_ADMIN", "ROLE_ADMIN_SOCIAL"],
            active : false
          },
          {
            title: "Story",
            path: "/report/story",
            role: ["ROLE_ADMIN", "ROLE_ADMIN_SOCIAL"],
            active : false
          },
          {
            title: "Akun",
            path: "/report/account",
            role: ["ROLE_ADMIN", "ROLE_ADMIN_SOCIAL"],
            active : false
          },
        ],
      },
      // {
      //   title: "List Donation",
      //   path: "/donation",
      //   role: ["ROLE_ADMIN", "ROLE_ADMIN_SOCIAL"],
      // },
      {
        title: "Feedback user",
        path: "/feedback/1",
        role: ["ROLE_ADMIN", "ROLE_ADMIN_SOCIAL"],
        active : false
      },
      {
        title : 'Referral Code',
        path : '/referral-code',
        role : ['ROLE_ADMIN'],
        active : false
      },
      {
        title: "Category",
        path: "/master/category",
        role: ["ROLE_ADMIN"],
        active : false
      },
    ],
  },
  {
    title: "Kontent Feed",
    action: "fas fa-pen",
    items: [
      {
        title: "Post Feed",
        path: "/post/draft/1",
        role: ["ROLE_SELEB", "ROLE_ADMIN", "ROLE_ADMIN_SOCIAL"],
        active : false
      },
      {
        title: "Semua Postingan User",
        path: "/post/user/candidates/1",
        role: ["ROLE_SELEB", "ROLE_ADMIN", "ROLE_ADMIN_SOCIAL"],
        active : false
      },
      // {
      //   title: "Instagram Mirroring",
      //   path: "/post/instagram",
      //   role: ["ROLE_SELEB", "ROLE_ADMIN", "ROLE_ADMIN_SOCIAL"],
      // },
      {
        title: "Tiktok Mirroring",
        path: "/post/tiktok",
        role: ["ROLE_SELEB", "ROLE_ADMIN", "ROLE_ADMIN_SOCIAL"],
        active : false
      },
      {
        title: "Douyin Mirroring",
        path: "/post/douyin",
        role: ["ROLE_SELEB", "ROLE_ADMIN", "ROLE_ADMIN_SOCIAL"],
        active : false
      },
      {
        title : 'Manage Label',
        path : '/post/label',
        role : ['ROLE_ADMIN'],
        active : false
      }
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
        active : false
      },
      {
        title: "Penulis",
        path: "/editor",
        role: ["ROLE_AUTHOR", "ROLE_ADMIN", "ROLE_EDITOR"],
        active : false
      },
      {
        title: "Category",
        path: "/categorynews",
        role: ["ROLE_ADMIN", "ROLE_EDITOR"],
        active : false
      },
      {
        title: "Iklan",
        path: "/ads",
        role: ["ROLE_ADMIN", "ROLE_EDITOR"],
        active : false
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
        active : false
      },
      {
        title: "Product",
        path: "/product",
        role: ["ROLE_ADMIN"],
        active : false
      },
      {
        title: "Banned Product",
        path: "/banned",
        role: ["ROLE_ADMIN"],
        active : false
      },
      {
        title: "Category",
        path: "/category",
        role: ["ROLE_ADMIN"],
        active : false
      },
      {
        title: "Seller",
        path: "/seller",
        role: ["ROLE_ADMIN"],
        active : false
      },
      {
        title: "Report",
        path: "/reported-seller",
        role: ["ROLE_ADMIN"],
        active : false
      },
      {
        title: "Komplain",
        path: "/complaint",
        role: ["ROLE_CS_COMPLAINT", "ROLE_SPV_COMPLAINT" , "ROLE_ADMIN"],
        active : false
      },
      {
        title: "Finance",
        path: "/finance",
        role: ["ROLE_ADMIN", "ROLE_ADMIN_FINANCE"],
        active : false
      },
    ],
  },
  {
    action: "fas fa-hand-holding-usd",
    title: "Penggalangan Dana",
    items: [
      {
        title: "List Penggalangan Dana",
        path: "/donations",
        role: ["ROLE_ADMIN"],
        active : false
      },
      {
        title: "Kategori",
        path: "/donation-category",
        role: ["ROLE_ADMIN"],
        active : false
      },
    ],
  },
  {
    action: "fa-solid fa-database",
    title: "Master",
    items: [
      {
        title: "Bank",
        path: "/bank",
        role: ["ROLE_ADMIN"],
        active : false
      },
      {
        title: "Badge",
        path: "/badge",
        role: ["ROLE_ADMIN"],
        active : false
      },
  
    ],
  },
  {
    title : 'RnD new feature',
    action: "post_add",
    items : [
      {
        title : 'RnD',
        path : '/rnd',
        role : ["ROLE_ADMIN"],
      }
    ]
  }
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
