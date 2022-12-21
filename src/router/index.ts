import { createRouter, createWebHistory  } from "vue-router";
import type { RouteRecordRaw } from 'vue-router';
import routes from "./routes/index"

const router = createRouter({
  history: createWebHistory(),
  routes : routes as RouteRecordRaw[]
})

router.beforeEach((to, from , next) => {
  const token : any = localStorage.getItem('adminKoanba')
  const parse = JSON.parse(token)
  if(to.name !== 'login' && !parse) {
    next({name : 'login'})
  }else{
    if(to.name === 'login' && parse) {
      next({name : 'management'})
    } else{
      next()
    }
  }
})

export default router