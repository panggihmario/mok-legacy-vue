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
import { defineProps, toRefs, reactive } from 'vue';
import { ResponseUpload } from "@/models"
interface Dimensions {
  height : number,
  width : number
}
const { 
    VITE_APP_ACCESS_KEY_ID_OSS,
    VITE_APP_ACCESS_KEY_SECRET,
    VITE_APP_BUCKET_OSS,
    VITE_APP_ENDPOINT
} = import.meta.env;

const storeOss = new OSS({
  accessKeyId: VITE_APP_ACCESS_KEY_ID_OSS,
  accessKeySecret: VITE_APP_ACCESS_KEY_SECRET,
  bucket: VITE_APP_BUCKET_OSS,
  endpoint: VITE_APP_ENDPOINT,
});

const props = defineProps({
  type: String,
  label: String,
  id: String,
  minVideoHeight : {
    type : Number,
    default : 200
  }
})

// type-based
const emit = defineEmits<{
  (e: 'getResponse', response : ResponseUpload): void
}>()

const { minVideoHeight } = toRefs(props)
const response = reactive({
  status : 'loading',
  message : '',
  media : {}
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
  if(isValidMedia) {
    return saveFileToOss(file, typeMedia, dimensions as Dimensions)
  }else {
    printError(file)
  }
  console.log(dimensions)
}

const saveFileToOss = function (file : File, type : string, dimensions: Dimensions) {
  let dataResponse = {
    id: null,
    type,
    url: "",
    thumbnail: {},
    metadata: {
      width: dimensions.width,
      height: dimensions.height,
      size: file.size
    }
  }
  const currentDateEpoch = moment(new Date).valueOf()
  const fileType = file.type.split("/")[1]
  const filePath = `/img/media/${currentDateEpoch}.${fileType}`
  return storeOss.put(filePath,file)
    .then(resp => {
      console.log(resp)
      if(type === 'video'){

      }else {
        dataResponse.url = resp.url
        return {
          large: resp.url,
          medium: resp.url,
          small: resp.url
        }
      }
    })
    .then(thumbnail => {
      dataResponse.thumbnail = {...thumbnail}
      response.status = 'success',
      response.message = 'success upload'
      response.media = {...dataResponse}
      emit('getResponse', response)
      return storeOss.putACL(filePath, 'public-read')
    })
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
      let img : HTMLImageElement  = new Image();
      img.onload = () => {
        const params = {
          height: img.height,
          width: img.width,
          // size : file.size
        }
        resolve(params)
      };
      img.src  = evt.target!.result as string
    } 
  })
}

const dimensionVideo = function (file: File) {

}

const validationMedia = function (typeMedia : string, dimensions : Dimensions) {
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

const printError = function (file : File) {
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