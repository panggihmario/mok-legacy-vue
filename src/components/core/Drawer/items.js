export default [
	{
		action: 'mdi-folder',
		title: 'Dashboard',
		items: [
			{
				title: 'default',
				path: '/'
			}
		]
	},
	{
		action: "desktop_windows",
		title: "Manager Socmed",
		items: [
			{
				title: "List Channel",
				path: '/channel'
			},
			{
				title: 'List Donation',
				path: '/donation'
			},
			{
				title: 'Reported Account',
				path: '/report'
			}
		]
	},
	{
		action: 'text_fields',
		title: 'Publikasi',
		path: '/publisher',
		items: [
			{
				title: 'Artikel',
				path: '/publisher'
			}
		]
	},
	{
		action: 'edit',
		title: 'Editor Space',
		items: [
			{
				title: 'Editor',
				path: '/editor'
			}
		]
	},
	{
		action : 'local_mall',
		title : 'Shop',
		items : [
			{
				title : 'Product',
				path : '/product'
			},
			{
				title : 'Category',
				path : '/category'
			},
			{
				title : 'Seller',
				path : '/seller'
			},
			{
				title : 'Report',
				path : '/reported-seller'
			}
		]
	}
]