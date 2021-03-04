import Axios from "axios";

export default {
  namespaced : true,
  state : {
    pathFinance : "admin/journals"
  },
  actions : {
    async getJournalByDate ({state}, payload) {
      let response;
      const method = 'GET'
      const url = `${state.pathFinance}/export`
      console.log(payload)
      
      try {
        response = await this._vm.$httpDownload().get(`${state.pathFinance}/export`, {
          params : {...payload}
        })
        return response
      } catch (error) {
        return error
      }
    }
  }
}