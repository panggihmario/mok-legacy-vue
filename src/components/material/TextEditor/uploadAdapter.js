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
          console.log(response)
          resolve({
            default : response.data.url
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