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
          />
        </div>
        <div class="d-flex justify-end">
          <custom-button class="mr-2">Batalkan</custom-button>
          <custom-button color="primary">Simpan</custom-button>
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props : ['dialogSource'],
  methods : {
    closeDialogSource() {
      this.$emit('closeDialogSource', false)
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