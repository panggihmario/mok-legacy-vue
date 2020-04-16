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
import { mapActions } from 'vuex'
export default {
	props : ['articles'],
	methods : {
		...mapActions({
			getNews : 'news/getListNews'
		}),
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
    };
  }
};
</script>
