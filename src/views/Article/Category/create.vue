<template>
  <div>
    <HeaderContent label="Buat Kategori News"></HeaderContent>
		<Form
			:categoryName="categoryName"
			:loading="loading"
			@onSubmit="onSubmit"
			label="Create"
			@getCategoryName="getCategoryName"
		/>
    <v-snackbar top v-model="alertSuccess" color="success">Create Kategori News Success</v-snackbar>
    <v-snackbar top v-model="alertFailed" color="error">Create Kategori Failed</v-snackbar>
  </div>
</template>

<script>
import HeaderContent from "@/containers/HeaderContent";
import Form from './formCategory';
import { mapActions } from "vuex";
export default {
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
    ...mapActions({
      createCategory: "news/createCategoryNews"
    }),
    async onSubmit(name) {
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
						this.$router.push('/categorynews')
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