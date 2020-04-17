<template>
	<v-data-table
		:headers="headers"
		hide-default-footer
		:items="drafts"
	>
		<template v-slot:item.action="{item}">
			<div class="d-flex justify-space-between">
				<custom-button @click="moveToEdit(item.id)" class="primary--text">Edit</custom-button>
				<custom-button>
					<v-icon @click="onDelete(item.id)">delete</v-icon>
				</custom-button>
			</div>
		</template>
	</v-data-table>
</template>

<script>
import { mapActions } from 'vuex'
export default {
	props : ['drafts'],
	methods : {
		...mapActions({
			deleteDraft : 'news/deleteDraft'
		}),
		moveToEdit(id){
			this.$router.push({
				name : 'editArticle',
				params : {
					id : id
				}
			})
		},
		async onDelete(id) {
			const response = await this.deleteDraft(id)
			if(response.status === 200) {
				this.$emit('updateListDraft')
			}else{
				console.log(id)
			}
		}
	},
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
		}
	}
}
</script>