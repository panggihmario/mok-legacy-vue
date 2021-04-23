export default {
  namespaced: true,
  state: {
    pathOrders: "admin/orders",
    pathOrdersTransaction: "admin/orders/transaction",
    pathOrdersShipment: "admin/orders/shipments/logistic/track/search",
  },
  actions: {
    async getOrderCount({ state }) {
      let response;
      try {
        response = await this._vm
          .$httpWithToken()
          .get(`${state.pathOrders}/count`);
        return response;
      } catch (error) {
        return error;
      }
    },
    async getListOrderByType({ state }, payload) {
      let response;
      try {
        response = await this._vm
          .$httpWithToken()
          .get(`${state.pathOrdersTransaction}/${payload.type}`, {
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
    async getOrderById({ state }, payload) {
      let response;
      try {
        response = await this._vm
          .$httpWithToken()
          .get(`${state.pathOrders}/${payload}`);
        return response;
      } catch (error) {
        return error;
      }
    },
    async getOrderShipmentById({ state }, payload) {
      let response;
      try {
        response = await this._vm
          .$httpWithToken()
          .get(`${state.pathOrdersShipment}`, {
            params: {
              orderId: payload,
            },
          });
        return response;
      } catch (error) {
        return error;
      }
    },
    async getOrderSearch({ state }, payload) {
      // search by noInvoice / sellerName / receiverName
      let response;
      try {
        response = await this._vm
          .$httpWithToken()
          .get(`${state.pathOrders}/search`, {
            params: {
              value: payload,
            },
          });
        return response;
      } catch (error) {
        return error;
      }
    },
  },
};
