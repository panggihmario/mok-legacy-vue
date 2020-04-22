<template>
	<div>
		<HeaderContent
			label="Buat Donation"
			:list="crumbs"
		/>
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
							<v-img 
								:src="profilePhoto"
								v-if="profilePhoto"
								:lazy-src="profilePhoto"
							/>
							<v-icon v-else color="gainsboro" size="80">perm_identity</v-icon>
						</v-avatar>
						<custom-upload
							id="profil-donation"
							@response="getProfilPhoto"
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
						<v-img
							:src="donationPhoto"
							v-show="donationPhoto"
							@click="reUpload"
							max-height="100%"
							max-width="100%"
						/>
						<custom-upload
							id="donation-image"
							@response="getDonationImage"
							:class="donationPhoto && 'form__button-upload'"
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
						class="white--text mr-6"
						@click="previewResult"
					>
						Preview
					</custom-button>
					<custom-button 
						color="carmine"
						type="submit"
						class="white--text"
					>Buat Donasi</custom-button>
				</v-col>
			</v-row>
		</custom-form>
		<v-dialog  max-width="400px"  v-model="dialog">
			<v-card>
				<div class="card__header">
					<div class="charcoal--text"  >Ikut Berdonasi</div>
				</div>
			</v-card>
		</v-dialog>
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
			dialog : false,
			crumbs : [
				{
					text : 'List Channel',
					href : '/channel',
					disabled : false
				},
						{
					text : 'List Donasi',
					href : '/donation',
					disabled : false
				},
			
				{
					text : 'Buat Donasi',
					disabled : true
				}
			],
			profilePhoto : "",
			donationPhoto : "",
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
		},
		previewResult(){
			this.dialog = true
		},
		reUpload(){
			document.getElementById('donation-image').click()
		},
		getProfilPhoto(payload) {
			if(payload.status === 'success') {
				const urlProfile = payload.response.thumbnail
				this.profilePhoto = urlProfile
			}
		},
		getDonationImage(payload) {
			if(payload.status === 'success') {
				const urlProfile = payload.response.thumbnail
				this.donationPhoto = urlProfile
			}
		},
		
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
	&__button-upload
		position: absolute
		visibility: hidden
.card
	&__header
		height: 40px
		display: flex
		justify-content: center
		align-items: center
</style>