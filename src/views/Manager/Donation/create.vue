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
					/>
					<custom-input
						label="Kebutuhan Donasi"
					/>
					<custom-input
						label="Batas Donasi"
					/>
					<custom-input
						label="Nama Wali/Penerima Uang"
						placeholder="Masukkan nama wali"
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
			]
		}
	},
	methods : {
		handleSubmit ( ){}
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