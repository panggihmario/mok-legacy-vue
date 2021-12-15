<template>
  <div>
    <div @click="openMedia" :class="d['tb__link']">Lihat Post  </div>
    <v-dialog v-model="dialogMedia" width="850" >
      <v-card>
        <v-row no-gutters >
          <v-col cols="6">
            <div :class="d['dg__left']">
              <div :class="d['dg__img-container']">
                <v-img
                  :src="srcImage"
                  contain
                  aspect-ratio="1"
                  max-height="456"
                />
              </div>
            </div>
          </v-col>
          <v-col cols="6">
            <div :class="d['dg__right']">
              <div :class="d['dg__icon']">
                <v-icon 
                  style="cursor:pointer" 
                  size="18px"
                  @click="closeDialog"
                >
                  fas fa-times
                </v-icon></div>
            </div>
             <div :class="d['dg__desc']">
                <span :class="d['dg__user']">{{item.createBy}}</span> {{ item.description }}
              </div>
          </v-col>
        </v-row>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props : ['item'],
  data () {
    return {
      dialogMedia : false
    }
  },
  computed: {
    srcImage() {
      if (this.item.medias) {
        return this.item.medias[0].thumbnail.medium;
      }
    },
  },
  methods : {
    openMedia () {
      this.dialogMedia = true
    },
    closeDialog() {
      this.dialogMedia = false
    }
    
  }
}
</script>

<style src="../style.scss" lang="scss" module="d">

</style>