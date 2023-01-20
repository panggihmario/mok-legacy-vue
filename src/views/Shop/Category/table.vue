<template>
  <v-data-table :headers="headers" hide-default-footer :items="data" class="grey--text">
			<template v-slot:header.icon="{ header }" class="d-flex">
				<div>{{ header.text }}
					<v-tooltip 
						max-width="300"
						nudge-bottom="50"
						right
					>
						<template v-slot:activator="{ on, attrs }">
							<v-icon v-bind="attrs" v-on="on" size="10px" color="secondary">
								fas fa-info-circle
							</v-icon>
						</template>
						<div style="font-size : 11px">
							<div>
								Hanya kategori urutan pertama sampai urutan ke sebelas
								yang akan ditampilkan di menu shop aplikasi Kipaskipas.
							</div>
							<div>
								Gunakan drag & drop dengan tanda ini grip-vertical untuk mengatur
								urutan kategori produk.
							</div>
						</div>
					</v-tooltip>
				</div>
			</template>

			<template v-slot:item.action="{ item }">
        <div class="d-flex" style="gap : 10px">
          <custom-button color="whitesnow" size="x-small">Edit Kategori</custom-button>
        <v-icon 
          class="my-handle" 
          size="10px">fa-solid fa-grip-vertical</v-icon>
        </div>
				
			</template>
		</v-data-table>
</template>

<script>
import Sortable from 'sortablejs';
export default {
  data () {
    return {
      headers: [
				{
					text: 'Icon',
					value: 'icon',
					class: "whitesnow",
					sortable: false
				},
				{
					text: 'Nama Kategori',
					value: 'categoryProduct',
					class: "whitesnow",
				},
				{
					text: 'Tgl Dibuat',
					value: 'date',
					class: "whitesnow",
				},
				{
					text: 'Detail Kategori',
					value: 'detail',
					class: "whitesnow",
				},
				{
					text: 'Action',
					value: 'action',
					class: "whitesnow",
				}
			],
      dragNdrop: [],
			data: [
				{
					icon: 'ICON',
					categoryProduct: 'Fashion Pria',
					date: '02/02/2020',
					detail: 'Detail dari kategori ini contohnya : “Kategori ini mencakup: Jendela, Kusen, Kaca Jendela, Kunci Jendela, Pasir, Semen,'
				},
				{
					icon: 'ICON',
					categoryProduct: 'Fashion Wanita',
					date: '02/02/2020',
					detail: 'Detail dari kategori ini contohnya : “Kategori ini mencakup: Jendela, Kusen, Kaca Jendela, Kunci Jendela, Pasir, Semen,'
				},
				{
					icon: 'ICON',
					categoryProduct: 'Sepatu Pria',
					date: '02/02/2020',
					detail: 'Detail dari kategori ini contohnya : “Kategori ini mencakup: Jendela, Kusen, Kaca Jendela, Kunci Jendela, Pasir, Semen,'
				},
				{
					icon: 'ICON',
					categoryProduct: 'Sepatu Wanita',
					date: '02/02/2020',
					detail: 'Detail dari kategori ini contohnya : “Kategori ini mencakup: Jendela, Kusen, Kaca Jendela, Kunci Jendela, Pasir, Semen,'
				},
				{
					icon: 'ICON',
					categoryProduct: 'Motor',
					date: '02/02/2020',
					detail: 'Detail dari kategori ini contohnya : “Kategori ini mencakup: Jendela, Kusen, Kaca Jendela, Kunci Jendela, Pasir, Semen,'
				},
				{
					icon: 'ICON',
					categoryProduct: 'Toys',
					date: '02/02/2020',
					detail: 'Detail dari kategori ini contohnya : “Kategori ini mencakup: Jendela, Kusen, Kaca Jendela, Kunci Jendela, Pasir, Semen,'
				}
			],
    }
  },
  mounted() {
		this.initSortable()
	},
	methods: {
		initSortable() {
			let table = document.querySelector("tbody")
			const _self = this
			_self.dragNdrop = JSON.parse(JSON.stringify(_self.data))
			Sortable.create(table, {
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

<style>
.my-handle {
  cursor: url(../../../assets/hand.png), auto;
  /* cursor: grab; */
}
/* .my-handle:active{
  cursor: url(../../../assets/hand.png), auto;
} */
</style>