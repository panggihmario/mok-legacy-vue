<template>
	<v-card
		class="detail"
	>
		<div class="d-flex justify-center black--text detail__title mb-6">Detail Order</div>
		<v-row no-gutters>
			<v-col cols="12" sm="4" >
				<div class="silver--text detail__label">No. Order</div>
				<div class="charcoal--text detail__top-content">12932412</div>
			</v-col>
			<v-col cols="12" sm="4" >
				<div class="silver--text detail__label"> Tgl Pembelian </div>
				<div class="charcoal--text detail__top-content"> 12/05/2020 15:43</div>
			</v-col>
			<v-col cols="12" sm="4" >
				<div class="silver--text detail__label">Status</div>
				<div class="charcoal--text detail__top-content">Dibatalkan</div>
			</v-col>
		</v-row>
		<br/>
		<hr class="detail__line" />
		<br/>
		<div class="silver--text detail__label mb-2">Produk</div>
		<div class="d-flex mb-6">
			<div class="detail__image"></div>
			<div class="ml-6">
				<div class="charcoal--text detail__product-name">Totebag Tatte - BUT FIRST, COFFEE</div>
				<div class="silver--text detail__label">Simple White - Large</div>
				<div class="black--text detail__product-price">1 x Rp 999.990.000</div>
			</div>
		</div>
		<div>
			<div class="black--text detail__sublabel">Pengiriman</div>
			<div class="charcoal--text detail__content">JNE Regular </div>
		</div>
		<div>
			<div class="black--text detail__sublabel">Pembeli</div>
			<div class="charcoal--text detail__content"> ahyarafal </div>
		</div>
		<div>
			<div class="black--text detail__sublabel">Penjual</div>
			<div class="charcoal--text detail__content"> amelgikha </div>
		</div>
		<div>
			<div class="black--text detail__sublabel">Alasan Pembatalan</div>
			<div class="charcoal--text detail__content"> Tidak jadi beli karena sudah ada ternyata </div>
		</div>
		<br/>
		<hr class="detail__line" />
		<br/>
		<div>
			<div class="black--text detail__sublabel">Yang Sudah Dibayarkan</div>
			<v-row>
				<v-col cols="12" sm="4">
					<div class="grey--text detail__content">Total Harga Barang</div>
					<div class="grey--text detail__content">Total Ongkos Kirim</div>
					<div class="grey--text detail__content">Total Pembayaran</div>
					<div class="grey--text detail__content">Bank Pengembalian</div>
					<div class="grey--text detail__content">Nomor Rekening</div>
				</v-col>
				<v-col cols="12" sm="8">
					<div class="charcoal--text detail__top-content">Rp 999.990.000</div>
					<div class="charcoal--text detail__top-content">Rp 9.999</div>
					<div class="black--text detail__content-price">Rp 999.999.999</div>
					<div class="black--text detail__content-price">BCA</div>
					<div class="charcoal--text detail__top-content">6550043123</div>
				</v-col>
			</v-row>
		</div>
		<br/>
		<hr class="detail__line" />
		<br/>
		<div>
			<div class="black--text detail__sublabel mb-2 ">Bukti Pembayaran</div>
			<div>
				<custom-button size="small" color="secondary" outlined>
					Upload Bukti Pembayaran
				</custom-button>
			</div>
		</div>
		<div class="d-flex justify-end">
			<custom-button
				size="small"
				color="primary"
				class="white--text"
			>
				Dibayar
			</custom-button>
		</div>
	</v-card>
</template>

<style lang="sass" scoped>
.detail
	padding: 32px
	&__title
		font-size: 16px
		font-weight: bold
	&__label
		font-size: 12px
	&__top-content
		font-size: 14px
		font-weight: 500
	&__line
		border: 1px solid #EEEEEE
	&__image
		height: 72px
		width: 72px
		background-color: #EEEEEE
	&__product-name
		font-size: 14px
		font-weight: 500
	&__product-price
		font-size: 14px
		font-weight: bold
	&__sublabel
		font-size: 12px
		font-weight: bold
	&__content
		font-size: 14px
	&__content-price
		font-size: 14px
		font-weight: 900
</style>