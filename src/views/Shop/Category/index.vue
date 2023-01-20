<template>
	<div>
		<HeaderContent label="Kategori Produk" :list="crumbs" labelAction="Create Categori" />
		<div :class="cat.header">
			<div class="d-flex align-center" style="gap : 20px" >
				<div :class="cat.label">Search</div>
				<k-input size="sm" model="flat" />
				<custom-button size="x-small" color="secondary">
					<v-icon left dark size="12px">
						fa-solid fa-plus
					</v-icon>
					Tambah Categori
				</custom-button>
			</div>
			<div v-if="isChanged" class="d-flex align-center" style="gap : 6px" >
				<div :class="cat.alert">Ada perubahan urutan kategori yang belum kamu simpan!</div>
				<custom-button size="x-small" color="whitesnow">
					Batalkan Perubahan
				</custom-button>
				<custom-button size="x-small" color="secondary">
					Simpan Perubahan Urutan Kategori
				</custom-button>
			</div>
		</div>

		<Table/>
	</div>
</template>

<script>
import HeaderContent from "@/containers/HeaderContent";
import Table from "./table.vue";
export default {
	components: {
		HeaderContent,
		Table
	},
	data() {
		return {
			dialogCategory: false,
			isChanged : false,
			crumbs: [
				{
					text: 'Kategori',
					disabled: true
				}
			],
		}
	},
	
}
</script>

<style lang="scss" module="cat">
.header {
	height: 34px;
	background-color: #EEEEEE;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0 6px 0 16px;
}
.label {
	font-size: 12px;
	font-weight: 400;
	color: $charcoal;
}
.alert {
	font-size: 11px;
	font-weight: 500;
	color: $primary;
}
</style>