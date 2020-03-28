<template>
  <div>
    <HeaderContent label="Reported Seller" />
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
				<custom-button class="carmine--text">Read Report</custom-button>
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
					totalReport : '10',
					lastReport : '15/04/2020',
				},
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
					text : 'Jumlah Report',
					value : 'totalReport'
				},
				{
					text : 'Last Report',
					value : 'lastReport'
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
