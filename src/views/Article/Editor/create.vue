<template>
  <div>
		{{user}}
    <div class="d-flex justify-space-between">
      <div class="black--text create-article__label">Buat Article</div>
      <div class="d-flex">
        <custom-button class="primary--text mr-6">Safe To Draft</custom-button>
        <custom-button color="primary">Submit</custom-button>
      </div>
    </div>
    <v-row align="center">
      <v-col md="7">
        <custom-input label="Headline" />
      </v-col>
      <v-col md="5">
        <custom-upload class="mb-1 ml-4" id="upload-editor" />
      </v-col>
    </v-row>
    <v-row :style="{marginTop : '-40px'}" >
      <v-col cols="7">
        <custom-input label="Judul" />
        <text-editor v-model="article" />
				<custom-textarea
					label="Tag Artikel"
					placeholder="Tag"
				/>
      </v-col>
      <v-col cols="5">
        <div class="ml-4">
          <custom-input label="Kategori Artikel" placeholder="Kategori" />
					<icon-input label="Sumber Artikel Utama"/>
					<icon-input label="Artikel Terkait 1"/>
					<icon-input label="Artiket Terkait 2"/>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
	computed : {
		...mapState(['user'])
	},
	mounted () {
		if(this.user === 'publisher'){
			this.$router.push('/article')
		}

	},
  data() {
    return {
      article: ""
    };
  }
};
</script>

<style lang="sass" scoped>
.create-article
	&__label
		font-size: 24px
		font-weight: 500
</style>
