export default {
  namespaced: true,
  state: {
    pathChannel: "admin/channel",
  },
  actions: {
    async getListChannel({ state }, payload) {
      let response;
      try {
        response = await this._vm.$httpWithToken().get(state.pathChannel, {
          params: {
            page: payload.page,
          },
        });
        return response;
      } catch (error) {
        return error;
      }
    },
    async getListChannelPinned({ state }, payload) {
      let response;
      try {
        response = await this._vm
          .$httpWithToken()
          .get(`${state.pathChannel}/pinned`, {
            params: {
              size: payload.size,
              page: payload.page,
            },
          });
        return response;
      } catch (error) {
        return error;
      }
    },
    async createChannelPinned({ state }, payload) {
      let response;
      try {
        response = await this._vm
          .$httpWithToken()
          .post(`${state.pathChannel}/pinned`, payload);
        return response;
      } catch (error) {
        return error;
      }
    },
    async getAllChannel({ state }) {
      let response;
      try {
        response = await this._vm
          .$httpWithToken()
          .get(`${state.pathChannel}/list`);
        return response;
      } catch (error) {
        return error;
      }
    },
    async createChannel({ state }, payload) {
      let response;
      try {
        response = await this._vm
          .$httpWithToken()
          .post(state.pathChannel, payload);
        return response;
      } catch (error) {
        return error;
      }
    },
    async deleteChannel({ state }, payload) {
      let response;
      try {
        response = await this._vm
          .$httpWithToken()
          .delete(`${state.pathChannel}/${payload}`);
        return response;
      } catch (error) {
        return error;
      }
    },
    async editChannel({ state }, payload) {
      let response;
      try {
        response = await this._vm
          .$httpWithToken()
          .put(`${state.pathChannel}/${payload.id}`, payload);
        return response;
      } catch (error) {
        return error;
      }
    },
    async searchChannel({ state }, payload) {
      let response;
      try {
        response = await this._vm
          .$httpWithToken()
          .get(`${state.pathChannel}/search`, {
            params: {
              page: payload.page,
              name: payload.search,
              size : payload.size
            },
          });
        return response;
      } catch (error) {
        return error;
      }
    },
    async getChannelById({ state }, payload) {
      let response;
      try {
        response = await this._vm
          .$httpWithToken()
          .get(`${state.pathChannel}/${payload}`);
        return response;
      } catch (error) {
        return error;
      }
    },
  },
};
