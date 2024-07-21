import axios from "axios";
import Vue from "vue";
import store from "../../store";
import * as OSS from 'ali-oss'


const BASE_URL = process.env.VUE_APP_BASE_URL;
// const BASE_URL = 'https://stg-api-main.kipaskipas.com/api/v1/'
const BASE_UPLOAD_URL = `${process.env.VUE_APP_UPLOAD}`;
const BASE_TIKTOK_URL = process.env.VUE_APP_BASE_TIKTOK_URL;

const getToken = () => {
  const token = store.state.authentication.token;
  return token;
};
const versionApp = store.getters.appVersion
export const serviceWithoutToken = () =>
  axios.create({
    baseURL: BASE_URL,
    timeout: 10 * 1000,
    headers: {
      "Content-Type": `application/json`,
    },
  });

const serviceWithToken = (token = getToken()) =>
  axios.create({
    baseURL: BASE_URL,
    timeout: 40 * 1000,
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": `application/json`,
    },
  });

const serviceTiktokWithoutToken = () => {
  return axios.create({
    baseURL: BASE_TIKTOK_URL,
    timeout: 30 * 1000,
    headers: {
      "Content-Type": `application/json`,
    },
  });
};

const getTiktokWithoutToken = (payload) => {
  return serviceTiktokWithoutToken().get(payload.url, {
    params: payload.params,
  });
};

const serviceUpload = () =>
  axios.create({
    baseURL: BASE_UPLOAD_URL,
    timeout: 10 * 1000,
    headers: {
      "Content-Type": `application/json`,
    },
  });

const exportFile = (token = getToken()) =>
  axios.create({
    baseURL: BASE_URL,
    timeout: 10 * 1000,
    responseType: "blob",
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": `application/json`,
    },
  });

const getWithToken = (payload) =>
  serviceWithToken().get(payload.url, {
    params: payload.params,
  });

Vue.prototype.$http = serviceWithoutToken;
Vue.prototype.$httpWithToken = serviceWithToken;
Vue.prototype.$httpUpload = serviceUpload;
Vue.prototype.$httpDownload = exportFile;

Vue.prototype.$fetchWithToken = getWithToken;
Vue.prototype.$storeOss = storeOss

Vue.prototype.$fetchTiktokWithoutToken = getTiktokWithoutToken;

export {
  storeOss,
  cos
}
