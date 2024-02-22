import tiktok from "./action/tiktok";
import instagram from "./action/instagram";

export default {
  namespaced: true,
  state: {
    pathAccount: "account",
    pathDiscover: "discover",
    pathDownloadNoWatermark: "download-no-watermark",
    pathDouyin: "douyin",
    pathInstagram: "instagram",
    previewData: {},
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
    setPreviewData(state, payload) {
      state.previewData = payload;
    },
    setPreviewTiktokData(state, payload) {
      state.previewTiktokData = payload;
      state.previewTiktokPayload.channel = null;
      state.previewTiktokPayload.description = payload.desc;
      state.previewTiktokPayload.medias = [];
      state.previewTiktokPayload.product = null;
    },
  },
  actions: {
    ...tiktok,
    ...instagram,
  },
};
