<template>
  <ValidationProvider v-slot="{ errors }" :name="name" :rules="rules">
    <div class="kipas__field-container">
      <label
        v-if="label"
        class="kipas__label"
      >
        {{ label  }} {{ isError }}
      </label>
      <div
        :class="[
          'kipas__field',
          `kipas__field-${size}-${variant}`,
          { 'kipas__error' : isError},
          { 'kipas__error' : errors.length > 0 },
        ]"
      >
        <input
          :type="type"
          v-bind="$attrs"
          :value="value"
          :maxlength="counter"
          v-on="inputListener"
        />
        <v-icon color="charcoal" v-if="icon" size="15px" >fas fa-link</v-icon>
      </div>
      <div v-if="errors.length > 0 || isError " class="kipas__error-message">
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
    variant : {
      type: String,
      default: "outlined",
    },
    icon : {
      type : String
    },
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

<style lang="scss" src="../material.scss" ></style>

<style lang="scss" scoped>
// .utils {
//   font-size: 12px;
//   font-weight: 400;
//   color: $black;
// }

// .input {
//   outline: none;
//   @extend .utils;
//   background: #ffffff;
//   border: 1px solid #bbbbbb;
//   border-radius: 4px;
//   &__error-label {
//     color: $warning !important;
//     @extend .utils;
//     transition: 0.5s ease-in-out;
//   }
//   &__label {
//     @extend .utils;
//     color: $black;
//     font-weight: 500;
//   }
//   &__error {
//     border: 1px solid $warning !important;
//   }
// }
// .kipas {
//   &__outline {
//     background: #ffffff;
//     border: 1px solid #bbbbbb;
//   }
//   &__flat {
//     background: #ffffff;
//     border: none;
//   }
//   &__input {
//     outline: none;
//     font-size: 12px;
//     font-weight: 400;
//     border-radius: 4px;
//   }
//   &__input-label {
//     font-size: 12px;
//     font-weight: 600;
//     color: #4a4a4a;
//     letter-spacing: 0.01em;
//   }
//   &__input-container {
//     display: grid;
//     gap: 8px;
//   }
//   &__input-lg {
//     height: 40px;
//     padding: 13px 16px;
//   }
//   &__input-md {
//     height: 32px;
//     padding: 9px;
//   }
//   &__input-sm {
//     height: 24px;
//     padding: 6px;
//   }
// }
</style>
