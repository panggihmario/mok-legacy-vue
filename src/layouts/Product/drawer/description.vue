<template>
  <div>
		<div class="product__name">{{product.name}}</div>
		<div class="product__price"> Rp {{product.price.toLocaleString('id')}} </div>
		<div class="product__label charcoal--text">User</div>
		<div class="secondary--text product__username"> {{product.sellerName ? `@ ${product.sellerName}` : 'No User'  }} </div>
		<div class="product__label charcoal--text" >Dimensi</div>
		<div class="product__content black--text">
			{{product.measurement.length}} cm x {{product.measurement.width}} cm x {{product.measurement.height}} cm
		</div>
		<div class="product__label charcoal--text"> Berat </div>
		<div class="product__content black--text">{{product.measurement.weight}} kg </div>
		<div class="product__label charcoal--text"> Deskripsi Produk </div>
		<div class="product__content  black--text">
			{{product.description}}
		</div>
	</div>
</template>

<script>
export default {
	props : ['product']
}
</script>

<style lang="sass" scoped>
.product
	&__name
		color: #000000
		font-size: 14px
		font-weight: bold
		margin-bottom: 8px
	&__price
		color: #4A4A4A
		font-size: 14px
		font-weight: 500
		margin-bottom: 24px
	&__label
		font-size: 12px
		font-weight: normal
	&__username
		font-size: 14px
		font-weight: 500
		line-height: 17px
		margin-bottom: 24px
	&__content
		font-weight: 500
		font-size: 14px
		line-height: 17px
		margin-bottom: 24px
</style>