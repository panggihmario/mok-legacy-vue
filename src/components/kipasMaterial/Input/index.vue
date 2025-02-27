<template>
  <ValidationProvider v-slot="{ errors }" :name="name" :rules="rules">
    <div class="kipas__field-container">
      <label
        v-if="label"
        class="kipas__label"
        :style="label === '-' && { color: 'transparent' }"
      >
        {{ label }} <span v-if="labelRequired" style="color : red" >*</span>
      </label>
      <div
        :class="[
          'kipas__field',
          `kipas__field-${size}-${variant}`,
          { kipas__error: isError },
          { kipas__error: errors.length > 0 },
        ]"
      >
        <input
          :type="type"
          v-bind="$attrs"
          :value="value"
          :maxlength="counter"
          v-on="inputListener"
        />
        <v-icon color="charcoal" v-if="icon" size="15px">{{ icon }}</v-icon>
      </div>
      <div v-if="errors.length > 0 || isError" class="kipas__error-message">
        {{ errorMessage ? errorMessage : errors[0] }}
      </div>
      <div
        v-if="counter"
        class="d-flex justify-space-between font-12"
        :class="{ 'warning--text': value.length > counter }"
      >
        <div>
          <span v-if="isError && errorMessage" class="warning--text">{{
            errorMessage
          }}</span>
        </div>
        <span>
          <span :class="value.length === counter && 'warning--text'"
            >{{ value.length }}/{{ counter }}</span
          >
        </span>
      </div>
    </div>
  </ValidationProvider>
</template>

<script>
export default {
  props: {
    variant: {
      type: String,
      default: "outlined",
    },
    icon: {
      type: String,
    },
    type: {
      type: String,
      default: "text",
    },
    errorMessage: {
      type: String,
    },
    label: {
      type: String,
    },
    value: {
      type: [String, Number, Object],
      require: true,
      default: "",
    },
    rules: {
      type: [String, Object],
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
    labelRequired : {
      type : Boolean,
      default : false
    },
    icon : {
      type : String
    }
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
        input: function (event) {
          vm.$emit("input", event.target.value);
        },
      });
    },
  },
};
</script>

<style lang="scss" src="../material.scss"></style>

