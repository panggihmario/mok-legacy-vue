<template>
  <div>
    <label-field>{{ label }}</label-field>
    <v-autocomplete
      :items="items"
      :value="value"
      v-bind="$attrs"
      v-on="inputListener"
			solo
			flat
			class="field"
			:background-color="background"
    >
      <slot></slot>
    </v-autocomplete>
  </div>
</template>

<script>
export default {
  props: {
    value: {},
    items: {
      type: Array,
    },
    label: {
      type: String,
    },
		background: {
      type: String,
      default: "whitesnow"
    },
  },
  computed: {
    inputListener() {
      const vm = this;
      return Object.assign({}, this.$listeners, {
        input: function (event) {
          vm.$emit("input", event);
        },
      });
    },
  },
};
</script>

<style lang="sass" scoped>
.field
	border-radius: $border-radius-root
	font-size: $font-size-root
</style>