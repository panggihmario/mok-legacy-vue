<template>
  <ValidationProvider v-slot="{ errors }" :name="name" :rules="rules">
    <label-field class="mb-4">{{ label }}</label-field>
    <v-text-field
      solo
      flat
      dense
      class="field"
      v-bind="$attrs"
      :value="value"
      v-on="inputListener"
      :error-messages="errors"
      :background-color="colorbg"
      :type="type"
    ></v-text-field>
  </ValidationProvider>
</template>

<script>
export default {
  props: {
    type : {
      type : String,
      default : 'text'
    },
    label: {
      type: String,
      default: ""
    },
    value: {
      type: [String, Number, Object]
    },
    name: {
      type: String
    },
    rules: {
      type: [String, Object]
    },
    colorbg : {
      type : String,
      default : 'whitesnow'
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
};
</script>

<style lang="sass" scoped>
.field
  border-radius: $border-radius-root
  font-size: 11px
  // border: 1px solid red
  &__label
    font-size: $font-size-12
    font-weight: 500
    line-height: 14px
</style>
