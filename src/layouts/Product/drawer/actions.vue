<template>
  <div class="d-flex justify-space-between">
    <v-btn depressed @click="closeDrawer" color="whitesmoke" small>
      <div class="text-capitalize">Close</div>
    </v-btn>
    <v-btn v-if="!product.isBanned" @click="openDialog" color="warning" depressed small>
      <div class="text-capitalize">Set as Banned</div>
    </v-btn>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  props : ['product'],
  methods : {
    ...mapMutations({
      setDetailView : "product/setDetailView"
    }),
    closeDrawer () {
      return this.setDetailView(false)
    },
    openDialog: function() {
        this.$emit('openDialogBanned', true)
    }
  }
}
</script>