<template>
  <v-btn
    v-on="$listeners"
    v-bind="$attrs"
    class="custom-button"
    :size="size"
    depressed
    :style="classSize"
  >
    <slot />
  </v-btn>
</template>

<script>
export default {
  data() {
    return {
      styleLarge: {
        height: "54px",
        "padding-left": "64px",
				"padding-right": "64px",
				"font-size" : "16px"
      },
      styleMedium: {
        height: "38px",
        "padding-left": "25px",
				"padding-right": "25px",
				"font-size" : "12px"
			},
			styleSmall : {
				height : '24px',
				"padding-left": "14px",
				"padding-right": "14px",
				"font-size" : "10px"
			}
    };
  },
  props: {
    size: {
      type: String,
      default: "default"
    }
  },
  computed: {
    classSize() {
      switch (this.size) {
        case "large":
          return this.styleLarge;
					break;
				case "small" :
					return this.styleSmall
					break;
        default:
          return this.styleMedium;
      }
    }
  }
};
</script>

<style lang="sass" scoped>
.custom-button
	text-transform: capitalize
	letter-spacing: 0 !important
</style>