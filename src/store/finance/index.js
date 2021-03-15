import Axios from "axios";

export default {
  namespaced : true,
  state : {
    pathFinance : "admin/finance/journals"
  },
  actions : {
    async getJournalByDate ({state}, payload) {
      let response;
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