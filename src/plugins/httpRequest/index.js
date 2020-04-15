import axios from 'axios'
import Vue from 'vue'

const BASE_URL = 'https://test.api.persada-entertainment.com/main/v0/'
const getToken = () => {
  return window.localStorage.getItem("persada_token");
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

Vue.prototype.$http = serviceWithoutToken
Vue.prototype.$httpWithToken = serviceWithToken