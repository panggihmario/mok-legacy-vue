<template>
  <v-dialog 
    width="475" 
    v-model="dialogReject"
    @click:outside="closeDialog"
  >
  <v-card>
        <div :class="d.container" >
          <div :class="d.icon">
            <v-btn icon @click="closeDialog" small>
              <v-icon small>fas fa-times</v-icon>
            </v-btn>
          </div>
          <div>
            <div class="d-flex">
              <div class="mr-4">
                <v-btn color="error" x-small icon>
                  <v-icon>fas fa-exclamation-circle</v-icon>
                </v-btn>
              </div>
              <div>
                <div :class="d.title">Apakah kamu yakin ingin menghapus postingan ini?</div>
                <div  :class="d.content" >Postingan yang kamu hapus akan dihilangkan dari list feed ini, dan kamu tidak akan bisa mengembalikan potingan yang sudah dihapus.</div>
                <div class="d-flex">
                  <custom-button 
                    @click="closeDialog" 
                    size="small" 
                    class="mr-2" 
                    color="secondary"
                  >
                    Batalkan Reject Postingan
                  </custom-button>
                  <custom-button
                    :loading="loadingDelete" 
                    @click="handleDelete" 
                    size="small" 
                    color="error" 
                  >
                    Reject Postingan
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
export default {
  props : {
    dialogReject : Boolean
  },
  data () {
    return {
      loadingDelete : false,
    }
  },
  methods : {
    closeDialog () {
      this.$emit('closeDialog', false)
    },
    handleDelete () {
      this.loadingDelete = true
      this.$emit('handleDelete')
      setTimeout(() => {
        this.loadingDelete = false
      },500)
    }
  }
}
</script>

<style lang="scss" module="d">
.container {
  padding: 24px 16px 24px 24px;;
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