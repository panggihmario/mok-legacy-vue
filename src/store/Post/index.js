export default {
  namespaced: true,
  state: {
    pathPost: "feeds/post",
  },
  actions: {
    async posting({ state }, payload) {
      let response;
      try {
        response = await this._vm
          .$httpWithToken()
          .post(`member/${state.pathPost}/${payload.typePost}`, payload.params);
        return response;
      } catch (error) {
        return error;
      }
    },
    async getListFeed({ state, dispatch }, payload) {
      let response;
      try {
        response = await dispatch(
          "getWithToken",
          `member/${state.pathPost}/profile?page=${payload.page}`,
          { root: true }
        );
        return response;
      } catch (error) {
        return error;
      }
    },
    async postProduct({ state }, payload) {
      let response;
      try {
        response = await this._vm
          .$httpWithToken()
          .post(`${state.pathPost}/product`, payload);
        return response;
      } catch (error) {
        return error;
      }
    },
    async deletePost({ state }, payload) {
      let response;
      try {
        response = await this._vm
          .$httpWithToken()
          .delete(`member/feeds/${payload}`);
        return response;
      } catch (error) {
        return error;
      }
    },
  },
};
