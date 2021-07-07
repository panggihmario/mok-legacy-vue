<template>
  <v-navigation-drawer  floating color="whitesnow"  app width="500" permanent right>
    <div class="drawer__container">
      <div v-if="product.isBanned" class="drawer__bannedContainer">
        <div class="drawer__bannedTitle"> Alasan Banned </div>
        <div class="drawer__bannedReason"> {{product.reasonBanned}}</div>
      </div>
      <Actions
        v-else
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
  &__bannedContainer
    background: #FFF3E7
    border: 1px solid #FF8717
    box-sizing: border-box
    border-radius: 6px
    padding: 14px
  &__bannedTitle
    font-size: 11px
    color: #4A4A4A
  &__bannedReason
    font-size: 14px
    font-weight: bold
    color: #4A4A4A
</style>