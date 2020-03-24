<template>
  <div>
    <label-field>{{ label }}</label-field>
    <v-textarea
      solo
      flat
      v-bind="$attrs"
      background-color="whitesnow"
      class="field-area"
			v-on="inputListeners"
    />
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String
    }
  },
  computed: {
    inputListeners() {
      const vm = this;
      return Object.assign({}, this.$listeners, {
        input: function(event) {
          vm.$emit("input", event);
        }
      });
    }
  }
};
</script>

<style lang="sass" scoped>
.field-area
	font-size: $font-size-root
	border-radius: $border-radius-root
</style>
