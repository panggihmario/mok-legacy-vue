import { childrenRoute } from './index'

const managerRoutes : childrenRoute[] = [
  {
    path : '/trending-hashtag',
    name : 'trendingHashtag',
    component : () => import('../../pages/Manager/TrendingHashtag/index.vue')
  },
  {
    path : '/hashtag',
    name : 'hashtag',
    component : () => import('../../pages/Manager/ManageHashtag/index.vue')
  },
  {
    path : '/channels',
    name : 'channels',
    component : () => import('../../pages/Manager/Channels/index.vue')
  }
]

export default managerRoutes
