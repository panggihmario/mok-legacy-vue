export default {
  namespaced: true,
  state: {
    pathAccount: "account",
    pathDiscover: "discover",
    pathDownloadNoWatermark: "download-no-watermark",
    previewTiktokData: {},
    previewTiktokPayload: {
      id: null,
      channel: null,
      description: null,
      medias: [],
      product: null,
      type: "social",
    },
  },
  mutations: {
    setPreviewTiktokData(state, payload) {
      state.previewTiktokData = payload;
      state.previewTiktokPayload.channel = null;
      state.previewTiktokPayload.description = payload.desc;
      state.previewTiktokPayload.medias = [];
      state.previewTiktokPayload.product = null;
    },
  },
  actions: {
    getUserDetail({ state }, payload) {
      const data = {
        url: `${state.pathAccount}/detail`,
        params: payload,
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
    getUserFeed({ state }, payload) {
      const data = {
        url: `${state.pathAccount}/feed`,
        params: payload,
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
    getFeedByHashtag({ state }, payload) {
      const data = {
        url: `${state.pathDiscover}/hashtag`,
        params: payload,
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
    getHashtagPost({ state }, payload) {
      const data = {
        url: `${state.pathDiscover}/hashtag/post`,
        params: payload,
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
    getFeedExplore({ state }, payload) {
      const data = {
        url: `${state.pathDiscover}/explore`,
        params: {
          ...payload,
        },
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
    getTiktokVideoNoWatermark({ state }, payload) {
      let data = {
        url: `${state.pathDownloadNoWatermark}`,
        params: {
          url: payload,
        },
      };
      return this._vm
        .$fetchTiktokWithoutToken(data)
        .then((response) => {
          return response;
        })
        .catch((error) => {
          throw error;
        });
    },
  },
};
