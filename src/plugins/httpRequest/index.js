import axios from "axios";
import Vue from "vue";
import store from "../../store";

const BASE_URL = process.env.VUE_APP_BASE_URL;
const BASE_UPLOAD_URL = process.env.VUE_APP_UPLOAD;
const BASE_TIKTOK_URL = process.env.VUE_APP_BASE_TIKTOK_URL;

const getToken = () => {
  const token = store.state.authentication.token;
  return token;
};

export const serviceWithoutToken = () =>
  axios.create({
    baseURL: BASE_URL,
    timeout: 60 * 4 * 1000,
    headers: {
      "Content-Type": `application/json`,
    },
  });

const serviceTiktokWithoutToken = () => {
  return axios.create({
    baseURL: BASE_TIKTOK_URL,
    timeout: 60 * 4 * 1000,
    headers: {
      "Content-Type": `application/json`,
    },
  });
};

const serviceTiktokWithoutTokenWithBlob = () => {
  return axios.create({
    baseURL: BASE_TIKTOK_URL,
    timeout: 60 * 4 * 1000,
    headers: {
      "Content-Type": `application/json`,
    },
    responseType: "blob",
  });
};

const getTiktokWithoutToken = (payload) => {
  return serviceTiktokWithoutToken().get(payload.url, {
    params: payload.params,
  });
};

const downloadTiktokWithoutToken = (payload) => {
  return serviceTiktokWithoutTokenWithBlob().get(payload.url, {
    params: payload.params,
  });
};

const serviceWithToken = (token = getToken()) =>
  axios.create({
    baseURL: BASE_URL,
    timeout: 60 * 4 * 1000,
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": `application/json`,
    },
  });

const serviceUpload = () =>
  axios.create({
    baseURL: BASE_UPLOAD_URL,
    timeout: 60 * 4 * 1000,
    headers: {
      "Content-Type": `application/json`,
    },
  });

const exportFile = (token = getToken()) =>
  axios.create({
    baseURL: BASE_URL,
    timeout: 60 * 4 * 1000,
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

Vue.prototype.$fetchTiktokWithoutToken = getTiktokWithoutToken;
Vue.prototype.$fetchDownloadTiktokWithoutToken = downloadTiktokWithoutToken;
