const pathMaster = [
  {
    path : '/bank',
    name : 'bank',
    component : () => import('../../views/Master/Bank/index.vue'),
    meta : {
      page : 'master'
    }
  }
]

export default pathMaster