export default {
  getUserInfo({ state }, payload) {
    const data = {
      url: `${state.pathInstagram}/user-info`,
      params: { ...payload },
    };
    return this._vm
      .$fetchTiktokWithoutToken(data)
      .then((response) => {
        const responseData = response.data;
        return responseData;
      })
      .catch((err) => {
        throw err;
      });
  },
  getUserMedias({ state }, payload) {
    const data = {
      url: `${state.pathInstagram}/user-medias`,
      params: { ...payload },
    };
    return this._vm
      .$fetchTiktokWithoutToken(data)
      .then((response) => {
        const responseData = response.data;
        return responseData;
      })
      .catch((err) => {
        throw err;
      });
  },
  getDataFileToServer({ state }, payload) {
    const data = {
      url: `${state.pathInstagram}/post-server`,
      params: { ...payload },
    };
    return this._vm
      .$fetchTiktokWithoutToken(data)
      .then((response) => {
        const responseData = response.data;
        return responseData;
      })
      .catch((err) => {
        throw err;
      });
  },
};
