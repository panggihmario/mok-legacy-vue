<template>
  <div class="input__container">
    <Label :title="title" />
    <textarea
      :class="['input', {'input__error': isError}]"
      :rows="rows"
      :value="value"
      v-on="inputListener"
    />
  </div>
</template>

<script>
import Label from "../Label";
export default {
  components: {
    Label,
  },
  props: {
    title: {
      type: String,
    },
    rows: {
      type: String,
      default: "20",
    },
    value: {
      type: [String, Number, Object],
      require: true,
    },
    isError: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    inputListener() {
      const vm = this;
      return Object.assign({}, this.$listeners, {
        input: function(event) {
          vm.$emit("input", event.target.value);
        },
      });
    },
  },
};
</script>

<style lang="scss">
.input {
  width: 100%;
  border: 1px solid #bbbbbb;
  background-color: #ffffff;
  font-size: 12px;
  font-weight: 600;
  color: #4a4a4a;
  letter-spacing: 0.01em;
  border-radius: 4px;
  padding: 9px;
  &:focus {
    outline: none;
  }
  &__error {
    border: 1px solid $warning;
  }
  &__container {
    display: grid;
    gap: 8px;
  }
}
</style>
