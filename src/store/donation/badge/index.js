export default {
  getListBadge({ state }, payload) {
    return this._vm
      .$httpWithToken()
      .get(`${state.pathMaster}/donations/badge`, {
        ...payload,
      })
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        throw err;
      });
  },
  createBadge({ state }, payload) {
    return this._vm
      .$httpWithToken()
      .post(`${state.pathMaster}/donations/badge`, {
        ...payload,
      })
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        throw err;
      });
  },
  editBadge({ state }, payload) {
    return this._vm
      .$httpWithToken()
      .put(`${state.pathMaster}/donations/badge`, {
        ...payload,
      })
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        throw err;
      });
  },
};
