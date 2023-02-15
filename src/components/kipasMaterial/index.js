

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
  },
  {
    registeredAs : 'k-date',
    name : () => import('./DatePicker')
  },
  {
    registeredAs : 'k-map',
    name : () => import('./GoogleMap')
  },
  {
    registeredAs : 'k-range-date',
    name : () => import('./RangeDatePicker')
  },
  {
    registeredAs : 'k-autocomplete',
    name : () => import('./AutoComplete')
  }
]
