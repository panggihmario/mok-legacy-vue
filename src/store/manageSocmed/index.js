import methods from "./actions"
import states from "./state"
export default {
  namespaced : true,
  state : {
    ...states
  },
  actions : {
    ...methods
  }
}