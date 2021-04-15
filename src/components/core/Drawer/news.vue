<template>
  <v-navigation-drawer  floating color="whitesnow"  app width="470" permanent right>
    <!-- <template v-slot:prepend> -->
      <div class="preview__container overflow-y-auto">
        <div class="preview__title">
          {{previewNewsAgregator.postNewsDto.title}}
        </div>
        <div class="preview__image-container">
          <img
            style="max-height :100%;max-width :100%; border-radius : 8px"
            :src="previewNewsAgregator.postNewsDto.medias[0].url"
          />
        </div>
        <div class="preview__created">
          {{formatDate(previewNewsAgregator.postNewsDto.createAt)}} Sumber - {{previewNewsAgregator.agent}}
        </div>
        <div class="preview__publisher">
          <div>Penyunting {{previewNewsAgregator.postNewsDto.publisher}} </div>
          <div>Penulis {{previewNewsAgregator.postNewsDto.editor}}</div>
        </div>
        <div class="preview__content" v-html="previewNewsAgregator.postNewsDto.content">

        </div>
        <div>
          <div class="preview__footer-text">Kategori News</div>
          <div>
            <v-select
              :items="categories"
              dense
              outlined
              v-model="selectedCategory"
              item-text="name"
              return-object
            ></v-select>
          </div>
          <div>
            <custom-button
              color="primary"
              size="medium"
              class="my-3"
              @click="publishNews"
            >
              Publish
        </custom-button>
          </div>
        </div>
      </div>
    <!-- </template> -->
  </v-navigation-drawer>
</template>

<script>
import {mapActions, mapState} from 'vuex'
import moment from 'moment'
export default {
  data () {
    return {
      categories : [],
      selectedCategory : {}
    }
  },
  computed : {
    ...mapState({
      previewNewsAgregator : state => state.news.previewNewsAgregator
    }),
  },
  mounted() {
    this.handleGetMapping()
  },
  methods : {
    ...mapActions({
      changeStatusViewNews: "changeStatusViewNews",
      publishNewsAgregator : 'news/publishNewsAgregator',
      getCategoryNews : 'news/getCategoryNews'
    }),
    handleGetMapping() {
      return this.getCategoryNews()
        .then(response => {
          const responseData = response.data.data
          this.categories = responseData
          console.log("categories", responseData)
        })
        .catch(err => {
          console.log(err)
        })
    },
    formatDate(rawDate) {
      const secondRawDate = rawDate/1000
      const newDate = moment.unix(secondRawDate).format("D/M/YYYY")
      return newDate
    },
    publishNews() {
      console.log(this.selectedCategory)
      // return this.publishNewsAgregator(this.previewNewsAgregator)
      //   .then(response => {
      //     return this.changeStatusViewNews(false)
      //   })
      //   .catch(err => {
      //     console.log(err)
      //   })
    }
  }
}
</script>

<style lang="sass" scoped>
.preview
  &__container
    padding: 40px 32px 40px 32px
    // background-color: #FAFAFA
    border-left: none
    height: 100vh
  &__title
    color: #4A4A4A
    font-size: 18px
    font-weight: bold
  &__image-container
    width: 100%
    height: 219px
    border-radius: 8px
    margin-top: 18px
  &__created
    color: #BBBBBB
    font-size: 12px
    font-weight: 500
    margin-top: 12px
    margin-bottom: 24px
  &__publisher
    color: #000000
    font-size: 12px
    font-weight: 300
    margin-bottom: 18px
  &__content
    color: #4A4A4A
    font-size: 16px
    font-weight: 500
    line-height: 20px
    letter-spacing: 0.01em
  &__footer-text
    color: #4A4A4A
    margin-top: 36px
    margin-bottom: 8px
    letter-spacing: 0.01em
    font-size: 12px
    font-weight: 500
</style>