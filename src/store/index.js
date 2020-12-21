import Vue from "vue";
import Vuex from "vuex";
import authentication from "./authentication";
import channel from "./channel";
import news from "./news";
import post from "./Post";
import donation from "./donation";
import account from "./account";
import complaint from "./complaint";
import report from "./report";
import ads from "./ads";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    authentication: authentication,
    channel: channel,
    news: news,
    post: post,
    donation: donation,
    account,
    complaint,
    report,
    ads: ads,
  },
  state: {
    packageVersion: process.env.VUE_APP_VERSION || 0,
  },
  getters: {
    appVersion: (state) => {
      return state.packageVersion;
    },
  },
  actions: {
    getWithToken(ctx, params) {
      return this._vm.$httpWithToken().get(params);
    },
    postWithToken(ctx, params) {
      return this._vm.$httpWithToken().post(params.url, params.data);
    },
    putWithToken(ctx, params) {
      return this._vm.$httpWithToken().put(params.url, params.data);
    },
    deleteWithToken(ctx, params) {
      return this._vm.$httpWithToken().delete(params);
    },
  },
});
