<template>
	<div>
		<HeaderContent
			label="Reported Seller"
			:list="crumbs"
		/>
		<div class="detail__box-report d-flex justify-space-between">
			<div class="detail__box-report__left d-flex">
				<div class="mr-12">
					<div>Nama Seller</div>
					<div>me.Store</div>
				</div>
				<div class="mr-12">
					<div>Nama User</div>
					<div>Udin Saputra</div>
				</div>
					<div>
					<div>Jumlah report</div>
					<div>5</div>
				</div>
			</div>
			<div class="detail__box-report__right">
				<custom-button color="carmine" class="white--text" >Block Seller</custom-button>
			</div>
		</div>
		<br/>
		<v-data-table
			hide-default-footer
			:headers="headers"
			:items="data"
		>
		<template v-slot:item.action>
			<custom-button color="carmine" outlined >Take Down</custom-button>
		</template>
		</v-data-table>
	</div>
</template>

<script>
import HeaderContent from "../../../containers/HeaderContent";
export default {
	components : {
		HeaderContent
	},
	data () {
		return {
			crumbs : [
				{
					text : 'Report',
					href: '/reported-seller',
					disabled : false
				},
				{
					text : 'Detail Report',
					disabled : true
				}
			],
			data : [
				{
					reporter : 'Sari Puspita',
					reportDate : '02/02/2020',
					reason : 'Seller menjual produk tidak sesuai dengan aturan',
					imageProof : 'image'
				}
			],
			headers : [
				{
					text : 'Pelapor',
					value : 'reporter',
					width : '150'
				},
				{
					text : 'Tanggal Lapor',
					value : 'reportDate',
					width : '150'
				},
				{
					text : 'Alasan',
					value : 'reason',
					width : '450'
				},
				{
					text : 'Gambar Bukti',
					value : 'imageProof',
					width : '150'
				},
				{
					text : 'Action',
					value : 'action',
					width : '150'
				}
			]
		}
	}
}
</script>

<style lang="sass" scoped>
.detail
	&__box-report
		width: 100%
		height: 88px
		border: 1px solid #A8071A
		border-radius: 8px
		box-sizing: border-box
		&__right
			padding: 24px
		&__left
			padding: 19px 0 20px 13px
</style>