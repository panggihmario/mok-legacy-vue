<template>
  <div>
    <HeaderContent label="Seller List" :list="crumbs" />
    <v-row>
      <v-col cols="2">
        <div class="d-flex align-center">
          <div class="mr-2 mb-8">Sort</div>
          <custom-select :items="sortList" v-model="selection" />
        </div>
      </v-col>
			<v-col cols="3" offset="7" >
				<custom-input placeholder="search" />
			</v-col>
    </v-row>
		<v-data-table
			:headers="headers"
			hide-default-footer
			:items="data"
		>
			<template v-slot:item.action>
				<custom-button class="carmine--text">View Seller</custom-button>
			</template>
			<template v-slot:item.status="{item}">
				<div  :class="item.status === 'Active' && 'primary--text'" >
					{{item.status}}
				</div>
			</template>
		</v-data-table>
  </div>
</template>

<script>
import HeaderContent from "../../../containers/HeaderContent";
export default {
  components: {
    HeaderContent
  },
  data() {
    return {
      crumbs: [
        {
          text: "Seller",
          disabled: true
        }
      ],
      sortList: ["Newest", "Oldest"],
			selection: "Newest",
			data : [
				{
					sellerName : 'me.Store',
					username : 'Udin Saputra',
					product : '10',
					sold : '7',
					status : 'Active',
				},
					{
					sellerName : 'me.Store',
					username : 'Udin Saputra',
					product : '10',
					sold : '7',
					status : 'Passive',
				}
			],
			headers : [
				{
					text : 'Nama Seller',
					value : 'sellerName'
				},
				{
					text : 'Nama User',
					value : 'username',
				},
				{
					text : 'Produk',
					value : 'product'
				},
				{
					text : 'Terjual',
					value : 'sold'
				},
				{
					text : 'Status',
					value : 'status'
				},
				{
					text : "",
					value : 'action',
					width : '200'
				}
			]
    };
  }
};
</script>
