<template>
	<div>
		<HeaderContent
			label="List Cancel Order"
			:list="crumbs"
		/>
		<v-data-table
			hide-default-footer
			:headers="headers"
			:items="data"
		>
			<template v-slot:item.action >
				<div class="d-flex align-center justify-center">
					<div @click="openDetail" class="mr-4 list__detail-order">Detail Order</div>
					<div>
						<custom-button
							color="carmine"
							class="white--text"
							size="small"
							@click="openDialogPay"
						>
							Dibayar
						</custom-button>
					</div>
				</div>
			</template>
		</v-data-table>
		<v-dialog
			v-model="dialogDetail"
			max-width="576"
		>
			<CardDetail/>
		</v-dialog>
		<v-dialog
			v-model="dialogPay"
			max-width="466"
		>
			<v-card class="list__card">
				<div @click="closeDialogPay" class="d-flex justify-end list__icon">
					<v-icon>close</v-icon>
				</div>
				<div class="black--text mb-4">Bukti Pembayaran</div>
				<div>
					<custom-button
						size="small"
						outlined
						color="secondary"
					>
						Upload Bukti Pembayaran
					</custom-button>
				</div>
			</v-card>
		</v-dialog>
	</div>
</template>

<script>
import HeaderContent from "../../containers/HeaderContent"
import CardDetail from "./cardDetail"
export default {
	components : {
		HeaderContent,
		CardDetail
	},
	data () {
		return {
			dialogDetail : false,
			dialogPay : false,
			crumbs : [
				{
					text : 'Pengembalian',
					disabled : false
				},
				{
					text : 'List Cancel Order',
					disabled : true
				}
			],
			headers : [
				{
					text : 'Waktu Pembatalan',
					value : 'cancelTime',
					class : 'whitesnow',
					width : '180'
				},
				{
					text : 'Username',
					value : 'username',
					class : 'whitesnow',
					width : '150'
				},
				{
					text : 'Bank',
					value : 'bank',
					class : 'whitesnow',
					width : '100'
				},
				{
					text : 'No. Rekening',
					value : 'accountNumber',
					class : 'whitesnow',
					width : '150'
				},
				{
					text : 'Jumlah Uang',
					value : 'totalPrice',
					class : 'whitesnow',
					width : '150'
				},
				{
					text : '',
					value : 'action',
					class : 'whitesnow'
				}
			],
			data : [
				{
					cancelTime : '19/07/2020 13:00',
					username : 'ahyarafal',
					bank : 'BCA',
					accountNumber : '6555004123',
					totalPrice : 'Rp 999.999'
				}
			]
		}
	},
	methods : {
		openDetail () {
			this.dialogDetail = true
		},
		openDialogPay () {
			this.dialogPay = true
		},
		closeDialogPay () {
			this.dialogPay = false
		}
	}
}
</script>

<style lang="sass" scoped>
.list
	&__detail-order
		cursor: pointer
	&__card
		padding: 32px
	&__icon
		cursor: pointer
</style>