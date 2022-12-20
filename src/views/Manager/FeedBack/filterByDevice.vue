<template>
  <div>
      <ul class="filter__list">
        <li 
          v-for="(device, idx) in Devices" 
          :key="idx" 
          class="filter__list-item"
          :class="device.isChoose && 'filter__list-active' "
          @click="setActive(device, idx)"
        >
          {{device.label}}
        </li>
      </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      Devices : [
        {
          label : 'All',
          value : 'ALL',
          isChoose : true
        },
        {
          label : 'Ios',
          value : 'IOS',
          isChoose : false
        },
        {
          label : 'Android',
          value : "ANDROID",
          isChoose : false
        }
      ]
    }
  },
  methods : {
    setActive(data, idx) {
      this.$emit('getDeviceParams', data)
      const devices = this.Devices.map((d, i) => {
        if(i == idx) {
          return {
            ...d,
            isChoose : true
          }
        }else{
          return {
            ...d,
            isChoose : false
          }
        }
      })
      this.Devices = devices
    }
  }
}
</script>

<style lang="scss" scoped src="./filter.scss">

</style>