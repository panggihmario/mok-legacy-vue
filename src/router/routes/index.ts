import accountRoutes from "./account";
import managerRoutes from "./manager";
import contentRoutes from "./content";

export interface childrenRoute  {
  path : string,
  name : string,
  component : () => void
}

export interface parentRoute extends childrenRoute {
  redirect? : string,
  meta : {
    requireAuth : boolean
  },
  children? : childrenRoute[]
}

const routes : parentRoute[] = [
  {
    path : '/',
    component : () => import('../../pages/index.vue'),
    redirect : '/management',
    name : 'default',
    meta : {
      requireAuth : true
    },
    children : [
      ...accountRoutes,
      ...managerRoutes,
      ...contentRoutes
    ]
  },
  {
    path : '/login',
    name : 'login',
    component : () => import('../../pages/Authentication/login.vue'),
    meta : {
      requireAuth : false
    }
  }
  
]

export default routes