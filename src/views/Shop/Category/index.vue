<template>
	<div>
		<HeaderContent
			label="Kategori Produk"
			:list="crumbs"
			labelAction="Create Categori"
		/>
		<div :class="cat.header" class="d-flex">
			<div>Search</div>
			<k-input size="sm" />
		</div>
		<v-data-table
			:headers="headers"
			hide-default-footer
			:items="data"
			class="grey--text"
		>
		<template v-slot:item.action="{ item }">
      <v-chip
        color="secondary"
        dark
				class="my-handle"
      >
				button
      </v-chip>
		</template>
		</v-data-table>

	</div>
</template>

<script>
import HeaderContent from "@/containers/HeaderContent";
import Sortable from 'sortablejs';
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
			dragNdrop: [],
			data  :[
				{
					icon : 'ICON',
					categoryProduct : 'Fashion Pria',
					date : '02/02/2020',
					detail : 'Detail dari kategori ini contohnya : “Kategori ini mencakup: Jendela, Kusen, Kaca Jendela, Kunci Jendela, Pasir, Semen,'
				},
				{
					icon : 'ICON',
					categoryProduct : 'Fashion Wanita',
					date : '02/02/2020',
					detail : 'Detail dari kategori ini contohnya : “Kategori ini mencakup: Jendela, Kusen, Kaca Jendela, Kunci Jendela, Pasir, Semen,'
				},
				{
					icon : 'ICON',
					categoryProduct : 'Sepatu Pria',
					date : '02/02/2020',
					detail : 'Detail dari kategori ini contohnya : “Kategori ini mencakup: Jendela, Kusen, Kaca Jendela, Kunci Jendela, Pasir, Semen,'
				},
				{
					icon : 'ICON',
					categoryProduct : 'Sepatu Wanita',
					date : '02/02/2020',
					detail : 'Detail dari kategori ini contohnya : “Kategori ini mencakup: Jendela, Kusen, Kaca Jendela, Kunci Jendela, Pasir, Semen,'
				},
				{
					icon : 'ICON',
					categoryProduct : 'Motor',
					date : '02/02/2020',
					detail : 'Detail dari kategori ini contohnya : “Kategori ini mencakup: Jendela, Kusen, Kaca Jendela, Kunci Jendela, Pasir, Semen,'
				},
				{
					icon : 'ICON',
					categoryProduct : 'Toys',
					date : '02/02/2020',
					detail : 'Detail dari kategori ini contohnya : “Kategori ini mencakup: Jendela, Kusen, Kaca Jendela, Kunci Jendela, Pasir, Semen,'
				}
			],
			headers : [
				{
					text : 'Icon',
					value : 'icon',
					class: "whitesnow",
				},
				{
					text : 'Nama Kategori',
					value : 'categoryProduct',
					class: "whitesnow",
				},
				{
					text : 'Tgl Dibuat',
					value : 'date',
					class: "whitesnow",
				},
				{
					text : 'Detail Kategori',
					value : 'detail',
					class: "whitesnow",
				},
				{
					text : 'Action',
					value : 'action',
					class: "whitesnow",
				}
			]
		}
	},
	mounted() {
		this.initSortable()
	},
	methods : {
		initSortable () {
			let table = document.querySelector("tbody")
			const _self = this
			_self.dragNdrop = JSON.parse(JSON.stringify(_self.data))
			Sortable.create(table , {
				handle: ".my-handle",
				easing: "cubic-bezier(1, 0, 0, 1)",
				onEnd({
					newIndex, oldIndex
				}) {
					_self.dragNdrop.splice(newIndex, 0, ..._self.dragNdrop.splice(oldIndex, 1))
				}
			})

		},	
	}
}
</script>

<style lang="scss" module="cat">
.header {
		height: 34px;
		background-color: #EEEEEE;
	}
</style>