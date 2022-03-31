export default {
  namespaced: true,
  state: {
    pathAccount: "account",
    pathDiscover: "discover",
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
    getFeedByHashtag({ state }, payload) {
      const data = {
        url: `${state.pathDiscover}/hashtag`,
        params: {
          count: payload.count,
          keyword: payload.keyword,
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
    getTiktokVideo({ state }, payload) {
      let data = {
        url: `${payload}`,
      };
      return this._vm
        .$fetchDownloadTiktokWithoutToken(data)
        .then((response) => {
          return response;
        })
        .catch((error) => {
          throw error;
        });
    },
    getTiktokVideoNoWatermark({ state }, payload) {
      let data = {
        url: `tiktok/info`,
        params: {
          url: payload,
        },
      };
      return this._vm
        .$fetchDownloadTiktokWithoutWatermark(data)
        .then((response) => {
          return response;
        })
        .catch((error) => {
          throw error;
        });
    },
  },
};
