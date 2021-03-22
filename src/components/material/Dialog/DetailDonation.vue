<template>
  <v-dialog v-model="dialog" persistent width="869">
    <v-card class="pa-8 charcoal--text">
      <div>
        <v-row no-gutters>
          <v-col cols="10" offset="1" class="text-center">
            <b>Detail Donasi</b>
          </v-col>
          <v-col cols="1" class="d-flex justify-end">
            <v-icon @click="closeDialog" small>mdi-close</v-icon>
          </v-col>
        </v-row>

        <v-row no-gutters class="mt-8">
          <v-col cols="6">
            <div>
              <img
                src="https://dummyimage.com/350x250/eeeeee/eeeeee"
                alt="donation image"
              />

              <div class="detail__description mt-4">
                <b class="detail__description__title"
                  >Bantu Bima Sembuh Dari Infeksi Paru Akut</b
                >

                <div class="d-flex flex-column mt-6">
                  <span class="detail__description__subtitle teal--text"
                    >Diverifikasi oleh</span
                  >
                  <span>dr. Radhian Amandito</span>
                </div>

                <div class="d-flex flex-column mt-6">
                  <span class="detail__description__subtitle teal--text"
                    >Wali Penerima</span
                  >
                  <span>Budiman Rahaja</span>
                </div>

                <p class="detail__description__info grey--text mt-6">
                  Ayo bantu Bima sembuh dari infeksi paru akut. Bima adalah anak
                  dari pasangan suami istri Akikah dan Dimas yang bekerja
                  sebagai kuli bangunan dan pedagang kue asongan. <br /><br />
                  Bima lahir secara prematur, dan ketika lahir ternyata
                  terdeteksi adanya kejanggalan pada paru kanan nya, dan
                  ternyata memang paru kanan Bima nyaris tak bekerja, menurut
                  dokter Burhanudin yang bertanggung jawab dalam urusan ini,
                  Bima mengalami infeksi paru akut pada paru paru kanan nya.
                </p>

                <v-row no-gutters class="box-time whitesnow py-2 px-3">
                  <v-col cols="2" class="d-flex">
                    <icon-clock-square></icon-clock-square>
                  </v-col>
                  <v-col
                    cols="5"
                    class="d-flex flex-column box-time__title"
                    align-self="center"
                  >
                    <span class="grey--text">Total Waktu</span>
                    <b>Pengumpulan</b>
                  </v-col>
                  <v-col
                    cols="5"
                    align-self="center"
                    class="box-time__time-left"
                  >
                    <span>4 Bulan, 25 hari</span>
                  </v-col>
                </v-row>
              </div>
            </div>
          </v-col>
          <v-col cols="6">
            <div class="box-total">
              <div class="d-flex flex-column orangeprimary white--text pa-3">
                <span class="box-total__title">Dana Terkumpul</span>
                <span class="box-total__total my-2">Rp. 7.321.900</span>
                <v-progress-linear
                  value="75"
                  rounded
                  color="white"
                ></v-progress-linear>
              </div>
              <div class="box-total__donors px-5 pb-5">
                <v-row no-gutters v-for="n in 30" :key="n" class="mt-5">
                  <v-col cols="4">
                    <span>11/04/2020</span>
                  </v-col>
                  <v-col cols="4">
                    <span>Andi Rio</span>
                  </v-col>
                  <v-col cols="4" class="text-end">
                    <span>Rp 100.000</span>
                  </v-col>
                </v-row>
              </div>
            </div>
          </v-col>
        </v-row>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    idUser: {
      type: String,
    },
    dialog: {
      type: Boolean,
    },
    closeDialog: {
      type: Function,
    },
  },
};
</script>

<style lang="sass" scoped>
.detail__description
  font-weight: 500
  width: 350px
  &__title
    font-size: 20px
  &__subtitle
    font-size: 12px
    font-weight: 500
  &__info
    font-size: 14px
    line-height: 18px
.box-time
  width: 320px
  border-radius: 8px
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.07)
  &__title
    font-size: 12px
    font-weight: 500
  &__time-left
    font-size: 14px
    font-weight: bold
.box-total
  &__title
    font-size: 14px
    line-height: 18px
    font-weight: bold
  &__total
    font-size: 20px
    font-weight: bold
  &__donors
    height: 680px
    border: 1px solid silver
    border-top-color: transparent
    overflow: scroll
</style>
