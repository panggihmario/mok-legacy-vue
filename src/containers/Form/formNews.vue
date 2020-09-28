<template>
  <div>
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
      <v-col md="5">
        <custom-upload
          class="mb-1 ml-4"
          id="upload-editor"
          @response="getImage"
          style="display: none"
        />
        <div @click="uploadImage('upload-editor')" class="form__container-image ml-4">
          <v-img
            contain
            v-if="image"
            :src="image"
            max-height="100%"
            max-width="100%"
            :aspect-ratio="1"
          >
          </v-img>
          <div v-else>
            <v-icon size="18px" color="secondary">$upload</v-icon>
            <span class="ml-2 text-secondary">Foto / Video</span>
            <v-progress-linear
              color="secondary"
              indeterminate
              rounded
              height="6"
              v-if="visible"
            />
          </div>
        </div>
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
        <custom-textarea label="Tag Artikel" placeholder="Tag" :disabled="true" />
      </v-col>
      <v-col cols="5">
        <div class="ml-4">
          <custom-select
            label="Kategori News"
            placeholder="Kategori"
            :items="categoryNews"
            v-model="payloadNews.newsCategory"
            :value="payloadNews.newsCategory"
            return-object
            item-text="name"
            rules="required"
            name="Kategori"
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
  </div>
</template>

<script>
export default {
  props: {
    payloadNews: {
      type: Object,
    },
    propsImage: {
      type: String,
    },
    loadingDraft: {
      type: Boolean,
    },
    categoryNews: {
      type: Array,
    },
  },
  computed: {
    status() {
      if (this.payloadNews.medias.length > 1) {
        return true;
      } else {
        return false;
      }
    },
  },
  data() {
    return {
      dialog: false,
      image: this.propsImage,
      visible: false,
    };
  },
  methods: {
    uploadImage(id) {
      document.getElementById(id).click();
    },
    getImage(payload) {
      this.image = ""
      if (payload.status === "success") {
        this.image = payload.response.thumbnail.medium;
        this.$emit('getImageUpload', payload.response)
        // const temp = this.payloadNews.medias.map(media => {
        //   return {
        //     ...media,
        //     metadata : payload.response.metadata,
        //     thumbnail : payload.response.thumbnail,
        //     type : payload.response.type,
        //     url : payload.response.url
        //   }
        // })
        // this.payloadNews.medias.splice(0, 1, temp[0]);
        this.visible = false;
      } else {
        this.visible = true;
      }
    },
  },
  watch: {
    propsImage() {
      this.image = this.propsImage;
    },
  },
};
</script>

<style lang="sass" scoped>
.form
  &__container-image
    width: 180px
    height: 126px
    background: #FFFFFF
    border: 1px dashed #1890FF
    box-sizing: border-box
    border-radius: 4px
    display: flex
    justify-content: center
    align-items: center
    color: #1890FF
    font-size: 12px
    font-weight: 500
    cursor: pointer
  &__image
    max-width: 100%
    max-width: 100%
    overflow: hidden
</style>