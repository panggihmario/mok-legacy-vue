<template>
	<v-data-table
		:headers="headers"
		hide-default-footer
		:items="articles"
	>
		<template v-slot:item.action>
			<div class="d-flex justify-space-between">
				<custom-button class="primary--text">Edit</custom-button>
				<custom-button>
					<v-icon>delete</v-icon>
				</custom-button>
			</div>
		</template>
	</v-data-table>
</template>

<script>
export default {
	data () {
		return {
			headers : [
				{
					text : "Tanggal",
					value : 'date',
					width : "100"
				},
				{
					text : 'Headline',
					value : 'headline',
					width : '750'
				},
				{
					text : '',
					value: 'action',
					sortable : false
				}
			],
			articles : [
				{
					date : '02/02/2020',
					headline : '1 WNI Pasien Isolasi di RSPI Sulianti Saroso Meninggal Dunia'
				},
				{
					date : '02/02/2020',
					headline : 'Ini Pernyataan Pertama Bek Juventus Setelah Divonis Positif Virus Corona'
				},
				{
					date : '02/02/2020',
					headline : '30 Warga di Kota Bekasi Suspect Corona, Ini Langkah Antisipasi Dinkes'
				},
			]
		}
	}
}
</script>