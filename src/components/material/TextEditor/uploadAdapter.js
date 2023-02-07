import moment from 'moment'
import { storeOss } from '../../../plugins/httpRequest';
export default class UploadAdapter {
  constructor(loader) {
    this.loader = loader;
  }
  upload() {
    return this.loader.file
      .then((uploadedFile) => {
        const fileType = uploadedFile.type.split("/")[1]
        const currentDateEpoch = moment(new Date).valueOf()
        const filePath = `/img/tmp/media/${currentDateEpoch}.${fileType}`
        return storeOss.put(filePath, uploadedFile)
      .then(response=> {
        console.log(response)
        return {
          default : `${response.url}?x-oss-process=image/resize,m_pad,h_180,w_300,color_181818`
        }
      })
    });
  }
}