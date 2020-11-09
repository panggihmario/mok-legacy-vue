<template>
	<div>
		<HeaderContent label="Edit Category News" />
		<Form
			:categoryName="categoryName"
			:loading="loading"
			label="Save"
			@getCategoryName="getCategoryName"
			@onSubmit="onSubmit"
		/>
		<v-snackbar top v-model="alertSuccess" color="success">Edit Kategori News Success</v-snackbar>
    <v-snackbar top v-model="alertFailed" color="error">Edit Kategori Failed</v-snackbar>
	</div>
</template>

<script>
import HeaderContent from "@/containers/HeaderContent";
import { mapActions } from 'vuex'
import Form from './formCategory';
export default {
	components : {
		HeaderContent,
		Form
	},
	data () {
		return {
			categoryName : '',
			alertSuccess : false,
			alertFailed : false,
			loading : false,
			id : ''
		}
	},
	mounted () {
		this.handleResponse()
	},
	methods : {
		...mapActions({
			getCategoryNewsById : 'news/getCategoryNewsById',
			editCategoryNews : 'news/editCategoryNews'
		}),
		getCategoryName (value) {
			this.categoryName = value
		},
		handleResponse () {
			const id = this.$route.params.id
			return this.getCategoryNewsById(id)
				.then(resp => {
					const respData = resp.data.data
					this.categoryName = respData.name
					this.id = respData.id
				})
				.catch(err => {
					return err
				})
		},
		onSubmit() {
			const payload = {
				id : this.id,
				name : this.categoryName
			}
			this.loading = true
			return this.editCategoryNews(payload)
				.then(resp => {
					this.loading = false
					this.alertSuccess = true
					setTimeout(() => {
						this.alertSuccess = false
						this.$router.push('/categorynews')
					},1500)
				})
				.catch(err => {
					this.loading = false
					this.alertFailed = true
					setTimeout(() => {
						this.alertFailed = false
					}, 2000)
				})
		}
	}
}
</script>