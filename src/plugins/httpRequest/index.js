import axios from 'axios'
import Vue from 'vue'

const BASE_URL = 'https://test.api.persada-entertainment.com/main/v0/'
const getToken = () => {
  return window.localStorage.getItem("token");
}

const serviceWithoutToken = function (config) {
	return axios.create({
		baseURL: BASE_URL,
		timeout: 60 * 4 * 1000,
		headers: {
			"Content-type": `application/json`,
		},
		...config
	})
}

const ssrviceWithToken = function (config, token = getToken()) {
	return axios.create({
		baseURL: BASE_URL,
		timeout: 60 * 4 * 1000,
		headers: {
			"Content-type": `application/json`,
			Authorization: "Bearer " + token,
		},
		...config
	})
}

Vue.prototype.$http = serviceWithoutToken()
Vue.prototype.$httpWithToken = ssrviceWithToken()