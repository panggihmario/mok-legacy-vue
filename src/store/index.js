import Vue from "vue";
import Vuex from "vuex";
import authentication from "./authentication";
import channel from "./channel";
import news from "./news";
import post from "./Post";
import donation from "./donation";
import donationCategory from "./donation/category";
import donationBadge from "./donation/badge";
import account from "./account";
import complaint from "./complaint";
import report from "./report";
import ads from "./ads";
import product from "./product";
import finance from "./finance";
import order from "./order";
import dashboard from "./dashboard";
import trending from "./trending";
import tiktok from "./tiktok";
import masterCategory from "./master/category";
import manageHashtag from "./manage/hashtag";
import master from "./master";
import productCategory from "./product/category";
import helper from "./helper";
import area from "./area";
import instagram from "./instagram";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  modules: {
    authentication,
    channel,
    news,
    post,
    donation,
    donationCategory,
    donationBadge,
    account,
    complaint,
    report,
    ads,
    product,
    finance,
    order,
    dashboard,
    trending,
    tiktok,
    masterCategory,
    manageHashtag,
    master,
    productCategory,
    helper,
    area,
    instagram,
  },
  state: {
    packageVersion: process.env.VUE_APP_VERSION || 0,
    viewNews: false,
    previewTiktok: false,
    previewTiktokSuccess: false,
    previewTiktokFailed: false,
  },
  mutations: {
    setViewNews(state, payload) {
      state.viewNews = payload;
    },
    setPreviewTiktok(state, payload) {
      state.previewTiktok = payload;
    },
    setPreviewTiktokSuccess(state, payload) {
      state.previewTiktokSuccess = payload;
    },
    setPreviewTiktokFailed(state, payload) {
      state.previewTiktokFailed = payload;
    },
  },
  getters: {
    appVersion: (state) => {
      return state.packageVersion;
    },
  },
  actions: {
    changeStatusViewNews({ commit }, params) {
      commit("setViewNews", params);
    },
    changeStatusPreviewTiktok({ commit }, params) {
      commit("setPreviewTiktok", params);
    },
    changeStatusPreviewTiktokSuccess({ commit }, params) {
      commit("setPreviewTiktokSuccess", params);
    },
    changeStatusPreviewTiktokFailed({ commit }, params) {
      commit("setPreviewTiktokFailed", params);
    },
    getWithToken(ctx, data) {
      return this._vm.$httpWithToken().get(data.url, {
        params: { ...data.params },
      });
    },
    postWithToken(ctx, params) {
      return this._vm.$httpWithToken().post(params.url, params.data);
    },
    putWithToken(ctx, params) {
      return this._vm.$httpWithToken().put(params.url, params.data);
    },
    deleteWithToken(ctx, params) {
      return this._vm.$httpWithToken().delete(params.url);
    },
  },
});
