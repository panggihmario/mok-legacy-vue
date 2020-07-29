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
				role : [
					'ROLE_ADMINISTRATOR'
				]
			},
			{
				title: "List User",
				path: "/user",
				role : [
					'ROLE_ADMINISTRATOR'
				]
			}
		]
	},
	{
		action: "desktop_windows",
		title: "Manager Socmed",
		items: [
			{
				title: "List Channel",
				path: '/',
				role : [
					'ROLE_ADMINISTRATOR',
					'ROLE_ADMIN_SOCIAL'
				]
			},
			{
				title: 'List Donation',
				path: '/donation',
				role : [
					'ROLE_ADMINISTRATOR',
					'ROLE_ADMIN_SOCIAL'
				]
			},
			// {
			// 	title: 'Reported Account',
			// 	path: '/report'
			// }
		]
	},
	{
		action: 'text_fields',
		title: 'News',
		path: '/publisher',
		items: [
			{
				title: 'Publisher',
				path: '/publisher',
				role : [
					'ROLE_SUPERVISOR',
					'ROLE_ADMINISTRATOR'
				]
			},
			{
				title: 'Editor',
				path: '/editor',
				role : [
					'ROLE_EDITOR',
					'ROLE_ADMINISTRATOR'
				]
			},
		]
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
	// {
	// 	action: 'local_mall',
	// 	title: 'Shop',
	// 	items: [
	// 		{
	// 			title: 'Product',
	// 			path: '/product'
	// 		},
	// 		{
	// 			title: 'Category',
	// 			path: '/category'
	// 		},
	// 		{
	// 			title: 'Seller',
	// 			path: '/seller'
	// 		},
	// 		{
	// 			title: 'Report',
	// 			path: '/reported-seller'
	// 		}
	// 	]
	// },
	{
		title : 'Post',
		action : 'post_add',
		items : [
			{
				title : 'Feed',
				path : '/post',
				role : [
					'ROLE_SELEB',
					'ROLE_ADMINISTRATOR'
				]
			},
			// {
			// 	title : 'Product',
			// 	path : '/post/product'
			// }
		]
	},
	{
		title : 'Order',
		action : 'post_add',
		items : [
			{
				title : 'Order',
				path : '/order/cancel',
				role : [
					'ROLE_ADMINISTRATOR',
					
				]
			}
		]
	}
]