<template>
  <div class="d-flex">
    <Picker 
      :item="item" 
      @setEpochDate="setEpochDate"
      :levelPriority="levelPriority"
    />
  </div>
</template>

<script>
import Picker from "./datePicker.vue";
import Actions from "./actions.vue";
export default {
  props: ["item" , "levelPriority"],
  components: {
    Picker,
    Actions,
  },
  data () {
    return {
      epochDate : null
    }
  },
  methods : {
    setEpochDate(time) {
      // this.epochDate = time
      this.$emit('setEpochDate', time)
    },
    refreshDataFeed() {
      this.$emit('refreshDataFeed')
    }
  }
};
</script>