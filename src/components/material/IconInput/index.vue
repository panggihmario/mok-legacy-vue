<template>
  <ValidationProvider v-slot="{ errors }" :name="name" :rules="rules">
    <label-field>{{ label }}</label-field>
    <div class="input-group__container">
      <v-btn
        small
        width="53px"
        depressed
        height="50px"
        class="input-group__button"
      >
        <v-icon>$link</v-icon>
      </v-btn>
      <v-text-field
        solo
        flat
        background-color="whitesnow"
        full-width
        height="50px"
        dense
        class="input-group__field"
        v-bind="$attrs"
        v-on="inputListeners"
				:error-messages="errors"
				:value="value"
      />
    </div>
  </ValidationProvider>
</template>

<script>
export default {
  props: {
    value: {
      type: String
    },
    label: {
      type: String,
      default: "default label"
		},
		rules : {
			type : [String, Object]
		},
		name : {
			type : String
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
.input-group
	&__container
		display: flex
		justify-content: center
	&__button
		background: #EEEEEE
		order-radius: 10px 0 0 10px
	&__field
		border-radius: 0 10px 10px 0
		font-size: $font-size-root
	&__label
		font-size: $font-size-12
		font-weight: 500
		line-height: 14px
</style>
