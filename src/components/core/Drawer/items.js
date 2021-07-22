export default [
  // {
  // 	action: 'mdi-folder',
  // 	title: 'Dashboard',
  // 	items: [
  // 		{
  // 			title: 'default',
  // 			path: '/'
  // 		}
  // 	]
  // },
  {
    action: "mdi-cog",
    title: "Manage Account",
    items: [
      {
        title: "List Management",
        path: "/admin",
        role: ["ROLE_ADMIN"],
      },
      {
        title: "List User",
        path: "/user",
        role: ["ROLE_ADMIN"],
      },
    ],
  },
  {
    action: "desktop_windows",
    title: "Manager Socmed",
    items: [
      {
        title: "List Channel",
        path: "/",
        role: ["ROLE_ADMIN", "ROLE_ADMIN_SOCIAL"],
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
    action: "text_fields",
    title: "News",
    path: "/publisher",
    items: [
      {
        title: "Penyunting",
        path: "/publisher",
        role: ["ROLE_SUPERVISOR", "ROLE_ADMIN"],
      },
      {
        title: "Penulis",
        path: "/editor",
        role: ["ROLE_EDITOR", "ROLE_ADMIN"],
      },
      {
        title: "Category",
        path: "/categorynews",
      },
      {
        title: "Iklan",
        path: "/ads",
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
    action: "local_mall",
    title: "Shop",
    items: [
      {
        title: "Order",
        path: "/order",
      },
      {
        title: "Product",
        path: "/product",
      },
      {
        title : 'Banned Product',
        path : '/product/banned'
      },
      {
        title: "Category",
        path: "/category",
      },
      {
        title: "Seller",
        path: "/seller",
      },
      {
        title: "Report",
        path: "/reported-seller",
      },
      {
        title: "Komplain",
        path: "/complaint",
      },
      {
        title: "Finance",
        path: "/finance",
      },
     
    ],
  },
  {
    title: "Post",
    action: "post_add",
    items: [
      {
        title: "Feed",
        path: "/post",
        role: ["ROLE_SELEB", "ROLE_ADMIN", "ROLE_USER"],
      },
      // {
      // 	title : 'Product',
      // 	path : '/post/product'
      // }
    ],
  },
  {
    title: "Order",
    action: "post_add",
    items: [
      {
        title: "Order",
        path: "/order/cancel",
        role: ["ROLE_ADMIN"],
      },
    ],
  },
];
