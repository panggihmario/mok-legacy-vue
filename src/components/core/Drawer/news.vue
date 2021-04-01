<template>
  <v-navigation-drawer floating absolute width="470" permanent right>
    <template v-slot:prepend>
      <div class="preview__container overflow-y-auto">
        <div class="preview__title">
          Korban Banjir Gugat Anies, Sekda DKI: Kami Respons Bencana Dengan Cepat 
        </div>
        <div class="preview__image-container">
          <img
            style="max-height :100%;max-width :100%; border-radius : 8px"
            :src="`https://picsum.photos/500/300?image=10`"
          />
        </div>
        <div class="preview__created">
          08/01/2020 Sumber - Kompas.com
        </div>
        <div class="preview__publisher">
          <div>Penyunting Nursita Sari </div>
          <div>Penulis Ambaranie Nadia Kemala Movanita</div>
        </div>
        <div class="preview__content">
          Jakarta - Ketua DPRD DKI Jakarta, Prasetio Edi mengkritik kebijakan pemangkasan jam operasional MRT, LRT dan TransJakarta, bahkan rute TransJakarta dipotong. Hal ini, menurut Pras, panggilan akrab Prasetio malah menimbulkan masalah baru yang perlu diselesaikan. "Ini kebijakan sebenarnya justru memicu penumpukan. Karena itu harus dan wajib petugas-petugas di sana turun langsung untuk mengurai terjadinya penumpukan yang terjadi," kata Pras, dalam keterangannya, Senin (17/3/2020). Pagi ini, cukup banyak yang mengeluhkan sedikitnya bus TransJ yang tersedia. Calon penumpang TransJ sampai ada yang mengantre ke luar halte. Pras berpesan, Pemerintah Provinsi (Pemprov) DKI Jakarta harus membuat kebijakan tepat dalam kondisi penanganan virus Corona (COVID-19).
        </div>
        <div>
          <div class="preview__footer-text">Kategori News</div>
          <div>
            <v-select
              :items="categories"
              dense
              outlined
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
    </template>
  </v-navigation-drawer>
</template>

<script>
import {mapActions} from 'vuex'
export default {
  data () {
    return {
      categories : ['Sport', 'Hobby']
    }
  },
  methods : {
    ...mapActions({
      changeStatusViewNews: "changeStatusViewNews",
    }),
    publishNews() {
      return this.changeStatusViewNews(false)
    }
  }
}
</script>

<style lang="sass" scoped>
.preview
  &__container
    padding: 40px 32px 40px 32px
    background-color: #FAFAFA
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