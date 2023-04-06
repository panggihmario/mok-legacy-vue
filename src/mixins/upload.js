import moment from "moment"
import { cos } from "../plugins/httpRequest"
export default {
  data () {
    return {
      asetKipas: "https://asset.kipaskipas.com",
      dataResponse: {
        id: null,
        type: "",
        url: "",
        thumbnail: {},
        metadata: {},
      },
    }
  },
  methods : {
    uploadWithTencent ({file,typeMedia, dimensions}) {
      const currentDateEpoch = moment(new Date).valueOf()
      const fileType = file.type.split("/")[1]
      const filePath = `tmp/source/${currentDateEpoch}.${fileType}`
      const protocol = window.location.protocol
      return cos.uploadFile({
        Bucket: process.env.VUE_APP_TENCENT_BUCKET,
        Region: process.env.VUE_APP_TENCENT_REGION, 
        Key: filePath,
        Body: file, 
        onProgress: function (progressData) {
          // console.log(JSON.stringify(progressData));
        }
      })
      .then(response => {
        const urlResponse = `${protocol}//${response.Location}`
        this.dataResponse.url = urlResponse
        return this.createThumbnail(file, 0.0)
      })
      .then((thumbnail) => {
        const temp = {
          ...this.dataResponse,
          thumbnail,
          type : 'video',
          metadata: {
            width: dimensions.width,
            height: dimensions.height,
            size: file.size
          }
        };
        this.dataResponse = temp;
        let result = {
          response: temp,
          status: "success",
        };
        return result
      })
      .catch(err => {
        console.log(err)
        throw err
        
      })
    },
    createThumbnail(file, seekTo) {
      const currentDateEpoch = moment(new Date()).valueOf();
      const filePath = `/img/tmp/media/${currentDateEpoch}.jpg`;
      let response;
      return this.drawImageOnCanvas(file, seekTo)
        .then((base64data) => {
          const d = this.dataURLtoFile(base64data, `${+new Date()}.jpg`);
          return this.$storeOss.put(filePath, d);
        })
        .then((resp) => {
          response = resp;
          return this.$storeOss.putACL(filePath, "public-read");
        })
        .then(() => {
          const urlObject = new URL(response.url)
          const nameUrl = response.name.split('/')
          nameUrl.splice(1, 1)
          const pathTemp = nameUrl.join('/')
          const pathThumbnail = `${urlObject.origin}/${pathTemp}`
          if (process.env.VUE_APP_SERVER_STATUS === "production") {
            const url = `${this.asetKipas}/${response.name}`
            const thumbUrl = `${this.asetKipas}/${pathTemp}`
            return {
              large: url,
              medium: thumbUrl,
              small: thumbUrl
            }
          } else {
            return {
              large: response.url,
              medium: pathThumbnail,
              small: pathThumbnail
            }
          }
        });
    },
    drawImageOnCanvas(file, seekTo) {
      return new Promise((resolve, reject) => {
        const videoPlayer = document.createElement("video");
        videoPlayer.setAttribute("src", URL.createObjectURL(file));
        videoPlayer.crossOrigin = "anonymous";
        videoPlayer.load();
        videoPlayer.addEventListener("error", (ex) => {
          reject("error when loading video file", ex);
        });

        videoPlayer.addEventListener("loadedmetadata", () => {
          if (videoPlayer.duration < seekTo) {
            reject("video is too short.");
            return;
          }
          setTimeout(() => {
            videoPlayer.currentTime = seekTo;
          }, 200);
          videoPlayer.addEventListener("seeked", () => {
            const canvas = document.createElement("canvas");
            canvas.width = videoPlayer.videoWidth;
            canvas.height = videoPlayer.videoHeight;
            const ctx = canvas.getContext("2d");
            ctx.drawImage(videoPlayer, 0, 0, canvas.width, canvas.height);
            ctx.canvas.toBlob(
              (blob) => {
                var reader = new FileReader();
                reader.readAsDataURL(blob);
                reader.onloadend = function () {
                  var base64data = reader.result;
                  resolve(base64data);
                };
              },
              "image/jpeg",
              0.75 /* quality */
            );
          });
        });
      });
    },
    dataURLtoFile(dataurl, filename) {
      let arr = dataurl.split(",");
      let mime = arr[0].match(/:(.*?);/)[1];
      let bstr = atob(arr[1]);
      let n = bstr.length;
      let u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], filename, { type: mime });
    },
  }
}