<template>
	<div>
		<label-field>{{label}}</label-field>
		<v-autocomplete
			v-bind="$attrs"
			v-on="inputListener"
			:value="value"
			solo
			flat
			background-color="whitesnow"
			class="field"
		/>
	</div>
</template>

<script>
export default {

	props : {
		value : {
			type : String
		},
		label : {
			type : String
		}
	},
	computed: {
    inputListener() {
      const vm = this;
      return Object.assign({}, this.$listeners, {
        input: function(event) {
          vm.$emit("input", event);
        }
      });
    }
  }
}
</script>

<style lang="sass" scoped>
.field
  border-radius: $border-radius-root
  font-size: $font-size-root
</style>