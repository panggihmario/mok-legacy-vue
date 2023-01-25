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
  }
]

export default donationRoute