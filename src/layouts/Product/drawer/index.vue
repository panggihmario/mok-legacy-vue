<template>
  <v-navigation-drawer  floating color="whitesnow"  app width="500" permanent right>
    <div class="drawer__container">
      <Actions
        @openDialogBanned="openDialogBanned"
        
      />
      <div class="drawer__images">
        <ProductImages :product="product" />
      </div>
      <div class="drawer__description">
        <Description :product="product" />
      </div>
    </div>
    <DialogBanned 
      :bannedDialog="bannedDialog" 
      @closeDialog="closeDialog"
      :product="product"
    />
  </v-navigation-drawer>
</template>

<script>
import { mapState } from 'vuex'
import Actions from './actions.vue'
import ProductImages from './images.vue'
import Description from './description.vue'
import DialogBanned from './dialog.vue'
export default {
  data ( ) {
    return {
      bannedDialog : false
    }
  },
  components : {
    Actions,
    ProductImages,
    Description,
    DialogBanned
  },
  computed : {
    ...mapState ({
      product : (state) => state.product.detailProduct
    })
  },
  methods : {
    openDialogBanned() {
      console.log('open dialog')
      this.bannedDialog = true
    },
    closeDialog (value) {
      this.bannedDialog = value
    }
  }
}
</script>

<style lang="sass" scoped>
.drawer
  &__container
    padding: 27px 22px
  &__images
    margin-top: 48px
  &__description
    margin-top: 24px
</style>