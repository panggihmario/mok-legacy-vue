<template>
  <div class="text-center">
    <v-menu
      v-model="menu"
      :close-on-content-click="false"
      offset-x
      :position-x="200"
      left
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          v-bind="attrs"
          v-on="on"
          icon
        >
        <v-icon size="15px">fas fa-bars</v-icon>
        </v-btn>
      </template>
      <div :class="m['menu-container']" >
        <div :class="m['menu-box']" @click="onUpdate"  class="black--text">
          <v-icon color="black" size="10px">fas fa-file-signature</v-icon>
          <div>Update Kabar Terkini</div>
        </div>
        <div :class="m['menu-box']" class="primary--text" @click="onActive" >
          <v-icon color="primary" size="10px">fas fa-power-off</v-icon>
          <div> Nonaktifkan Penggalangan Dana</div>
        </div>
      </div>
    </v-menu>
    <v-dialog width="395" v-model="dialog">
      <v-card :class="m.dialog">
        <div :class="m['dialog-close']" @click="closeDialog">
          <v-icon  size="20px">fas fa-times</v-icon>
        </div>
        <div :class="m['dialog-warning']">
          <v-icon size="20px" color="primary">fas fa-exclamation-circle</v-icon>
        </div>
        <div :class="m['dialog-title']">Apakah kamu yakin ingin menonaktifkan donasi ini?</div>
        <div :class="m['dialog-content']">Donasi yang kamu dinonaktifkan tetap ada didalam list, tapi tidak ada bisa dilihat oleh pengguna.</div>
        <div class="d-flex justify-space-between">
          <custom-button @click="closeDialog" full-width color="secondary" size="small">Tidak, kembali ke list</custom-button>
          <custom-button :loading="loading" @click="onInactive" color="primary" size="small">Nonaktifkan Donasi</custom-button>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  props: {
    item: {
      type: Object
    }
  },
  data() {
    return {
      menu: false,
      offset: true,
      dialog : false,
      loading : false
    }
  },
  methods : {
    ...mapActions({
      putStatusDonation : 'donation/putStatusDonation'
    }), 
    onUpdate () {
      console.log('on update')
      this.menu = false
      this.$router.push({
        name : 'detailDonation',
        params : {
          id : this.item.id
        }
      })
    },
    onActive () {
      console.log('on active')
      this.menu = false
      this.dialog = true
    },
    closeDialog() {
      this.dialog = false
    },
    onInactive () {
      const payload = {
        id : this.item.id,
        params : {
          status : 'Inactive'
        }
      }
      this.loading = true
      return this.putStatusDonation(payload)
        .then((res) => {
          console.log(res)
          this.loading = false
          this.dialog = false
        })
        .catch(err => {
          console.log(err.response)
        })
    }
  }
}
</script>

<style lang="scss" src="../donation.scss" module="m" ></style>