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
import { defineProps } from 'vue';

const props = defineProps({
  type: String,
  label: String,
  id: String
})

const handleClick = function () {
  document.getElementById('upload')!.click();
}

const onLoad = async function (e: Event) {
  const target = e.target as HTMLInputElement;
  const file: File = (target.files as FileList)[0];
  let result = {
    status: "loading",
    response: {},
  };
  const type = file.type.split("/")
  const typeMedia = type[0];
  const dimensions = await getDimension(typeMedia, file)
  console.log(dimensions)
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