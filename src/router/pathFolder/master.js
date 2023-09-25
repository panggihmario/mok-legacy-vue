const pathMaster = [
  {
    path: "/bank",
    name: "bank",
    component: () => import("../../views/Master/Bank/index.vue"),
    meta: {
      page: "master",
    },
  },
  {
    path: "/badge",
    name: "badge",
    component: () => import("../../views/Master/Badge/index.vue"),
    meta: {
      page: "badge",
    },
  },
  {
    path: "/badge-create",
    name: "create badge",
    component: () => import("../../views/Master/Badge/create/index.vue"),
    meta: {
      page: "badge create",
    },
  },
  {
    path: "/badge/:id",
    name: "edit badge",
    component: () => import("../../views/Master/Badge/create/index.vue"),
    meta: {
      page: "badge create",
    },
  },
];

export default pathMaster;
