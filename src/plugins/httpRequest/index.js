import axios from 'axios'
import Vue from 'vue'
import store from '../../store'

const BASE_URL = process.env.VUE_APP_BASE_URL
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

Vue.prototype.$http = serviceWithoutToken
Vue.prototype.$httpWithToken = serviceWithToken