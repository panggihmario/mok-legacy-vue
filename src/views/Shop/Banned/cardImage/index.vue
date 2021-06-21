<template>
  <v-card 
    class="product__card" 
    max-width="130"
    @click="onClick"
  >
    <v-img
      height="130"
      :src="imageProduct"
      :lazy-src="imageProduct"
    />
    <v-card-text class="product__footer">
      <div class="product__label">
        {{ item.name }}
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import image from '../../../../assets/no-image.jpeg'
import { mapMutations } from 'vuex'
export default {
  data () {
    return {
      defaultImage : image,
    }
  },
  props : ['item'],
  computed : {
    imageProduct () {
      if(this.item.medias) {
        if(this.item.medias[0].url) {
          return this.item.medias[0].url
        }else{
          return this.defaultImage
        }
      }else {
        return this.defaultImage
      }
    }
  },
  methods : {
     ...mapMutations({
      setDetailView : "product/setDetailView",
      setDetailProduct : 'product/setDetailProduct'
    }),
    onClick() {
      this.setDetailView(true)
      this.setDetailProduct(this.item)
    }
  }
}
</script>

<style lang="sass" scoped>
.item
  &__data
    height: 72px
    font-size: 12px
.product
  &__label
    color: #000000
    font-size: 12px
    font-weight: 500
    line-height: 15px
    text-overflow: ellipsis
    overflow: hidden
    display: -webkit-box
    -webkit-line-clamp: 3
    -webkit-box-orient: vertical
  &__footer
    padding: 10px
    height: 70px
    background-color: #FAFAFA
  &__card
    cursor: pointer
</style>