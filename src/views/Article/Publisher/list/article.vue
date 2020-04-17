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
					@click="moveToReview(item.id)"
				>
					Review
				</custom-button>
			</template>
		</v-data-table>
	</div>
</template>

<script>
export default {
	props : ['articles'],
	mounted() {
		console.log(this.articles)
	},
	methods : {
		getColor(status) {
			switch(status) {
				case 'Approved' : return 'primary--text'
				case 'Rejected' : return 'carmine--text'
				default : return 'grey--text'
			}
		},
		moveToReview(id){
			this.$router.push({
				name : 'reviewPublisher',
				params : {
					id
				}
			})
			console.log(id)
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
		}
	}
}
</script>