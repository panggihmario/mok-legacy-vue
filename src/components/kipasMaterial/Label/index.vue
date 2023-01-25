<template>
  <div :class="x.label"> {{ title }} </div>
</template>

<script>
export default {
  props : {
    title : {
      type : String
    }
  }
}
</script>

<style lang="scss" module="x">
.label {
  font-size: 12px;
  font-weight: 600;
  color: $charcoal;
}
</style>