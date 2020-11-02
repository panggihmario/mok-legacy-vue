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
				path: "/admin"
			},
			{
				title: "List User",
				path: "/user"
			}
		]
	},
	{
		action: "desktop_windows",
		title: "Manager Socmed",
		items: [
			{
				title: "List Channel",
				path: '/'
			},
			{
				title: 'List Donation',
				path: '/donation'
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
				path: '/publisher'
			},
			{
				title: 'Editor',
				path: '/editor'
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
	{
		action: 'local_mall',
		title: 'Shop',
		items: [
			{
				title: 'Product',
				path: '/product'
			},
			{
				title: 'Category',
				path: '/category'
			},
			{
				title: 'Seller',
				path: '/seller'
			},
			{
				title: 'Report',
				path: '/reported-seller'
			},
			{
				title: 'Komplain',
				path: '/complaint'
			},
		]
	},
	{
		title : 'Post',
		action : 'post_add',
		items : [
			{
				title : 'Feed',
				path : '/post'
			},
			// {
			// 	title : 'Product',
			// 	path : '/post/product'
			// }
		]
	}
]