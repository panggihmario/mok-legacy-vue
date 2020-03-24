<template>
	<div>
		<v-data-table
			hide-default-footer
			:headers="headers"
			:items="articles"
		>
			<template v-slot:item.status="{item}">
				<span :class="getColor(item.status)" >{{item.status}}</span>
			</template>
			<template v-slot:item.action>
				<custom-button
					class="primary--text"
				>
					Lihat
				</custom-button>
			</template>
		</v-data-table>
	</div>
</template>

<script>
export default {
	methods : {
		getColor(status) {
			switch(status) {
				case 'Approved' : return 'primary--text'
				case 'Rejected' : return 'carmine--text'
				default : return 'grey--text'
			}
		}
	},
	data () {
		return {
			headers : [
				{
					text : 'Tanggal',
					value : 'date',
					width : "100"
				},
				{
					text : 'Editor',
					value : 'editor',
					width : '200'
				},
				{
					text : 'Headline',
					value : 'headline',
					width : '600'
				},
				{
					text : "",
					value : 'action'
				}
			],
			articles : [
				{
					date : '02/02/2020',
					editor : 'Annisa Dewi',
					headline:
            "1 WNI Pasien Isolasi di RSPI Sulianti Saroso Meninggal Dunia "
				},
				{
					date : '02/02/2020',
					editor : 'Natalia',
					headline:
            "1 WNI Pasien Isolasi di RSPI Sulianti Saroso Meninggal Dunia "
				},
				{
					date : "02/02/2020",
					editor : 'Annisa Dewi',
					headline:
            "1 WNI Pasien Isolasi di RSPI Sulianti Saroso Meninggal Dunia "
				}
			]
		}
	}
}
</script>