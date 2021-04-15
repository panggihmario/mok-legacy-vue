<template>
  <v-dialog
		v-model="dialogCreate"
		width="450"
		@click:outside="closeDialogCreate"
	>
		<v-card>
			<v-card-title>Nama Kategori</v-card-title>
			<v-card-text>
				<custom-form :onSubmit="handleSubmit">
					<custom-input
						v-model="categoryName"
						:value="categoryName"
						name="Category Name"
					/>
				</custom-form>
				<div class="d-flex justify-end">
					<custom-button @click="handleSubmit" type="submit" color="primary">
						Buat Kategori
					</custom-button>
				</div>
				
			<v-snackbar top v-model="alertSuccess" color="success">Create Kategori News Success</v-snackbar>
			<v-snackbar top v-model="alertFailed" color="error">Create Kategori Failed</v-snackbar>
			</v-card-text>
		</v-card>
  </v-dialog>
</template>

<script>
import HeaderContent from "@/containers/HeaderContent";
import Form from './formCategory';
import { mapActions } from "vuex";
export default {
	props : ['dialogCreate'],
  components: {
		HeaderContent,
		Form
  },
  data() {
    return {
			categoryName: "",
			alertSuccess : false,
			alertFailed : false,
			loading : false
    };
  },
  methods: {
		getCategoryName (value) {
			this.categoryName = value
		},
		closeDialogCreate() {
			this.$emit('closeDialogCreate', false)
		},
    ...mapActions({
      createCategory: "news/createCategoryNews"
    }),
    async handleSubmit() {
      const payload = {
        name : this.categoryName
			};
			this.loading = true
      return this.createCategory(payload)
        .then(resp => {
					this.alertSuccess = true
					this.loading = false
					setTimeout(() => {
						this.alertSuccess = false
						// this.$router.push('/categorynews')
						this.$emit('closeDialogCreate', false)
					}, 1500)
				})
        .catch(err => {
					this.alertFailed = true
					this.loading = false
					setTimeout(() => {
						this.alertFailed = false
						this.categoryName = ''
					}, 1500)
				});
    }
  }
};
</script>