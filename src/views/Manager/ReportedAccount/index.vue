<template>
  <div>
    <HeaderContent 
			label="Reported Account" 
			:list="crumbs"
		/>
		<v-data-table
			:headers="headers"
			hide-default-footer
			:items="data"
		>
			<template v-slot:item.action>
				<custom-button @click="moveToDetail"  class="carmine--text">Read Report</custom-button>
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
	methods : {
		moveToDetail () {
			this.$router.push('/report/detail')
		}
	},
  data() {
    return {
      crumbs: [
        {
          text: "Reported Account",
          href: "donation",
          disabled: true
        }
			],
			data : [
				{
					username : 'yoyox',
					date : '11/04/2020',
					report : 'Tidak sesuai dengan konten dan sangat mengganggu.',
					reporter : 'adam'
				}
			],
			headers : [
				{
					text : 'Nama User' ,
					value : 'username',
					width : "180"
				},
				{
					text : 'Tanggal',
					value : 'date',
					width : '100'
				},
				{
					text : 'Nama Laporan',
					value : 'report',
					width : '450'
				},
				{
					text : 'Pelapor',
					value : 'reporter',
					width : '180'
				},
				{
					text : 'Manage',
					value : 'action',
					align : 'center'
				}
			]
    };
  }
};
</script>
