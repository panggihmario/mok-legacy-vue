import axios from 'axios'

export default class UploadAdapter {
  constructor(loader) {
    this.loader = loader;
  }
  upload() {
    return this.loader.file.then((uploadedFile) => {
      return new Promise((resolve, reject) => {
        const uploadApi = process.env.VUE_APP_UPLOAD
        const data = new FormData()
        data.append('file', uploadedFile)
        axios.post(`${uploadApi}/medias`,data)
        .then(response => {
          let url
          const responseData = response.data
          const widthUrl = Number(responseData.metadata.width)
          if(widthUrl > 638){
            url = `${responseData.url}?x-oss-process=image/resize,m_lfit,w_638`
          }else{
            url = responseData.url
          }
          resolve({
            default : url
          })
        })
        .catch(error => {
          reject('Upload Failed')
        })
      })
    });
  }

  abort() {}
}