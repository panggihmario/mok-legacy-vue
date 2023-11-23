<template>
  <ValidationProvider v-slot="{ errors }" :name="name" :rules="rules">
    <div class="input__container">
      <Label :title="title" />
      <textarea
        :class="
          [
            'input', 
            { input__error: isError || isErrorCounter },
            { input__error: errors.length > 0 },
          ]"
        :rows="rows"
        :value="value"
        v-on="inputListener"
        :maxlength="counter"
        v-bind="$attrs"
        :disabled="disabled"
      />
      <div
        v-if="counter && !disabled"
        class="d-flex justify-space-between font-10"
        :class="{ 'warning--text': value.length > counter }"
      >
        <div>
          <span v-if="errors.length > 0 && errorMessage" class="warning--text">{{
            errorMessage
          }}</span>
        </div>
        <span>
            <span :class="value.length === counter && 'warning--text'  ">{{ value.length }} </span><span>/{{ counter }}</span>
          </span>
      </div>
    </div>
  </ValidationProvider>
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
    counter: {
      type: Number,
    },
    isError: {
      type: Boolean,
      default: false,
    },
    errorMessage: {
      type: String,
    },
    name : {
      type : String
    },
    rules : {
      type : String
    },
    disabled : {
      type : Boolean,
      default : false
    }
  },
  data() {
    return {
      isErrorCounter: false,
    };
  },
  watch: {
    value() {
      if (this.value.length > this.counter) {
        this.isErrorCounter = true;
        this.$emit("errorCounter", true);
      } else {
        this.isErrorCounter = false;
        this.$emit("errorCounter", false);
      }
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
  &:disabled {
    background-color: $whitesnow;
  }
  &__error {
    border: 1px solid $warning;
  }
  &__container {
    display: grid;
    gap: 8px;
  }
}

.font-10 {
  font-size: 10px;
}
</style>
