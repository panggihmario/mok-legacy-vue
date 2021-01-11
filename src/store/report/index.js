export default {
  namespaced: true,
  state: {
    pathReport: "admin/reports/reason",
  },
  actions: {
    async getListReportByType({ state }, payload) {
      let response;
      try {
        response = await this._vm
          .$httpWithToken()
          .get(`${state.pathReport}/${payload.type}`);
        return response;
      } catch (error) {
        return error;
      }
    },
  },
};
