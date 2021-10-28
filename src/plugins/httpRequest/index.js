import axios from 'axios'
import Vue from 'vue'
import store from '../../store'

const BASE_URL = process.env.VUE_APP_BASE_URL
// const BASE_URL = 'https://stg-api-main.kipaskipas.com/api/v1/'
const BASE_UPLOAD_URL = process.env.VUE_APP_UPLOAD
const getToken = () => {
	const token = store.state.authentication.token
	return token
  // return window.localStorage.getItem("persada_token");
}

export const serviceWithoutToken = () => axios.create({
  baseURL: BASE_URL,
  timeout: 60 * 4 * 1000,
  headers: {
    "Content-Type": `application/json`,
  }
});

const serviceWithToken = (token = getToken()) => axios.create({
  baseURL: BASE_URL,
  timeout: 60 * 4 * 1000,
  headers: {
    Authorization: "Bearer " + token,
    "Content-Type": `application/json`
	},
});

const serviceUpload = () => axios.create({
  baseURL : BASE_UPLOAD_URL,
  timeout: 60 * 4 * 1000,
  headers: {
    "Content-Type": `application/json`,
  }
})

const exportFile = (token = getToken()) => axios.create({
  baseURL: BASE_URL,
  timeout: 60 * 4 * 1000,
  responseType : 'blob',
  headers: {
    Authorization: "Bearer " + token,
    "Content-Type": `application/json`
	},
});

const getWithToken = (payload) => serviceWithToken().get(payload.url, {
  params : payload.params
})

Vue.prototype.$http = serviceWithoutToken
Vue.prototype.$httpWithToken = serviceWithToken
Vue.prototype.$httpUpload = serviceUpload
Vue.prototype.$httpDownload = exportFile

Vue.prototype.$fetchWithToken = getWithToken