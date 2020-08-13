<template>
	<div>
		<HeaderContent
			label="List Category News"
		>
			<custom-button 
				color="primary" 
				class="white--text"
				@click="moveToCreateCategory"
			>
				Buat Kategori News
			</custom-button>
		</HeaderContent>
		<v-row>
			<v-col cols="6">
				<v-data-table
					:headers="headers"
					:items="items"
					hide-default-footer
				>
					<template v-slot:item.actions="{item}" >
						<v-btn  @click="moveToEdit(item.id)"  icon>
							<v-icon  x-small>$edit</v-icon>
						</v-btn>
						<v-btn @click="openDialogDelete(item.id)" icon>
							<v-icon x-small>$delete</v-icon>
						</v-btn>
					</template>
				</v-data-table>
			</v-col>
		</v-row>


		<DialogDelete
			title="Yakin mengahpus category ini?"
			description="Category yang kamu hapus tidak akan tampil dihalaman category news"
			:dialog="dialog"
      :closeModalDelete="closeModalDelete"
      :handleDelete="handleDelete"
			:loading="loading"
		/>
	</div>
</template>

<script>
import HeaderContent from "@/containers/HeaderContent";
import moment from 'moment'
import { mapActions } from "vuex"
import DialogDelete from "@/components/material/DialogDelete";
export default {
	components : {
		HeaderContent,
		DialogDelete
	},
	data () {
		return {
			items : [],
			id : '',
			dialog : false,
			loading : false,
			headers : [
				{
					text : 'Nama',
					value : 'name',
				},
				{
					text : '',
					value : 'actions',
					align : 'end'
				}
			]
		}
	},
	methods : {
		moveToEdit(id) {
			this.$router.push({
				name : 'categoryNewsEdit',
				params : {
					id
				}
			})
		},
		closeModalDelete () {
			this.id = ''
			this.dialog = false
		},
		openDialogDelete(id) {
			this.id = id
			this.dialog = true
		},
		handleDelete () {
			this.loading = true
			return this.deleteCategoryNews(this.id)
				.then(r => {
					this.dialog = false
					this.loading = false
					this.handleCategoryNews()
				})
				.catch(err => {
					this.loading = false
					return err
				})
		},
		moveToCreateCategory () {
			this.$router.push('/categorynews/create')
		},
		...mapActions({
			getCategoryNews : 'news/getCategoryNews',
			deleteCategoryNews : 'news/deleteCategoryNews'
		}),
		async handleCategoryNews() {
			const response = await this.getCategoryNews()
			if(response.status === 200) {
				const responseData = response.data.data
				const formatingList = responseData.map(r => {
					const unixDate = r.createAt / 1000
					const formatingDate = moment.unix(unixDate).format("D/M/YYYY")
					return {
						date : formatingDate,
						name : r.name,
						id : r.id
					}
				})
			this.items = formatingList
			}
		}
	},
	mounted () {
		this.handleCategoryNews()
	}
}
</script>