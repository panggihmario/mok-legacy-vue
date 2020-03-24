import axios from 'axios'
import Vue from 'vue'

// const BASE_URL = process.env.VUE_APP_BASE_URL_API
// const BASE_URL = 'http://192.168.11.106:8300'
const BASE_URL = 'http://bc2f5ec1.ngrok.io'
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1ODQzNDM3MDUsInVzZXJfbmFtZSI6InJhamFrdWlzaW4iLCJhdXRob3JpdGllcyI6WyJST0xFX0FETUlOIl0sImp0aSI6IjI3ZjA2M2EwLTJlZGUtNGViYS05ZjRhLTVhY2Y0Z"

const apiMethod = function (config) {
	return axios.create({
		baseURL : BASE_URL,
		headers : {
			timeout : 2000,
			"Content-type" : "application/x-www-form-urlencoded",
		},
		...config
	})
}

const apiWithToken = axios.create({
	baseURL : BASE_URL,
	headers : {
		timeout : 2000,
		"Content-type" : "application/json",
		Authorization : "Bearer " + token
	}
})

Vue.prototype.$http = apiMethod()
Vue.prototype.$httpWithToken = apiWithToken