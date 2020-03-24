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
			<template v-slot:item.action="{item}">
				<custom-button
					class="primary--text"
					v-if="item.status === 'Need Review'"
				>
					Review
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
					text : 'Status',
					value : 'status',
					width : '100'
				},
				{
					text : 'Headline',
					value : 'headline',
					width : '700'
				},
				{
					text : "",
					value : 'action'
				}
			],
			articles : [
				{
					date : '02/02/2020',
					status : 'Need Review',
					headline:
            "1 WNI Pasien Isolasi di RSPI Sulianti Saroso Meninggal Dunia "
				},
				{
					date : '02/02/2020',
					status : 'Approved',
					headline:
            "1 WNI Pasien Isolasi di RSPI Sulianti Saroso Meninggal Dunia "
				},
				{
					date : "02/02/2020",
					status : 'Rejected',
					headline:
            "1 WNI Pasien Isolasi di RSPI Sulianti Saroso Meninggal Dunia "
				}
			]
		}
	}
}
</script>