export default {
  namespaced: true,
  state: {
    pathComplaint: "admin/complaints",
    pathComplaintList: "admin/complaints/list",
  },
  actions: {
    async getListComplaint({ state }, payload) {
      let response;
      try {
        response = await this._vm
          .$httpWithToken()
          .get(
            `${state.pathComplaintList}/${payload.type}/${payload.status}`,
            payload.params
          );
        return response;
      } catch (error) {
        throw error;
      }
    },
    async getComplaintById({ state }, payload) {
      let response;
      try {
        response = await this._vm
          .$httpWithToken()
          .get(`${state.pathComplaint}/${payload.id}`);
        return response;
      } catch (error) {
        return error;
      }
    },
    async postComplaintProcess({ state }, payload) {
      let response;
      try {
        response = await this._vm
          .$httpWithToken()
          .post(`${state.pathComplaint}/process`, payload);
        return response;
      } catch (error) {
        return error;
      }
    },
    async putComplaintFinish({ state }, payload) {
      let response;
      try {
        response = await this._vm
          .$httpWithToken()
          .put(`${state.pathComplaint}/finish`, payload);
        return response;
      } catch (error) {
        return error;
      }
    },
  },
};
