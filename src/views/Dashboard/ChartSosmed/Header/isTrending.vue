<template>
  <div :class="k['dash__action']">
    <v-checkbox
      v-model="trending"
      dense
      color="secondary"
    >
      <template v-slot:label>
        <div :class="k['dash__trending']">Trending</div>
      </template>
  </v-checkbox>

  </div>
</template>

<script>
export default {
  props : {
    isTrending : {
      type : Boolean
    }
  },
  computed : {
    trending : {
      get() {
        return this.isTrending
      },
      set(value) {
        this.$emit('onTrending', value)
      }
    }
  }
}
</script>

<style lang="scss" module="k" src="../../style.scss">

</style>