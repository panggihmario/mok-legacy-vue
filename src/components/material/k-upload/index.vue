<template>
  <div>
    <input type="file" id="upload" class="none" @change="onLoad" />
    <div :class="upload.button" @click="handleClick" v-if="type === 'button'">
      <i class="fa-solid fa-cloud-arrow-up"></i>
      <span>Upload Foto</span>
    </div>
    <div v-else :class="upload['box-dashed']" @click="handleClick">
      <div :class="upload['flex-gap']">
        <i class="fa-solid fa-cloud-arrow-up"></i>
        <span>Upload Foto</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import OSS from 'ali-oss';
import moment from "moment"
import { toRefs, reactive } from 'vue';
import { ResponseUpload } from "@/models"
interface Dimensions {
  height: number,
  width: number
}
const {
  VITE_APP_ACCESS_KEY_ID_OSS,
  VITE_APP_ACCESS_KEY_SECRET,
  VITE_APP_BUCKET_OSS,
  VITE_APP_ENDPOINT,
  VITE_APP_SERVER_STATUS
} = import.meta.env;

const storeOss = new OSS({
  accessKeyId: VITE_APP_ACCESS_KEY_ID_OSS,
  accessKeySecret: VITE_APP_ACCESS_KEY_SECRET,
  bucket: VITE_APP_BUCKET_OSS,
  endpoint: VITE_APP_ENDPOINT,
});

const urlMedia = 'https://asset.kipaskipas.com'

const props = defineProps({
  type: String,
  label: String,
  id: String,
  minVideoHeight: {
    type: Number,
    default: 200
  }
})

// type-based
const emit = defineEmits<{
  (e: 'getResponse', response: ResponseUpload): void
}>()

const { minVideoHeight } = toRefs(props)
const response = reactive({
  status: 'loading',
  message: '',
  media: {}
})

const handleClick = function () {
  document.getElementById('upload')!.click();
}

const onLoad = async function (e: Event) {
  const target = e.target as HTMLInputElement;
  const file: File = (target.files as FileList)[0];
  const type = file.type.split("/")
  const typeMedia = type[0];
  emit('getResponse', response)
  const dimensions = await getDimension(typeMedia, file)
  const isValidMedia = validationMedia(typeMedia, dimensions as Dimensions)
  if (isValidMedia) {
    return saveFileToOss(file, typeMedia, dimensions as Dimensions)
  } else {
    printError(file)
  }
  console.log(dimensions)
}

const saveFileToOss = function (file: File, type: string, dimensions: Dimensions) {
  let dataResponse = {
    id: null,
    type,
    url: "",
    thumbnail: {},
    metadata: {
      ...dimensions,
      size: file.size
    }
  }
  const currentDateEpoch = moment(new Date).valueOf()
  const fileType = file.type.split("/")[1]
  const filePath = `/img/media/${currentDateEpoch}.${fileType}`
  return storeOss.put(filePath, file)
    .then(resp => {
      const urlResponse = VITE_APP_SERVER_STATUS === 'production' ? `${urlMedia}/${resp.name}` : resp.url  
      if (type === 'video') {
        dataResponse.url = urlResponse
        return createThumbnail(file, 0.0)
      } else {
        dataResponse.url = urlResponse
        return {
          large: resp.url,
          medium: resp.url,
          small: resp.url
        }
      }
    })
    .then(thumbnail => {
      dataResponse.thumbnail = { ...thumbnail }
      response.status = 'success'
      response.message = 'success upload'
      response.media = { ...dataResponse }
      emit('getResponse', response)
      return storeOss.putACL(filePath, 'public-read')
    })
}

