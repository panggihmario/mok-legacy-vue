import { childrenRoute } from './index'

const contentRoutes : childrenRoute[]  = [
  {
    path : '/feed',
    name : 'feed',
    component : () => import('../../pages/Content/PostFeed/index.vue')
  },
  {
    path : '/user-post',
    name : 'userPost',
    component : () => import('../../pages/Content/AllPostUser/index.vue')
  },
]

export default contentRoutes