import accountRoutes from "./account";
import managerRoutes from "./manager";
import contentRoutes from "./content";


export interface childrenRoute  {
  path : string,
  name : string,
  component : () => void
}

interface parentRoute extends childrenRoute {
  redirect? : string,
  meta : {
    requireAuth : boolean
  },
  children : childrenRoute[]
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
  }
  
]

export default routes