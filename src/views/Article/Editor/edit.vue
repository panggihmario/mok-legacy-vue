<template>
  <custom-form refForm="form">
    <div class="d-flex justify-space-between">
      <div class="black--text create-article__label">Buat Article</div>
      <div class="d-flex">
        <custom-button 
					type="submit"  
					class="carmine--text mr-6"
					@click="handleDraft"
        >
					Safe To Draft
				</custom-button>
      </div>
    </div>
    <FormNews :payloadNews="payloadNews" :propsImage="propsImage" />
  </custom-form>
</template>

<script>
import { mapActions } from "vuex";
import HeaderContent from "../../../containers/HeaderContent";
import FormNews from "../../../containers/Form/formNews";
export default {
	components : {
		FormNews
	},
  mounted() {
    this.handleResponse();
	},
	data () {
		return {
			payloadNews: {
        headline: "",
        title: "",
        content: "",
        linkReference: "",
				media: [],
			},
			propsImage : ''
		}
	},
  methods: {
    ...mapActions({
			getNewsById: "news/getNewsById",
			editDraft : "news/editDraft"
    }),
    async handleResponse() {
      const id = this.$route.params.id;
      const response = await this.getNewsById(id);
      if (response.status === 200) {
				const responseData = response.data.data
				this.payloadNews = responseData
				this.propsImage = responseData.media[0].thumbnail
      } else {
        console.log(response);
      }
		},
		async handleDraft(){
			const id = this.$route.params.id
			const params = {
				id,
				data : this.payloadNews
			}
			const response = await this.editDraft(params)
			if(response.status === 200) {
				this.$router.push('/editor')
			}else{
				console.log(response)
			}
		}
  }
};
</script>
