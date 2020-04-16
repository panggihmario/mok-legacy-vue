<template>
  <custom-form>
    <div class="d-flex justify-space-between">
      <div class="black--text create-article__label">Buat Article</div>
      <div class="d-flex">
        <custom-button type="submit" @click="onDraft" class="carmine--text mr-6"
          >Safe To Draft</custom-button
        >
        <custom-button
          color="carmine"
          @click="onSubmit"
          type="submit"
          class="white--text"
          >Submit</custom-button
        >
      </div>
    </div>

    <v-row align="center">
      <v-col md="7">
        <custom-input
          label="Headline"
          v-model="payloadNews.headline"
          :value="payloadNews.headline"
          rules="required"
          name="Headline"
        />
      </v-col>
			 <v-dialog
			 		v-model="dialog"
					 max-width="300"
			 >
          <v-img :src="image" />
        </v-dialog>
      <v-col md="5">
        <custom-button  @click.stop="dialog = true" v-if="image">Lihat Gambar</custom-button>
        <custom-upload
          class="mb-1 ml-4"
          id="upload-editor"
          @response="getImage"
          v-else
        />
      </v-col>
    </v-row>
    <v-row :style="{ marginTop: '-20px' }">
      <v-col cols="7">
        <custom-input
          label="Judul"
          v-model="payloadNews.title"
          :value="payloadNews.title"
          rules="required"
          name="Title"
        />
        <text-editor
          v-model="payloadNews.content"
          :value="payloadNews.content"
          rules="required"
          name="Content"
        />
        <custom-textarea
          label="Tag Artikel"
          placeholder="Tag"
          :disabled="true"
        />
      </v-col>
      <v-col cols="5">
        <div class="ml-4">
          <custom-input
            :disabled="true"
            label="Kategori Artikel"
            placeholder="Kategori"
          />
          <icon-input
            label="Sumber Artikel Utama"
            v-model="payloadNews.linkReference"
            :value="payloadNews.linkReference"
            rules="required"
            name="Link Refrence"
          />
          <icon-input :disabled="true" label="Artikel Terkait 1" />
          <icon-input :disabled="true" label="Artiket Terkait 2" />
        </div>
      </v-col>
    </v-row>
  </custom-form>
</template>

<script>
import { mapState, mapActions } from "vuex";
import HeaderContent from "../../../containers/HeaderContent";
export default {
  components: {
    HeaderContent
  },
  computed: {
    ...mapState(["user"])
  },
  methods: {
    ...mapActions({
			createNews: "news/createNews",
			createDraft : "news/createDraft"
    }),
    async onDraft() {
			const response = await this.createDraft(this.payloadNews);
      if (response.status === 200) {
        this.$router.push("/editor");
      } else {
        return response;
      }
    },
    async onSubmit() {
      const response = await this.createNews(this.payloadNews);
      if (response.status === 200) {
        this.$router.push("/editor");
      } else {
        return response;
      }
    },
    getImage(payload) {
      if (payload.status === "success") {
        this.image = payload.response.thumbnail;
        this.payloadNews.media.push(payload.response);
      }
    }
  },
  data() {
    return {
      image: "",
      payloadNews: {
        headline: "",
        title: "",
        content: "",
        linkReference: "",
        media: []
			},
			dialog : false
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
