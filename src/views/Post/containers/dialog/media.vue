<template>
  <div :class="d['container-box']">
    <div :class="d['container-image']" >
    <video
      v-if="item.type === 'video'"
      controls
      :src="item.url"
      :id="`videodialog-${i}-${item.id}`"
      :class="d.vid"
      :style="{objectFit : isContain}"
      alt="media"
      preload="none"
      :poster="item.thumbnail.large"
    />
      <img
        v-else
        :class="d.img"
        :src="item.thumbnail.medium"
        :lazy-src="item.thumbnail.small"
        :style="{objectFit : isContain}"
        alt="media"
        loading="lazy"
      />
    </div>
  </div>
  
</template>

<script>
export default {
  props : {
    item : {
      type : Object
    },
    i : {
      type : Number
    }
  },
  computed : {
    isContain () {
      console.log(this.item)
      const metadata = this.item.metadata
      const width = Number(metadata.width)
      const height = Number(metadata.height)
      const ratio = height / width
      if(width >= height) {
        return 'contain'
      }else {
        if(ratio < 1.5) {
          return 'contain'
        }else{
          return 'cover'
        }
      }
    }
  }
}

</script>

<style src="./style.scss" lang="scss" module="d">
</style>