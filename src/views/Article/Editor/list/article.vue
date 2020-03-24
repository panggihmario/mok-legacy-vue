<template>
	<div>
		<v-data-table 
			:headers="headers" 
			hide-default-footer 
			:items="articles" 
		>
			<template v-slot:item.status="{item}">
				<span :class="getColor(item.status)">{{item.status}}</span>
			</template>
			<template v-slot:item.action="{item}">
				<custom-button
					class="primary--text"
					v-if="item.status === 'Reject'"
				>Edit</custom-button>
			</template>
		</v-data-table>
	</div>
</template>

<script>
export default {
	methods : {
		getColor(status) {
			switch(status) {
				case 'Approve' : return 'primary--text'
				case 'Reject' : return 'carmine--text'
				default : return 'grey--text'
			}
		}
	},
  data() {
    return {
      headers: [
        {
          text: "Tanggal",
          value: "date",
          width: "100"
        },
        {
          text: "Status",
          value: "status",
          width: "100"
        },
        {
          text: "Headline",
          value: "headline",
          width: "750"
        },
        {
          text: "",
          value: "action"
        }
      ],
      articles: [
        {
          date: "02/02/2020",
          status: "On Inspect",
          headline:
            "1 WNI Pasien Isolasi di RSPI Sulianti Saroso Meninggal Dunia "
        },
        {
          date: "02/02/2020",
          status: "Approve",
          headline:
            "Ini Pernyataan Pertama Bek Juventus Setelah Divonis Positif Virus Corona"
        },
        {
          date: "02/02/2020",
          status: "Reject",
          headline:
            "30 Warga di Kota Bekasi Suspect Corona, Ini Langkah Antisipasi Dinkes"
        }
      ]
    };
  }
};
</script>
