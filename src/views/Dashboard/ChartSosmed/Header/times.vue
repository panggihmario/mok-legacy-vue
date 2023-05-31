<template>
  <v-select
    :items="items"
    outlined
    color="secondary"
    dense
    item-text="label"
    item-value="value"
    class="font-12"
    item-color="secondary"
    hide-details
    v-model="time"
  ></v-select>
</template>

<script>
export default {
  props : {
    timeline : {
      type : String
    }
  },
  computed : {
    time : {
      get() {
        return this.timeline
      },
      set (value) {
        this.$emit('setTimeline', value)
      }
    }
  },
  data () {
    return {
      items: [
        {
          label : 'DAY',
          value : 'day'
        },
        {
          label : 'MONTH',
          value : 'month'
        },
        {
          label : 'YEAR',
          value : 'year'
        }
      ],
    }
  }
}
</script>

<style scoped>
.width-select {
  width: 120px;
}
</style>