<template>
  <ValidationProvider v-slot="{ errors }" :name="name" :rules="rules">
    <label-field class="mb-4">{{ label }}</label-field>
    <v-select
      v-on="selectListeners"
      :items="items"
      solo
      flat
      :error-messages="errors"
      :value="value"
      v-bind="$attrs"
      class="field"
      :background-color="background"
      full-width
    />
  </ValidationProvider>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      default: () => ["Foo", "Bar"],
    },
    rules: {
      type: String,
    },
    name: {
      type: String,
    },
    value: {},
    label: {
      type: String,
    },
    background: {
      type: String,
      default: "whitesnow"
    },
  },
  computed: {
    selectListeners() {
      const vm = this;
      return Object.assign({}, this.$listeners, {
        input: function(event) {
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
