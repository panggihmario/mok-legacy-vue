const pathNews = [
  {
    path : '/publisher/review/:page',
    name : 'listReviewPublisher',
    component : () => import('../../views/Article/Publisher/NeedReview/index.vue'),
    meta : {
      page : 'news'
    }
  },
  {
    path: '/publisher/list/:page',
    name: 'listNewsPublisher',
    component: () => import('../../views/Article/Publisher/ListNews/index.vue'),
    meta: {
      page: 'news'
    }
  },
  {
    path: '/publisher/draft/:page',
    name: 'draftNewsPublisher',
    component: () => import('../../views/Article/Publisher/Draft/index.vue'),
    meta: {
      page: 'news'
    }
  },
  {
    path: '/publisher/scheduled',
    name: 'scheduledNewsPublisher',
    component: () => import('../../views/Article/Publisher/Schedule/index.vue'),
    meta: {
      page: 'news'
    }
  },
  {
    path: "/publisher/agregrator/:sites/:page",
    name: "agregratorPage",
    component: () => import('../../views/Article/Publisher/Agregrator/index.vue'),
    meta: {
      page: 'news'
    }
  },
  // {
  //   path: "/publisher",
  //   name: "publisher",
  //   component: Publisher,
  //   meta: {
  //     page: 'news'
  //   }
  // },
  {
    path: "/pubisher/review/:id/:page",
    name: "reviewPublisher",
    component: () => import('../../views/Article/Publisher/review.vue'),
    meta: {
      page: 'news'
    }
  },
  {
    path: "/publisher/list/:page/:id",
    name: "editPublisher",
    component: () => import('../../views/Article/Publisher/edit.vue') ,
    meta: {
      page: 'news'
    }
  },

]

export default pathNews