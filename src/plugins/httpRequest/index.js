import axios from "axios";
import Vue from "vue";
import store from "../../store";

const BASE_URL = process.env.VUE_APP_BASE_URL;
// const BASE_URL = 'https://api-main.kipaskipas.com/api/v1/'
const BASE_UPLOAD_URL = process.env.VUE_APP_UPLOAD;
const BASE_TIKTOK_URL = "http://localhost:3000";
const BASE_TIKTOK_NO_WATERMARK_URL =
  "https://tiktok-download-video-no-watermark.p.rapidapi.com";

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

const serviceTiktokDownloadWithoutWatermark = () => {
  return axios.create({
    baseURL: BASE_TIKTOK_NO_WATERMARK_URL,
    timeout: 60 * 4 * 1000,
    headers: {
      "Content-Type": `application/json`,
      "X-RapidAPI-Host": "tiktok-download-video-no-watermark.p.rapidapi.com",
      "X-RapidAPI-Key": "5cda19a5eemsh647f0ee4baabbdcp152048jsn1853aed6d5f7",
    },
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

const downloadTiktokWithoutWatermark = (payload) => {
  return serviceTiktokDownloadWithoutWatermark().get(payload.url, {
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

Vue.prototype.$fetchDownloadTiktokWithoutWatermark = downloadTiktokWithoutWatermark;
