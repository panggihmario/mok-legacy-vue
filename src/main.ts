import { createApp, markRaw } from 'vue'
import { createPinia } from 'pinia'
import router from "./router/index"
import App from './App.vue'
// import "./styles/index.scss"
import Components from './components'
import { useApiStore } from "@/stores/api";
const Main = createApp(App)
const pinia = createPinia()


Components.register(Main)

Main.use(pinia)
Main.use(router)
pinia.use(({ store }) => {
  store.router = markRaw(router)
});
// const store = useApiStore()
Main.mount('#mok')
