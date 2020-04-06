<template>
  <div>
    <HeaderContent label="Detail Laporan" :list="crumbs" />
    <div class="detail__header d-flex justify-space-between">
      <div class="d-flex">
        <div class="mr-12 d-flex flex-column justify-space-between">
          <div class="charcoal--text detail__label">
            Nama Account
          </div>
          <div class="charcoal--text detail__subLabel">bananaYellow</div>
        </div>
        <div class="d-flex flex-column justify-space-between">
          <div class="charcoal--text detail__label">Jumlah Report</div>
          <div class="charcoal--text detail__subLabel">5</div>
        </div>
      </div>
      <custom-button class="white--text" color="carmine">Block</custom-button>
    </div>
    <div :style="{ height: '27px' }" />
    <v-data-table hide-default-footer :headers="headers" :items="data">
			<template v-slot:item.post>
				<div class="detail__table__container">
					<div class="detail__table__img-box">
					</div>
				</div>
			</template>
      <template v-slot:item.reporter="{ item }">
        <div v-for="(it, idx) in item.reporter" :key="idx">
          {{ it }}
        </div>
      </template>
      <template v-slot:item.reportDate="{ item }">
        <div v-for="(it, idx) in item.reportDate" :key="idx">
          {{ it }}
        </div>
      </template>
			<template v-slot:item.reason="{ item }">
				 <div v-for="(it, idx) in item.reason" :key="idx">
          {{ it }}
        </div>
			</template>
			<template v-slot:item.action >
				<custom-button class="carmine--text" >Hapus Post</custom-button>
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
	methods : {
		goToDetail () {

		}
	},
  data() {
    return {
      crumbs: [
        {
          text: "Reported Account",
          href: "/report",
					disabled: false,
					to : '/report'
        },
        {
					text: "Detail Laporan",
					disabled : true
        }
      ],
      data: [
        {
          post: "img",
          reporter: ["bananared", "bananablue", "wicaksono"],
          reportDate: ["11/04/2020", "11/04/2020", "11/04/2020"],
          reason: [
            "tidak sesuai dengan konten dan sangat mengganggu",
            "tidak sesuai dengan konten dan sangat mengganggu",
            "tidak sesuai dengan konten dan sangat mengganggu"
          ]
        }
      ],
      headers: [
        {
          text: "Post",
          value: "post"
        },
        {
          text: "Pelapor",
          value: "reporter"
        },
        {
          text: "Tanggal Lapor",
          value: "reportDate"
        },
        {
          text: "Alasan",
          value: "reason"
        },
        {
          text: "Action",
          value: "action"
        }
      ]
    };
  }
};
</script>

<style lang="sass" scoped>
.detail
	&__header
		width: 100%
		height: 88px
		background: #FAFAFA
		border-radius: 8px
		box-sizing: border-box
		padding: 19px 50px 19px 13px
	&__label
		font-size: 14px
		font-weight: 500
	&__subLabel
		font-size: 14px
	&__table
		&__container
			padding-top: 10px
		&__img-box
			width: 82px
			height: 82px
			background-color: grey
</style>
