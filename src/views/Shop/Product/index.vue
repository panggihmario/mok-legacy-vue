<template>
  <div>
    <HeaderContent
      label="List Product"
      labelAction="Create Category"
      :list="crumbs"
      @click="handleClick"
    />
    <v-row>
      <v-col cols="2">
        <div class="d-flex align-center">
          <div class="mb-8 mr-2">Sort</div>
          <custom-select 
						:items="sortList" 
						v-model="selection"
					/>
        </div>
      </v-col>
			<v-col cols="3">
        <div class="d-flex align-center">
          <div class="mb-8 mr-2">Filter</div>
          <custom-select 
						:items="filterList" 
						v-model="filter"
					/>
        </div>
      </v-col>
			<v-col cols="3" offset="4" >
				<custom-input  placeholder="search" />
			</v-col>
    </v-row>
		<v-data-table
			:headers="headers"
			hide-default-footer
			:items="data"
		>
			<template v-slot:item.action>
				<custom-button class="carmine--text" >View Product</custom-button>
			</template>
		</v-data-table>
  </div>
</template>

<script>
import HeaderContent from "@/containers/HeaderContent";
export default {
  components: {
    HeaderContent
  },
  data() {
    return {
			data : [
				{
					productName : 'Kemeja',
					productPrice : 'Rp 14.000',
					category : 'Pakaian Pria',
					stock : 13,
					productSold : 7
				}
			],
			headers : [
				{
					text : 'Nama',
					value : 'productName'
				},
				{
					text : 'Harga',
					value : 'productPrice',
				},
				{
					text : 'Kategory',
					value : 'category',
				},
				{
					text : 'Stok',
					value : 'stock'
				},
				{
					text : 'Terjual',
					value : 'productSold'
				},
				{
					text : "",
					value : 'action',
					width : '200'
				}
			],
			selection : 'Newest',
			filter : 'All Category',
      crumbs: [
        {
          text: "Product",
          disabled: true
        }
      ],
			sortList: ["Newest", "Oldest"],
			filterList : ['All Category']
    };
  },
  methods: {
    handleClick() {}
  }
};
</script>
