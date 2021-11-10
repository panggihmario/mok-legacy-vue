import axios from 'axios'
export default {
  namespaced : true,
  state :{
    pathTrending : 'admin/trending'
  },
  actions : {
    checkHashtag({state}, payload) {
      return axios.get(`http://ef6c-112-215-235-158.ngrok.io/${state.pathTrending}/checkTrending`,{
        params : {
          value : payload
        }
      })
      .then(response => {
        console.log(response)
      })
      .catch(err => {
        console.log(err.response)
      })
    }
  }
}