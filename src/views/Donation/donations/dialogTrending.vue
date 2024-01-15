<template>
  <v-dialog v-model="dialogTrending" width="475" @click:outside="closeDialog">
    <v-card>
      <div :class="d.container">
        <div :class="d.icon">
          <v-btn icon @click="closeDialog" small>
            <v-icon small>fas fa-times</v-icon>
          </v-btn>
        </div>
        <div>
          <div class="d-flex">
            <div class="mr-4">
              <v-btn color="secondary" x-small icon>
                <v-icon>fas fa-exclamation-circle</v-icon>
              </v-btn>
            </div>
            <div>
              <div :class="d.title">
                Apakah kamu yakin ingin trendingkan konten ini?
              </div>
              <div :class="d.content">
                Penggalangan dana yang kamu trendingkan statusnya akan berubah menjadi trending selama 72 jam, dan kamu
                hanya bisa melakukan trending kembali setelah durasi trending berakhir.
              </div>
              <div class="d-flex">
                <custom-button @click="closeDialog" size="small" class="mr-2">
                  Batalkan
                </custom-button>
                <custom-button @click="handleTrending" size="small" color="secondary">
                  Ya, Trendingkan sekarang
                </custom-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  props: {
    dialogTrending: {
      type: Boolean
    },
    idData : {
      type : String
    }
  },
  methods: {
    ...mapActions({
      trendingDonation : 'donation/trendingDonation'
    }),
    closeDialog() {
      this.$emit('closeDialog')
    },
    handleTrending () {
      return this.trendingDonation(this.idData)
        .then(response => {
          this.$emit('onUpdateAfterTrending')
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style lang="scss" module="d">
.container {
  padding: 24px 16px 24px 24px;
  ;
}

.title {
  color: $black;
  font-size: 14px;
  font-weight: 800;
}

.icon {
  position: absolute;
  top: 6px;
  right: 6px
}

.content {
  color: $charcoal;
  font-size: 12px;
  font-weight: 500;
  margin-bottom: 23px;
  max-width: 346px;
  margin-top: 8px;
}
</style>