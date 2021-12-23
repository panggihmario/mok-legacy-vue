

const pathPost = [
  {
    path : '/post/create',
    name : 'createFeed',
    component : () => import('../../views/Post/Create/index.vue')
  },
  {
    path : '/post',
    name : 'listFeed',
    component : () => import('@/views/Post/index.vue'),
    children : [
      {
        path : 'schedule/:page',
        name : 'schedule',
        component : () => import('@/views/Post/Schedule/index.vue')
      },
      {
        path : 'content/:page',
        name : 'list',
        component : () => import('@/views/Post/List/index.vue')
      },
      {
        path : 'delete/:page',
        name : 'reject',
        component : () => import('@/views/Post/Delete/index.vue')
      },
      {
        path : ':page',
        name : 'draft',
        component : () => import('@/views/Post/Draft/index.vue')
      },
    ]
  },

]

export default pathPost