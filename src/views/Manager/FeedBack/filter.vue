<template>
  <div class="filter__container">
    <div class="filter__section">
      <div class="filter__label">Filter Date</div>
      <FilterByDate
        @getPayloadDate="getPayloadDate"
      />
    </div>
    <div class="filter__section">
      <div class="filter__label">Platform</div>
      <FilterByDevice @getDeviceParams="getDeviceParams" />
    </div>

  </div>
</template>

<script>
import FilterByDate from "./filterByDate.vue"
import FilterByDevice from "./filterByDevice.vue"
export default {
  components: {
    FilterByDate,
    FilterByDevice
  },
  methods : {
    getDeviceParams(value) {
      this.$emit('getDeviceParams', value)
    },
    getPayloadDate (value) {
      this.$emit('getPayloadDate', value)
    }
  }
}
</script>

<style lang="scss" scoped src="./filter.scss">

</style>