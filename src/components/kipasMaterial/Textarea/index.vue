<template>
  <div :class="area.container">
    <Label :title="title"  />
    <textarea 
      :class="area.input"
      :rows="rows"
    />
  </div>
</template>


<script>
import Label from "../Label"
export default {
  components : {
    Label
  },
  props : {
    title : {
      type : String
    },
    rows : {
      type : String,
      default : "20"
    }
  }
}
</script>

<style lang="scss" module="area">
.input {
  width: 100%;
  border: 1px solid #BBBBBB;
  background-color: #FFFFFF;
  font-size: 12px;
  font-weight: 600;
  color: #4A4A4A;
  letter-spacing: 0.01em;
  border-radius: 4px;
  padding: 9px;
  &:focus {
    outline: none;
  }
}
.container {
  display: grid;
  gap: 8px;
}
</style>