<template>
	<ValidationObserver :ref="refForm" v-slot="{ handleSubmit }" >
		<v-form
			@submit.prevent="handleSubmit(onSubmit)"
			lazy-validation
		>
			<slot/>
		</v-form>
	</ValidationObserver>
</template>

<script>
export default {
	props : {
		onSubmit : {
			type : Function,
			default : () => {}
		},
		refForm : {
			type : String
		}
	}
}
</script>