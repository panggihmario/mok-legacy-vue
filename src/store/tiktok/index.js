export default {
  namespaced: true,
  state: {
    pathAccount: "account",
    pathDiscover: "discover",
    pathDownloadNoWatermark: "download-no-watermark",
    pathDouyin: "douyin",
    previewTiktokData: {},
    previewTiktokPayload: {
      id: null,
      channel: null,
      description: null,
      medias: [],
      product: null,
      // floatingLink: null,
      // floatingLinkLabel: null,
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
    getUserDetailDouyin({ state }) {
      const data = {
        url: `${state.pathDouyin}/${state.pathAccount}/detail`,
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
    getFeedExploreDouyin({ state }, payload) {
      const data = {
        url: `${state.pathDouyin}/explore`,
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
    getDouyinVideoNoWatermark({ state }, payload) {
      let data = {
        url: `${state.pathDouyin}/${state.pathDownloadNoWatermark}`,
        params: {
          url: payload.url,
          sendRawData: payload.sendRawData,
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
    getListDouyinVideo({ state }, payload) {
      return this._vm
        .$httpWithToken()
        .get(
          `admin/${state.pathDouyin}?status=${payload.status}&page=${payload.page}&size=10`
        )
        .then((response) => {
          return response;
        })
        .catch((error) => {
          throw error;
        });
    },
    postDouyinVideo({ state }, payload) {
      let data = {
        url: `admin/${state.pathDouyin}`,
        params: { data: payload },
      };
      return this._vm
        .$httpWithToken()
        .post(data.url, data.params)
        .then((response) => {
          return response;
        })
        .catch((error) => {
          throw error;
        });
    },
  },
};