const createThumbnail = function (file: File, seekTo: number) {
  const currentDateEpoch = moment(new Date).valueOf()
  const filePath = `/img/media/${currentDateEpoch}.jpg`
  let response : {
    name: string;
    url : string
  }
  return drawImageOnCanvas(file, seekTo)
  .then((base64data => {
    const d = dataURLtoFile(base64data, `${+new Date()}.jpg`)
    return storeOss.put(filePath, d)
  }))
  .then((resp) => {
    response = resp
    return storeOss.putACL(filePath, 'public-read')
  })
  .then(() => {
    const urlResponse = VITE_APP_SERVER_STATUS === 'production' ? `${urlMedia}/${response.name}` : response.url  
    return {
      large: urlResponse,
      medium: urlResponse,
      small: urlResponse
    }
  })
}

const dataURLtoFile = function (dataurl: any , filename: string) {
  let arr = dataurl.split(',')
  let mime = arr[0].match(/:(.*?);/)[1]
  let bstr = atob(arr[1])
  let n = bstr.length
  let u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
}

const drawImageOnCanvas = function (file: File, seekTo: number) {
  return new Promise((resolve, reject) => {
    const videoPlayer = document.createElement('video');
    videoPlayer.setAttribute('src', URL.createObjectURL(file));
    videoPlayer.crossOrigin = "anonymous";
    videoPlayer.load();
    videoPlayer.addEventListener('error', (ex) => {
      reject(`error when loading video file ${ex}`);
    });

    videoPlayer.addEventListener('loadedmetadata', () => {

      if (videoPlayer.duration < seekTo) {
        reject("video is too short.");
        return;
      }
      setTimeout(() => {
        videoPlayer.currentTime = seekTo;
      }, 200);
      videoPlayer.addEventListener('seeked', () => {
        const canvas = document.createElement("canvas");
        canvas.width = videoPlayer.videoWidth;
        canvas.height = videoPlayer.videoHeight;
        const ctx = canvas.getContext("2d");
        ctx?.drawImage(videoPlayer, 0, 0, canvas.width, canvas.height);
        ctx?.canvas.toBlob(
          blob => {
            var reader = new FileReader();
            reader.readAsDataURL(blob as any);
            reader.onloadend = function () {
              var base64data = reader.result;
              resolve(base64data)
            }
          },
          "image/jpeg",
          0.75 /* quality */
        );
      });
    });
  });
}

const getDimension = function (typeMedia: string, file: File) {
  if (typeMedia === 'video') {
    return dimensionVideo(file)
  } else {
    return dimensionImage(file)
  }
}

const dimensionImage = function (file: File) {
  return new Promise((resolve) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (evt) => {
      let img: HTMLImageElement = new Image();
      img.onload = () => {
        const params = {
          height: img.height,
          width: img.width,
          // size : file.size
        }
        resolve(params)
      };
      img.src = evt.target!.result as string
    }
  })
}

const dimensionVideo = function (file: File) {
  return new Promise((resolve) => {
    const url = URL.createObjectURL(file);
    const $video = document.createElement("video");
    $video.src = url;
    $video.addEventListener("loadedmetadata", function () {
      console.log(this)
      const params = {
        height: $video.videoHeight,
        width: $video.videoWidth,
        duration: $video.duration
      }
      resolve(params)
    })
  })
}

const validationMedia = function (typeMedia: string, dimensions: Dimensions) {
  if (typeMedia === "video") {
    const heightVideo = dimensions.height;
    if (heightVideo < minVideoHeight.value) {
      return false;
    } else {
      return true;
    }
  } else {
    return true;
  }
}

const printError = function (file: File) {
  response.status = 'failed'
  response.message = `Minimum height ${file.type} is ${minVideoHeight.value}`
  emit('getResponse', response)
}

</script>

<style lang="scss" module="upload">
.flex-gap {
  display: flex;
  gap: 5px;
}

.text-upload {
  font-size: $text-sm;
  color: var(--secondary-color);
  font-weight: $font-medium;
}

.button {
  background-color: var(--secondary-low-color);
  width: fit-content;
  padding: 6px 14px;
  border-radius: 30px;
  cursor: pointer;
  @extend .flex-gap;
  @extend .text-upload;
}

.box-dashed {
  background: var(--white-color);
  border: 1px dashed var(--secondary-color);
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 180px;
  height: 126px;
  @extend .text-upload;
}
</style>