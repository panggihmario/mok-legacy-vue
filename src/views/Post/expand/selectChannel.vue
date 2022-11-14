<template>
  <v-autocomplete
    dense
    hide-details
    placeholder="Channel"
    class="expand__field mr-2"
    :items="items"
    item-text="name"
    v-model="selectedChannels"
    return-object
    solo
    flat
    multiple
    @focus="isFocus"
    @blur="isBlur"
  >
     <template v-slot:selection="{ index }">
      <span v-if="index === 0 && !focus" class="grey--text expand__selected">
        {{ selectedChannels.length }} selected
      </span>
    </template>
  </v-autocomplete>
</template>

<script>
import { mapMutations, mapState } from "vuex"
export default {
  props : {
    items : {
      type : [Object, Array]
    }
  },
  computed : {
    ...mapState({
      paramsChannel : (state) => state.post.paramsChannel
    }),
    selectedChannels : {
      get() {
        return this.paramsChannel
      },
      set(value) {
        this.setParamsChannel(value)
      }
    }
  },
  data () {
    return {
      selected : [],
      focus : false
    }
  },
  methods : {
    ...mapMutations({
      setParamsChannel: 'post/setParamsChannel'
    }),
    isFocus () {
      this.focus = true
    },
    isBlur () {
      this.focus = false
    },
  }
}
</script>

<style lang="scss"  src="./expand.scss" >
</style>
