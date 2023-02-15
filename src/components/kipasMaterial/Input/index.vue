<template>
  <ValidationProvider v-slot="{ errors }" :name="name" :rules="rules">
    <div class="kipas__input-container">
      <!-- :class="errors.length > 0 && 'input__error-label'" -->
      <label
        v-if="label"
        class="input__label"
        
      >
        {{ label }}
      </label>
      <input
        :type="type"
        :class="[
          `kipas__input-${size}`,
          { input__error: errors.length > 0 },
          `kipas__${model}`,
        ]"
        class="input"
        v-bind="$attrs"
        :value="value"
        :maxlength="counter"
        v-on="inputListener"
      />
      <div v-if="errors.length > 0" class="input__error-label">
        {{ errorMessage ? errorMessage : errors[0] }}
      </div>
      <div
        v-if="counter"
        class="d-flex justify-space-between font-10"
        :class="{ 'warning--text': value.length > counter }"
      >
        <div>
          <span v-if="isError && errorMessage" class="warning--text">{{
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
export default {
  props: {
    type: {
      type: String,
      default: "text",
    },
    errorMessage : {
      type : String
    },
    label: {
      type: String,
    },
    value: {
      type: [String, Number, Object],
      require: true,
    },
    rules: {
      type: String,
    },
    size: {
      type: String,
      default: "md",
    },
    name: {
      type: String,
    },
    model: {
      type: String,
      default: "outline",
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
  },
  data() {
    return {
      hasError: false,
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

<style lang="scss" scoped>
.utils {
  font-size: 12px;
  font-weight: 400;
  color: $black;
}

.input {
  outline: none;
  @extend .utils;
  background: #ffffff;
  border: 1px solid #bbbbbb;
  border-radius: 4px;
  &__error-label {
    color: $warning !important;
    @extend .utils;
    transition: 0.5s ease-in-out;
  }
  &__label {
    @extend .utils;
    color: $charcoal;
    font-weight: 600;
  }
  &__error {
    border: 1px solid $warning !important;
  }
}
.kipas {
  &__outline {
    background: #ffffff;
    border: 1px solid #bbbbbb;
  }
  &__flat {
    background: #ffffff;
    border: none;
  }
  &__input {
    outline: none;
    font-size: 12px;
    font-weight: 400;
    border-radius: 4px;
  }
  &__input-label {
    font-size: 12px;
    font-weight: 600;
    color: #4a4a4a;
    letter-spacing: 0.01em;
  }
  &__input-container {
    display: grid;
    gap: 8px;
  }
  &__input-lg {
    height: 40px;
    padding: 13px 16px;
  }
  &__input-md {
    height: 32px;
    padding: 9px;
  }
  &__input-sm {
    height: 24px;
    padding: 6px;
  }
}
</style>
