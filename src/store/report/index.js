export default {
  namespaced: true,
  state: {
    pathReport: "admin/reports",
  },
  actions: {
    async getListReasonByType({ state }, payload) {
      let response;
      try {
        response = await this._vm
          .$httpWithToken()
          .get(`${state.pathReport}/${payload.type}/reasons`);
        return response;
      } catch (error) {
        return error;
      }
    },
    async getListReportByType({ state }, payload) {
      let response;
      try {
        response = await this._vm
          .$httpWithToken()
          .get(`${state.pathReport}/${payload.type}`, {
            params: {
              username: payload.username,
              filter: payload.filter,
              size: payload.size,
              page: payload.page,
            },
          });
        return response;
      } catch (error) {
        return error;
      }
    },
    async getDetailReasonOther({ state }, payload) {
      let response;
      try {
        response = await this._vm
          .$httpWithToken()
          .get(
            `${state.pathReport}/${payload.reportId}/reasons/${payload.reasonId}`,
            {
              params: {
                size: payload.size,
                page: payload.page,
                sort: payload.sort,
              },
            }
          );
        return response;
      } catch (error) {
        return error;
      }
    },
    async reportPassed({ state }, payload) {
      let response;
      try {
        response = await this._vm
          .$httpWithToken()
          .put(`${state.pathReport}/${payload.reportId}/pass`);
        return response;
      } catch (error) {
        return error;
      }
    },
    async reportDelete({ state }, payload) {
      console.log("store", payload);
      let response;
      try {
        response = await this._vm
          .$httpWithToken()
          .delete(`${state.pathReport}/${payload.reportId}`, {
            data: payload.params,
          });
        return response;
      } catch (error) {
        return error;
      }
    },
  },
};
