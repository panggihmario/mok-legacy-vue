import methods from "./actions";
export default {
  namespaced: true,
  state: {
    pathAccount: "admin/accounts",
    pathFeed: "profile/post",
    pathAccountSearch: "search/account",
  },
  actions: {
    ...methods,
    printSuccess(ctx, response) {
      const responseData = response.data.data;
      return responseData;
    },
    printError(ctx, err) {
      throw err;
    },
    async getListRespone({ state }, payload) {
      let response;
      try {
        response = await this._vm
          .$httpWithToken()
          .get(`${state.pathAccount}/${payload.type}`, {
            // params : {
            // 	page : payload.page || 0
            // },
            params: { ...payload.param },
          });
        return response;
      } catch (error) {
        return error;
      }
    },
    async getListRole({ state }) {
      let response;
      try {
        response = await this._vm
          .$httpWithToken()
          .get(`${state.pathAccount}/roles`);
        return response;
      } catch (error) {
        return error;
      }
    },
    async createAdmin({ state }, payload) {
      let response;
      try {
        response = await this._vm
          .$httpWithToken()
          .post(`${state.pathAccount}/management`, payload);
        return response;
      } catch (error) {
        return error;
      }
    },
    async createUser({ state }, payload) {
      let response;
      try {
        response = await this._vm
          .$httpWithToken()
          .post(`${state.pathAccount}/users`, payload);
        return response;
      } catch (error) {
        return error;
      }
    },
    async searchAccount({ state }, payload) {
      let response;
      try {
        response = await this._vm
          .$httpWithToken()
          .get(
            `${state.pathAccount}/${payload.type}/search?value=${payload.params}`,
            {params : {...payload.data}}
          );
        return response;
      } catch (error) {
        throw error;
      }
    },
    async getAccountById({ state }, payload) {
      let response;
      try {
        response = await this._vm
          .$httpWithToken()
          .get(`${state.pathAccount}/${payload.type}/${payload.id}`);
        return response;
      } catch (error) {
        return error;
      }
    },
    async updateAccount({ state }, payload) {
      let response;
      try {
        response = await this._vm
          .$httpWithToken()
          .put(`${state.pathAccount}/${payload.id}`, payload.data);
        return response;
      } catch (error) {
        return error;
      }
    },
    async deleteAccount({ state }, payload) {
      let response;
      try {
        response = await this._vm
          .$httpWithToken()
          .delete(`${state.pathAccount}/${payload}`);
        return response;
      } catch (error) {
        return error;
      }
    },
    async deleteUser({ state }, payload) {
      let response;
      try {
        response = await this._vm
          .$httpWithToken()
          .delete(`${state.pathAccount}/${payload}/deleted`);
        return response;
      } catch (error) {
        return error;
      }
    },
    searchUser({ state }, payload) {
      let response;
      try {
        response = this._vm
          .$httpWithToken()
          .get(`${state.pathAccountSearch}/username?value=${payload}`);
        return response;
      } catch (error) {
        return error;
      }
    },
  },
};
