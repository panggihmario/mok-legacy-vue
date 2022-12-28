import methods from "./actions"
export default {
  namespaced : true,
  state : {
    data: {
      enablePayments: [
        {
          id: "23421432455rtr3675",
          name: "BCA",
          key: "bca_va",
          isActive : true
        },
        {
          id: "23421432455rtr3675",
          name: "Mandiri",
          key: "mandiri_va",
          isActive: true
        },
        {
          id: "23421432455rtr3675",
          name: "BRI",
          key: "bri_va",
          isActive: false
        },
        {
          id: null,
          name: "Maybank",
          key: "maybank_va",
          isActive: false
        }
      ],
      customExpire: {
        duration: 1,
        unit: "day"
      }
    }
  },
  mutations : {
    setData (state, payload) {
      state.data = payload
    }
  },
  actions : {
    ...methods
  }
}