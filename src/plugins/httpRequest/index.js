import axios from "axios";
import Vue from "vue";
import store from "../../store";
import * as OSS from 'ali-oss'
const COS = require('cos-js-sdk-v5');
const storeOss = new OSS({
  accessKeyId: process.env.VUE_APP_ACCESS_KEY_ID_OSS,
  accessKeySecret: process.env.VUE_APP_ACCESS_KEY_SECRET,
  bucket: process.env.VUE_APP_BUCKET_OSS,
  endpoint: process.env.VUE_APP_ENDPOINT,
});

const cos = new COS({
  SecretId: process.env.VUE_APP_TENCENT_SECRET_ID, // User `SecretId`. We recommend you obtain it from the environment variable. In addition, we recommended you use a sub-account key and follow the principle of least privilege to reduce risks. For information about how to obtain a sub-account key, visit https://www.tencentcloud.com/document/product/598/37140?from_cn_redirect=1.
  SecretKey: process.env.VUE_APP_TENCENT_SECRET_KEY, // User `SecretKey`. We recommend you obtain it from the environment variable. In addition, we recommend you use a sub-account key and follow the principle of least privilege to reduce risks. For information about how to obtain a sub-account key, visit https://www.tencentcloud.com/document/product/598/37140?from_cn_redirect=1.
  Domain : process.env.VUE_APP_TENCENT_DOMAIN
});

const BASE_URL = process.env.VUE_APP_BASE_URL;
// const BASE_URL = 'https://stg-api-main.kipaskipas.com/api/v1/'
const BASE_UPLOAD_URL = `${process.env.VUE_APP_UPLOAD}`;
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

const serviceWithToken = (token = getToken()) =>
  axios.create({
    baseURL: BASE_URL,
    timeout: 60 * 4 * 1000,
    headers: {
      Authorization: "Bearer " + token,
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

const getTiktokWithoutToken = (payload) => {
  return serviceTiktokWithoutToken().get(payload.url, {
    params: payload.params,
  });
};

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
Vue.prototype.$storeOss = storeOss

Vue.prototype.$fetchTiktokWithoutToken = getTiktokWithoutToken;

export {
  storeOss,
  cos
}
