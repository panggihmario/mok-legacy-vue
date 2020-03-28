<template>
	<div>
		<HeaderContent
			label="Kategori Produk"
			:list="crumbs"
			labelAction="Create Categori"
			@click="handleClick"
		/>
		<v-data-table
			:headers="headers"
			hide-default-footer
			:items="data"
		/>
		<v-dialog
			v-model="dialogCategory"
			max-width="500"
		>
			<v-card>
				<div class="dialog__container" >
					<div class="charcoal--text dialog__label">Informasi Kategori</div>
					<custom-input
						placeholder="Category Name"
					/>
					<div :style="{ width : '100%' }" class="d-flex justify-end">
						<custom-button @click="cancel" color="carmine" outlined >Cancel</custom-button>
						<custom-button  @click="createCategory" color="carmine" class="ml-4 white--text">Buat Kategori</custom-button>
					</div>
				</div>
			</v-card>
		</v-dialog>
	</div>
</template>

<script>
import HeaderContent from "@/containers/HeaderContent";
export default {
	components : {
		HeaderContent
	},
	data () {
		return {
			dialogCategory : false,
			crumbs : [
				{
					text : 'Kategori',
					disabled : true
				}
			],
			data  :[
				{
					categoryProduct : 'Fashion Pria',
					date : '02/02/2020',
					totalProduct : '123'
				}
			],
			headers : [
				{
					text : 'Kategory Produk',
					value : 'categoryProduct'
				},
				{
					text : 'Dibuat Pada',
					value : 'date'
				},
				{
					text : 'Jumlah Product',
					value : 'totalProduct'
				}
			]
		}
	},
	methods : {
		handleClick (){
			this.dialogCategory = true
		},
		cancel () {
			this.dialogCategory = false
		},
		createCategory () {
			this.dialogCategory = false
		}
	}
}
</script>

<style lang="sass" scoped>
.dialog
	&__container
		padding: 32px
	&__label
		font-size: 20px
		font-weight: 500
		margin-bottom: 20px
</style>