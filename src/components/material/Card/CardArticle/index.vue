<template>
	<div>
		<Card
			width="500"
			height="90"
			color="whitesnow"
			elevation="0"
		>
			<div class="card__container d-flex">
				<div class="card__box">
				</div>
				<div class="d-flex flex-column justify-space-between ml-4">
					<div class="card__content charcoal--text">Ini Pernyataan Pertama Bek Juventus Setelah Divonis Positif Virus Corona</div>
					<div class="card__action" >Need Review</div>
				</div>
			</div>
		</Card>
	</div>
</template>

<script>
import Card from '../index'
export default {
	components : {
		Card
	}
}
</script>

<style lang="sass" scoped>
.card
	&__container
		padding: 13px
	&__box
		height: 64px
		width: 64px
		background-color: #DDDDDD
	&__content
		font-size: 12px
		line-height: 14px
		font-weight: 500
	&__action
		color: #1890FF
		font-size: 12px
		font-weight: 500
</style>