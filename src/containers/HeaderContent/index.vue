<template>
  <div class="d-flex justify-space-between">
    <div>
      <div class="black--text header__label">{{ label }}</div>
      <v-breadcrumbs class="header__breadcrumbs" :items="list" />
    </div>
    <div class="d-flex">
			<custom-select
				class="mr-2"
				v-if="items"
				:items="items"
				@change="handleChange"
			/>
      <custom-button
        color="carmine"
        class="white--text"
        v-on="$listeners"
        v-if="labelAction"
      >
        {{ labelAction }}
      </custom-button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    list: {
      type: Array
    },
    label: {
      type: String
    },
    labelAction: {
      type: String
		},
		items : {
			type : Array
		}
	},
	methods : {
		handleChange(value){
			this.$emit('selection' ,value)
		}
	}
};
</script>

<style lang="sass" scoped>
.header
	&__breadcrumbs
		padding: 0 !important
	&__label
		font-size: 24px
		font-weight: 500
</style>
