export default {
  namespaced: true,
  state: {
    pathAccount: "account",
    pathDiscover: "discover",
    pathDownloadNoWatermark: "download-no-watermark",
    previewTiktokData: {},
  },
  mutations: {
    setPreviewTiktokData(state, payload) {
      state.previewTiktokData = payload;
    },
  },
  actions: {
    getUserDetail({ state }, payload) {
      const data = {
        url: `${state.pathAccount}/detail`,
        params: {
          username: payload,
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
    getUserFeed({ state }, payload) {
      const data = {
        url: `${state.pathAccount}/feed`,
        params: {
          count: payload.count,
          secUid: payload.secUid,
          cursor: payload.cursor,
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
    getFeedByHashtag({ state }, payload) {
      const data = {
        url: `${state.pathDiscover}/hashtag`,
        params: {
          count: payload.count,
          keyword: payload.keyword,
          cursor: payload.cursor,
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
    getFeedExplore({ state }, payload) {
      const data = {
        url: `${state.pathDiscover}/explore`,
        params: {
          country: payload.country,
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
