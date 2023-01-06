import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from "./router/index"
import App from './App.vue'
import "./styles/index.scss"
import Components from './components'
import { useApiStore } from './stores/api'

const Main = createApp({
  extends : App,
})
const pinia = createPinia()

Components.register(Main)

Main.use(pinia)
const store = useApiStore()
store.interceptorRequest()
store.interceptorResponse()



Main.use(router)
Main.mount('#mok')
