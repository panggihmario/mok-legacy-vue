import methods from "./actions";
import badge from "./badge";

export default {
  namespaced: true,
  state: {
    pathDonation: "admin/donations",
    pathMaster: "admin",
    listBadge: [],
  },
  mutations: {
    setListBadge(state, payload) {
      state.listBadge = payload;
    },
  },
  actions: {
    ...methods,
    ...badge,
  },
};
