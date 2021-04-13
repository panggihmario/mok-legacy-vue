<template>
  <div class="right__container">
    <div class="right__title charcoal--text">Kategori - {{category.name}}</div>
    <div class="d-flex justify-space-between align-center">
      <div class="d-flex">
        <div class="mr-2 charcoal--text right__action">Delete Kategori</div>
        <div class="charcoal--text right__action">Edit Kategori</div>
      </div>
      <div>
        <custom-button color="white"> Batalkan </custom-button>
        <custom-button class="ml-4" @click="saveMapping" color="primary">
          Simpan Pengaturan Mapping
        </custom-button>
      </div>
    </div>
    <div class="mt-12">
      <div class="right__label charcoal--text">Kategori Berita (Webhost)</div>
      <div class="right__sub-label charcoal--text">
        Pilih beberapa kategori berita dibawah ini untuk dihubungkan dengan
        kategori news di KipasKipas
      </div>
    </div>
    <div class="mt-8" style="width: 370px">
      <custom-input
        placeholder="Cari kategori berita"
        colorbg="white"
        append-icon="search"
      />
    </div>
    <div>
      <div 
        class="d-flex"
        v-for="(cate, idx) in categoryWebhose"
        :key="idx"
      >
        <div class="mr-4 text-uppercase right__group-label">{{cate.group}}</div>
        <div>
          <v-row no-gutters>
            <v-col  cols="6" v-for="(child, idx) in cate.children"  :key="idx">
              <v-checkbox
                :label="`${child.name}`"
                dense
                hide-details
                v-model="selected"
                :value="child"
              />
              </v-col>
          </v-row>
        </div>
      </div>


    </div>
  </div>
</template>


<script>
import { mapActions, mapState } from 'vuex'
export default {
  props : ['categoryWebhose', 'category'],
  data () {
    return {
      selected : []
    }
  },
  methods : {
    ...mapActions({
      mappingCategory : 'news/mappingCategory'
    }),
    saveMapping () {
      const idCategory = this.category.id
      const payload = {
        newsCategory : {
          id : idCategory
        },
        aggregatorCategories : this.selected
      }
      return this.mappingCategory(payload)
        .then(response => {
          console.log(response)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>


<style lang="sass" scoped>
.right
  &__container
    background-color: #F1F7FE
    width: 100%
    height: 100%
    padding: 32px
  &__title
    font-size: 14px
    font-weight: bold
    letter-spacing: 0.01em
  &__action
    font-size: 10px
    letter-spacing: 0.01em
  &__label
    font-size: 14px
    font-weight: bold
    letter-spacing: 0.01em
  &__sub-label
    font-size: 12px
    letter-spacing: 0.01em
  &__group-label
    padding-top: 8px
</style>

<style scoped>
ul {
  column-count: 2;
  column-gap: 0;
  width: 600px;
}
li {
  display: inline-block;
}
.v-input--selection-controls{
  margin-top: 2px !important;
}
</style>