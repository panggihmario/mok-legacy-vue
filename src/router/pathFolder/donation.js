const donationRoute = [
  {
    path : '/donations',
    name : 'donations',
    component : () => import("@/views/Donation/donations/index.vue")
  },
  {
    path : '/donations/create',
    name : 'createDonation',
    component : () => import("@/views/Donation/postDonation/index.vue")
  },
  {
    path : '/donations/:id',
    name : 'detailDonation',
    component : () => import("@/views/Donation/detail/index.vue")
  },
  {
    path : '/donation-category',
    name : 'donationCategory',
    component : () => import("@/views/Donation/category/index.vue")
  }
]

export default donationRoute