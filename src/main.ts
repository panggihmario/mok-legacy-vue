import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from "./router/index"
import App from './App.vue'
import "./styles/index.scss"
import Components from './components'

const Main = createApp(App)
const pinia = createPinia()

Components.register(Main)

Main.use(pinia)
Main.use(router)
Main.mount('#mok')
