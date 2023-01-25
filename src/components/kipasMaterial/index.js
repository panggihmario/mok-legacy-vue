

export default [
  {
    registeredAs : 'k-input',
    name : () => import('./Input/index.vue')
  },
  {
    registeredAs : 'k-select',
    name : () => import('./Select/index.vue')
  },
  {
    registeredAs : 'k-textarea',
    name : () => import('./Textarea/index.vue')
  },
  {
    registeredAs : 'k-checkbox',
    name : () => import('./Checkbox/index.vue')
  }
]
