<template>
  <div>
    <HeaderContent
      label="List Donasi"
      :list="crumbs"
      :items="items"
      labelAction="Tambah Donasi"
      @selection="getSelection"
      @click="handleClick"
    >	
			<div class="mr-4 left-action" >
			<custom-select
				:items="items"
				:height="40"
				:dense="true"
			/>
			</div>
			<custom-button
				color="carmine"
				class="white--text"
				@click="handleClick"
			>
				Tambah Donasi
			</custom-button>
    </HeaderContent>
    <v-data-table :headers="headers" hide-default-footer :items="data">
      <template v-slot:item.donationImage>
        <div class="image__container">
          <div class="image__box"></div>
        </div>
      </template>
      <template v-slot:item.action>
        <div class="d-flex justify-space-between">
          <v-btn icon color="primary">
            <v-icon>edit</v-icon>
          </v-btn>
          <v-btn icon color="orangered">
            <v-icon>delete_outline</v-icon>
          </v-btn>
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
          text: "List Channel",
          href: "/channel",
					disabled: false,
				},
				{
					text : 'List Donasi',
					disabled : true
				}
      ],
      items: ["Finish", "On Progress"],
      data: [
        {
          donationImage: "image",
          donationName: "Rumah Yatim Piatu",
          startDate: "11/04/2020",
          endDate: "11/05/2020",
          donationTarget: "Rp 2.000.000",
          status: "Finish"
        }
      ],
      headers: [
        {
          text: "Foto Donasi",
          value: "donationImage",
          width: "150"
        },
        {
          text: "Nama Akun Donasi",
          value: "donationName",
          width: "160"
        },
        {
          text: "Tanggal Mulai",
          value: "startDate",
          width: "150"
        },
        {
          text: "Tanggal Selesai",
          value: "endDate",
          width: "150"
        },
        {
          text: "Target Donasi",
          value: "donationTarget",
          width: "150"
        },
        {
          text: "Status",
          value: "status",
          width: "150"
        },
        {
          text: "Manage",
          value: "action",
          align: "center"
        }
      ]
    };
  },
  methods: {
    getSelection(value) {},
    handleClick() {
			this.$router.push('/donation/create')
		}
  }
};
</script>

<style lang="sass" scoped>
.image
	&__box
		width: 50px
		height: 50px
		background-color: grey
	&__container
		padding: 10px
.left-action
	width: 200px
</style>
