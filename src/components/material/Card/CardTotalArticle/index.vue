<template>
	<Card
		width="252"
		height="113"
		elevation="0"
		color="whitesnow"
	>
		<div class="card__box">
			<div class="d-flex align-start">
				<div class="card__box__content">
				</div>
				<div class="card__box__total black--text">
					10
				</div>
			</div>
		</div>
		<div class="card__content">
			<div class="card__content__action">
				Show Detail
			</div>
			<div class="card__content__description">
				<div class="charcoal--text">User Editor</div>
				<div class="charcoal--text description__content" >Editor yang kamu pimpin secara langsung</div>
			</div>
		</div>
	</Card>
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
.description
	&__content
		font-size: 12px
		font-weight: 300
		letter-spacing: 0.01em
.card
	&__content
		padding: 12px
		width: 100%
		&__action
			text-align: right
			font-size: 12px
			font-weight: 300
		&__description
			margin-top: 36px
	&__box
		width: 126px
		height: 58px
		background-color: #DDDDDD
		position: absolute
		top: -10px
		left: 12px 
		padding: 13px
		&__content
			height: 32px
			width: 32px
			background-color: #C4C4C4
		&__total
			font-size: 32px
			margin-top: -7px
			margin-left: 10px
</style>