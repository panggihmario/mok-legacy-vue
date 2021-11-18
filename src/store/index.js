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
import product from "./product";
import finance from "./finance";
import order from "./order";
import dashboard from "./dashboard";
import trending from "./trending";
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    authentication,
    channel,
    news,
    post,
    donation,
    account,
    complaint,
    report,
    ads,
    product,
    finance,
    order,
    dashboard,
    trending
  },
  state: {
    packageVersion: process.env.VUE_APP_VERSION || 0,
    viewNews : false
  },
  mutations : {
    setViewNews (state, payload) {
      state.viewNews = payload
    }
  },
  getters: {
    appVersion: (state) => {
      return state.packageVersion;
    },
  },
  actions: {
    changeStatusViewNews({commit}, params) {
      commit('setViewNews', params)
    },
    getWithToken(ctx, data) {
      return this._vm.$httpWithToken().get(data.url,{
        params : {...data.params}
      })
    },
    postWithToken(ctx, params) {
      return this._vm.$httpWithToken().post(params.url, params.data)
    },
    putWithToken(ctx, params) {
      return this._vm.$httpWithToken().put(params.url, params.data);
    },
    deleteWithToken(ctx, params) {
      return this._vm.$httpWithToken().delete(params);
    },
  },
});
