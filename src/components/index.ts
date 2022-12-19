import { App } from 'vue';

const register = (app: App<Element>): void => {
  const modules = import.meta.glob<{ default: any }>('./material/**/*.vue', { eager: true })
  Object.entries(modules).forEach(([path, definition]) => {
    // Get name of component, based on foldername
    // "./Fruits/index.vue" will become "Fruits"
    // const componentName: string = path?.split('/')?.pop()?.replace(/\.\w+$/, '')!
    const componentName : string = path.split('/').reverse()[1].replace(/\.\w+$/, '')
    // Register component on this Vue instance
    app.component(componentName, definition.default)
  })
}
export default {
  register
}


