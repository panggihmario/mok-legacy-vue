<template>
  <custom-form refForm="form">
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
    <FormNews :payloadNews="payloadNews" />
  </custom-form>
</template>

<script>
import { mapState, mapActions } from "vuex";
import HeaderContent from "../../../containers/HeaderContent";
import FormNews from "../../../containers/Form/formNews";
export default {
  components: {
    HeaderContent,
    FormNews
  },
  computed: {
    ...mapState(["user"]),
    isFormValid() {
      return Object.keys(this.payloadNews).every(field => {
        return this.payloadNews[field];
      });
    }
  },
  methods: {
    ...mapActions({
      createNews: "news/createNews",
      createDraft: "news/createDraft"
    }),
    async onDraft() {
			const statusValid = this.isFormValid;
      if (statusValid) {
        const response = await this.createDraft(this.payloadNews);
        if (response.status === 200) {
          this.$router.push("/editor");
        } else {
          return response;
        }
      }
    },
    async onSubmit() {
      const statusValid = this.isFormValid;
      if (statusValid) {
        const response = await this.createNews(this.payloadNews);
        if (response.status === 200) {
          this.$router.push("/editor");
        } else {
          return response;
        }
      } else {
        return;
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
				media: [],
      },
      dialog: false
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
