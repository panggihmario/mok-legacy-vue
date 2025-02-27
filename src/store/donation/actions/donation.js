export default {
  fetchDonations({ state, dispatch }, payload) {
    const data = {
      url: `${state.pathDonation}`,
      params: {
        ...payload,
        size: 12,
        sort: "orderingAt,desc",
      },
    };
    return dispatch("getWithToken", data, { root: true })
      .then((response) => {
        const responseData = response.data.data;
        return responseData;
      })
      .catch((err) => {
        throw err;
      });
  },
  fetchDetailDonation({ state, dispatch }, payload) {
    const data = {
      url: `${state.pathDonation}/${payload}`,
    };
    return dispatch("getWithToken", data, { root: true })
      .then((response) => {
        const responseData = response.data.data;
        return responseData;
      })
      .catch((err) => {
        throw err;
      });
  },
  fetchListDonationCategory({ dispatch }, payload) {
    const data = {
      url: "admin/donation-categories",
      params: {
        ...payload,
      },
    };
    return dispatch("getWithToken", data, { root: true })
      .then((response) => {
        const responseData = response.data.data;
        return responseData;
      })
      .catch((err) => {
        throw err;
      });
  },
  postDonation({ state, dispatch }, payload) {
    const params = {
      url: `${state.pathDonation}`,
      data: {
        ...payload,
      },
    };
    return dispatch("postWithToken", params, { root: true })
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  },
  putStatusDonation({ state, dispatch }, payload) {
    const params = {
      url: `${state.pathDonation}/${payload.id}/update-status`,
      data: {
        ...payload.params,
      },
    };
    return dispatch("putWithToken", params, { root: true })
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  },
  postActivity({ state, dispatch }, payload) {
    const params = {
      url: `${state.pathDonation}/activity/${payload.id}`,
      data: {
        ...payload.params,
      },
    };
    return dispatch("postWithToken", params, { root: true })
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  },
  fetchActivity({ dispatch }, payload) {
    const data = {
      url: `donations/${payload.id}/activity`,
      params: {
        ...payload.params,
        size: 10,
      },
    };
    return dispatch("getWithToken", data, { root: true })
      .then((response) => {
        const responseData = response.data.data;
        return responseData;
      })
      .catch((err) => {
        throw err;
      });
  },
  putActivity({ state, dispatch }, payload) {
    const params = {
      url: `${state.pathDonation}/activity/${payload.id}`,
      data: {
        ...payload.params,
      },
    };
    return dispatch("putWithToken", params, { root: true })
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  },
  deleteActivity({ state, dispatch }, payload) {
    const params = {
      url: `${state.pathDonation}/activity/${payload}`,
    };
    return dispatch("deleteWithToken", params, { root: true })
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  },
  trendingDonation({ state, dispatch }, payload) {
    const params = {
      url: `admin/donations/${payload}/trending`,
    };
    return dispatch("patchWithToken", params, { root: true })
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  },
  postDonationPushNotif({ state, dispatch }, payload) {
    const params = {
      url: `${state.pathDonation}/push-notif`,
      data: {
        ...payload,
      },
    };
    return dispatch("postWithToken", params, { root: true })
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  },
  getDonationHistoryNotif({ state, dispatch }, payload) {
    const params = {
      url: `${state.pathDonation}/history-notif`,
      params: {
        ...payload,
      },
    };
    return dispatch("getWithToken", params, { root: true })
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  },
};
