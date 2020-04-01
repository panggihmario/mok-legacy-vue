<template>
	<div>
		<HeaderContent
			label="Buat Donation"
			:list="crumbs"
		/>
		<div :style="{height : '28px'}" />
		<custom-form
			:onSubmit="handleSubmit"
		>	
			<v-row>
				<v-col cols="4">
					<custom-input  
						label="Judul Donasi" 
						placeholder="Masukkan nama judul donasi"
						rules="required"
						v-model="donation.label"
						:value="donation.label"
						name="Donation Label"
					/>
					<div class="d-flex align-center">
						<v-avatar color="whitesmoke" class="mr-4" size="100">
							<v-icon color="gainsboro" size="80">perm_identity</v-icon>
						</v-avatar>
						<custom-upload
							id="profil-donation"
						/>
					</div>
					<br/>
					<custom-textarea
						label="Deskripsi Donasi"
						placeholder="Masukkan deskripsi donasi"
						rules="required"
						name="Decription"
						v-model="donation.description"
						:value="donation.description"
					/>
					<div class="form__upload d-flex justify-center align-center">
						<custom-upload
							id="donation-image"
						/>
					</div>
				</v-col>
				<v-col cols="4">
					<custom-input
						label="Nama Penyelenggara"
						placeholder="Masukkan nama penyelenggara"
						v-model="donation.name.organizer"
						rules="required"
						name="Organizer"
						:value="donation.name.organizer"
					/>
					<custom-input
						label="Kebutuhan Donasi"
						rules="required"
						v-model="donation.cost"
						name="Donation Cost"
						:value="donation.cost"
					/>
					<custom-input
						label="Batas Donasi"
						rules="required"
						v-model="donation.limit"
						:value="donation.limit"
						name="Donation Limit"
					/>
					<custom-input
						label="Nama Wali/Penerima Uang"
						placeholder="Masukkan nama wali"
						rules="required"
						v-model="donation.name.receiver"
						:value="donation.name.receiver"
						name="Receiver Name"
					/>
					<custom-button 
						color="carmine"
						type="submit"
						class="white--text"
					>Buat Donasi</custom-button>
				</v-col>
			</v-row>
		</custom-form>
	</div>
</template>

<script>
import HeaderContent from '../../../containers/HeaderContent'
export default {
	components : {
		HeaderContent
	},
	data () {
		return {
			crumbs : [
				{
					text : 'List Donasi',
					href : 'donation',
					disabled : false
				},
				{
					text : 'Buat Donasi',
					disabled : true
				}
			],
			donation : {
				label : '',
				description : '',
				name : {
					organizer : '',
					receiver : ''
				},
				cost : '',
				limit : ''
			}
		}
	},
	methods : {
		handleSubmit ( ){
			console.log(this.donation)
		}
	}
}
</script>

<style lang="sass" scoped>
.form
	&__upload
		width: 100%
		height: 145px
		border-radius: 5px
		border: 1px dashed #BBBBBB
</style>