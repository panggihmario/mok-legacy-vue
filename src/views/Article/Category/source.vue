<template>
  <v-dialog
    v-model="dialogSource"
    width="450"
    @click:outside="closeDialogSource"
  >
    <v-card>
      <v-card-title>
        Sumber Berita
      </v-card-title>
      <v-card-text>
        <div class="source__description">Masukan domain sumber berita, pisahkan antar domain dengan tanda koma (contoh : detik.com, kompas.com, tribun.com)</div>
        <div class="mt-6">
          <v-textarea
            outlined
            v-model="sourceNews"
          />
        </div>
        <div class="d-flex justify-end">
          <custom-button @click="closeDialogSource" class="mr-2">Batalkan</custom-button>
          <custom-button @click="saveSourceNews" color="primary">Simpan</custom-button>
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  props : ['dialogSource', 'dataSiteAgregator'],
  data () {
    return {
      // sourceNews : ''
    }
  },
  computed : {
    sourceNews : {
      get() {
        return  this.dataSiteAgregator
      },
      set(value) {
        this.$emit('setNewDataAgregator', value)
      }
    }
  },
  methods : {
    closeDialogSource() {
      this.$emit('closeDialogSource', false)
    },
    ...mapActions({
      saveNewsSiteAggregator : 'news/saveNewsSiteAggregator'
    }),
    saveSourceNews() {
      console.log(this.sourceNews)
      const splitValue = this.sourceNews.split(',')
      console.log(splitValue)
      const payload = splitValue.map(pay => {
        return {
          agent : 'WEBHOSE',
          name : pay
        }
      })
      console.log(payload)
    }
  }
}
</script>

<style lang="sass" scoped>
.source
  &__description
    color: #4A4A4A
    font-size: 12px
    font-weight: 500
</style>