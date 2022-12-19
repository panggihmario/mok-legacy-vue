import { childrenRoute } from './index'

const accountRoutes : childrenRoute[]  = [
  {
    path: '/management',
    name: 'management',
    component: () => import('../../pages/Account/Management/index.vue')
  },
  {
    path: '/user',
    name: 'user',
    component: () => import('../../pages/Account/User/index.vue')
  }
]

export default accountRoutes