<template>
  <label :class="check.container">
    {{ label  }}
    <input 
      type="checkbox"
      v-model="dataModel"
    >
    <span :class="check.checkmark"></span>

  </label>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  computed : {
    dataModel : {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      }
    }
  },
  props : {
    label : String,
    value : {
      type : Boolean
    }
  }
}
</script>

<style lang="scss" module="check">
/* The container */
.container {
  display: block;
  position: relative;
  padding-left: 20px;
  cursor: pointer;
  color: $greys;
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.01em;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

/* Hide the browser's default checkbox */
.container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

/* Create a custom checkbox */
.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 14px;
  width: 14px;

  border: 1px solid #BBBBBB;
  border-radius: 2px;
}

/* On mouse-over, add a grey background color */
// .container:hover input ~ .checkmark {
//   background-color: #ccc;
// }

/* When the checkbox is checked, add a blue background */
.container input:checked ~ .checkmark {
  background-color: $secondary;
  border: none;
  // border: 1px solid $secondary ;
}

/* Create the checkmark/indicator (hidden when not checked) */
.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

/* Show the checkmark when checked */
.container input:checked ~ .checkmark:after {
  display: block;
}

/* Style the checkmark/indicator */
.container .checkmark:after {
  left: 6px;
  top: 3px;
  width: 3px;
  height: 6px;
  border: solid white;
  border-width: 0 1px 1px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}
</style>