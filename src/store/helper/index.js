import moment from 'moment'
export default {
  namespaced : true,
  actions : {
    convertToHumanDate (ctx, payload) {
      const cek = moment(payload).format("DD/MM/YYYY HH:mm");
      return cek;
    }
  }
}