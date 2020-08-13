<template>
  <custom-form :onSubmit="handleSubmit">
    <custom-input
      label="Category Name"
      v-model="name"
      :value="name"
      rules="required"
      name="Category Name"
    />
    <custom-button :loading="loading" color="primary" type="submit">{{label}}</custom-button>
  </custom-form>
</template>

<script>
export default {
	props : {
		categoryName : {
			type : String
		},
		loading : {
			type : Boolean
		},
		label : {
			type : String
		}
	},
	computed : {
		name : {
			get () {
				return this.categoryName
			},
			set (value) {
				this.$emit('getCategoryName', value)
			}
		}
	},
	methods : { 
		handleSubmit () {
			this.$emit('onSubmit', this.categoryName)
		}
	}
}
</script>