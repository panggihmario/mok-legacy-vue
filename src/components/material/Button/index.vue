<template>
	<v-btn
		v-on="$listeners"
		v-bind="$attrs"
		elevation="0"
		class="custom-button"
		size="default"
		:style="classSize"
	>
		<slot/>
	</v-btn>
</template>

<script>
export default {
	data () {
		return {
			styleLarge : {
				height : '54px',
				'padding-left' : '64px',
				'padding-right' : '64px'
			},
			styleMedium : {
				height : '40px',
				'padding-left' : '32px',
				'padding-right' : '32px'
			}
		}
	},
	props : {
		size : {
			type : String,
			default : 'default'
		}
	},
	computed : {
		classSize () {
			switch(this.size) {
				case 'large' : return this.styleLarge
				break;
				default : return this.styleMedium
			}
		}
	}
}
</script>

<style lang="sass" scoped>
.custom-button
	text-transform: capitalize
	letter-spacing: 0 !important
	font-size: 16px
</style>