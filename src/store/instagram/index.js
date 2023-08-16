export default {
  namespaced: true,
  state: {
    path: "instagram",
    previewData: {},
  },
  mutations: {
    setPreviewData(state, payload) {
      state.previewData = payload;
    },
  },
  actions: {
    getUserInfo({ state }, payload) {
      const data = {
        url: `${state.path}/user-info`,
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
        url: `${state.path}/user-medias`,
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
        url: `${state.path}/post-server`,
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
  },
};
