import { createApp, markRaw } from 'vue'
import { createPinia } from 'pinia'
import router from "./router/index"
import App from './App.vue'
import "./styles/index.scss"
import Components from './components'


const Main = createApp({
  extends : App,
})
const pinia = createPinia()
pinia.use(({ store }) => {
  store.router = markRaw(router)
});

Components.register(Main)

Main.use(pinia)

Main.use(router)
Main.mount('#mok')
